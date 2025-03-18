export interface User {
  user_id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'staff';
  hourly_rate?: number;
}

export interface Activity {
  activity_id: number;
  name: string;
  type: string;
  first_price?: number;
  second_price?: number;
  third_price: number;
  min_player: number;
  max_player: number;
  is_social_deal: boolean;
}

export interface Booking {
  booking_id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  date: Date;
  activity: string;
  nbr_parties: number;
  nbr_pers: number;
  type: string;
  deposit: number;
  amount: number;
  total: number;
  comment?: string;
  is_cancelled: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}