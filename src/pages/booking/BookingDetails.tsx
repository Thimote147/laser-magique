import { useEffect, useState } from "react";
import { Booking } from "../../types";
import { toCapitalize } from "../../utils/functions";
import { supabase } from "../../supabase/client";
import Consommations from "../../components/booking/Consommations";
import type { Conso } from "../../types";
import { Delete } from "lucide-react";
import { useParams } from "react-router-dom";

const BookingDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [infos, setInfos] = useState<Booking>();
    const [consos, setConsos] = useState<Conso[]>([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const fetchBooking = async (id: string) => {
            const { data, error } = (await supabase.rpc('get_booking_details', { id }));

            if (error) {
                console.error('Error fetching booking', error);
            } else {
                setInfos(data[0]);
            }
        };

        const fetchConsos = async () => {
            const { data, error } = await supabase.rpc('get_conso', { actual_booking_id: id });

            if (error) {
                console.error('Error fetching conso', error);
            } else {
                setConsos(data);
            }
        };

        fetchBooking(id!);
        fetchConsos();
    }, [update]);

    const handleClickDelete = (conso_id: number) => {
        const fetchConsos = async () => {
            const { error } = await supabase.rpc('delete_conso', { actual_booking_id: id, actual_food_id: conso_id });

            if (error) {
                console.error('Error deleting conso', error);
            } else {
                setUpdate(!update);
            }
        }

        fetchConsos();
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-4xl mb-8">Réservation de {infos?.firstname}</h1>
            <div className="flex justify-between">
                <div className="bg-white/5 p-5 max-w-xl">
                    <h2 className="text-2xl">Informations</h2>
                    <p>Prénom: {infos?.firstname}</p>
                    {infos?.lastname?.trim() && <p>Nom: {infos.lastname}</p>}
                    {infos?.email?.trim() && <p>Email: {infos.email}</p>}
                    {infos?.phone?.trim() && <p>Téléphone: {infos.phone}</p>}
                    <p>Nombre de personnes: {infos?.nbr_pers}</p>
                    <p>Date: {infos?.date ? toCapitalize(new Date(infos.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: "2-digit", minute: "2-digit" })) : "Erreur de date"}</p>
                    <p>{"Acompte : " + infos?.deposit + '€'}</p>
                    <p>Restant à payer : {infos?.amount}€</p>
                    <p>Total à payer : {infos?.total}€</p>
                    {infos?.comment && <p>Commentaire: {infos.comment}</p>}
                    <div className="flex justify-around mt-5">
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 w-40 h-12">Modifier</button>
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 w-40 h-12">Annuler</button>
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 w-40 h-12">Supprimer</button>
                    </div>
                </div>
                <div>
                    {consos.map(({ food_id, name, quantity, price }) => (
                        <div key={food_id} className="flex justify-between">
                            <p>{quantity + "x " + name + " - " + price + "€"}</p>
                            <button onClick={() => handleClickDelete(food_id!)}><Delete className="mr-2" /></button>
                        </div>
                    ))}
                </div>
            </div>
            <Consommations update={update} setUpdate={setUpdate} />
        </div>
    );
};

export default BookingDetails;