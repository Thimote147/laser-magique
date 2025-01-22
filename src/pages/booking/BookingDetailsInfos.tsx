import { Delete } from "lucide-react";
import { Booking, Conso } from "../../types";
import { toCapitalize } from "../../utils/functions";
import { supabase } from "../../supabase/client";
import { useParams } from "react-router-dom";

interface BookingDetailsInfosProps {
    infos: Booking | undefined;
    consos: Conso[];
    update: boolean;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookingDetailsInfos = ({ infos, consos, update, setUpdate }: BookingDetailsInfosProps) => {
    const { id } = useParams<{ id: string }>();

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
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
                <div className="bg-white/5 p-5 w-full lg:max-w-xl">
                    <p>Prénom: {infos?.firstname}</p>
                    {infos?.lastname?.trim() && <p>Nom: {infos.lastname}</p>}
                    {infos?.phone?.trim() && <p>Téléphone: {infos.phone}</p>}
                    {infos?.email?.trim() && <p>Email: {infos.email}</p>}
                    <p>Nombre de personnes: {infos?.nbr_pers}</p>
                    <p>Date: {infos?.date ? toCapitalize(new Date(infos.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: "2-digit", minute: "2-digit" })) : "Erreur de date"}</p>
                    <p>{"Acompte : " + infos?.deposit + '€'}</p>
                    <p>Restant à payer : {infos?.amount}€</p>
                    <p>Total à payer : {infos?.total}€</p>
                    {infos?.comment && <p>Commentaire: {infos.comment}</p>}
                    <div className="flex mt-5 gap-5">
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 w-40 h-12">Annuler</button>
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 w-40 h-12">Supprimer</button>
                    </div>
                </div>
                {consos.length !== 0 && <div className="bg-white/5 p-5 max-w-xl">
                    {consos.map(({ food_id, name, quantity, price }) => (
                        <div key={food_id} className="flex justify-between">
                            <p>{"   - " + quantity + "x " + name + " - " + price + "€"}</p>
                            <button onClick={() => handleClickDelete(food_id!)}><Delete className="mr-2" /></button>
                        </div>
                    ))}
                </div>
                }
            </div>
    )
}

export default BookingDetailsInfos;