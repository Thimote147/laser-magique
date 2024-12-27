import { useEffect, useState } from "react";
import { Booking } from "../../types";
import { toCapitalize } from "../../utils/functions";

const BookingDetails = () => {
    const [infos, setInfos] = useState<Booking>();

    useEffect(() => {
        const id = window.location.pathname.split("/").pop();
        fetch(`http://localhost:3010/bookings/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setInfos(data);
            });
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-4xl mb-8">Réservation de {infos?.firstname}</h1>
            <section>
                <div className="bg-white/5 p-5 max-w-xl">
                    <h2 className="text-2xl">Informations</h2>
                    <p>Prénom: {infos?.firstname}</p>
                    {infos?.lastname.trim() && <p>Nom: {infos.lastname}</p>}
                    {infos?.email.trim() && <p>Email: {infos.email}</p>}
                    {infos?.phone.trim() && <p>Téléphone: {infos.phone}</p>}
                    <p>Nombre de personnes: {infos?.nbr_pers}</p>
                    <p>Date: {infos?.date ? toCapitalize(new Date(infos.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: "2-digit", minute:"2-digit" })) : "Erreur de date"}</p>
                    <p>{infos?.deposit ? "Acompte de " + infos.deposit +"€" : "Pas d'acompte"}</p>
                    <p>Restant à payer : {infos?.amount}€</p>
                    <p>Total à payer : {infos?.total}€</p>
                </div>
            </section>
        </div>
    );
};

export default BookingDetails;