import { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Calendar, Zap } from "lucide-react";
import { format, parseISO } from "date-fns";

const DayRes = () => {
    const [view, setView] = useState<"calendar" | "flash">("calendar");
    const [clickHours, setClickHours] = useState<string | null>(null);
    const [hours, setHours] = useState<{ [key: string]: number }>({});
    const [reservations, setReservations] = useState<{ reservation_id: number, firstname: string, lastname: string | null, nbr_pers: number, group_type: string, date: string }[]>([]);
    const [filteredReservations, setFilteredReservations] = useState<{ reservation_id: number, firstname: string, lastname: string | null, nbr_pers: number, group_type: string, date: string }[]>([]);
    const capitalizeWords = (str: string) => {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    };

    const [currentDate] = useState(capitalizeWords(new Date().toLocaleDateString("fr-FR", { timeZone: "Europe/Brussels", weekday: "long", month: "long", day: "numeric" })));

    function filterReservations(hour: string) {
        return reservations.filter((res) => {
            const resHour = format(parseISO(res.date), "HH:mm");
            return resHour === hour;
        });
    }

    const handleMouseClick = (hour: string) => {
        if (clickHours === hour) {
            setClickHours(null);
            setFilteredReservations([]);
        } else {
            console.log(currentDate);
            setClickHours(hour);
            setFilteredReservations(filterReservations(hour));
        }
    };

    const gridCols = () => {
        switch (Object.keys(hours).length) {
            case 1: return "grid-cols-1";
            case 2: return "grid-cols-2";
            case 3: return "grid-cols-3";
            case 4: return "grid-cols-4";
            case 5: return "grid-cols-5";
            case 6: return "grid-cols-6";
            case 7: return "grid-cols-7";
            case 8: return "grid-cols-8";
            case 9: return "grid-cols-9";
            case 10: return "grid-cols-10";
            default: return "";
        }
    }

    useEffect(() => {
        fetch('http://localhost:3010/reservations/today')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau lors de la récupération des réservations');
                }
                return response.json();
            })
            .then(data => {
                const reservations = data.map((reservation: {
                    reservation_id: number, firstname: string, lastname: string | null, nbr_pers: number, group_type: string; date: string
                }) => ({
                    reservation_id: reservation.reservation_id,
                    firstname: reservation.firstname,
                    lastname: reservation.lastname,
                    nbr_pers: reservation.nbr_pers,
                    group_type: reservation.group_type,
                    date: reservation.date
                }));
                setReservations(reservations);
            })
            .catch(error => console.error('Erreur:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3010/reservations/today/hours')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau lors de la récupération des heures');
                }
                return response.json();
            })
            .then(data => {
                const formattedHours = data.reduce((acc: { [key: string]: number }, curr: { date: string, nbr_pers: number }) => {
                    const date = format(parseISO(curr.date), 'HH:mm');
                    acc[date] = curr.nbr_pers;
                    return acc;
                }, {} as { [key: string]: number });
                setHours(formattedHours);
            })
            .catch(error => console.error('Erreur:', error));
    }, []);

    return (
        <main className="relative w-full h-full flex items-start md:items-center justify-center px-4 py-10 bg-[#242424]">
            <LayoutGroup>
                <motion.div
                    layout
                    className="border border-[#1e1e1e] p-6 max-w-lg min-w-full flex flex-col items-center gap-6"
                    style={{
                        borderRadius: 24,
                    }}
                >
                    <motion.div
                        layout
                        className="flex w-full items-center justify-between gap-2"
                    >
                        <div className="flex flex-col items-start gap-1">
                            <h1 className="text-white font-semibold text-xl">
                                Réservation du jour
                            </h1>
                            <p className="text-white/50 text-sm">
                                Toutes les réservations sont regroupées par tranche horaire
                            </p>
                        </div>
                        <div className="flex items-center gap-1 border border-zinc-700/50 rounded-xl p-1">
                            <motion.button
                                className="relative rounded-lg p-1 cursor-pointer"
                                onClick={() => setView("calendar")}
                            >
                                <Calendar
                                    className="z-[2] relative transition-colors duration-300"
                                    size={22}
                                    color={view === "calendar" ? "#fff" : "currentColor"}
                                />
                                {view === "calendar" && (
                                    <motion.div
                                        layoutId="view-indicator"
                                        className="bg-zinc-700/30 absolute rounded-lg size-full inset-0"
                                    ></motion.div>
                                )}
                            </motion.button>
                            <motion.button
                                className="relative rounded-lg p-1 cursor-pointer"
                                onClick={() => setView("flash")}
                            >
                                <Zap
                                    className="z-[2] relative transition-colors duration-300"
                                    size={22}
                                    color={view === "flash" ? "#fff" : "currentColor"}
                                />
                                {view === "flash" && (
                                    <motion.div
                                        layoutId="view-indicator"
                                        className="bg-zinc-700/30 absolute rounded-lg size-full inset-0"
                                    ></motion.div>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                    <motion.div
                        layout
                        className="w-full flex items-center justify-center"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {view === "calendar" && (
                                <motion.div
                                    className={`grid ${gridCols()} gap-2 w-full`}
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    key="calendar"
                                    layout
                                >
                                    {Object.keys(hours).map((hour) => (
                                        <motion.div
                                            layout
                                            key={hour}
                                            className="flex items-center justify-center w-full"
                                        >
                                            <span className="font-medium text-sm text-white/70">
                                                {hour}
                                            </span>
                                        </motion.div>
                                    ))}
                                    {Object.keys(hours).map((hour) => (
                                        <motion.div layout className="w-full relative" key={hour}>
                                            <motion.button
                                                className="flex items-center justify-center w-full h-[59px] rounded-lg bg-zinc-700/30 cursor-pointer duration-300 transition-opacity"
                                                onClick={() => handleMouseClick(hour)}
                                            >
                                                <span className="font-semibold text-lg text-white">
                                                    {hours[hour]}
                                                </span>
                                            </motion.button>
                                        </motion.div>
                                    ))}
                                    <AnimatePresence>
                                        {clickHours && (
                                            <div className="absolute top-[125%] mt-2 left-1/2 -translate-x-1/2 z-2 w-96 flex flex-col items-center justify-center gap-2 border border-[#1e1e1e] rounded-xl p-4 bg-[#242424]">
                                                <div className="w-full flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="flex items-center justify-center size-7 rounded bg-zinc-700/30"
                                                        >
                                                            <span className="font-medium text-sm text-white">
                                                                {currentDate.split(" ")[1]}
                                                            </span>
                                                        </div>
                                                        <span className="font-medium text-sm text-white">
                                                            {currentDate.split(" ")[0]}
                                                        </span>
                                                        <span className="font-medium text-xs text-white/70 block mt-0.5">
                                                            {currentDate.split(" ")[1] + " " + currentDate.split(" ")[2]}
                                                        </span>
                                                    </div>
                                                    <span className="text-white/40 text-sm">
                                                        {filteredReservations.length} réservation
                                                        {filteredReservations.length > 1 && "s"}
                                                    </span>
                                                </div>
                                                {filteredReservations.map((res, index) => (
                                                    <motion.div
                                                        key={res.reservation_id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                            transition: { delay: index * 0.05 },
                                                        }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="w-full flex items-center justify-between gap-2"
                                                    >
                                                        <div>
                                                            <p className="text-white font-semibold text-xl">
                                                                {res.firstname}
                                                            </p>
                                                            <span className="text-xs">{res.group_type} de {res.nbr_pers} personnes</span>
                                                        </div>
                                                        <button
                                                            className="text-white/50 flex font-medium capitalize items-center justify-center text-sm border-2 rounded-lg py-1.5 px-3 w-20 text-center"
                                                            style={{
                                                                backgroundColor: "20",
                                                            }}
                                                        >
                                                            activité
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    <AnimatePresence>
                        {view === "flash" && (
                            reservations.map((res, index) => (
                                <motion.div key={index}>
                                    <p className="text-white font-semibold text-xl">
                                        {res.firstname}
                                    </p>
                                    <span className="text-xs">{res.group_type} de {res.nbr_pers} personnes</span>
                                </motion.div>
                            )))}
                    </AnimatePresence>
                </motion.div>
            </LayoutGroup>
        </main>
    );
}

export default DayRes;