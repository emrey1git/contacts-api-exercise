// controllers/authController.js
import * as authServices from "../services/authServices.js";

// ✅ Kullanıcı kayıt
export const register = async (req, res, next) => {
  try {
    const result = await authServices.registerUser(req.body);
    res.status(201).json(result); // başarılı kayıt
  } catch (error) {
    next(error);
  }
};

// ✅ Kullanıcı giriş
export const login = async (req, res, next) => {
  try {
    // authServices.loginUser bize -> { accessToken, refreshToken, user } dönecek
    const result = await authServices.loginUser(req.body);

    // 🍪 Access token'ı cookie'ye yazıyoruz
    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,   // JS ile erişilemez (XSS koruması)
      secure: false,    // prod'da true (HTTPS zorunlu)
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 saat
    });

    // 🍪 Refresh token'ı da ayrı cookie'ye yazabiliriz
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün
    });

    res.status(200).json({
      message: "Giriş başarılı",
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Kullanıcı çıkış
export const logout = async (req, res, next) => {
  try {
    // authServices.logoutUser DB'deki session kaydını temizleyecek
    await authServices.logoutUser(req.user.id);

    // 🍪 Cookie'leri temizle
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Çıkış başarılı" });
  } catch (error) {
    next(error);
  }
};
