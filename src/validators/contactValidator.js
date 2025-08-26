import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'İsim alanı boş bırakılamaz',
      'string.min': 'İsim en az 2 karakter olmalı',
      'string.max': 'İsim en fazla 50 karakter olmalı',
    }),
  phone: Joi.string()
    .trim()
    .pattern(/^\+?\d{10,15}$/) // Telefon formatı: opsiyonel +, 10-15 rakam
    .required()
    .messages({
      'string.empty': 'Telefon alanı boş bırakılamaz',
      'string.pattern.base': 'Geçerli bir telefon giriniz',
    }),
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages({
      'string.empty': 'Email alanı boş bırakılamaz',
      'string.email': 'Geçerli bir email giriniz',
    }),
  address: Joi.string().trim().allow('').optional(),
  company: Joi.string().trim().allow('').optional(),
  notes: Joi.string().trim().allow('').optional(),
  isFavorite: Joi.boolean().optional(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).messages({
    'string.min': 'İsim en az 2 karakter olmalı',
    'string.max': 'İsim en fazla 50 karakter olmalı',
  }),
  phone: Joi.string()
    .trim()
    .pattern(/^\+?\d{10,15}$/)
    .messages({
      'string.pattern.base': 'Geçerli bir telefon giriniz',
    }),
  email: Joi.string().email().lowercase().trim().messages({
    'string.email': 'Geçerli bir email giriniz',
  }),
  address: Joi.string().trim().allow(''),
  company: Joi.string().trim().allow(''),
  notes: Joi.string().trim().allow(''),
  isFavorite: Joi.boolean(),
}).min(1); // En az bir alan güncellenmeli
