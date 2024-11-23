interface BookingInfosProps {
    nbr_pers: number;
    type: string;
    activity_id: number;
    quantity: number;
}

const BookingInfos = ({ nbr_pers, type, activity_id, quantity }: BookingInfosProps) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://api.thimotefetu.fr/bookings/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Réservation effectuée');
            } else {
                console.error('Error:', response);
                alert('Erreur lors de la réservation');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const actualDate = new Date().toISOString().slice(0, 16);

    return (
        <form className="flex flex-col w-full max-w-sm p-3" onSubmit={handleSubmit}>
            <label htmlFor="firstname" className="text-xl">Prénom :</label>
            <input className="w-full rounded-full bg-black p-3 text-lg text-white transition-transform duration-300 active:scale-95 mb-5" type="text" name="firstname" required />
            <label htmlFor="date" className="text-xl">Date :</label>
            <input className="w-full rounded-full bg-black p-3 text-lg text-white transition-transform duration-300 active:scale-95 mb-5" type="datetime-local" name="date" value={actualDate} required />
            <input type="hidden" name="nbr_pers" value={nbr_pers} />
            <input type="hidden" name="type" value={type} />
            <input type="hidden" name="activity_id" value={activity_id} />
            <input type="hidden" name="quantity" value={quantity} />
            <button className="w-full rounded-full bg-black p-3 text-lg text-white transition-transform duration-300 active:scale-95">
                Réserver
            </button>
        </form>
    )
};

export default BookingInfos;