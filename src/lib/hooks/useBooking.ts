import { useState, useCallback } from 'react';
import { supabase } from '../../supabase/client';
import { Activity } from '../../types';

interface UseBookingProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useBooking = ({ onSuccess, onError }: UseBookingProps = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = useCallback(async (bookingData: {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    activity_id: number;
    date: string;
    nbr_pers: number;
    nbr_parties: number;
    deposit?: number;
    comment?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const { error: bookingError } = await supabase.rpc('insert_booking', bookingData);

      if (bookingError) throw bookingError;

      onSuccess?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  }, [onSuccess, onError]);

  const getAvailability = useCallback(async (date: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_availability', { date });
      
      if (error) throw error;
      
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      return {};
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createBooking,
    getAvailability,
    loading,
    error
  };
};