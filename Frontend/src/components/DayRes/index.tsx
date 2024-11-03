import { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Calendar, Zap } from "lucide-react";
import { format } from "date-fns";

const DayRes = () => {
    const [view, setView] = useState<"calendar" | "flash">("calendar");
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
    const [clickDate, setClickDate] = useState<Date | null>(null);
    const [HOURS, setHOURS] = useState<string[]>([]);
    const [reservations, setReservations] = useState<{ reservation_id: number, firstname: string, lastname: string | null, date: string }[]>([]);
    const [currentDate] = useState(new Date());

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const handleMouseEnter = (date: Date) => {
        if (!isMobile) {
            setHoveredDate(date);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setHoveredDate(null);
        }
    };

    const handleMouseClick = (date: Date) => {
        if (clickDate && format(clickDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")) {
            setClickDate(null);
        } else {
            setClickDate(date);
        }
    };

    const getResPerHour = () => {
        return reservations;
    };

    useEffect(() => {
        fetch('http://localhost:3010/reservations/today')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau lors de la récupération des réservations');
                }
                return response.json();
            })
            .then(data => setReservations(data || []))
            .catch(error => console.error('Erreur:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3010/reservations/today/hours')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau lors de la récupération du prénom');
                }
                return response.json();
            })
            .then(data => setHOURS(data.date || []))
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
                                    className="grid grid-cols-7 gap-2 w-full"
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    key="calendar"
                                    layout
                                >
                                    {HOURS.map((date) => (
                                        <motion.div
                                            layout
                                            key={date}
                                            className="flex items-center justify-center w-full"
                                        >
                                            <span className="font-medium text-sm text-white/70">
                                                {date}
                                            </span>
                                        </motion.div>
                                    ))}
                                    {Array.from({ length: 7 }, (_, i) => i).map((day) => {
                                        return (
                                            <motion.div layout className="w-full relative" key={day}>
                                                <motion.button
                                                    className="flex items-center justify-center w-full h-[59px] rounded-lg bg-zinc-700/30 cursor-pointer duration-300 transition-opacity"
                                                    onMouseEnter={() => handleMouseEnter(currentDate)}
                                                    onMouseLeave={handleMouseLeave}
                                                    onClick={() => handleMouseClick(currentDate)}
                                                    style={{
                                                        opacity:
                                                            hoveredDate &&
                                                                format(hoveredDate, "yyyy-MM-dd") !==
                                                                format(currentDate, "yyyy-MM-dd")
                                                                ? 0.3
                                                                : "",
                                                    }}
                                                >
                                                    <span className="font-semibold text-lg text-white">
                                                        {format(currentDate, "d")}
                                                    </span>
                                                </motion.button>
                                                <AnimatePresence>
                                                    {hoveredDate &&
                                                        format(hoveredDate, "yyyy-MM-dd") ===
                                                        format(currentDate, "yyyy-MM-dd") &&
                                                        getResPerHour().length > 0 && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: 10 }}
                                                                transition={{ duration: 0.2 }}
                                                                key={`tooltip-${day}`}
                                                            >
                                                                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-10 w-96 flex flex-col items-center justify-center gap-2 border border-[#1e1e1e] rounded-xl p-4 bg-[#242424]">
                                                                    <div className="w-full flex items-center justify-between mb-2">
                                                                        <div className="flex items-center gap-2">
                                                                            <div
                                                                                className="flex items-center justify-center size-7 rounded bg-zinc-700/30"
                                                                            >
                                                                                <span className="font-medium text-sm text-white">
                                                                                    {format(currentDate, "d")}
                                                                                </span>
                                                                            </div>
                                                                            <span className="font-medium text-sm text-white">
                                                                                {format(currentDate, "iiii")}
                                                                            </span>
                                                                            <span className="font-medium text-xs text-white/70 block mt-0.5">
                                                                                {format(currentDate, "MMMM d")}
                                                                            </span>
                                                                        </div>
                                                                        <span className="text-white/40 text-sm">
                                                                            {getResPerHour().length} Task
                                                                            {getResPerHour().length > 1 && "s"}
                                                                        </span>
                                                                    </div>
                                                                    {getResPerHour().map((res, index) => (
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
                                                                            <p className="text-white font-semibold text-xl">
                                                                                {res.firstname}
                                                                            </p>
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
                                                            </motion.div>
                                                        )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                    <AnimatePresence>
                                        {clickDate && (
                                            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-2 w-96 flex flex-col items-center justify-center gap-2 border border-[#1e1e1e] rounded-xl p-4 bg-[#242424]">
                                                <div className="w-full flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="flex items-center justify-center size-7 rounded bg-zinc-700/30"
                                                        >
                                                            <span className="font-medium text-sm text-white">
                                                                {format(currentDate, "d")}
                                                            </span>
                                                        </div>
                                                        <span className="font-medium text-sm text-white">
                                                            {format(currentDate, "iiii")}
                                                        </span>
                                                        <span className="font-medium text-xs text-white/70 block mt-0.5">
                                                            {format(currentDate, "MMMM d")}
                                                        </span>
                                                    </div>
                                                    <span className="text-white/40 text-sm">
                                                        {getResPerHour.length} Task
                                                        {getResPerHour.length > 1 && "s"}
                                                    </span>
                                                </div>
                                                {getResPerHour().map((res, index) => (
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
                                                        <p className="text-white font-semibold text-xl">
                                                            {res.firstname}
                                                        </p>
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
                </motion.div>
            </LayoutGroup>
        </main>
    );
}

export default DayRes;