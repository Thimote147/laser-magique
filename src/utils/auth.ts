import { supabase } from '../supabase/client';
import type { User } from '../types/user';

export const getUserProfile = async (userId: string): Promise<User | null> => {
  try {
    const { data: publicUser, error: publicError } = await supabase
      .from('users').select('*').eq('user_id', userId).maybeSingle();

    if (publicError && publicError.code !== 'PGRST116') {
      console.error('Error fetching public user:', publicError);
      return null;
    }

    if (!publicUser) {
      return null;
    }

    if (publicUser.role !== 'user') {
      try {
        publicUser.hours = (await supabase.from('hours').select('*').eq('user_id', userId).order('hour_id', { ascending: false })).data;

        for (const hour of publicUser.hours) {
          hour.beginning = hour.beginning.slice(0, 5);
          hour.ending = hour.ending ? hour.ending.slice(0, 5) : null;
          hour.nbr_hours = hour.nbr_hours ? hour.nbr_hours.slice(0, 5) : null;
        }

      } catch (error) {
        console.error('Error fetching hours:', error);
      }
    }

    return {
      user_id: publicUser.user_id,
      firstname: publicUser.firstname,
      lastname: publicUser.lastname,
      phone: publicUser.phone,
      email: publicUser.email,
      password: publicUser.password,
      role: publicUser.role,
      hourly_rate: publicUser.hourly_rate,
      hours: publicUser.hours,
    };
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
};