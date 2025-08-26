import Joi from "joi";
import { ROLES } from '../constants/index.js';

export const registerUserSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(50) // Mongoose'daki maxlength ile uyumlu
    .required()
    .messages({
      'string.empty': "İsim alanı boş bırakılamaz",
      'string.min': "İsim en az 3 karakter olmalı",
      'string.max': "İsim en fazla 50 karakter olmalı",
    }),
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages({
      'string.empty': "Email alanı boş bırakılamaz",
      'string.email': "Geçerli bir email girin",
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': "Şifre alanı boş bırakılamaz",
      'string.min': "Şifre en az 6 karakter olmalı",
    }),
  role: Joi.string()
    .valid(...Object.values(ROLES).map(r => r.toLowerCase())) 
    .default(ROLES.USER.toLowerCase())
    .messages({
      'any.only': "Geçersiz rol seçimi",
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages({
      'string.empty': "Email alanı boş bırakılamaz",
      'string.email': "Geçerli bir email giriniz",
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': "Şifre alanı boş olamaz",
    }),
}).min(1); // en az bir alan girilmeli
