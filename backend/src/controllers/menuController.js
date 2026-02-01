const MenuItem = require("../models/MenuItem");
const { validationResult } = require("express-validator");

// GET /api/menu
exports.getMenuItems = async (req, res) => {
  try {
    const { category, availability, minPrice, maxPrice } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (availability !== undefined)
      filter.isAvailable = availability === "true";

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const items = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu items" });
  }
};

// GET /api/menu/search?q=
exports.searchMenuItems = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    const items = await MenuItem.find({
      $text: { $search: query }
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};

// GET /api/menu/:id
exports.getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(400).json({ message: "Invalid menu item ID" });
  }
};

// POST /api/menu
exports.createMenuItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const menuItem = new MenuItem(req.body);
    const savedItem = await menuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to create menu item" });
  }
};

// PUT /api/menu/:id
exports.updateMenuItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to update menu item" });
  }
};

// DELETE /api/menu/:id
exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete menu item" });
  }
};

// PATCH /api/menu/:id/availability
exports.toggleAvailability = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    item.isAvailable = !item.isAvailable;
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(400).json({ message: "Failed to toggle availability" });
  }
};
