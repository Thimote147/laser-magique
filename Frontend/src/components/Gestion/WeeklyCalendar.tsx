import { addDays, startOfWeek, isSameDay } from 'date-fns';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Clock } from 'lucide-react';

interface Booking {
  id: number;
  activity: string;
  date: Date;
  slots: number;
  name: string;
  email: string;
  phone: string;
}

interface WeeklyCalendarProps {
  bookings: Booking[];
  currentDate: Date;
  onBookingMove: (bookingId: number, newDate: Date) => void;
}

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = Math.floor(i / 2) + 9;
  const minutes = i % 2 === 0 ? '00' : '30';
  return `${hour}:${minutes}`;
});

const WeeklyCalendar = ({ bookings, currentDate, onBookingMove }: WeeklyCalendarProps) => {
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const getBookingsForSlot = (day: Date, hour: number, minute: number) => {
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return isSameDay(bookingDate, day) && bookingDate.getHours() === hour && bookingDate.getMinutes() === minute;
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const [bookingId] = result.draggableId.split('-');
    const [newDay, newTime] = result.destination.droppableId.split('-');

    const newDate = new Date(newDay);
    newDate.setHours(parseInt(newTime));
    
    onBookingMove(parseInt(bookingId), newDate);
  };

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'cyber-trike':
        return 'bg-blue-500';
      case 'laser-game':
        return 'bg-purple-500';
      case 'virtual-reality':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  console.log(bookings);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Header */}
          <div className="grid grid-cols-8 gap-2 mb-4">
            <div className="p-4"></div>
            {weekDays.map((day) => (
              <div
                key={day.toString()}
                className="p-4 text-center font-semibold bg-white/5 rounded-lg">
                <div>{day.toLocaleDateString('fr-FR', { weekday: 'long' }).charAt(0).toUpperCase() + day.toLocaleDateString('fr-FR', { weekday: 'long' }).slice(1)}</div>
                <div className="text-sm text-gray-400">
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
              <div key={time} className="grid grid-cols-8 gap-2 mb-2">
                <div className="p-4 flex items-center justify-end text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  {time}
                </div>
                {weekDays.map((day) => (
                  <Droppable
                    key={`${day.toISOString()}-${time}`}
                    droppableId={`${day.toISOString()}-${time}`}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="min-h-[80px] p-2 bg-white/5 rounded-lg"
                      >
                        {getBookingsForSlot(day, hour, minute).map((booking, index) => (
                          <Draggable
                            key={booking.id}
                            draggableId={`${booking.id}-${time}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${getActivityColor(
                                  booking.activity
                                )} p-2 rounded mb-2 text-sm text-white`}
                              >
                                <div className="font-semibold">{booking.name}</div>
                                <div className="text-xs">
                                  {booking.slots} personne{booking.slots > 1 ? 's' : ''}
                                </div>
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