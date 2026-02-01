import React, { useEffect, useState } from "react";
import Spinner from "./common/Spinner";

const initialState = {
  name: "",
  description: "",
  category: "Appetizer",
  price: "",
  ingredients: "",
  preparationTime: "",
  imageUrl: ""
};

const MenuForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        ingredients: initialData.ingredients?.join(", ") || ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    await onSubmit({
      ...form,
      price: Number(form.price),
      preparationTime: Number(form.preparationTime),
      ingredients: form.ingredients
        .split(",")
        .map(i => i.trim())
        .filter(Boolean)
    });

    setSaving(false);
    setForm(initialState);
  };

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
      <h3>{initialData ? "Edit Menu Item" : "Add Menu Item"}</h3>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Item Name" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        <select name="category" value={form.category} onChange={handleChange}>
          <option>Appetizer</option>
          <option>Main Course</option>
          <option>Dessert</option>
          <option>Beverage</option>
        </select>

        <input name="price" placeholder="Price ₹" value={form.price} onChange={handleChange} required />
        <input name="ingredients" placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={handleChange} />
        <input name="preparationTime" placeholder="Prep time (minutes)" value={form.preparationTime} onChange={handleChange} />

        {/* IMAGE URL + PREVIEW */}
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />

        {form.imageUrl && (
          <div style={{ marginTop: "10px" }}>
            <p style={{ fontSize: "13px", color: "#6b7280" }}>Image Preview</p>
            <img
              src={form.imageUrl}
              alt="Preview"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #e5e7eb"
              }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/120";
              }}
            />
          </div>
        )}

        <div style={{ marginTop: "14px", display: "flex", gap: "10px" }}>
          <button type="submit" disabled={saving}>
            {saving ? <Spinner size={16} /> : "Save Item"}
          </button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default MenuForm;
