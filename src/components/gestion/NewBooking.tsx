import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Activity } from "../../types";
import { supabase } from "../../supabase/client";
import { format } from "date-fns";

interface NewBookingProps {
    setBookingAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewBooking = ({ setBookingAdded }: NewBookingProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        date: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        nbr_pers: 2,
        nbr_parties: 1,
        deposit: 0,
        amount: 0,
        comment: ''
    });
    const [error, setError] = useState('');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    useEffect(() => {
        const fetchActivities = async () => {
            const { data, error } = await supabase.from('activities').select('*');
            if (error) {
                console.error('Error fetching activities:', error);
            } else {
                setActivities(data);
            }
        };
        fetchActivities();
    }, []);

    const handleSubmit = async () => {
        if (!selectedActivity) {
            setError('Veuillez sélectionner une activité');
            return;
        }

        try {
            const total = calculateTotal();
            const { error: bookingError } = await supabase.rpc('insert_booking', {
                firstname: formData.firstname,
                lastname: formData.lastname,
                phone: formData.phone,
                email: formData.email,
                date: formData.date,
                nbr_pers: formData.nbr_pers,
                nbr_parties: formData.nbr_parties,
                deposit: formData.deposit,
                activity_id: selectedActivity.activity_id,
                total: total
            });

            if (bookingError) throw bookingError;

            setBookingAdded(true);
            setIsModalOpen(false);
            resetForm();
        } catch (err) {
            setError('Erreur lors de la création de la réservation');
            console.error('Error creating booking:', err);
        }
    };

    const calculateTotal = () => {
        if (!selectedActivity) return 0;
        const basePrice = selectedActivity.first_price || selectedActivity.third_price;
        return basePrice * formData.nbr_pers * (selectedActivity.first_price ? formData.nbr_parties : 1) - formData.deposit;
    };

    const resetForm = () => {
        setSelectedActivity(null);
        setFormData({
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            date: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
            nbr_pers: 2,
            nbr_parties: 1,
            deposit: 0,
            amount: 0,
            comment: ''
        });
        setError('');
    };

    return (
        <div className="fixed right-3 bottom-3">
            <motion.button
                className="flex bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
                onClick={() => setIsModalOpen(true)}
                layoutId="modal"
            >
                <motion.div layoutId="plus">
                    <Plus size={24} />
                </motion.div>
                {!isMobile && (
                    <motion.span className="ml-2 font-medium" layoutId="title">
                        Ajouter
                    </motion.span>
                )}
            </motion.button>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            className="bg-zinc-900 w-full max-w-xl rounded-2xl p-6"
                            onClick={e => e.stopPropagation()}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Nouvelle réservation</h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-4">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                {/* Activity Selection */}
                                <div className="grid grid-cols-2 gap-2">
                                    {activities.map((activity) => (
                                        <button
                                            key={activity.activity_id}
                                            onClick={() => {
                                                setSelectedActivity(activity);
                                                if (formData.nbr_pers < activity.min_player) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        nbr_pers: activity.min_player,
                                                        nbr_parties: activity.type === "Anniversaire" ? 3 : prev.nbr_parties
                                                    }));
                                                }
                                            }}
                                            className={`p-4 rounded-lg transition-colors ${
                                                selectedActivity?.activity_id === activity.activity_id
                                                    ? 'bg-purple-500 text-white'
                                                    : 'bg-white/5 hover:bg-white/10'
                                            }`}
                                        >
                                            <div className="font-medium">{activity.name}</div>
                                            <div className="text-sm opacity-75">
                                                {activity.first_price || activity.third_price}€/pers.
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Prénom *"
                                        value={formData.firstname}
                                        onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                                        className="bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nom"
                                        value={formData.lastname}
                                        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                                        className="bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="tel"
                                        placeholder="Téléphone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <input
                                    type="datetime-local"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Personnes</label>
                                        <input
                                            type="number"
                                            value={formData.nbr_pers}
                                            onChange={(e) => setFormData({ ...formData, nbr_pers: parseInt(e.target.value) })}
                                            min={selectedActivity?.min_player || 2}
                                            max={selectedActivity?.max_player || 20}
                                            className="w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Parties</label>
                                        <input
                                            type="number"
                                            value={formData.nbr_parties}
                                            onChange={(e) => setFormData({ ...formData, nbr_parties: parseInt(e.target.value) })}
                                            min={1}
                                            className="w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Acompte</label>
                                        <input
                                            type="number"
                                            value={formData.deposit}
                                            onChange={(e) => setFormData({ ...formData, deposit: parseInt(e.target.value) })}
                                            min={0}
                                            className="w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                </div>

                                <textarea
                                    placeholder="Commentaire"
                                    value={formData.comment}
                                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                    className="w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                                />

                                {selectedActivity && (
                                    <div className="bg-white/5 rounded-lg p-4">
                                        <div className="text-sm text-gray-400">Total estimé</div>
                                        <div className="text-2xl font-bold">{calculateTotal()}€</div>
                                    </div>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                                >
                                    Créer la réservation
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NewBooking;