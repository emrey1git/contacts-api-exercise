// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import Session from "../models/session.js";
import User from "../models/user.js";

/**
 * 🔹 Kullanıcı giriş yapmış mı kontrol eden middleware
 * - Cookie'den accessToken alır
 * - Token'ı doğrular
 * - Token'a bağlı session gerçekten var mı kontrol eder
 * - User'ı bulup req.user içine ekler
 */
export const authenticate = async (req, res, next) => {
  try {
    // 🍪 1) Cookie'den accessToken çekiyoruz
    const token = req.cookies?.accessToken;
    if (!token) {
      return res.status(401).json({ message: "Token bulunamadı" });
    }

    // 🔑 2) Token doğrulama
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // 📂 3) Session gerçekten DB'de var mı kontrolü
    const session = await Session.findOne({
      userId: decoded.userId,
      accessToken: token,
    });
    if (!session) {
      return res.status(401).json({ message: "Geçersiz oturum" });
    }

    // 👤 4) Kullanıcıyı DB'den çekiyoruz
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Kullanıcı bulunamadı" });
    }

    // ✅ 5) Artık controller içinde req.user ile erişebilirsin
    req.user = user;

    next(); // devam et
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Geçersiz veya süresi dolmuş token" });
  }
};

/**
 * 🔹 Role kontrol middleware
 * - Örn: roleMiddleware(['admin']) sadece admin erişimine izin verir
 * - User rolü uygun değilse 403 döner
 */
export const roleMiddleware = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Yetkilendirme gerekli" });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Bu işlemi yapmaya yetkiniz yok" });
    }

    next(); // rol uygunsa devam
  };
};
