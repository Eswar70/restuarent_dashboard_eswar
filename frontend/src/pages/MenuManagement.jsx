import React, { useEffect, useState, useCallback } from "react";
import {
  getMenuItems,
  searchMenuItems,
  toggleAvailability,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from "../services/menuService";
import useDebounce from "../hooks/useDebounce";
import MenuForm from "../components/MenuForm";
import Spinner from "../components/common/Spinner";
import toast from "react-hot-toast";

const MenuManagement = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search);

  // ✅ useCallback FIX
  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = debouncedSearch
        ? await searchMenuItems(debouncedSearch)
        : await getMenuItems();

      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  // ✅ ESLINT CLEAN
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleSave = async (data) => {
    try {
      if (editing) {
        const updated = await updateMenuItem(editing._id, data);
        setItems(items.map(i => (i._id === updated._id ? updated : i)));
        toast.success("Menu item updated");
      } else {
        const created = await createMenuItem(data);
        setItems([created, ...items]);
        toast.success("Menu item added");
      }
      setShowForm(false);
      setEditing(null);
    } catch {
      toast.error("Failed to save item");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await deleteMenuItem(id);
      setItems(items.filter(i => i._id !== id));
      toast.success("Item deleted");
    } catch {
      toast.error("Failed to delete item");
    }
  };

  const handleToggleAvailability = async (item) => {
    const backup = [...items];
    setItems(items.map(i =>
      i._id === item._id ? { ...i, isAvailable: !i.isAvailable } : i
    ));

    try {
      await toggleAvailability(item._id);
    } catch {
      setItems(backup);
      toast.error("Failed to update availability");
    }
  };

  if (loading) return <Spinner size={36} />;

  return (
    <div>
      <h2>Menu Management</h2>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button onClick={() => setShowForm(true)}>+ Add Item</button>
        <input
          placeholder="Search items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {showForm && (
        <MenuForm
          initialData={editing}
          onSubmit={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      <div style={{ display: "grid", gap: "12px", marginTop: "20px" }}>
        {items.map(item => (
          <div
            key={item._id}
            style={{
              background: "#fff",
              padding: "16px",
              borderRadius: "8px",
              display: "flex",
              gap: "16px",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            <img
              src={item.imageUrl || "https://via.placeholder.com/100"}
              alt={item.name}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />

            <div style={{ flex: 1 }}>
              <strong>{item.name}</strong>
              <div>₹{item.price} • {item.category}</div>
              <div style={{ color: item.isAvailable ? "green" : "red" }}>
                {item.isAvailable ? "Available" : "Unavailable"}
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => handleToggleAvailability(item)}>Toggle</button>
              <button onClick={() => { setEditing(item); setShowForm(true); }}>
                Edit
              </button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;
