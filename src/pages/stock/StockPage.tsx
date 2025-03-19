import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import { Alert, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Coffee, Plus, Edit3, Trash2, Search, MinusCircle, PlusCircle } from "lucide-react";

interface StockItem {
  food_id: number;
  name: string;
  price: number;
  quantity: number;
}

const StockPage = () => {
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [quantityToAdd, setQuantityToAdd] = useState(0);
  const [newItem, setNewItem] = useState<Partial<StockItem>>({
    name: "",
    price: 0,
    quantity: 0
  });
  
  // Separate error states for each modal
  const [addError, setAddError] = useState("");
  const [editError, setEditError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const { data, error } = await supabase
        .from('food')
        .select('*')
        .order('name');

      if (error) throw error;
      setItems(data);
    } catch (err) {
      console.error('Error fetching stock:', err);
      setLoadingError("Erreur lors du chargement du stock");
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    try {
      // Validate quantity
      if (newItem.quantity! < 0) {
        setAddError("La quantité ne peut pas être négative");
        return;
      }

      // Validate name is not empty
      if (!newItem.name || newItem.name.trim() === '') {
        setAddError("Le nom de l'article ne peut pas être vide");
        return;
      }

      // Check if an item with the same name already exists
      const { data: existingItems, error: checkError } = await supabase
        .from('food')
        .select('name')
        .eq('name', newItem.name)
        .limit(1);

      if (checkError) throw checkError;
      
      if (existingItems && existingItems.length > 0) {
        setAddError("Un article avec ce nom existe déjà");
        return;
      }

      // Create a new object with only the fields we want to insert
      // Explicitly excluding food_id to let the database generate it
      const itemToInsert = {
        name: newItem.name,
        price: newItem.price || 0,
        quantity: newItem.quantity || 0
      };

      // Insert the new item
      const { error } = await supabase
        .from('food')
        .insert([itemToInsert]);

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }

      setIsAddModalOpen(false);
      setNewItem({ name: "", price: 0, quantity: 0 });
      setAddError(""); // Clear error
      fetchStock();
    } catch (err) {
      console.error('Error adding item:', err);
      setAddError("Erreur lors de l'ajout de l'article");
    }
  };

  const handleUpdateItem = async () => {
    if (!selectedItem) return;

    try {
      const newQuantity = selectedItem.quantity + quantityToAdd;
      
      // Validate new quantity
      if (newQuantity < 0) {
        setEditError("La quantité ne peut pas être négative");
        return;
      }

      const { error } = await supabase
        .from('food')
        .update({
          name: selectedItem.name,
          price: selectedItem.price,
          quantity: newQuantity
        })
        .eq('food_id', selectedItem.food_id);

      if (error) throw error;

      setIsEditModalOpen(false);
      setSelectedItem(null);
      setQuantityToAdd(0);
      setEditError(""); // Clear error
      fetchStock();
    } catch (err) {
      console.error('Error updating item:', err);
      setEditError("Erreur lors de la mise à jour de l'article");
    }
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) return;

    try {
      const { error } = await supabase
        .from('food')
        .delete()
        .eq('food_id', selectedItem.food_id);

      if (error) throw error;

      setIsDeleteModalOpen(false);
      setSelectedItem(null);
      setDeleteError(""); // Clear error
      fetchStock();
    } catch (err) {
      console.error('Error deleting item:', err);
      setDeleteError("Erreur lors de la suppression de l'article");
    }
  };

  const handleQuantityChange = (value: number) => {
    if (selectedItem && (selectedItem.quantity + value) < 0) {
      setEditError("La quantité ne peut pas être négative");
      return;
    }
    setQuantityToAdd(value);
    setEditError(""); // Clear error when valid quantity is entered
  };

  const handleNewItemQuantityChange = (value: number) => {
    if (value < 0) {
      setAddError("La quantité ne peut pas être négative");
      return;
    }
    setNewItem({ ...newItem, quantity: value });
    setAddError(""); // Clear error when valid quantity is entered
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Gestion du stock</h1>
          <button
            onClick={() => {
              setIsAddModalOpen(true);
              setAddError(""); // Clear any previous errors
            }}
            className="flex items-center justify-center space-x-2 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter un article</span>
          </button>
        </div>

        {loadingError && (
          <Alert severity="error" className="mb-6">
            {loadingError}
          </Alert>
        )}

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <Alert severity="info">Chargement du stock...</Alert>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.food_id}
                className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Coffee className="w-5 h-5 text-purple-500" />
                    <h3 className="text-lg font-medium">{item.name}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setQuantityToAdd(0);
                        setEditError(""); // Clear any previous errors
                        setIsEditModalOpen(true);
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setDeleteError(""); // Clear any previous errors
                        setIsDeleteModalOpen(true);
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Prix</span>
                    <span className="font-medium">{item.price}€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Quantité</span>
                    <span className="font-medium">{item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Modal */}
        <Dialog
          open={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setAddError(""); // Clear any errors when closing
          }}
          PaperProps={{
            style: {
              backgroundColor: '#1f2937',
              borderRadius: '1rem',
              color: 'white'
            }
          }}
        >
          <DialogTitle>Ajouter un article</DialogTitle>
          <DialogContent>
            <div className="space-y-4 pt-2">
              {addError && (
                <Alert severity="error" className="mb-4">
                  {addError}
                </Alert>
              )}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nom</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Prix</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: Math.max(0, parseFloat(e.target.value)) })}
                  className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Quantité initiale</label>
                <input
                  type="number"
                  min="0"
                  value={newItem.quantity}
                  onChange={(e) => handleNewItemQuantityChange(parseInt(e.target.value))}
                  className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setAddError(""); // Clear any errors when canceling
                  }}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddItem}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Modal */}
        <Dialog
          open={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditError(""); // Clear any errors when closing
          }}
          PaperProps={{
            style: {
              backgroundColor: '#1f2937',
              borderRadius: '1rem',
              color: 'white'
            }
          }}
        >
          <DialogTitle>Modifier l'article</DialogTitle>
          <DialogContent>
            <div className="space-y-4 pt-2">
              {editError && (
                <Alert severity="error" className="mb-4">
                  {editError}
                </Alert>
              )}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nom</label>
                <input
                  type="text"
                  value={selectedItem?.name}
                  onChange={(e) => setSelectedItem(selectedItem ? { ...selectedItem, name: e.target.value } : null)}
                  className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Prix</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={selectedItem?.price}
                  onChange={(e) => setSelectedItem(selectedItem ? { ...selectedItem, price: Math.max(0, parseFloat(e.target.value)) } : null)}
                  className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Ajuster la quantité</label>
                <p className="text-gray-400 mb-2">Quantité actuelle : {selectedItem?.quantity}</p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(quantityToAdd - 1)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-500"
                    disabled={selectedItem?.quantity === 0 && quantityToAdd <= 0}
                  >
                    <MinusCircle className="w-6 h-6" />
                  </button>
                  <input
                    type="number"
                    value={quantityToAdd}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    className="w-24 bg-white/5 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantityToAdd + 1)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-green-500"
                  >
                    <PlusCircle className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Nouvelle quantité : {(selectedItem?.quantity || 0) + quantityToAdd}
                </p>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditError(""); // Clear any errors when canceling
                  }}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleUpdateItem}
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
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeleteError(""); // Clear any errors when closing
          }}
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
              {deleteError && (
                <Alert severity="error" className="mb-4">
                  {deleteError}
                </Alert>
              )}
              <p>Êtes-vous sûr de vouloir supprimer cet article ?</p>
              <p className="text-red-500">Cette action est irréversible.</p>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setDeleteError(""); // Clear any errors when canceling
                  }}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDeleteItem}
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

export default StockPage;