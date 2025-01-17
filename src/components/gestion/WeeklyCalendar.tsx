import { addDays, startOfWeek, isSameDay } from 'date-fns';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Clock } from 'lucide-react';
import { Booking } from '../../types';

interface WeeklyCalendarProps {
  bookings: Booking[];
  currentDate: Date;
  onBookingMove: (bookingId: number, newDate: Date) => void;
}

const timeSlots = Array.from({ length: 22 }, (_, i) => {
  const hour = Math.floor(i / 2) + 9;
  const minutes = i % 2 === 0 ? '00' : '30';
  return `${hour}:${minutes}`;
});

const WeeklyCalendar = ({ bookings, currentDate, onBookingMove }: WeeklyCalendarProps) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const startDate = isMobile ? currentDate : startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: (isMobile ? 1 : 7) }, (_, i) => addDays(startDate, i));

  const getBookingsForSlot = (day: Date, hour: number, minute: number) => {
    return bookings.length ? bookings.filter((booking: Booking) => {
      const bookingDate = new Date(booking.date);
      return isSameDay(bookingDate, day) && bookingDate.getHours() === hour && (
        (minute === 0 && bookingDate.getMinutes() < 30) ||
        (minute === 30 && bookingDate.getMinutes() >= 30)
      );
    }) : [];
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const [bookingId] = result.draggableId.split('-');
    const [newDay, newTime] = result.destination.droppableId.split('T');

    let newDate = new Date(newDay);
    newDate.setHours(parseInt(newTime.split(':')[0]));
    newDate.setMinutes(parseInt(newTime.split(':')[1]));
    
    onBookingMove(parseInt(bookingId), newDate);
  };

  const getActivityColor = (activity: string) => {
    switch (activity) {
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

  const grid_cols_mobile = isMobile ? 'grid-cols-1' : 'grid-cols-7';

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="overflow-x-auto">
        <div className={`${isMobile ? "" : "min-w-[1000px]"}`}>
          {/* Header */}
          <div className={`grid ${grid_cols_mobile} gap-2 mb-4`}>
            {weekDays.map((day) => (
              <div
                key={day.toString()}
                className={`p-4 text-center font-semibold ${day.toLocaleDateString('fr-FR') === new Date().toLocaleDateString('fr-FR') ? "bg-gradient-to-br from-purple-500 to-pink-500" : "bg-white/5"} rounded-lg`}>
                <div>{day.toLocaleDateString('fr-FR', { weekday: 'long' }).charAt(0).toUpperCase() + day.toLocaleDateString('fr-FR', { weekday: 'long' }).slice(1)}</div>
                <div className={`text-sm ${day.toLocaleDateString('fr-FR') === new Date().toLocaleDateString('fr-FR') ? "text-white" : "text-gray-400"}`}>
                  {day.toLocaleDateString('fr-FR', { day: 'numeric' })}{' '}
                  {day.toLocaleDateString('fr-FR', { month: 'long' }).charAt(0).toUpperCase() + day.toLocaleDateString('fr-FR', { month: 'short' }).slice(1)}
                </div>
              </div>
            ))}
          </div>

          {/* Time slots */}
          {timeSlots.map((time) => {
            const [hour, minute] = time.split(':').map(Number);
            return (
              <div key={time} className={`grid ${grid_cols_mobile} gap-2 mb-2`}>
                {weekDays.map((day) => (
                  <Droppable
                    key={`${day.toISOString()}-${time}`}
                    droppableId={`${day.toLocaleDateString().split('/').reverse().join('-')}T${time}`}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="min-h-[80px] p-2 bg-white/5 rounded-lg"
                      >
                        <div className="pb-2 flex items-center text-gray-400 text-xs">
                          <Clock className="w-4 h-4 mr-2" />
                          {time}
                        </div>
                        {getBookingsForSlot(day, hour, minute).map((booking, index) => (
                          <Draggable
                            key={`${booking.booking_id}`}
                            draggableId={`${booking.booking_id}-${time}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                onClick={() => window.location.href = "/booking/" + booking.booking_id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${getActivityColor(
                                  booking.activity
                                )} p-2 rounded mb-2 text-sm text-white`}
                              >
                                <p className="font-semibold">{booking.firstname + " " + (booking.lastname !== null ? booking.lastname : '')}</p>
                                <p className="text-xs">
                                  {booking.type + " de " + booking.nbr_pers + " personne" + (booking.nbr_pers > 1 ? 's' : '')}
                                </p>
                                <p className="text-xs">{booking.nbr_parties + " parties de " + booking.activity}</p>
                                <p className="text-xs">{booking.deposit ? "Acompte de " + booking.deposit + "€" : "Pas d'acompte"}</p>
                                {booking.comment && <p className="text-xs">{booking.comment}</p>}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default WeeklyCalendar;