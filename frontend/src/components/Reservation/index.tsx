import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";

interface Reservation {
    reservation_id: number;
    firstname: string;
    lastname: string;
    nbr_pers: number;
    group_type: string;
    date: string;
}

interface Food {
    food_id: number;
    name: string;
    price: number;
    quantity: number;
}

const Reservation = () => {
    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [food, setFood] = useState<Food[]>([]);

    useEffect(() => {
        const url = new URL(window.location.href);
        const id = url.pathname.split('/').pop();

        fetch(`https://api.thimotefetu.fr/reservations/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau lors de la récupération des détails de la réservation');
                }
                return response.json();
            })
            .then(data => {
                setReservation(data);
            })
            .catch(error => console.error('Erreur:', error));
    }, []);

    useEffect(() => {
        fetch("https://api.thimotefetu.fr/food")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau lors de la récupération des détails de la réservation');
                }
                return response.json();
            })
            .then(data => {
                setFood(data);
            })
            .catch(error => console.error('Erreur:', error));
    }, []);


    if (!reservation || !food) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <div>
                <h1 className="text-4xl">Réservation de {reservation.firstname}</h1>

                <div>
                    <h2 className="text-2xl">Informations :</h2>
                    <p>Heure : {format(parseISO(reservation.date), "HH:mm")}</p>
                    <p>Nombre de personnes : {reservation.nbr_pers}</p>
                    <p>Activité : { }</p>
                </div>

                <div>
                    <h2 className="text-2xl">Consommation : </h2>
                    <div className="flex flex-wrap justify-center">
                        {food.map((item) => (
                            <button className="min-w-40 min-h-10 border rounded-lg m-5">{item.name}</button>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl">Parties : </h2>
                </div>
            </div>
        </div>
    );
};

export default Reservation;