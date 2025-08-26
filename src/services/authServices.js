import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Kayıt servisi
export const registerUser = async ({  name, email, password, role }) => {
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

  // 4. Şifresiz kullanıcı bilgisini döndür
  return {
    id: newUser._id,
    email: newUser.email,
  };
};

// Login servisi
export const loginUser = async ({ email, password }) => {
  // 1. Kullanıcı var mı kontrol et
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Geçersiz email veya şifre!");
  }

  // 2. Şifre doğru mu kontrol et
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Geçersiz email veya şifre!");
  }

  // 3. Token üret (kullanıcının id'si ile)
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // 4. Token ve kullanıcı bilgisini döndür
  return {
    token,
    user: {
      id: user._id,
      email: user.email,
    },
  };
};

// Kimlik doğrulama middleware (helper)
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Geçersiz veya süresi dolmuş token");
  }
};
