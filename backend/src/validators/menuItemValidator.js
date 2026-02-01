const { body } = require("express-validator");

exports.createMenuItemValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("category")
    .isIn(["Appetizer", "Main Course", "Dessert", "Beverage"])
    .withMessage("Invalid category"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number"),
];

exports.updateMenuItemValidator = [
  body("name").optional().notEmpty(),
  body("category")
    .optional()
    .isIn(["Appetizer", "Main Course", "Dessert", "Beverage"]),
  body("price").optional().isNumeric(),
];
