const express = require("express");
const router = express.Router();

const {
  getTopSellingMenuItems
} = require("../controllers/analyticsController");

router.get("/top-selling-items", getTopSellingMenuItems);

module.exports = router;
