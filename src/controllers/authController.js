import * as authServices from "../services/authServices.js";

// kayıt ol 
export const register = async (req, res, next) =>{
    try {
        const result = await authServices.registerUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

// giriş yap 
export const login = async (req,res,next)=>{
    try {   
        const result = await authServices.loginUser(req.body);
       
        // Token'ı cookie olarak ayarla
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,       
            sameSite: "strict", 
            maxAge: 60 * 60 * 1000 
        });
        
        res.status(200).json({
            message: "Giriş başarılı",
            user: result.user
        });
    } catch (error) {
        next(error);
    }
};

// çıkış yapma 
export const logout = async (req,res,next)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Çıkış başarılı" });
    } catch (error) {
        next(error);
    }
};
