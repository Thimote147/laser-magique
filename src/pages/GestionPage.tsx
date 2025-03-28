import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';
import BookingStats from '../components/gestion/BookingStats';
import NewBooking from '../components/gestion/NewBooking';
import { Booking } from '../types';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Calendar, Clock } from 'lucide-react';

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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingAdded, setBookingAdded] = useState(false);
  const [view, setView] = useState(window.innerWidth < 768 ? 'timeGridDay' : 'timeGridWeek');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const fetchBookings = async (start: string, end: string) => {
    const { data, error } = await supabase
      .rpc('get_bookings_with_activities', { 
        start_date: start, 
        end_date: end 
      });

    if (error) {
      console.error('Error fetching bookings', error);
    } else {
      setBookings(data);
    }
  };

  useEffect(() => {
    const now = new Date();
    const start = format(new Date(now.getFullYear(), now.getMonth(), 1), 'yyyy-MM-dd');
    const end = format(new Date(now.getFullYear(), now.getMonth() + 1, 0), 'yyyy-MM-dd');
    
    fetchBookings(start, end);
    setBookingAdded(false);

    const handleResize = () => {
      setView(window.innerWidth < 768 ? 'timeGridDay' : 'timeGridWeek');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [bookingAdded]);

  const getEventColor = (activity: string, is_cancelled: boolean) => {
    if (is_cancelled) return '#EF4444';
    switch (activity) {
      case 'Cyber Trike': return '#3B82F6';
      case 'Laser Game': return '#8B5CF6';
      case 'Réalité Virtuelle': return '#10B981';
      default: return '#6B7280';
    }
  };

  const handleEventClick = (info: any) => {
    const booking = bookings.find(b => b.booking_id.toString() === info.event.id);
    if (booking) {
      setSelectedBooking(booking);
      setIsModalOpen(true);
    }
  };

  const handleViewDetails = () => {
    if (selectedBooking) {
      navigate(`/booking/${selectedBooking.booking_id}`);
    }
    setIsModalOpen(false);
  };

  const handleDatesSet = (info: any) => {
    const start = format(info.start, 'yyyy-MM-dd');
    const end = format(info.end, 'yyyy-MM-dd');
    fetchBookings(start, end);
  };

  const calendarEvents = bookings.map(booking => ({
    id: booking.booking_id.toString(),
    title: `${booking.firstname} - ${booking.nbr_pers} pers.`,
    start: new Date(booking.date),
    end: new Date(new Date(booking.date).getTime() + 60 * 60 * 1000),
    backgroundColor: getEventColor(String(booking.activity), booking.is_cancelled),
    borderColor: getEventColor(String(booking.activity), booking.is_cancelled),
    extendedProps: {
      activity: booking.activity,
      nbr_parties: booking.nbr_parties,
      deposit: booking.deposit,
      total: booking.total,
      is_cancelled: booking.is_cancelled
    }
  }));

  const stats = calculateStats(bookings);

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Gestion des réservations</h1>

        {!isMobile && <BookingStats {...stats} />}

        <div className="bg-white/5 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
          <div className="w-full">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={view}
              firstDay={1}
              headerToolbar={{
                left: 'prev,today,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              buttonText={{
                today: "Aujourd'hui",
                month: 'Mois',
                week: 'Semaine',
                day: 'Jour'
              }}
              views={{
                timeGridWeek: {
                  titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
                  dayHeaderFormat: { weekday: 'short', day: 'numeric' }
                },
                timeGridDay: {
                  titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
                },
                dayGridMonth: {
                  titleFormat: { year: 'numeric', month: 'long' },
                  dayHeaderFormat: { weekday: 'short' }
                }
              }}
              events={calendarEvents}
              eventClick={handleEventClick}
              datesSet={handleDatesSet}
              slotMinTime="09:30:00"
              slotMaxTime="22:00:00"
              allDaySlot={false}
              height={isMobile ? "auto" : "auto"}
              aspectRatio={isMobile ? 0.8 : 1.35}
              nowIndicator={true}
              eventContent={(arg) => (
                <div className="p-1 text-sm h-full">
                  <div className="font-semibold">{arg.event.title}</div>
                  {arg.event.extendedProps.is_cancelled && (
                    <div className="font-bold text-red-200">ANNULÉ</div>
                  )}
                </div>
              )}
              slotLabelFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              }}
              businessHours={{
                daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                startTime: '09:30',
                endTime: '22:00',
              }}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              slotEventOverlap={false}
              locale="fr"
            />
          </div>
        </div>
      </motion.div>

      <Dialog 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: '#1f2937',
            color: 'white',
            borderRadius: '1rem',
            padding: '1rem'
          }
        }}
      >
        <DialogTitle>
          Détails de la réservation
          {selectedBooking?.is_cancelled && (
            <div className="text-red-500 font-bold mt-2">ANNULÉE</div>
          )}
        </DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <div className="space-y-4">
              <div>
                <p className="text-lg font-bold">{selectedBooking.firstname} {selectedBooking.lastname}</p>
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar size={16} />
                  <span>{format(new Date(selectedBooking.date), 'dd/MM/yyyy')}</span>
                  <Clock size={16} />
                  <span>{format(new Date(selectedBooking.date), 'HH:mm')}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p>Activité: {String(selectedBooking.activity)}</p>
                <p>Nombre de personnes: {selectedBooking.nbr_pers}</p>
                <p>Nombre de parties: {selectedBooking.nbr_parties}</p>
                <p>Acompte versé: {selectedBooking.deposit}€</p>
                <p>Solde à payer: {selectedBooking.amount}€</p>
                <p>Total: {selectedBooking.total}€</p>
              </div>
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleViewDetails}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
                >
                  Voir tous les détails
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <NewBooking setBookingAdded={setBookingAdded} />
    </div>
  );
};

export default GestionPage;