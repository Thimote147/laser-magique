import { useEffect, useState } from "react";

interface Reservation {
    reservation_id: number;
    firstname: string;
    lastname: string;
    nbr_pers: number;
    group_type: string;
    date: string;
}

const Reservation = () => {
    const [reservation, setReservation] = useState<Reservation | null>(null);

    useEffect(() => {
        const url = new URL(window.location.href);
        const id = url.pathname.split('/').pop();

        fetch(`http://localhost:3010/reservations/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau lors de la récupération des détails de la réservation');
                }
                return response.json();
            })
            .then(data => {
                setReservation(data);
                console.log(data);
            })
            .catch(error => console.error('Erreur:', error));
    }, []);

    if (!reservation) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Réservation n°{reservation.reservation_id}</h1>
            <p>Prénom: {reservation.firstname}</p>
            <p>Nom: {reservation.lastname}</p>
            <p>Nombre de personnes: {reservation.nbr_pers}</p>
            <p>Type de groupe: {reservation.group_type}</p>
            <p>Date: {reservation.date}</p>
        </div>
    );
};

export default Reservation;