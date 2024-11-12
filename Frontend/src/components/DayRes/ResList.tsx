import { AnimatePresence, motion } from "framer-motion";
import ResButton from "./ResButton";
import { format, parseISO } from "date-fns";

interface ResListProps {
    view: "calendar" | "flash";
    reservations: { reservation_id: number; firstname: string; lastname: string | null; nbr_pers: number; group_type: string; date: string; }[];
    setReservations: React.Dispatch<React.SetStateAction<{ reservation_id: number; firstname: string; lastname: string | null; nbr_pers: number; group_type: string; date: string; }[]>>;
}

const ResList = ({ view, reservations, setReservations }: ResListProps) => {
    const handleDeleteReservation = (id: number) => {
        // Implement delete functionality with API call
        setReservations((prev) => prev.filter((res) => res.reservation_id !== id));
    };

    const handleEditReservation = (id: number) => {
        // Implement edit functionality
        console.log("Edit reservation with ID:", id);
    };

    return (
        <AnimatePresence>
            {view === "flash" && (
                reservations.map((res, index) => (
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
                        className="w-full flex items-center justify-between border border-[#454545] rounded-lg p-2"
                    >
                        <div className="w-full flex flex-col gap-3 ml-1">
                            <p className="text-white font-semibold text-xl">{res.firstname}</p>
                            <span className="text-xs">{format(parseISO(res.date), "HH:mm")}</span>
                            <span className="text-xs">{res.group_type} de {res.nbr_pers} personnes</span>
                        </div>
                        <div className="w-full flex flex-col items-end">
                            <ResButton res_id={res.reservation_id} name="Activité" style="text-white/50 border-white" />
                            <section className="flex">
                                <ResButton res_id={res.reservation_id} name="Modifier" style="text-white hover:bg-zinc-600 border-white" handle={handleEditReservation} />
                                <ResButton res_id={res.reservation_id} name="Supprimer" style="text-red-500 hover:bg-red-700 border-red-500" handle={handleDeleteReservation} />
                            </section>
                        </div>
                    </motion.div>
                )))}
        </AnimatePresence>
    )
};

export default ResList;