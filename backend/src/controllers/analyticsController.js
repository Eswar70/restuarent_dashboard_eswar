const Order = require("../models/Order");

exports.getTopSellingMenuItems = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $unwind: "$items"
      },
      {
        $group: {
          _id: "$items.menuItem",
          totalQuantitySold: { $sum: "$items.quantity" }
        }
      },
      {
        $lookup: {
          from: "menuitems",
          localField: "_id",
          foreignField: "_id",
          as: "menuItem"
        }
      },
      {
        $unwind: "$menuItem"
      },
      {
        $sort: { totalQuantitySold: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          _id: 0,
          menuItemId: "$menuItem._id",
          name: "$menuItem.name",
          category: "$menuItem.category",
          price: "$menuItem.price",
          totalQuantitySold: 1
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch top selling items" });
  }
};
