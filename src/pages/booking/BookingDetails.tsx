import { useEffect, useState } from "react";
import { Booking } from "../../types";
import { supabase } from "../../supabase/client";
import type { Conso } from "../../types";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Alert, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { 
    Calendar, 
    Clock, 
    Users, 
    CreditCard, 
    Coffee, 
    MessageSquare, 
    Phone, 
    Mail,
    Trash2,
    XCircle,
    CheckCircle,
    Edit3,
    ChevronDown,
    Euro
} from "lucide-react";

const BookingDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [booking, setBooking] = useState<Booking>();
    const [consumptions, setConsumptions] = useState<Conso[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editedBooking, setEditedBooking] = useState<Partial<Booking>>({});
    const [error, setError] = useState("");
    const [update, setUpdate] = useState(false);
    const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            const { data, error } = await supabase.rpc('get_booking_details', { id });
            if (error) {
                console.error('Error fetching booking:', error);
                setError("Erreur lors du chargement de la réservation");
            } else {
                setBooking(data[0]);
                setEditedBooking(data[0]);
            }
        };

        const fetchConsumptions = async () => {
            const { data, error } = await supabase.rpc('get_conso', { actual_booking_id: id });
            if (error) {
                console.error('Error fetching consumptions:', error);
            } else {
                setConsumptions(data);
            }
        };

        fetchBookingDetails();
        fetchConsumptions();
    }, [id, update]);

    const handleUpdateBooking = async () => {
        try {
            // Create a new date object from the input value
            const inputDate = new Date(editedBooking.date!);
            
            // Format the date as YYYY-MM-DD HH:mm:ss
            const formattedDate = format(inputDate, "yyyy-MM-dd HH:mm:ss");

            const { error } = await supabase.rpc('update_booking', {
                actual_booking_id: booking?.booking_id,
                new_firstname: editedBooking.firstname,
                new_lastname: editedBooking.lastname,
                new_phone: editedBooking.phone,
                new_email: editedBooking.email,
                new_date: formattedDate,
                new_nbr_pers: editedBooking.nbr_pers,
                new_nbr_parties: editedBooking.nbr_parties,
                new_deposit: editedBooking.deposit,
                new_comment: editedBooking.comment,
                new_cash_payment: editedBooking.cash_payment,
                new_card_payment: editedBooking.card_payment
            });

            if (error) throw error;
            setUpdate(!update);
            setIsEditModalOpen(false);
        } catch (err) {
            console.error('Error updating booking:', err);
            setError("Erreur lors de la mise à jour de la réservation");
        }
    };

    const handleDeleteConsumption = async (consoId: number) => {
        try {
            const { error } = await supabase.rpc('delete_conso', { 
                actual_booking_id: id, 
                actual_food_id: consoId 
            });
            if (error) throw error;
            setUpdate(!update);
        } catch (err) {
            console.error('Error deleting consumption:', err);
            setError("Erreur lors de la suppression de la consommation");
        }
    };

    const handleToggleBookingStatus = async () => {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ is_cancelled: !booking?.is_cancelled })
                .eq('booking_id', id);
            
            if (error) throw error;
            setUpdate(!update);
        } catch (err) {
            console.error('Error toggling booking status:', err);
            setError("Erreur lors du changement de statut de la réservation");
        }
    };

    const handleDeleteBooking = async () => {
        try {
            const { error } = await supabase
                .from('bookings')
                .delete()
                .eq('booking_id', id);
            
            if (error) throw error;
            window.location.href = '/gestion';
        } catch (err) {
            console.error('Error deleting booking:', err);
            setError("Erreur lors de la suppression de la réservation");
        }
    };

    if (!booking) {
        return (
            <div className="min-h-screen bg-black text-white p-8">
                <div className="max-w-4xl mx-auto">
                    <Alert severity="info">Chargement de la réservation...</Alert>
                </div>
            </div>
        );
    }

    const totalPaid = (booking.cash_payment || 0) + (booking.card_payment || 0);
    const remainingAmount = booking.total - totalPaid;

    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header - Responsive */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                            Réservation #{booking.booking_id}
                        </h1>
                        <div className="flex items-center space-x-2 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm sm:text-base">
                                {format(new Date(booking.date), "EEEE d MMMM yyyy 'à' HH:mm", { locale: fr })}
                            </span>
                        </div>
                    </div>

                    {/* Mobile Actions Menu */}
                    <div className="sm:hidden">
                        <button
                            onClick={() => setIsActionsMenuOpen(!isActionsMenuOpen)}
                            className="w-full flex items-center justify-between px-4 py-2 bg-white/10 rounded-lg"
                        >
                            <span>Actions</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isActionsMenuOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isActionsMenuOpen && (
                            <div className="absolute right-4 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 z-50">
                                <button
                                    onClick={() => {
                                        setIsEditModalOpen(true);
                                        setIsActionsMenuOpen(false);
                                    }}
                                    className="w-full px-4 py-2 text-left hover:bg-white/10"
                                    disabled={booking.is_cancelled}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Edit3 className="w-4 h-4" />
                                        <span>Modifier</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => {
                                        handleToggleBookingStatus();
                                        setIsActionsMenuOpen(false);
                                    }}
                                    className="w-full px-4 py-2 text-left hover:bg-white/10"
                                >
                                    <div className="flex items-center space-x-2">
                                        {booking.is_cancelled ? (
                                            <>
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <span className="text-green-500">Réactiver</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="w-4 h-4 text-red-500" />
                                                <span className="text-red-500">Annuler</span>
                                            </>
                                        )}
                                    </div>
                                </button>
                                <button
                                    onClick={() => {
                                        setIsDeleteModalOpen(true);
                                        setIsActionsMenuOpen(false);
                                    }}
                                    className="w-full px-4 py-2 text-left hover:bg-white/10"
                                >
                                    <div className="flex items-center space-x-2 text-red-500">
                                        <Trash2 className="w-4 h-4" />
                                        <span>Supprimer</span>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden sm:flex space-x-4">
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                            disabled={booking.is_cancelled}
                        >
                            <Edit3 className="w-4 h-4" />
                            <span>Modifier</span>
                        </button>
                        <button
                            onClick={handleToggleBookingStatus}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                booking.is_cancelled
                                    ? "bg-green-500/20 hover:bg-green-500/30 text-green-500"
                                    : "bg-red-500/20 hover:bg-red-500/30 text-red-500"
                            }`}
                        >
                            {booking.is_cancelled ? (
                                <>
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Réactiver</span>
                                </>
                            ) : (
                                <>
                                    <XCircle className="w-4 h-4" />
                                    <span>Annuler</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>Supprimer</span>
                        </button>
                    </div>
                </div>

                {error && (
                    <Alert severity="error" className="mb-6">
                        {error}
                    </Alert>
                )}

                {booking.is_cancelled && (
                    <Alert severity="warning" className="mb-6">
                        Cette réservation a été annulée
                    </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                    {/* Client Information */}
                    <div className="bg-white/5 rounded-xl p-4 sm:p-6">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4">Informations client</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Users className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm sm:text-base">Nom</span>
                                </div>
                                <span className="font-medium text-sm sm:text-base">
                                    {booking.firstname} {booking.lastname}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm sm:text-base">Téléphone</span>
                                </div>
                                <span className="font-medium text-sm sm:text-base">{booking.phone || "Non renseigné"}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm sm:text-base">Email</span>
                                </div>
                                <span className="font-medium text-sm sm:text-base break-all">{booking.email || "Non renseigné"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="bg-white/5 rounded-xl p-4 sm:p-6">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4">Détails de la réservation</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Users className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm sm:text-base">Participants</span>
                                </div>
                                <span className="font-medium text-sm sm:text-base">{booking.nbr_pers} personnes</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm sm:text-base">Nombre de parties</span>
                                </div>
                                <span className="font-medium text-sm sm:text-base">{booking.nbr_parties}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Euro className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm sm:text-base">Total</span>
                                </div>
                                <span className="font-medium text-sm sm:text-base">{booking.total}€</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <CreditCard className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm sm:text-base">Acompte</span>
                                </div>
                                <span className="font-medium text-sm sm:text-base">{booking.deposit}€</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Euro className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm sm:text-base">Payé en espèces</span>
                                </div>
                                <span className="font-medium text-sm sm:text-base">{booking.cash_payment}€</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <CreditCard className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm sm:text-base">Payé par carte</span>
                                </div>
                                <span className="font-medium text-sm sm:text-base">{booking.card_payment}€</span>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-gray-600">
                                <div className="flex items-center space-x-2">
                                    <Euro className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm sm:text-base">Reste à payer</span>
                                </div>
                                <span className="font-medium text-sm sm:text-base">
                                    {remainingAmount.toFixed(2)}€
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Consumptions */}
                    <div className="bg-white/5 rounded-xl p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg sm:text-xl font-semibold">Consommations</h2>
                            <button
                                onClick={() => window.location.href = `/booking/${id}/consumptions`}
                                className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                disabled={booking.is_cancelled}
                            >
                                <Coffee className="w-4 h-4" />
                                <span>Ajouter</span>
                            </button>
                        </div>
                        {consumptions.length > 0 ? (
                            <div className="space-y-3">
                                {consumptions.map((conso) => (
                                    <div
                                        key={conso.conso_id}
                                        className="flex items-center justify-between bg-white/5 p-3 rounded-lg"
                                    >
                                        <div>
                                            <span className="font-medium">{conso.name}</span>
                                            <span className="text-sm text-gray-400 ml-2">
                                                x{conso.quantity}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span>{conso.price}€</span>
                                            <button
                                                onClick={() => handleDeleteConsumption(conso.food_id!)}
                                                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">Aucune consommation</p>
                        )}
                    </div>

                    {/* Comments */}
                    <div className="bg-white/5 rounded-xl p-4 sm:p-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <MessageSquare className="w-5 h-5 text-gray-400" />
                            <h2 className="text-lg sm:text-xl font-semibold">Commentaire</h2>
                        </div>
                        <p className="text-gray-300">
                            {booking.comment || "Aucun commentaire"}
                        </p>
                    </div>
                </div>

                {/* Edit Modal */}
                <Dialog
                    open={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        style: {
                            backgroundColor: '#1f2937',
                            borderRadius: '1rem',
                            color: 'white'
                        }
                    }}
                >
                    <DialogTitle>Modifier la réservation</DialogTitle>
                    <DialogContent>
                        <div className="space-y-4 pt-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Prénom</label>
                                    <input
                                        type="text"
                                        value={editedBooking.firstname}
                                        onChange={(e) => setEditedBooking({ ...editedBooking, firstname: e.target.value })}
                                        className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Nom</label>
                                    <input
                                        type="text"
                                        value={editedBooking.lastname}
                                        onChange={(e) => setEditedBooking({ ...editedBooking, lastname: e.target.value })}
                                        className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Téléphone</label>
                                    <input
                                        type="tel"
                                        value={editedBooking.phone}
                                        onChange={(e) => setEditedBooking({ ...editedBooking, phone: e.target.value })}
                                        className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={editedBooking.email}
                                        onChange={(e) => setEditedBooking({ ...editedBooking, email: e.target.value })}
                                        className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Date et heure</label>
                                <input
                                    type="datetime-local"
                                    value={format(new Date(editedBooking.date!), "yyyy-MM-dd'T'HH:mm")}
                                    onChange={(e) => {
                                        const newDate = new Date(e.target.value);
                                        setEditedBooking({ ...editedBooking, date: newDate });
                                    }}
                                    className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Participants</label>
                                    <input
                                        type="number"
                                        value={editedBooking.nbr_pers}
                                        onChange={(e) => setEditedBooking({ ...editedBooking, nbr_pers: parseInt(e.target.value) })}
                                        min={2}
                                        max={20}
                                        className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Parties</label>
                                    <input
                                        type="number"
                                        value={editedBooking.nbr_parties}
                                        onChange={(e) => setEditedBooking({ ...editedBooking, nbr_parties: parseInt(e.target.value) })}
                                        min={1}
                                        className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Acompte</label>
                                    <input
                                        type="number"
                                        value={editedBooking.deposit}
                                        onChange={(e) => setEditedBooking({ ...editedBooking, deposit: parseInt(e.target.value) })}
                                        min={0}
                                        className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Payé en espèces</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={editedBooking.cash_payment}
                                        onChange={(e) => setEditedBooking({ ...editedBooking, cash_payment: parseFloat(e.target.value) || 0 })}
                                        min={0}
                                        className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Payé par carte</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={editedBooking.card_payment}
                                        onChange={(e) => setEditedBooking({ ...editedBooking, card_payment: parseFloat(e.target.value) || 0 })}
                                        min={0}
                                        className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Commentaire</label>
                                <textarea
                                    value={editedBooking.comment}
                                    onChange={(e) => setEditedBooking({ ...editedBooking, comment: e.target.value })}
                                    className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleUpdateBooking}
                                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Modal */}
                <Dialog
                    open={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    PaperProps={{
                        style: {
                            backgroundColor: '#1f2937',
                            borderRadius: '1rem',
                            color: 'white'
                        }
                    }}
                >
                    <DialogTitle>Confirmer la suppression</DialogTitle>
                    <DialogContent>
                        <div className="space-y-4">
                            <p>Êtes-vous sûr de vouloir supprimer cette réservation ?</p>
                            <p className="text-red-500">Cette action est irréversible.</p>
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleDeleteBooking}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default BookingDetails;