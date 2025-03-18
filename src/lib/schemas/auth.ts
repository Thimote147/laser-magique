import { z } from 'zod';
import { VALIDATION } from '../constants';

export const loginSchema = z.object({
  email: z.string().email(VALIDATION.email.message),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères')
});

export const registerSchema = z.object({
  firstname: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastname: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().regex(VALIDATION.phone.pattern, VALIDATION.phone.message),
  email: z.string().email(VALIDATION.email.message),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères')
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;