// Format utilities for consistent text formatting
export const capitalize = (str: string): string => {
  return str.split(' ')
    .map(word => word.length > 1 ? word.charAt(0).toUpperCase() + word.slice(1) : word)
    .join(' ');
};

export const formatPhoneNumber = (phone: string): string => {
  // Format phone number as +32 XXX XX XX XX or 0XXX XX XX XX
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('32')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
  }
  return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-BE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(amount);
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) return `${minutes} minutes`;
  if (remainingMinutes === 0) return `${hours} heure${hours > 1 ? 's' : ''}`;
  return `${hours} heure${hours > 1 ? 's' : ''} et ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
};