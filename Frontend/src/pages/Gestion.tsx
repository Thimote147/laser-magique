import { useState } from 'react';
import { motion } from 'framer-motion';
import { addDays, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WeeklyCalendar from '../components/gestion/WeeklyCalendar';
import BookingStats from '../components/gestion/BookingStats';
import NewRes from '../components/gestion/NewBooking';

// This would come from your API/database
const mockBookings = [
  {
    id: 1,
    activity: 'laser-game',
    date: new Date(2024, 10, 20, 14), // November 20, 2024, 14:00
    slots: 6,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+32123456789',
  },
  {
    id: 2,
    activity: 'cyber-trike',
    date: new Date(2024, 10, 20, 16), // November 20, 2024, 16:00
    slots: 4,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+32987654321',
  },
  {
    id: 3,
    activity: 'virtual-reality',
    date: new Date(2024, 10, 21, 12), // November 21, 2024, 12:00
    slots: 8,
    name: 'Alice Johnson',
    email: 'alice@gmail.com',
    phone: '+32123456789',
  },
  {
    id: 4,
    activity: 'laser-game',
    date: new Date(2024, 10, 21, 14, 30), // November 21, 2024, 14:30
    slots: 20,
    name: 'Bob Brown',
    email: 'bob@gmail.com',
    phone: '+32987654321',
  }
];

const calculateStats = (bookings: typeof mockBookings) => {
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, booking) => {
    const basePrice = {
      'laser-game': 8,
      'virtual-reality': 10,
      'cyber-trike': 20,
    }[booking.activity] || 0;
    return sum + basePrice * booking.slots;
  }, 0);
  const averageGroupSize = bookings.reduce((sum, booking) => sum + booking.slots, 0) / totalBookings;

  return { totalBookings, totalRevenue, averageGroupSize };
};

const Gestion = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState(mockBookings);

  const handlePreviousWeek = () => {
    setCurrentDate((date) => subDays(date, 7));
  };

  const handleNextWeek = () => {
    setCurrentDate((date) => addDays(date, 7));
  };

  const handleBookingMove = (bookingId: number, newDate: Date) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, date: newDate } : booking
      )
    );
  };

  const stats = calculateStats(bookings);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gestion des réservations</h1>
          <div className="flex items-center space-x-4">
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

        <BookingStats {...stats} />

        <div className="bg-white/5 rounded-2xl p-6">
          <WeeklyCalendar
            bookings={bookings}
            currentDate={currentDate}
            onBookingMove={handleBookingMove}
          />
        </div>
      </motion.div>
      
      <NewRes />
    </div>
  );
};

export default Gestion;