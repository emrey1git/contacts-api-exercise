import express from "express";
import * as authController from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js"; 
import { registerUserSchema, loginUserSchema } from "../validators/userValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";


const router = express.Router();

// kayıt olma
router.post("/register", validateRequest(registerUserSchema), authController.register);

// giriş yapma 
router.post("/login", validateRequest(loginUserSchema), authController.login);

// çıkış yapma 
router.post("/logout", authenticate, authController.logout);

export default router;
