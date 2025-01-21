import { useEffect, useState } from "react";
import { Booking } from "../../types";
import { supabase } from "../../supabase/client";
import Consommations from "../../components/booking/Consommations";
import type { Conso } from "../../types";
import { useParams } from "react-router-dom";
import BookingDetailsInfos from "./BookingDetailsInfos";
import { FileText, Coffee } from "lucide-react";

const BookingDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [infos, setInfos] = useState<Booking>();
    const [consos, setConsos] = useState<Conso[]>([]);
    const [update, setUpdate] = useState(false);
    const [page, setPage] = useState('infos');

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

    const handleClick = (type: string) => {
        if (type === 'infos') {
            setPage('infos');
        } else {
            setPage('conso');
        }
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-4xl mb-8">Réservation de {infos?.firstname}</h1>
            <div>
                <nav>
                    <ul className="flex">
                        <li className={`h-12 px-5 flex place-content-center place-items-center cursor-pointer hover:bg-zinc-900 active:bg-zinc-800 ${page === 'infos' ? 'bg-zinc-800' : ''}`} onClick={() => handleClick('infos')}><FileText className="mr-2" /> Infos</li>
                        <li className={`h-12 px-5 flex place-content-center place-items-center cursor-pointer hover:bg-zinc-900 active:bg-zinc-800 ${page === 'conso' ? 'bg-zinc-800' : ''}`} onClick={() => handleClick('conso')}><Coffee className="mr-2"/>Conso</li>
                    </ul>
                    <hr className="border-gray-600 mb-5" />
                </nav>
            </div>
            {page === 'infos' ?
                <BookingDetailsInfos infos={infos} consos={consos} update={update} setUpdate={setUpdate} />
                : <Consommations update={update} setUpdate={setUpdate} />
            }
        </div>
    );
};

export default BookingDetails;