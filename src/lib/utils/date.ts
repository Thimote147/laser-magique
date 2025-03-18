import { format, isToday, isBefore, startOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BUSINESS_HOURS } from '../constants';

export const formatDate = (date: Date): string => {
  return format(date, 'EEEE d MMMM yyyy', { locale: fr })
    .replace(/\b\w/g, char => char.toUpperCase())
    .replace("DéCembre", "Décembre");
};

export const formatTime = (time: string): string => {
  return time.replace(':', 'h');
};

export const isTimeSlotAvailable = (date: Date, time: string): boolean => {
  if (!isToday(date)) return true;

  const now = new Date();
  const [hours, minutes] = time.split(':').map(Number);
  const timeSlotDate = new Date(date);
  timeSlotDate.setHours(hours, minutes);

  return !isBefore(timeSlotDate, now);
};

export const getBusinessHours = (date: Date): { open: string; close: string } => {
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  return isWeekend ? BUSINESS_HOURS.weekend : BUSINESS_HOURS.weekdays;
};

export const generateTimeSlots = (date: Date): string[] => {
  const { open, close } = getBusinessHours(date);
  const [openHour, openMinute] = open.split(':').map(Number);
  const [closeHour, closeMinute] = close.split(':').map(Number);
  
  const slots: string[] = [];
  let currentHour = openHour;
  let currentMinute = openMinute;

  while (currentHour < closeHour || (currentHour === closeHour && currentMinute <= closeMinute)) {
    slots.push(`${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`);
    currentMinute += 30;
    if (currentMinute >= 60) {
      currentHour++;
      currentMinute = 0;
    }
  }

  return slots;
};