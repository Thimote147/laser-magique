import { PRICING } from '../constants';

export const calculateGroupPrice = (players: number, sessions: number): number => {
  if (players < PRICING.STANDARD.minPlayers || players > PRICING.STANDARD.maxPlayers) {
    return 0;
  }
  return players * PRICING.STANDARD.basePrice * sessions;
};

export const calculateBirthdayPrice = (players: number): number => {
  if (players < PRICING.BIRTHDAY.minPlayers) {
    return 0;
  }
  const extraPlayers = Math.max(0, players - PRICING.BIRTHDAY.minPlayers);
  return PRICING.BIRTHDAY.basePrice + (extraPlayers * PRICING.BIRTHDAY.extraPlayerPrice);
};

export const formatPrice = (price: number): string => {
  return `${price.toFixed(2)}€`;
};