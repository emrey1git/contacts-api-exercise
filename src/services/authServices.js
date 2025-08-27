import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Session from "../models/session.js";
import { TOKEN_EXPIRATION } from "../constants/index.js";

// Kayıt servisi
export const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Bu email zaten kayıtlı!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return {
    id: newUser._id,
    email: newUser.email,
    role: newUser.role,
  };
};

// Access token üret
//tokenları üret 

// Login servisi
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Geçersiz email veya şifre!");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Geçersiz email veya şifre!");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
    },
  };
};


// Token doğrulama helper
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Geçersiz veya süresi dolmuş token");
  }
};
