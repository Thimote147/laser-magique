interface InfosResProps {
    nbr_pers: number;
    type: string;
}

const InfosRes = ({ nbr_pers, type }: InfosResProps) => {


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const response = await fetch('http://localhost:3010/reservations/add', {
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

    return (
        <form className="flex flex-col w-full max-w-sm p-3" onSubmit={handleSubmit}>
            <label htmlFor="firstname">Prénom :</label>
            <input type="text" name="firstname" required />
            <label htmlFor="date">Date :</label>
            <input type="datetime-local" name="date" required />
            <input type="hidden" name="nbr_pers" value={nbr_pers} />
            <input type="hidden" name="type" value={type} />
            <button className="w-full rounded-full bg-black p-3 text-lg text-white transition-transform duration-300 active:scale-95">
                Réserver
            </button>
        </form>
    )
};

export default InfosRes;