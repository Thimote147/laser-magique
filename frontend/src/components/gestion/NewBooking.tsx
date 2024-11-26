import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Activity } from "../../types";
import Pricing from "./Pricing";
import BookingInfos from "./BookingInfos";
import Counter from "./Counter";

const NewRes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGameChosen, setIsGameChosen] = useState(false);
    const [gameChosen, setGameChosen] = useState<Activity>();
    const [isDataNeeded, setIsDataNeeded] = useState(false);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [nbr_parties, setNbr_parties] = useState(0);
    const [count, setCount] = useState(0);
    const [type, setType] = useState('');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    useEffect(() => {
        if (nbr_parties > 0) {
            setIsDataNeeded(true);
        }
    }, [nbr_parties]);

    useEffect(() => {
        fetch('http://localhost:3010/activities')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau lors de la récupération des activités');
                }
                return response.json();
            })
            .then(data => {
                setActivities(data);
            })
            .catch(error => console.error('Erreur:', error));
    }
        , []);

    return (
        <div className="fixed right-3 bottom-3">
            <motion.button
                className="flex bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
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
                        className="absolute flex right-0 bottom-0"
                    >
                        <motion.div
                            className="bg-zinc-900 w-[400px] border-2 border-zinc-600 flex flex-col items-center justify-center gap-2 overflow-hidden"
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
                                    className="flex items-center justify-center bg-zinc-600 p-1 size-7 rounded-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsModalOpen(false);
                                        setIsGameChosen(false);
                                        setIsDataNeeded(false);
                                        setNbr_parties(0);
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.05 } }}
                                >
                                    <X size={24} />
                                </motion.button>
                            </div>
                            {(isModalOpen && !isGameChosen && !isDataNeeded) ? (
                                <motion.div
                                    className="w-full bg-white/5 px-6 py-6 flex flex-col gap-4 border-2 border-zinc-600"
                                    style={{
                                        borderTopLeftRadius: 24,
                                        borderTopRightRadius: 24,
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.05 } }}
                                >
                                    {Object.entries(activities).map(([key, activity]) => (
                                        <div key={key} className="w-full">
                                            <h3 className="font-bold text-lg mb-4">{key} :</h3>
                                            <div className="flex gap-2">
                                                {activity.map(({ activity_id, name, type, first_price, second_price, third_price, is_social_deal, min_player, max_player }: Activity, index: number) => (
                                                    <motion.button
                                                        key={index}
                                                        className="w-full flex flex-col items-center justify-center py-3 duration-300 transition-colors hover:bg-white/10 rounded-2xl"
                                                        onClick={() => {
                                                            setIsGameChosen(true);
                                                            setGameChosen({ activity_id, name, type, first_price, second_price, third_price, is_social_deal, min_player, max_player } as Activity);
                                                            setCount(min_player);
                                                            setType(type);
                                                        }}
                                                    >
                                                        {/* <Icon /> */}
                                                        <span className="font-medium">
                                                            {name}
                                                        </span>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            ) : (isGameChosen && !isDataNeeded) ? (
                                <AnimatePresence>
                                    <motion.div
                                        className="w-full p-2 flex flex-col gap-4"
                                        style={{
                                            borderTopLeftRadius: 24,
                                            borderTopRightRadius: 24,
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, transition: { duration: 0.05 } }}
                                    >
                                        {gameChosen && (
                                            <>
                                                <Counter count={count} setCount={setCount} min_player={gameChosen.min_player} max_player={gameChosen.max_player} />
                                                <Pricing count={count} gameChosen={gameChosen} setNbr_parties={setNbr_parties} />
                                            </>

                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            ) : (
                                <>
                                    {gameChosen &&
                                        <BookingInfos nbr_pers={count} type={type} activity_id={gameChosen.activity_id} quantity={nbr_parties} />
                                    }
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NewRes;