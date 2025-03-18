import { create } from 'zustand';
import { Activity } from '../types';

interface BookingState {
  selectedActivity: Activity | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  participants: number;
  nbr_parties: number;
  setSelectedActivity: (activity: Activity | null) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
  setParticipants: (count: number) => void;
  setNbrParties: (count: number) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedActivity: null,
  selectedDate: null,
  selectedTime: null,
  participants: 0,
  nbr_parties: 0,
  setSelectedActivity: (activity) => set({ selectedActivity: activity }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setParticipants: (count) => set({ participants: count }),
  setNbrParties: (count) => set({ nbr_parties: count }),
  reset: () => set({
    selectedActivity: null,
    selectedDate: null,
    selectedTime: null,
    participants: 0,
    nbr_parties: 0
  })
}));