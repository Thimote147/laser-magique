import { motion } from "framer-motion";
import HeaderMenu from "./HeaderMenu";

interface HeaderProps {
    currentDate: string;
    view: "calendar" | "flash";
    setView: React.Dispatch<React.SetStateAction<"calendar" | "flash">>;
}

const Header = ({ currentDate, view, setView }: HeaderProps) => {
    return (
        <motion.div
            layout
            className="flex w-full items-center justify-between gap-2"
        >
            <div className="flex flex-col items-start gap-1">
                <h1 className="text-white font-semibold text-xl">
                    Réservation du jour ({currentDate})
                </h1>
                <p className="text-white/50 text-sm">
                    Toutes les réservations sont regroupées par tranche horaire
                </p>
            </div>
            <HeaderMenu view={view} setView={setView}/>
        </motion.div>
    )
};

export default Header;