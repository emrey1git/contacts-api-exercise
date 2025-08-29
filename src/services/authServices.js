import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Session from "../models/session.js"; // Session modeli, oturumları DB'de saklamak için
import { TOKEN_EXPIRATION } from "../constants/index.js";

// ============================
// KAYIT SERVİSİ
// ============================
export const registerUser = async ({ name, email, password, role }) => {
  // 1. Kullanıcı zaten var mı kontrol et
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Bu email zaten kayıtlı!");
  }

  // 2. Şifreyi hashle
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Yeni kullanıcı oluştur
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // 4. Şifreyi dönmeden kullanıcı bilgisini döndür
  return {
    id: newUser._id,
    email: newUser.email,
    role: newUser.role,
  };
};

// ============================
// TOKEN ÜRETİM FONKSİYONLARI
// ============================

// Access token üret
export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRATION.ACCESS_TOKEN / 1000 + "s", // ms -> saniye
  });
};

// Refresh token üret
export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRATION.REFRESH_TOKEN / 1000 + "s",
  });
};

// ============================
// LOGIN SERVİSİ
// ============================
export const loginUser = async ({ email, password }) => {
  // 1. Kullanıcı var mı kontrol et
  const user = await User.findOne({ email });
  if (!user) throw new Error("Geçersiz email veya şifre!");

  // 2. Şifreyi kontrol et
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Geçersiz email veya şifre!");

  // 3. Tokenleri üret
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // 4. Session oluştur ve DB'ye kaydet
  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + TOKEN_EXPIRATION.ACCESS_TOKEN),
    refreshTokenValidUntil: new Date(Date.now() + TOKEN_EXPIRATION.REFRESH_TOKEN),
  });

  // 5. Token ve kullanıcı bilgisini döndür
  return {
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

// ============================
// LOGOUT SERVİSİ
// ============================
export const logoutUser = async (userId) => {
  // Kullanıcının tüm sessionlarını sil
  await Session.deleteMany({ userId });
  return { message: "Oturum kapatıldı" };
};

// ============================
// TOKEN DOĞRULAMA HELPER
// ============================
export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Geçersiz veya süresi dolmuş token");
  }
};
