import { useEffect, useState } from "react";
import { User } from "../../types/user";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Euro, Plus, X, Trash, Edit, LogOut, User as UserIcon, Mail, Phone, CreditCard, Lock } from "lucide-react";
import { useSwipeable } from 'react-swipeable';
import { toCapitalize, toCurrency, toHours, toMinutes } from "../../utils/functions";
import { useAuth } from "../../hooks/useAuth";
import { addHour, deleteHour } from "../../components/profile/hours";
import { Dialog, DialogContent, DialogTitle, Tab, Tabs } from '@mui/material';
import { supabase } from "../../supabase/client";

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

const ProfilePage = () => {
  const { user, refreshUser, loading, signOut } = useAuth();
  const [monthAmount, setMonthAmount] = useState(0);
  const [hoursCount, setHoursCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState<string>(formatDate(new Date()));
  const [workingHour, setWorkingHour] = useState<string>(currentTime);
  const [newHour, setNewHour] = useState<boolean>(!user?.hours.length || (user?.hours[0]?.ending !== undefined && user?.hours[0]?.ending !== null));
  const [activeTab, setActiveTab] = useState(0);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) {
      setEditedUser({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone
      });
    }
  }, [user]);

  useEffect(() => {
    refreshUser();

    if (!user || !user.hours) return;

    let amount = 0;
    let count = 0;
    for (const hour of user.hours) {
      amount += hour.amount ?? parseFloat(toCurrency(toHours(toMinutes(hour.ending ?? currentTime.split('T')[1]) - toMinutes(hour.beginning)), user.hourly_rate ?? 0));
      count += hour.nbr_hours ? toMinutes(hour.nbr_hours) : toMinutes(currentTime.split('T')[1]) - toMinutes(hour.beginning);
    }

    setMonthAmount(amount);
    setHoursCount(count);
  }, [currentTime, newHour, refreshUser, user]);

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      now.setSeconds(0, 0);
      const newTime = formatDate(now);
      setCurrentTime(newTime);
    };

    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const timeout = setTimeout(() => {
      updateCurrentTime();
      const interval = setInterval(updateCurrentTime, 60000);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setWorkingHour(currentTime);
  }, [currentTime]);

  const handleAddHour = async () => {
    await addHour(user!, workingHour, newHour);
    setNewHour(!newHour);
    setIsModalOpen(false);
    refreshUser();
  };

  const handleDeleteHour = async (hour_id: number) => {
    await deleteHour(hour_id);
    refreshUser();
  };

  const handleEditHour = (hour: any) => {
    setSelectedHour(hour);
    setNewHour(false);
    setWorkingHour(hour.date);
    setIsModalOpen(true);
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('users')
      .update(editedUser)
      .eq('user_id', user.user_id);

    if (error) {
      console.error('Error updating profile:', error);
      return;
    }

    refreshUser();
    setIsEditProfileOpen(false);
  };

  const handleChangePassword = async () => {
    setPasswordError('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }

    const { error } = await supabase.auth.updateUser({ 
      password: newPassword 
    });

    if (error) {
      setPasswordError(error.message);
      return;
    }

    setIsChangePasswordOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const renderProfileInfo = () => (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Informations personnelles</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsChangePasswordOpen(true)}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Lock className="w-4 h-4" />
            <span>Changer le mot de passe</span>
          </button>
          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Modifier</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-400">
            <UserIcon className="w-4 h-4" />
            <span>Nom complet</span>
          </div>
          <p className="text-white text-lg">{user?.firstname} {user?.lastname}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-400">
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </div>
          <p className="text-white text-lg">{user?.email}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-400">
            <Phone className="w-4 h-4" />
            <span>Téléphone</span>
          </div>
          <p className="text-white text-lg">{user?.phone}</p>
        </div>

        {user?.role !== 'user' && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-400">
              <CreditCard className="w-4 h-4" />
              <span>Taux horaire</span>
            </div>
            <p className="text-white text-lg">{user?.hourly_rate}€/h</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderHoursSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Revenue du mois</p>
              <p className="text-3xl font-bold text-white">{monthAmount.toFixed(2)}€</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Euro className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Heures travaillées</p>
              <p className="text-3xl font-bold text-white">{toHours(hoursCount)}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Heures travaillées</h2>
          <button
            onClick={() => {
              setNewHour(true);
              setSelectedHour(null);
              setWorkingHour(currentTime);
              setIsModalOpen(true);
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle journée</span>
          </button>
        </div>

        <div className="space-y-4">
          {user?.hours.map((hour) => (
            <div
              key={hour.hour_id}
              className={`${
                hour.ending ? "bg-white/5" : "bg-gradient-to-r from-purple-500 to-pink-500"
              } rounded-lg p-4 transition-all hover:transform hover:scale-[1.01]`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">
                    {toCapitalize(new Date(hour.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }))}
                  </p>
                  <p className="text-gray-400">
                    {hour.beginning} - {hour.ending || 'En cours'}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-white font-medium">
                      {hour.nbr_hours?.replace(":", "h") || toHours(toMinutes(currentTime.split('T')[1]) - toMinutes(hour.beginning))}
                    </p>
                    <p className="text-gray-400">
                      {hour.amount?.toFixed(2) || toCurrency(toHours(toMinutes(currentTime.split('T')[1]) - toMinutes(hour.beginning)), user?.hourly_rate ?? 0)}€
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {!hour.ending && (
                      <button
                        onClick={() => handleEditHour(hour)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Clock className="w-4 h-4 text-white" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteHour(hour.hour_id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Trash className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user?.firstname} {user?.lastname}</h1>
                <p className="text-white/80">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          className="mb-6"
          sx={{
            '& .MuiTab-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-selected': {
                color: 'white',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'white',
            },
          }}
        >
          <Tab label="Profil" />
          {user?.role !== 'user' && <Tab label="Heures" />}
        </Tabs>

        {activeTab === 0 ? renderProfileInfo() : renderHoursSection()}
      </div>

      {/* Add/Edit Hour Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: '#1f2937',
            color: 'white',
            borderRadius: '1rem',
            padding: '1rem'
          }
        }}
      >
        <DialogTitle>
          {newHour ? "Nouvelle journée" : "Ajouter l'heure de fin"}
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 mb-2">{newHour ? "Heure de début" : "Heure de fin"}</p>
              <input
                type="datetime-local"
                className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white"
                value={workingHour}
                onChange={(e) => setWorkingHour(e.target.value)}
              />
            </div>
            <button
              onClick={handleAddHour}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              {newHour ? "Commencer" : "Terminer"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Modal */}
      <Dialog
        open={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: '#1f2937',
            color: 'white',
            borderRadius: '1rem',
            padding: '1rem'
          }
        }}
      >
        <DialogTitle>
          Modifier le profil
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4 pt-2">
            <div>
              <p className="text-gray-400 mb-2">Prénom</p>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white"
                value={editedUser.firstname}
                onChange={(e) => setEditedUser({ ...editedUser, firstname: e.target.value })}
              />
            </div>
            <div>
              <p className="text-gray-400 mb-2">Nom</p>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white"
                value={editedUser.lastname}
                onChange={(e) => setEditedUser({ ...editedUser, lastname: e.target.value })}
              />
            </div>
            <div>
              <p className="text-gray-400 mb-2">Email</p>
              <input
                type="email"
                className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              />
            </div>
            <div>
              <p className="text-gray-400 mb-2">Téléphone</p>
              <input
                type="tel"
                className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white"
                value={editedUser.phone}
                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Password Modal */}
      <Dialog
        open={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: '#1f2937',
            color: 'white',
            borderRadius: '1rem',
            padding: '1rem'
          }
        }}
      >
        <DialogTitle>
          Changer le mot de passe
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4 pt-2">
            <div>
              <p className="text-gray-400 mb-2">Nouveau mot de passe</p>
              <input
                type="password"
                className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <p className="text-gray-400 mb-2">Confirmer le mot de passe</p>
              <input
                type="password"
                className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {passwordError && (
              <p className="text-red-500">{passwordError}</p>
            )}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => {
                  setIsChangePasswordOpen(false);
                  setPasswordError('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Changer le mot de passe
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;