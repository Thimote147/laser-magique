import { motion } from 'framer-motion';
import { format, addDays, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';

function toCapitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

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
  const nextWeek = Array.from({ length: 31 }, (_, i) => addDays(new Date(), i));
  const timeSlots = Array.from({ length: 22 }, (_, i) => {
    const hour = Math.floor(i / 2) + 10;
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minutes}`;
  });

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Choisir une date</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {nextWeek.map((date, index) => (
            <motion.button
              key={date.toISOString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                flex-shrink-0 p-4 rounded-xl transition-all
                ${selectedDate && isSameDay(selectedDate, date)
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
                }
              `}
              onClick={() => onDateSelect(date)}
            >
              <div className="text-sm">{toCapitalize(format(date, 'EEEE', { locale: fr }))}</div>
              <div className="text-lg font-bold">{format(date, 'd', { locale: fr })}</div>
              <div className="text-sm">{toCapitalize(format(date, 'MMM', { locale: fr }))}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Choisir une heure</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {timeSlots.map((time, index) => {
              const isAvailable = availability[time]?.available;

              return (
                <motion.button
                  key={time}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    p-3 rounded-lg text-center transition-all
                    ${selectedTime === time
                      ? 'bg-purple-500 text-white'
                      : isAvailable
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }
                  `}
                  onClick={() => isAvailable && onTimeSelect(time)}
                  disabled={!isAvailable}
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
export { toCapitalize };