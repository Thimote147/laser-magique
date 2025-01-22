import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { addDays, subDays, startOfWeek, endOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WeeklyCalendar from '../components/gestion/WeeklyCalendar';
import BookingStats from '../components/gestion/BookingStats';
import NewBooking from '../components/gestion/NewBooking';
import { Booking } from '../types';
import { supabase } from '../supabase/client';

const calculateStats = (bookings: Booking[]) => {
  const totalBookings = bookings.length || 0;

  let totalRevenue = 0;

  if (totalBookings !== 0) {
    totalRevenue = bookings.reduce((sum, booking) => {
      return sum + booking.deposit + (booking.total - (booking.amount + booking.deposit));
    }, 0);
  }

  let averageGroupSize = 0;

  if (totalBookings !== 0) {
    averageGroupSize = Math.floor(bookings.reduce((sum, booking) => sum + booking.nbr_pers, 0) / totalBookings);
  }

  return { totalBookings, totalRevenue, averageGroupSize };
};

const GestionPage = () => {
  const [bookings, setBookings] = useState<Booking[]>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [bookingAdded, setBookingAdded] = useState(false);

  const fetchBookings = (startDate: string, endDate: string) => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .rpc('get_bookings_with_activities', { start_date: startDate, end_date: endDate });

      if (error) {
        console.error('Error fetching bookings', error);
      } else {
        setBookings(data);
      }
    }

    fetchBookings();
  };

  useEffect(() => {
    const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 }).toLocaleDateString().split('/').reverse().join('-') + 'T' + startOfWeek(currentDate, { weekStartsOn: 1 }).toLocaleTimeString();
    const endOfWeekDate = endOfWeek(currentDate, { weekStartsOn: 1 }).toLocaleDateString().split('/').reverse().join('-') + 'T' + endOfWeek(currentDate, { weekStartsOn: 1 }).toLocaleTimeString();

    fetchBookings(startOfWeekDate, endOfWeekDate);
    setBookingAdded(false);

    const interval = setInterval(() => {
      const now = new Date();
      if (now.getSeconds() === 0) {
        fetchBookings(startOfWeekDate, endOfWeekDate);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentDate, bookingAdded]);

  const handlePreviousWeek = () => {
    setCurrentDate((date) => subDays(date, (isMobile ? 1 : 7)));
  };

  const handleNextWeek = () => {
    setCurrentDate((date) => addDays(date, (isMobile ? 1 : 7)));
  };

  const handleBookingMove = (bookingId: number, newDate: Date) => {
    const updateBooking = async (id: number, date: Date) => {
      const { error } = await supabase.from('bookings').update({ date: date.toLocaleString().split(',')[0].split('/').reverse().join('-') + 'T' + newDate.toLocaleTimeString() }).eq('booking_id', id);

      if (error) {
        console.error('Error updating booking', error);
      } else {
        fetchBookings(startOfWeek(currentDate, { weekStartsOn: 1 }).toISOString().split('T')[0], endOfWeek(currentDate, { weekStartsOn: 1 }).toISOString().split('T')[0]);
      }
    }

    updateBooking(bookingId, newDate);
  };

  const stats = calculateStats(bookings || []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="sm:flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center ">Gestion des réservations</h1>
          <div className="flex items-center space-x-4 justify-center">
            <button
              onClick={handlePreviousWeek}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-5 py-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              Aujourd'hui
            </button>
            <button
              onClick={handleNextWeek}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {!isMobile && (<BookingStats {...stats} />)}

        <div className="bg-white/5 rounded-2xl p-6">
          <WeeklyCalendar
            bookings={bookings || []}
            currentDate={currentDate}
            onBookingMove={handleBookingMove}
          />
        </div>
      </motion.div>

      <NewBooking setBookingAdded={setBookingAdded} />
    </div>
  );
};

export default GestionPage;