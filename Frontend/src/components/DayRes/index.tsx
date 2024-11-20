import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO } from "date-fns";
import Header from "./Header";
import ResList from "./ResList";
import gridCols from "./gridCols";


const DayRes = () => {
    const [view, setView] = useState<"grid" | "list" | "calendar">("grid");
    const [clickHours, setClickHours] = useState<string | null>(null);
    const [hours, setHours] = useState<{ [key: string]: number }>({});
    const [reservations, setReservations] = useState<{ reservation_id: number, firstname: string, lastname: string | null, nbr_pers: number, group_type: string, date: string }[]>([]);
    const [filteredReservations, setFilteredReservations] = useState<{ reservation_id: number, firstname: string, lastname: string | null, nbr_pers: number, group_type: string, date: string }[]>([]);
    const capitalizeWords = (str: string) => {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    };

    const [currentDate] = useState(capitalizeWords(new Date().toLocaleDateString("fr-FR", { timeZone: "Europe/Brussels", weekday: "long", month: "long", day: "numeric" })));

    const filterReservations = (hour: string) => {
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
            setClickHours(hour);
            setFilteredReservations(filterReservations(hour));
        }
    };

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
            <motion.div
                layout
                className="border border-[#1e1e1e] p-6 max-w-lg min-w-full flex flex-col items-center gap-2"
                style={{
                    borderRadius: 24,
                }}
            >
                <Header currentDate={currentDate} view={view} setView={setView} />
                <motion.div
                    layout
                    className="w-full flex flex-col items-center justify-center"
                >
                    {view === "grid" && (
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                className={`grid ${gridCols(Object.keys(hours).length)} gap-2 w-full`}
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                key="grid"
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
                                            className="flex items-center justify-center w-full h-[59px] rounded-lg bg-zinc-700/30 cursor-pointer duration-300 transition-opacity mb-2"
                                            onClick={() => handleMouseClick(hour)}
                                        >
                                            <span className="font-semibold text-lg text-white">
                                                {hours[hour]}
                                            </span>
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </motion.div>
                            <ResList view={view} clickHours={clickHours} reservations={filteredReservations} setReservations={setReservations} />
                        </AnimatePresence>
                    )}
                </motion.div>
                <ResList view={view} reservations={reservations} setReservations={setReservations} />
            </motion.div>
        </main>
    );
}

export default DayRes;