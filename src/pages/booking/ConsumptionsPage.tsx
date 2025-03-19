import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { Conso } from "../../types";
import { Alert } from "@mui/material";
import { Coffee, Plus, ArrowLeft, Trash2, CreditCard } from "lucide-react";

const ConsumptionsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [consumptions, setConsumptions] = useState<Conso[]>([]);
  const [addedConsumptions, setAddedConsumptions] = useState<Conso[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsumptions = async () => {
      try {
        // Fetch available consumptions
        const { data: foodData, error: foodError } = await supabase
          .from('food')
          .select('*')
          .order('name');

        if (foodError) throw foodError;

        // Fetch already added consumptions for this booking
        const { data: consoData, error: consoError } = await supabase.rpc('get_conso', { 
          actual_booking_id: id 
        });

        if (consoError) throw consoError;

        setConsumptions(foodData.map(item => ({
          ...item,
          conso_id: item.food_id,
          food_id: item.food_id
        })));
        setAddedConsumptions(consoData || []);
      } catch (err) {
        console.error('Error fetching consumptions:', err);
        setError("Erreur lors du chargement des consommations");
      } finally {
        setLoading(false);
      }
    };

    fetchConsumptions();
  }, [id]);

  const handleAddConsumption = async (foodId: number) => {
    try {
      const { error } = await supabase.rpc('insert_conso', { 
        actual_booking_id: id, 
        actual_food_id: foodId 
      });

      if (error) throw error;

      // Update local state with new consumption
      const addedConsumption = consumptions.find(c => c.food_id === foodId);
      if (addedConsumption) {
        const existingConsumption = addedConsumptions.find(c => c.food_id === foodId);
        if (existingConsumption) {
          setAddedConsumptions(addedConsumptions.map(c => 
            c.food_id === foodId 
              ? { ...c, quantity: (c.quantity || 0) + 1 }
              : c
          ));
        } else {
          setAddedConsumptions([...addedConsumptions, { ...addedConsumption, quantity: 1 }]);
        }
      }
    } catch (err) {
      console.error('Error adding consumption:', err);
      setError("Erreur lors de l'ajout de la consommation");
    }
  };

  const handleRemoveConsumption = async (foodId: number) => {
    try {
      const { error } = await supabase.rpc('delete_conso', { 
        actual_booking_id: id, 
        actual_food_id: foodId 
      });

      if (error) throw error;

      // Update local state
      const consumption = addedConsumptions.find(c => c.food_id === foodId);
      if (consumption && consumption.quantity > 1) {
        setAddedConsumptions(addedConsumptions.map(c => 
          c.food_id === foodId 
            ? { ...c, quantity: c.quantity - 1 }
            : c
        ));
      } else {
        setAddedConsumptions(addedConsumptions.filter(c => c.food_id !== foodId));
      }
    } catch (err) {
      console.error('Error removing consumption:', err);
      setError("Erreur lors de la suppression de la consommation");
    }
  };

  const calculateTotal = () => {
    return addedConsumptions.reduce((total, conso) => {
      return total + (conso.price * conso.quantity);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <button
            onClick={() => window.location.href = `/booking/${id}`}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors order-2 sm:order-1"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à la réservation</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold order-1 sm:order-2">
            Ajouter des consommations
          </h1>
        </div>

        {error && (
          <Alert severity="error" className="mb-6">
            {error}
          </Alert>
        )}

        {addedConsumptions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Consommations ajoutées</h2>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="space-y-2 mb-4">
                {addedConsumptions.map((conso) => (
                  <div key={conso.conso_id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span>{conso.name}</span>
                      <span className="text-gray-400">x{conso.quantity}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span>{(conso.price * conso.quantity).toFixed(2)}€</span>
                      <button
                        onClick={() => handleRemoveConsumption(conso.food_id!)}
                        className="p-1 hover:bg-white/10 rounded-lg transition-colors text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <div className="flex items-center space-x-2 text-gray-400">
                  <CreditCard className="w-4 h-4" />
                  <span>Total</span>
                </div>
                <span className="text-xl font-bold">{calculateTotal().toFixed(2)}€</span>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center">
            <Alert severity="info">Chargement des consommations...</Alert>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {consumptions.map((consumption) => (
              <div
                key={consumption.conso_id}
                className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Coffee className="w-5 h-5 text-purple-500" />
                    <h3 className="text-lg font-medium">{consumption.name}</h3>
                  </div>
                  <span className="text-lg font-bold">{consumption.price}€</span>
                </div>
                <button
                  onClick={() => handleAddConsumption(consumption.food_id!)}
                  className="w-full flex items-center justify-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsumptionsPage;