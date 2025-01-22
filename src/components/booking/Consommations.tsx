import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import type { Conso } from "../../types";
import { useParams } from "react-router-dom";

interface ConsommationsProps {
    update: boolean;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const Consommations = ({ update, setUpdate }: ConsommationsProps) => {
    const { id } = useParams<{ id: string }>();
    const [stockConso, setStockConso] = useState<Conso[]>([]);

    useEffect(() => {
        const fetchStockConso = async () => {
            const { data, error } = await supabase
                .from('food')
                .select('*')
                .order('name');

            if (error) {
                console.error('Error fetching conso', error);
            } else {
                data.forEach(item => {
                    item.conso_id = item.food_id;
                    delete item.food_id;
                });
                setStockConso(data);
            }
        };



        fetchStockConso();
    }, [update]);

    const handleClickAdd = (conso_id: number) => {
        const fetchBooking = async () => {
            const { error } = await supabase.rpc('insert_conso', { actual_booking_id: id, actual_food_id: conso_id });

            if (error) {
                console.error('Error inserting conso', error);
            } else {
                setUpdate(!update);
            }
        }

        fetchBooking();
    }

    return (
        <div className="flex justify-center">
            <div className="flex flex-wrap gap-5 max-w-4xl">
                {stockConso.map(({ conso_id, name }) => (
                    <button key={conso_id} className="bg-gradient-to-r from-purple-500 to-pink-500 w-40 h-12 font-bold" onClick={() => handleClickAdd(conso_id)}>{name}</button>
                ))}
            </div>
        </div>
    );
}

export default Consommations;