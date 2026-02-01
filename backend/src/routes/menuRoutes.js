const express = require("express");
const router = express.Router();

const {
  getMenuItems,
  searchMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability
} = require("../controllers/menuController");

const {
  createMenuItemValidator,
  updateMenuItemValidator
} = require("../validators/menuItemValidator");

router.get("/", getMenuItems);
router.get("/search", searchMenuItems);
router.get("/:id", getMenuItemById);
router.post("/", createMenuItemValidator, createMenuItem);
router.put("/:id", updateMenuItemValidator, updateMenuItem);
router.delete("/:id", deleteMenuItem);
router.patch("/:id/availability", toggleAvailability);

module.exports = router;
