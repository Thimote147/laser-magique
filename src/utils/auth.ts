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