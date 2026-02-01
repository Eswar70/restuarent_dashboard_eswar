const { body } = require("express-validator");

exports.createOrderValidator = [
  body("items").isArray({ min: 1 }).withMessage("Items are required"),
  body("items.*.menuItem").notEmpty().withMessage("Menu item is required"),
  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
  body("items.*.price")
    .isNumeric()
    .withMessage("Price must be a number"),
  body("totalAmount")
    .isNumeric()
    .withMessage("Total amount must be a number"),
];

exports.updateOrderStatusValidator = [
  body("status")
    .isIn(["Pending", "Preparing", "Ready", "Delivered", "Cancelled"])
    .withMessage("Invalid order status"),
];
