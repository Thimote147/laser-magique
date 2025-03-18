import { z } from 'zod';
import { VALIDATION } from '../constants';

export const bookingSchema = z.object({
  firstname: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastname: z.string().optional(),
  phone: z.string().regex(VALIDATION.phone.pattern, VALIDATION.phone.message),
  email: z.string().email(VALIDATION.email.message),
  activity_id: z.number(),
  date: z.string(),
  nbr_pers: z.number().min(2, 'Minimum 2 personnes').max(20, 'Maximum 20 personnes'),
  nbr_parties: z.number().min(1, 'Minimum 1 partie'),
  deposit: z.number().optional(),
  comment: z.string().optional()
});

export type BookingFormData = z.infer<typeof bookingSchema>;