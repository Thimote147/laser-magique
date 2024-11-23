import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Activity } from '../../types';
import { fr } from 'date-fns/locale';

interface BookingSummaryProps {
  activity: Activity | null;
  date: Date | null;
  time: string | null;
  participants: number;
  nbr_parties: number;
}

const BookingSummary = ({ activity, date, time, participants, nbr_parties }: BookingSummaryProps) => {
  if (!activity || !date || !time) return null;

  const total = activity.first_price * participants;

  const handleBooking = async () => {
    try {
      const response = await fetch('https://api.thimotefetu.fr/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-storage')}`,
        },
        body: JSON.stringify({
          activity_id: activity.activity_id,
          date: `${format(date, 'yyyy-MM-dd')}T${time}`,
          participants,
          quantity: participants,
          type: activity.type,
        }),
      });

      if (response.ok) {
        alert('Réservation effectuée avec succès !');
      } else {
        console.error('Réservation échouée :', response.statusText);
      }
    } catch (error) {
      console.error('Réservation échouée :', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto"
    >
      <h3 className="text-2xl font-bold mb-6">Résumé de la réservation</h3>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between">
          <span>Activité</span>
          <span className="font-semibold">{activity.name}</span>
        </div>
        <div className="flex justify-between">
          <span>Date</span>
            <span className="font-semibold">{format(date, 'EEEE d MMMM yyyy', { locale: fr }).replace(/\b\w/g, char => char.toUpperCase())}</span>
        </div>
        <div className="flex justify-between">
          <span>Heure</span>
          <span className="font-semibold">{time}</span>
        </div>
        <div className="flex justify-between">
          <span>Participants</span>
          <span className="font-semibold">{participants}</span>
        </div>
        <div className="flex justify-between">
          <span>Prix par personne</span>
          <span className="font-semibold">{activity.first_price}€</span>
        </div>
        <div className="flex justify-between">
          <span>Nombre de parties</span>
          <span className="font-semibold">{nbr_parties}</span>
        </div>
        <div className="pt-4 border-t border-gray-600">
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>{total}€</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleBooking}
        className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
      >
        Confirmer la réservation
      </button>
    </motion.div>
  );
};

export default BookingSummary;