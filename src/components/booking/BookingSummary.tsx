import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Activity } from '../../types';
import { useNavigate } from 'react-router';

interface BookingSummaryProps {
  activity: Activity | null;
  date: Date | null;
  time: string | null;
  participants: number;
  nbr_parties: number;
}

const BookingSummary = ({ activity, date, time, participants, nbr_parties }: BookingSummaryProps) => {
  const navigate = useNavigate();

  if (!activity || !date || !time || !participants || !nbr_parties) return null;

  const total = (activity.first_price ?? activity.third_price) * participants * nbr_parties;

  const user = JSON.parse(localStorage.getItem('user') || '{"firstname": "AH"}');

  const handleBooking = async () => {
    try {
      const response = await fetch('https://api.thimotefetu.fr/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
          email: user.email,
          activity_id: activity.activity_id,
          date: `${format(date, 'yyyy-MM-dd')}T${time}`,
          participants,
          quantity: participants,
          type: activity.type
        }),
      });

      if (response.ok) {
        alert('Réservation effectuée avec succès !');
        navigate('/');
      } else {
        alert('Erreur lors de la réservation.');
      }
    } catch (error) {
      alert('Erreur lors de la réservation : ' + error);
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
          <span className="font-semibold">{format(date, 'EEEE d MMMM yyyy', { locale: fr }).replace(/\b\w/g, char => char.toUpperCase()).replace("DéCembre", "Décembre")}</span>
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
          <span className="font-semibold">{activity.first_price ?? activity.third_price}€</span>
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