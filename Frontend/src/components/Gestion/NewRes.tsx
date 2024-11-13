import { AnimatePresence, motion } from "framer-motion";
import {
    Gamepad2,
    Goal,
    LandPlot,
    NotebookPen,
    Plus,
    X,
} from "lucide-react";
import { useState } from "react";
import Pricing from "./Pricing";

const NewRes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGameChosen, setIsGameChosen] = useState(false);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return (
        <div className="absolute right-3 bottom-3">
            <motion.button
                className="bg-[#fbfbf9] relative border border-[#efefef] text-[#666664] flex items-center justify-center gap-2 py-4 px-8"
                style={{
                    borderRadius: 50,
                }}
                onClick={() => setIsModalOpen(true)}
                layoutId="modal"
            >
                <motion.div layoutId="plus">
                    <Plus size={24} />
                </motion.div>
                {isMobile ? null : (
                    <motion.span className="font-medium" layoutId="title">
                        Ajouter
                    </motion.span>
                )}
            </motion.button>
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="absolute flex items-center justify-center right-0 bottom-0"
                    >
                        <motion.div
                            className="bg-[#fbfbf9] w-[400px] border-2 border-[#efefef] text-[#666664] flex flex-col items-center justify-center gap-2 overflow-hidden"
                            style={{
                                borderRadius: 24,
                            }}
                            layoutId="modal"
                        >
                            <div className="relative w-full flex items-center justify-between px-6 pt-4 pb-2">
                                <motion.div className="absolute top-0 left-0" layoutId="plus"
                                    style={{
                                        opacity: 0,
                                    }}
                                >
                                    <Plus size={24} />
                                </motion.div>
                                <motion.span className="font-medium" layoutId="title">
                                    Ajouter une réservation
                                </motion.span>
                                <motion.button
                                    className="flex items-center justify-center bg-[#c0bfba] text-white p-1 size-7 rounded-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsGameChosen(false)
                                        setIsModalOpen(false);
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.05 } }}
                                >
                                    <X size={24} />
                                </motion.button>
                            </div>
                            <motion.div
                                className="w-full bg-white px-6 py-6 flex flex-col gap-4 border-t"
                                style={{
                                    borderTopLeftRadius: 24,
                                    borderTopRightRadius: 24,
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            >
                                {ITEMS.map((item, itemIndex) => (
                                    <div key={itemIndex} className="w-full">
                                        <h3 className="font-bold text-lg mb-4">{item.type}</h3>
                                        <div className="flex gap-2">
                                            {item.elements.map(({ title, Icon }, index) => (
                                                <motion.button
                                                    key={index}
                                                    className="w-full flex flex-col items-center justify-between py-3 duration-300 transition-colors hover:bg-[#f8f8f3] rounded-2xl"
                                                    onClick={() => {
                                                        setIsGameChosen(true);
                                                    }}
                                                >
                                                    <Icon />
                                                    <span className="font-medium text-[#63615a]">
                                                        {title}
                                                    </span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isGameChosen && (
                    <motion.div
                        className="w-full px-6 py-6 flex flex-col gap-4 border-t"
                        style={{
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.05 } }}
                    >
                        <Pricing />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface ItemProps {
    type: string;
    elements: {
        title: string;
        Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    }[];
}

const ITEMS: ItemProps[] = [
    {
        type: "Groupe",
        elements: [
            {
                title: "Laser Game",
                Icon: Goal,
            },
            {
                title: "Réalité Virtuelle",
                Icon: Gamepad2,
            },
            {
                title: "Cyber Trike",
                Icon: NotebookPen,
            }],
    },
    {
        type: "Anniversaire",
        elements: [
            {
                title: "Laser Game",
                Icon: Goal,
            },
            {
                title: "Trio Pack",
                Icon: LandPlot,
            }],
    },
    {
        type: "Famille",
        elements: [
            {
                title: "Trio Pack",
                Icon: LandPlot,
            }],
    }
];

export default NewRes;