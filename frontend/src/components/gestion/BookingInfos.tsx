interface BookingInfosProps {

    nbr_pers: number;

    type: string;

    activity_id: number;

    quantity: number;

    setIsGameChosen: React.Dispatch<React.SetStateAction<boolean>>;

    setIsDataNeeded: React.Dispatch<React.SetStateAction<boolean>>;

    setNbr_parties: React.Dispatch<React.SetStateAction<number>>;

    total: number;
};

const BookingInfos = ({ nbr_pers, type, activity_id, quantity, setIsGameChosen, setIsDataNeeded, setNbr_parties, total }: BookingInfosProps) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        data.lastname = formData.get('lastname') || '';
        data.phone = formData.get('phone') || '';
        data.email = formData.get('email') || '';

        try {
            const response = await fetch('http://localhost:3010/bookings/create', {
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

        setIsGameChosen(false);
        setIsDataNeeded(false);
        setNbr_parties(0);        
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
            <input className="w-full rounded-full bg-white/5 p-3 text-lg text-white transition-transform duration-300 active:scale-95 mb-5" type="datetime-local" name="date" value={actualDate} required />
            <input type="hidden" name="participants" value={nbr_pers} />
            <input type="hidden" name="type" value={type} />
            <input type="hidden" name="activity_id" value={activity_id} />
            <input type="hidden" name="quantity" value={quantity} />
            <input type="hidden" name="total" value={total} />
            <button className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-lg text-white transition-transform duration-300 active:scale-95">
                Réserver
            </button>
        </form>
    )
};

export default BookingInfos;