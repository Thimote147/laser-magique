import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import type { Conso } from "../../types";

const Conso = () => {
    const [stockConso, setStockConso] = useState<Conso[]>([]);
    const [consos, setConsos] = useState<Conso[]>([]);
    const [update, setUpdate] = useState(false);

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

        const fetchConsos = async () => {
            const { data, error } = await supabase
                .from('conso')
                .select('*')
                .order('name');

            if (error) {
                console.error('Error fetching conso', error);
            } else {
                setConsos(data);
            }
        };

        fetchStockConso();
        fetchConsos();
    }, [update]);

    const handleClick = (conso_id: number) => {
        const fetchBooking = async () => {
            const { error } = await supabase.rpc('insert_conso', { conso_id });

            if (error) {
                console.error('Error inserting conso', error);
            } else {
                setUpdate(!update);
            }
        }

        fetchBooking();
    }

    return (
        <div>
            <h3 className="text-2xl">Consommations :</h3>
            <div>
                {consos.map(({ conso_id, name, price }) => (
                    <div key={conso_id} className="flex justify-between">
                        <p>{name}</p>
                        <p>{price}€</p>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-5">
                {stockConso.map(({ conso_id, name }) => (
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 w-40 h-12" onClick={() => handleClick(conso_id)}>{name}</button>
                ))}
            </div>
        </div>
    );
}

export default Conso;