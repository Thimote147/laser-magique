import { useEffect, useState } from "react";
import { User } from "../../types/user";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Euro, Plus, X, Trash, Edit } from "lucide-react";
import { useSwipeable } from 'react-swipeable';
import { toCapitalize, toCurrency, toHours, toMinutes } from "../../utils/functions";
import { useAuth } from "../../hooks/useAuth";
import { addHour, deleteHour } from "../../components/profile/hours";
import { Button } from "../../components/ui/Button";

const formatDate = (date: Date): string => {
    return date.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(' ', 'T').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1');
};

const SwipeableDiv = ({ hour, user, currentTime, onSwipe }: { hour: { hour_id: number, date: string, beginning: string, ending?: string, nbr_hours?: string, amount?: number }, user: User, currentTime: string, onSwipe: (id: number) => void }) => {
    const [deltaX, setDeltaX] = useState(0);

    const handlers = useSwipeable({
        onSwiping: (eventData) => {
            if (eventData.deltaX < 0) {
                setDeltaX(Math.max(eventData.deltaX, -35));
            }
        },
        onSwipedLeft: (eventData) => {
            if (Math.abs(eventData.deltaX) > 100) {
                onSwipe(hour.hour_id);
            }
            setDeltaX(0);
        }
    });

    return (
        <div className="relative m-2">
            <div className="absolute inset-1 flex items-center justify-end bg-red-500 rounded-lg px-1 py-2">
                <Trash className="text-white" />
            </div>
            <motion.div
                {...handlers}
                style={{ x: deltaX }}
                className={`relative flex justify-between gap-10 ${hour.ending ? "bg-zinc-900 hover:bg-zinc-800" : "bg-gradient-to-br from-purple-500 to-pink-500"} rounded-lg px-5 py-2`}
            >
                <div className="w-[200px]">
                    <p className="text-lg">{toCapitalize(new Date(hour.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }))}</p>
                    <p>{hour.beginning} - {hour.ending || currentTime.split('T')[1]}</p>
                </div>
                <div className="w-[50px]">
                    <p>{hour.nbr_hours?.replace(":", "h") || toHours(toMinutes(currentTime.split('T')[1]) - toMinutes(hour.beginning))}</p>
                    <p>{hour.amount?.toFixed(2) !== "0.00" ? hour.amount?.toFixed(2) : toCurrency(toHours(toMinutes(currentTime.split('T')[1]) - toMinutes(hour.beginning)), user.hourly_rate ?? 0)}€</p>
                </div>
            </motion.div>
        </div>
    );
};

const ProfilePage = () => {
    const { user, refreshUser, loading } = useAuth();
    const [monthAmount, setMonthAmount] = useState(0);
    const [hoursCount, setHoursCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const [currentTime, setCurrentTime] = useState<string>(formatDate(new Date()));
    const [workingHour, setWorkingHour] = useState<string>(currentTime);
    const [newHour, setNewHour] = useState<boolean>(!user?.hours.length || (user?.hours[0]?.ending !== undefined && user?.hours[0]?.ending !== null));

    const stats = [
        {
            label: 'Revenue du mois',
            value: monthAmount.toFixed(2) + '€',
            icon: Euro,
        },
        {
            label: 'Heures travaillées',
            value: toHours(hoursCount),
            icon: Clock,
        },
    ];

    useEffect(() => {
        refreshUser();

        if (!user || !user.hours) {
            return;
        }

        let amount = 0;
        let count = 0;
        for (const hour of user.hours) {
            amount += hour.amount ?? parseFloat(toCurrency(toHours(toMinutes(hour.ending ?? currentTime.split('T')[1]) - toMinutes(hour.beginning)), user.hourly_rate ?? 0));
            count += toMinutes(hour.ending ?? currentTime.split('T')[1]) - toMinutes(hour.beginning);
        }

        setMonthAmount(amount);
        setHoursCount(count);
    }, [currentTime, newHour]);

    useEffect(() => {
        const updateCurrentTime = () => {
            const now = new Date();
            now.setSeconds(0, 0); // Set seconds and milliseconds to 0
            const newTime = formatDate(now);
            setCurrentTime(newTime);
        };

        // Calculate the delay until the next minute
        const now = new Date();
        const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

        // Set a timeout to update at the next minute
        const timeout = setTimeout(() => {
            updateCurrentTime();
            // Set an interval to update every minute
            const interval = setInterval(updateCurrentTime, 60000);
            // Clear the interval on component unmount
            const clear = () => clearInterval(interval);
            return clear;
        }, delay);

        // Clear the timeout on component unmount
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        setWorkingHour(currentTime);
    }, [currentTime]);

    const handleAddHour = async () => {
        addHour(user!, workingHour, newHour);
        setNewHour(!newHour);
        setIsModalOpen(false);
    };

    const handleSwipe = (hour_id: number) => {
        deleteHour(hour_id);
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-3xl font-bold mb-5">Profil</h1>
            <div className="md:flex justify-evenly mb-8">
                <div className="grid gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="bg-white/5 rounded-xl p-6 min-w-[250px]"
                    >
                        <div >
                            <h2 className="text-xl font-bold">Informations personnelles</h2>
                            <p>Prénom: {user?.firstname}</p>
                            <p>Nom: {user?.lastname}</p>
                            <p>Téléphone: {user?.phone}</p>
                            <p>Email: {user?.email}</p>
                            <p>Rôle: {user?.role}</p>
                            {user?.role === 'admin' && <p>Tarif horaire: {user?.hourly_rate}€</p>}
                            <Button>Modifier</Button>
                            <Button variant="contained" disabled={loading}>{loading ? 'Déconnexion en cours...' : 'Se déconnecter'}</Button>
                        </div>
                    </motion.div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-white/5 rounded-xl p-6 min-w-[250px]"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 mb-1">{stat.label}</p>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center">
                <div className="min-w-[300px] max-w-3xl bg-white/5 rounded-lg p-5">
                    <h2 className="text-xl font-bold mb-3">Heures travaillées</h2>
                    <div className="flex flex-wrap justify-evenly">
                        {user?.hours.map((hour) => {
                            return (
                                isMobile ? (
                                    <SwipeableDiv key={hour.hour_id} hour={{ ...hour, nbr_hours: hour.nbr_hours ?? '', amount: hour.amount ?? 0 }} user={user} currentTime={currentTime} onSwipe={handleSwipe} />
                                ) : (
                                    <div key={hour.hour_id} className={`flex flex-col gap-2 m-2 ${hour.ending ? "bg-zinc-900 hover:bg-zinc-800" : "bg-gradient-to-br from-purple-500 to-pink-500"} rounded-lg px-5 py-2`}>
                                        <div className="flex flex-row justify-between gap-10 ">
                                            <div className="w-[200px]">
                                                <p className="text-lg">{toCapitalize(new Date(hour.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }))}</p>
                                                <p>{hour.beginning} - {hour.ending || currentTime.split('T')[1]}</p>
                                            </div>
                                            <div className="w-[50px]">
                                                <p>{hour.nbr_hours?.replace(":", "h") || toHours(toMinutes(currentTime.split('T')[1]) - toMinutes(hour.beginning))}</p>
                                                <p>{hour.amount?.toFixed(2) || toCurrency(toHours(toMinutes(currentTime.split('T')[1]) - toMinutes(hour.beginning)), user.hourly_rate ?? 0)}€</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            <button className="border-2 border-white hover:bg-white/15 rounded-lg w-full p-2 flex justify-center">
                                                <Edit className="text-white" />
                                            </button>
                                            <button className="border-2 border-white hover:bg-white/15 rounded-lg w-full p-2 flex justify-center" onClick={() => handleSwipe(hour.hour_id)}>
                                                <Trash className="text-white" />
                                            </button>
                                        </div>
                                    </div>
                                )
                            );
                        }
                        )}
                    </div>
                </div>
            </div>
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
                                        Ajouter une heure {newHour ? 'de début' : 'de fin'}
                                    </motion.span>
                                    <motion.button
                                        className="flex items-center justify-center bg-[#c0bfba] text-white p-1 size-7 rounded-full"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsModalOpen(false);
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, transition: { duration: 0.05 } }}
                                    >
                                        <X size={24} />
                                    </motion.button>
                                </div>
                                {(isModalOpen) ? (
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
                                        <input type="datetime-local" className="border-2 border-[#efefef] rounded-lg p-2" value={workingHour} onChange={(e) => setWorkingHour(e.target.value)} />
                                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity text-white" onClick={handleAddHour}>
                                            Ajouter
                                        </button>
                                    </motion.div>
                                ) : null}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
};

export default ProfilePage;