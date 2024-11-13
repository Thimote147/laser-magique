const InfosRes = () => {
    return (
        <form className="flex flex-col w-full max-w-sm p-3">
            <label htmlFor="firstname">Prénom :</label>
            <input type="text" name="firstname" required />
            <label htmlFor="date">Date :</label>
            <input type="datetime-local" name="date" required />
            <button className="w-full rounded-full bg-black p-3 text-lg text-white transition-transform duration-300 active:scale-95">
                Réserver
            </button>
        </form>
    )
};

export default InfosRes;