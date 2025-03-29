import { useState, useEffect } from 'react';
import { supabase } from '../../supabase/client';
import { User } from '../../types/user';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Edit3, Save, X } from 'lucide-react';
import { toHours } from '../../utils/functions';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editedRate, setEditedRate] = useState<number>(10);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(new Date(), 'yyyy-MM')
  );
  const [updateMessage, setUpdateMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [selectedMonth]);

  const fetchUsers = async () => {
    try {
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')
        .neq('role', 'user')
        .order('firstname');

      if (usersError) throw usersError;

      const [year, month] = selectedMonth.split('-');

      const { data: allHours, error: hoursError } = await supabase.rpc('get_hours_by_users', {
        actual_month: parseInt(month),
        actual_year: parseInt(year),
      });

      if (hoursError) throw hoursError;

      const formattedHours = allHours.map((hour: any) => ({
        ...hour,
        beginning: hour.beginning.slice(0, 5),
        ending: hour.ending ? hour.ending.slice(0, 5) : null,
        nbr_hours: hour.nbr_hours ? hour.nbr_hours.slice(0, 5) : null,
      }));

      const hoursByUser: Record<string, any[]> = {};
      formattedHours.forEach((hour: any) => {
        const firstname = hour.firstname;
        if (!hoursByUser[firstname]) {
          hoursByUser[firstname] = [];
        }
        hoursByUser[firstname].push(hour);
      });

      const usersWithHours = usersData.map((user) => ({
        ...user,
        hours: hoursByUser[user.firstname] || [],
      }));

      setUsers(usersWithHours);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdateRate = async (userId: string) => {
    setUpdateMessage(null);

    if (editedRate < 0 || isNaN(editedRate)) {
      setUpdateMessage({
        text: 'Le taux horaire doit être un nombre positif',
        type: 'error',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('users')
        .update({ hourly_rate: editedRate })
        .eq('user_id', userId);
      
      if (error) {
        throw error;
      }
      
      setEditingUser(null);
      setUpdateMessage({
        text: 'Taux horaire mis à jour avec succès',
        type: 'success',
      });
      
      await fetchUsers();
      
      setTimeout(() => {
        setUpdateMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error updating hourly rate:', error);
      setUpdateMessage({
        text: `Erreur lors de la mise à jour du taux horaire: ${error instanceof Error ? error.message : 'Unknown error'}`,
        type: 'error',
      });
    }
  };

  const calculateTotalHours = (hours: any[]) => {
    return hours.reduce((total, hour) => {
      if (hour.nbr_hours) {
        const [h, m] = hour.nbr_hours.split(':').map(Number);
        return total + h * 60 + m;
      }
      return total;
    }, 0);
  };

  const calculateTotalAmount = (hours: any[], rate: number) => {
    const totalMinutes = calculateTotalHours(hours);
    return ((totalMinutes / 60) * rate).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {updateMessage && (
        <div
          className={`p-3 rounded-lg ${
            updateMessage.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}
        >
          {updateMessage.text}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Gestion des utilisateurs</h2>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.user_id} className="bg-white/5 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">
                  {user.firstname} {user.lastname}
                </h3>
                <p className="text-gray-400">{user.email}</p>
              </div>
              <div className="flex items-center space-x-4">
                {editingUser === user.user_id ? (
                  <>
                    <input
                      type="number"
                      min="10"
                      step="1"
                      value={editedRate}
                      onChange={(e) => setEditedRate(Number(e.target.value) || 0)}
                      className="w-20 bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={() => handleUpdateRate(user.user_id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-green-500"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingUser(null)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-lg">{user.hourly_rate}€/h</span>
                    <button
                      onClick={() => {
                        setEditingUser(user.user_id);
                        setEditedRate(user.hourly_rate || 0);
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-gray-400 mb-1">Heures travaillées</p>
                <p className="text-2xl font-bold">{toHours(calculateTotalHours(user.hours))}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-gray-400 mb-1">Montant total</p>
                <p className="text-2xl font-bold">{calculateTotalAmount(user.hours, user.hourly_rate || 0)}€</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-gray-400 mb-1">Jours travaillés</p>
                <p className="text-2xl font-bold">{user.hours.length}</p>
              </div>
            </div>

            <div className="space-y-2">
              {user.hours.map((hour) => (
                <div key={hour.hour_id} className="bg-white/5 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {format(new Date(hour.date), 'EEEE d MMMM', {
                        locale: fr,
                      })}
                    </p>
                    <p className="text-gray-400">
                      {hour.beginning} - {hour.ending || 'En cours'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{hour.nbr_hours || '0h00'}</p>
                    <p className="text-gray-400">{hour.amount?.toFixed(2) || '0'}€</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;