import React from "react";
import { supabase } from "../../supabase/client";

interface BookingInfosProps {
    nbr_pers: number;
    activity_id: number;
    nbr_parties: number;
    setIsGameChosen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDataNeeded: React.Dispatch<React.SetStateAction<boolean>>;
    setNbr_parties: React.Dispatch<React.SetStateAction<number>>;
    total: number;
    setBookingAdded: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookingInfos = ({ nbr_pers, activity_id, nbr_parties, setIsGameChosen, setIsDataNeeded, setNbr_parties, total, setBookingAdded }: BookingInfosProps) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            deposit: parseInt(formData.get('deposit') as string || '0'),
            date: formData.get('date'),
            nbr_pers,
            activity_id,
            nbr_parties,
            total
        };

        console.log(data.date);

        const { error } = await supabase.rpc('insert_booking', {
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            email: data.email,
            deposit: data.deposit,
            date: data.date,
            nbr_pers: data.nbr_pers,
            activity_id: data.activity_id,
            nbr_parties: data.nbr_parties,
            total: data.total
        });

        if (error) {
            alert('Erreur lors de la réservation');
            console.error('Error inserting booking', error);
        } else {
            setBookingAdded(true);
            setIsGameChosen(false);
            setIsDataNeeded(false);
            setNbr_parties(0);
        }
    };

    const actualDate = new Date().toISOString().slice(0, 16);

    return (
        <form className="flex flex-col w-full max-w-sm p-3" onSubmit={handleSubmit}>
            <label htmlFor="firstname" className="text-xl">Prénom* :</label>
            <input className="w-full rounded-full bg-white/5 p-3 text-lg text-white transition-transform duration-300 active:scale-95 mb-5" type="text" name="firstname" required />
            <label htmlFor="lastname" className="text-xl">Nom :</label>
            <input className="w-full rounded-full bg-white/5 p-3 text-lg text-white transition-transform duration-300 active:scale-95 mb-5" type="text" name="lastname" />
            <label htmlFor="phone" className="text-xl">Téléphone :</label>
            <input className="w-full rounded-full bg-white/5 p-3 text-lg text-white transition-transform duration-300 active:scale-95 mb-5" type="tel" name="phone" />
            <label htmlFor="email" className="text-xl">Email :</label>
            <input className="w-full rounded-full bg-white/5 p-3 text-lg text-white transition-transform duration-300 active:scale-95 mb-5" type="email" name="email" />
            <label htmlFor="deposit" className="text-xl">Acompte :</label>
            <input className="w-full rounded-full bg-white/5 p-3 text-lg text-white transition-transform duration-300 active:scale-95 mb-5" type="number" name="deposit" min={0} defaultValue={0} />
            <label htmlFor="date" className="text-xl">Date :</label>
            <input className="w-full rounded-full bg-white/5 p-3 text-lg text-white transition-transform duration-300 active:scale-95 mb-5" type="datetime-local" name="date" defaultValue={actualDate} required />
            <button className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-lg text-white transition-transform duration-300 active:scale-95" onClick={() => handleSubmit}>
                Réserver
            </button>
        </form>
    )
};

export default BookingInfos;