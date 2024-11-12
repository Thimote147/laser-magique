import { motion } from "framer-motion";
import { Calendar, Grid, List } from "lucide-react";

interface HeaderButtonProps {
    view: "grid" | "list" | "calendar";
    setView: React.Dispatch<React.SetStateAction<"grid" | "list" | "calendar">>;
    onClick: "grid" | "list" | "calendar";
}

const HeaderButton = ({ view, setView, onClick }: HeaderButtonProps) => {
    return (
        <motion.button
            className="relative rounded-lg p-1 cursor-pointer"
            onClick={() => setView(onClick)}
        >
            {onClick === "grid" ? (
                <Grid
                    className="z-[2] relative transition-colors duration-300"
                    size={22}
                    color={view === onClick ? "#fff" : "currentColor"}
                />
            ) : onClick === "list" ? (
                <List
                    className="z-[2] relative transition-colors duration-300"
                    size={22}
                    color={view === onClick ? "#fff" : "currentColor"}
                />
            ) : (
                <Calendar
                    className="z-[2] relative transition-colors duration-300"
                    size={22}
                    color={view === onClick ? "#fff" : "currentColor"}
                />
            )}
            {view === onClick && (
                <motion.div
                    layoutId="view-indicator"
                    className="bg-zinc-700/30 absolute rounded-lg size-full inset-0"
                ></motion.div>
            )}
        </motion.button>
    )
};

export default HeaderButton;