import { VALIDATION } from '../constants';

export const validatePhone = (phone: string): boolean => {
  return VALIDATION.phone.pattern.test(phone);
};

export const validateEmail = (email: string): boolean => {
  return VALIDATION.email.pattern.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const getValidationError = (field: 'phone' | 'email', value: string): string | null => {
  switch (field) {
    case 'phone':
      return validatePhone(value) ? null : VALIDATION.phone.message;
    case 'email':
      return validateEmail(value) ? null : VALIDATION.email.message;
    default:
      return null;
  }
};