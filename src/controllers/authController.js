import * as authServices from "../services/authServices.js";


//kayıt ol 
export const register = async (req, res, next) =>{
    try {
        const result = await authServices.registerUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

//giriş yap 
export const login = async (req,res,next)=>{
    try {   
        const result =await authServices.loginUser(req.body);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
};

//çıkış yapma 
export const logout = async(req,res,next)=>{
    try {
        const result =await authServices.logoutUser(req.body);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}
