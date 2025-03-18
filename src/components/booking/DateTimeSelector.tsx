import { motion } from 'framer-motion';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  isBefore,
  startOfDay,
  parse,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useState } from 'react';

interface DateTimeSelectorProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  availability: Record<string, { available: boolean }>;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}

const DateTimeSelector = ({
  selectedDate,
  selectedTime,
  availability,
  onDateSelect,
  onTimeSelect,
}: DateTimeSelectorProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Time slots from 9:30 to 19:30
  const timeSlots = Array.from({ length: 21 }, (_, i) => {
    const hour = Math.floor((i + 1) / 2) + 9;
    const minutes = i % 2 === 0 ? '30' : '00';
    return `${hour}:${minutes}`;
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get day names for header
  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  // Calculate the days to show before the first day of the month
  const firstDayOfMonth = monthStart.getDay();
  const daysBeforeMonth = Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }, (_, i) => {
    const date = new Date(monthStart);
    date.setDate(0 - i);
    return date;
  }).reverse();

  // Calculate the days to show after the last day of the month
  const lastDayOfMonth = monthEnd.getDay();
  const daysAfterMonth = Array.from({ length: lastDayOfMonth === 0 ? 0 : 7 - lastDayOfMonth }, (_, i) => {
    const date = new Date(monthEnd);
    date.setDate(monthEnd.getDate() + i + 1);
    return date;
  });

  // Combine all days
  const allDays = [...daysBeforeMonth, ...daysInMonth, ...daysAfterMonth];

  const isDateSelectable = (date: Date) => {
    const today = startOfDay(new Date());
    return !isBefore(date, today);
  };

  const isTimeSlotInPast = (time: string) => {
    if (!selectedDate || !isToday(selectedDate)) return false;
    
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const timeSlotDate = new Date(selectedDate);
    timeSlotDate.setHours(hours, minutes);
    
    return isBefore(timeSlotDate, now);
  };

  return (
    <div className="space-y-8">
      {/* Calendar */}
      <div className="bg-white/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">
            {format(currentMonth, 'MMMM yyyy', { locale: fr })}
          </h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Week day headers */}
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {allDays.map((date, index) => {
            const isCurrentMonth = isSameMonth(date, currentMonth);
            const isSelected = selectedDate && isSameDay(date, selectedDate);
            const isTodayDate = isToday(date);
            const selectable = isDateSelectable(date);

            return (
              <motion.button
                key={date.toISOString()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                onClick={() => selectable && onDateSelect(date)}
                disabled={!selectable || !isCurrentMonth}
                className={`
                  aspect-square flex items-center justify-center rounded-lg text-sm
                  transition-all relative
                  ${isSelected
                    ? 'bg-purple-500 text-white'
                    : isTodayDate
                      ? 'bg-purple-500/20 text-white'
                      : isCurrentMonth && selectable
                        ? 'hover:bg-white/10'
                        : 'text-gray-600'
                  }
                  ${!isCurrentMonth && 'opacity-30'}
                  ${!selectable && 'cursor-not-allowed'}
                `}
              >
                {format(date, 'd')}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold">Sélectionnez une heure</h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {timeSlots.map((time, index) => {
              const isAvailable = availability[time]?.available ?? true;
              const isSelected = selectedTime === time;
              const isPast = isTimeSlotInPast(time);

              return (
                <motion.button
                  key={time}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => isAvailable && !isPast && onTimeSelect(time)}
                  disabled={!isAvailable || isPast}
                  className={`
                    p-3 rounded-lg text-center transition-all
                    ${isSelected
                      ? 'bg-purple-500 text-white'
                      : isAvailable && !isPast
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  {time}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelector;