import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { addDays, subDays, startOfWeek, endOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WeeklyCalendar from '../components/gestion/WeeklyCalendar';
import BookingStats from '../components/gestion/BookingStats';
import NewBooking from '../components/gestion/NewBooking';
import { Booking } from '../types';

const calculateStats = (bookings: Booking[]) => {
  const totalBookings = bookings.length || 0;

  let totalRevenue = 0;

  if (totalBookings !== 0) {
    totalRevenue = bookings.reduce((sum, booking) => {
      const basePrice = {
        'laser-game': 8,
        'virtual-reality': 10,
        'cyber-trike': 20,
      }[booking.activity] || 0;
      return sum + basePrice * booking.nbr_pers;
    }, 0);
  }

  let averageGroupSize = 0;

  if (totalBookings !== 0) {
    averageGroupSize = parseFloat((bookings.reduce((sum, booking) => sum + booking.nbr_pers, 0) / totalBookings).toFixed(1));
  }

  return { totalBookings, totalRevenue, averageGroupSize };
};

const GestionPage = () => {
  const [bookings, setBookings] = useState<Booking[]>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [bookingAdded, setBookingAdded] = useState(false);

  const fetchBookings = (startDate: string, endDate: string) => {
    fetch(`http://localhost:3010/bookings/all?start_date=${startDate}&end_date=${endDate}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch(error => console.error('Erreur:', error));
  };

  useEffect(() => {
    const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(currentDate, { weekStartsOn: 1 });
    fetchBookings(startOfWeekDate.toISOString().split('T')[0], endOfWeekDate.toISOString().split('T')[0]);
    setBookingAdded(false);

    const interval = setInterval(() => {
      const now = new Date();
      if (now.getSeconds() === 0) {
        fetchBookings(startOfWeekDate.toISOString().split('T')[0], endOfWeekDate.toISOString().split('T')[0]);
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
    setBookings((prevBookings = []) =>
      prevBookings.map((booking) =>
        booking.booking_id === bookingId ? { ...booking, date: newDate } : booking
      )
    );
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
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
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

      <NewBooking setBookingAdded={setBookingAdded}/>
    </div>
  );
};

export default GestionPage;