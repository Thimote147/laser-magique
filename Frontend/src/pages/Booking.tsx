import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Activity } from '../types';
import ActivitySelector from '../components/booking/ActivitySelector';
import DateTimeSelector from '../components/booking/DateTimeSelector';
import ParticipantsSelector from '../components/booking/ParticipantsSelector';
import BookingSummary from '../components/booking/BookingSummary';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity>(activities[0]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [participants, setParticipants] = useState(1);
  const [availability, setAvailability] = useState<Record<number, { available: boolean }>>({});

  useEffect(() => {
    fetch('http://localhost:3010/activities')
      .then(res => res.json())
      .then(data => setActivities(Object.values(data).flat() as Activity[]));
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      fetch(`http://localhost:3010/booking/availability/${dateStr}`)
        .then(res => res.json())
        .then(data => {
          const formattedData = Object.keys(data).reduce((acc, key) => {
            acc[parseInt(key)] = { available: data[key] };
            return acc;
          }, {} as Record<number, { available: boolean }>);
          setAvailability(formattedData);
        });
    }
  }, [selectedDate]);

  const steps = [
    {
      title: 'Sélectionner une activité',
      component: <ActivitySelector 
        activities={activities} 
        selected={selectedActivity}
        onSelect={setSelectedActivity}
      />
    },
    {
      title: 'Choisir la date et l\'heure',
      component: <DateTimeSelector
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        availability={availability}
        onDateSelect={setSelectedDate}
        onTimeSelect={setSelectedTime}
      />
    },
    {
      title: 'Nombre de participants',
      component: <ParticipantsSelector
        participants={participants}
        setParticipants={setParticipants}
        selectedActivity={selectedActivity}
      />
    },
    {
      title: 'Résumé',
      component: <BookingSummary
        activity={selectedActivity}
        date={selectedDate}
        time={selectedTime}
        participants={participants}
      />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl p-8"
        >
          <div className="flex justify-between mb-8">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`flex items-center ${
                  i < step ? 'text-purple-500' : 'text-gray-400'
                }`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${i < step ? 'bg-purple-500 text-white' : 'bg-gray-600'}
                `}>
                  {i + 1}
                </div>
                <span className="ml-2 hidden sm:block">{s.title}</span>
              </div>
            ))}
          </div>

          {steps[step - 1].component}

            <div className={`flex ${step === 1 ? 'justify-end' : 'justify-between'} mt-8`}>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-600"
              >
                Previous
              </button>
            )}
            {step < steps.length && (
              <button
                onClick={() => {setStep(step + 1); if (step === 1) {setParticipants(selectedActivity.min_player);}}}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                disabled={
                  (step === 1 && !selectedActivity) ||
                  (step === 2 && (!selectedDate || !selectedTime)) ||
                  (step === 3 && !participants)
                }
              >
                Next
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;