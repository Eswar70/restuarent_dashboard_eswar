const express = require("express");
const router = express.Router();

const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} = require("../controllers/orderController");

const {
  createOrderValidator,
  updateOrderStatusValidator
} = require("../validators/orderValidator");

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", createOrderValidator, createOrder);
router.patch("/:id/status", updateOrderStatusValidator, updateOrderStatus);

module.exports = router;
