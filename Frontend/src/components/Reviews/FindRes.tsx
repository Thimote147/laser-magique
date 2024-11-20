const FindRes = () => {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // fetch(`http://localhost:3001/api/reservation/${reservation}`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         if (data) {
        //             history.push(`/reviews/${reservation}`);
        //         } else {
        //             alert('Réservation introuvable');
        //         }
        //     });
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl text-center">Afin de pouvoir nous laisser un avis, veuillez trouver votre réservation</h1>
            <form className="flex flex-col border rounded-lg p-2" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom de la réservation"
                    // onChange={(e) => setReservation(e.target.value)}
                    className="border border-gray-400 p-2 rounded-md m-4"
                />
                <input
                    type="date"
                    value={new Date().toISOString().split('T')[0]}
                    // onChange={(e) => setReservation(e.target.value)}
                    className="border border-gray-400 p-2 rounded-md m-4"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md m-4"
                >
                    Rechercher
                </button>
            </form>
        </div>
    );
};

export default FindRes;