import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import React, { useState } from 'react';
import { Activity } from '../../types';
import { toCapitalize } from './DateTimeSelector';
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

  const total = (activity.first_price ?? activity.third_price) * participants;
  const [firstname, setFirstname] = useState<string>();
  const [lastname, setLastname] = useState<string>();
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'firstname':
        setFirstname(toCapitalize(value));
        break;
      case 'lastname':
        setLastname(toCapitalize(value));
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'email':
        setEmail(value);
        break;
    }
  };

  const handleBooking = async () => {
    try {
      const response = await fetch('http://localhost:3010/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          phone,
          email,
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
      alert('Erreur lors de la réservation.');
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

      <div className="space-y-4 mb-8">
        <h4 className="text-2xl font-bold mb-6">Informations de contact</h4>
        <div className="flex justify-between">
          <span>Prénom*</span>
          <input className="text-black" type="text" name="firstname" required onChange={handleData} />
        </div>
        {localStorage.getItem('role') === 'admin' ? null : (
          <>
            <div className="flex justify-between">
              <span>Nom</span>
              <input className="text-black" type="text" name="lastname" onChange={handleData} />
            </div>
            <div className="flex justify-between">
              <span>Téléphone*</span>
              <input className="text-black" type="tel" name="phone" required onChange={handleData} />
            </div>
            <div className="flex justify-between">
              <span>Email*</span>
              <input className="text-black" type="email" name="email" required onChange={handleData} />
            </div>
          </>
        )}
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