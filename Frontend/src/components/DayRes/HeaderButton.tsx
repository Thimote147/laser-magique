import { motion } from "framer-motion";
import { Grid, List } from "lucide-react";

interface HeaderButtonProps {
    view: "calendar" | "flash";
    setView: React.Dispatch<React.SetStateAction<"calendar" | "flash">>;
    onClick: "calendar" | "flash";
}

const HeaderButton = ({ view, setView, onClick }: HeaderButtonProps) => {
    return (
        <motion.button
            className="relative rounded-lg p-1 cursor-pointer"
            onClick={() => setView(onClick)}
        >
            {onClick === "calendar" ? (
                <Grid
                    className="z-[2] relative transition-colors duration-300"
                    size={22}
                    color={view === onClick ? "#fff" : "currentColor"}
                />
            ) : (
                <List
                    className="z-[2] relative transition-colors duration-300"
                    size={22}
                    color={view === "flash" ? "#fff" : "currentColor"}
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