import { useEffect, useState } from "react";
import { User } from "../types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { Clock, Euro } from "lucide-react";

const toMinutes = (date: string) => {
    const [hours, minutes] = date.split(':').map(Number);
    return hours * 60 + minutes;
};

const toHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h${remainingMinutes.toString().padStart(2, '0')}`;
};

const Profile = () => {
    const [user, setUser] = useState<User>();
    const [monthAmount, setMonthAmount] = useState(0);
    const [hoursCount, setHoursCount] = useState(0);

    const stats = [
        {
            label: 'Revenue du mois',
            value: monthAmount + '€',
            icon: Euro,
        },
        {
            label: 'Heures travaillées',
            value: toHours(hoursCount),
            icon: Clock,
        },
    ];

    useEffect(() => {
        fetch(`http://localhost:3010/users/${localStorage.getItem('userId')}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                let totalMonthAmount = 0;
                let totalHoursCount = 0;

                data.hours.forEach((hour: { ending: string; beginning: string; }) => {
                    const hoursWorked = toMinutes(hour.ending) - toMinutes(hour.beginning);
                    totalMonthAmount += (hoursWorked / 60) * (data.hourly_rate ?? 0);
                    totalHoursCount += hoursWorked;
                });

                setMonthAmount(totalMonthAmount);
                setHoursCount(totalHoursCount);
                setUser(data);
            });
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-3xl font-bold">Profil</h1>
                <div className="md:flex justify-evenly mb-8">
                    <div className="bg-white/5 rounded-lg p-5 mb-8">
                        <h2 className="text-xl font-bold">Informations personnelles</h2>
                        <p>Prénom: {user?.firstname}</p>
                        <p>Nom: {user?.lastname}</p>
                        <p>Téléphone: {user?.phone}</p>
                        <p>Email: {user?.email}</p>
                        <p>Rôle: {user?.role}</p>
                        {user?.role === 'admin' && <p>Tarif horaire: {user?.hourly_rate}€</p>}
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
                <div className="bg-white/5 rounded-lg p-5">
                    <h2 className="text-xl font-bold">Heures travaillées</h2>
                    {user?.hours.map((hour) => (
                        <p key={hour.id}>
                            {format(new Date(hour.date), 'EEEE d MMMM', { locale: fr }).replace(/\b\w/g, char => char.toUpperCase())} de {hour.beginning} à {hour.ending} ({hour.nbr_hours.replace(":", "h")} - {hour.amount}€)                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Profile;