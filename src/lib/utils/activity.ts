import { Activity } from '../types';
import { supabase } from '../../supabase/client';

export const getActivityPrice = (activity: Activity, players: number, sessions: number): number => {
  const basePrice = activity.first_price ?? activity.third_price;
  return basePrice * players * sessions;
};

export const getActivityColor = (activityName: string, isCancelled: boolean = false): string => {
  if (isCancelled) return 'bg-red-500';
  
  switch (activityName) {
    case 'Cyber Trike':
      return 'bg-blue-500';
    case 'Laser Game':
      return 'bg-purple-500';
    case 'Réalité Virtuelle':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export const fetchActivities = async (): Promise<Activity[]> => {
  const { data, error } = await supabase.from('activities').select('*');
  if (error) throw error;
  return data;
};

export const isActivityAvailable = (
  activity: Activity,
  players: number,
  date: Date
): boolean => {
  if (players < activity.min_player || players > activity.max_player) {
    return false;
  }

  // Add any additional availability checks here
  return true;
};