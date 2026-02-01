const dotenv = require("dotenv");
dotenv.config();

// Use public DNS for MongoDB Atlas SRV lookup (fixes querySrv ECONNREFUSED)
require("dns").setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require("mongoose");
const MenuItem = require("../models/MenuItem");
const Order = require("../models/Order");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

const seedMenuItems = async () => {
  await MenuItem.deleteMany();

  return MenuItem.insertMany([
    {
      name: "Spring Rolls",
      category: "Appetizer",
      price: 120,
      ingredients: ["Cabbage", "Carrot"],
      preparationTime: 10,
      imageUrl: "https://images.unsplash.com/photo-1604909052743-94e838986d24"
    },
    {
      name: "Chicken Biryani",
      category: "Main Course",
      price: 250,
      ingredients: ["Chicken", "Rice", "Spices"],
      preparationTime: 30,
      imageUrl: "https://tse4.mm.bing.net/th/id/OIP.r6T2zRnyrrP8LdtOEaGVowHaGl?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "Paneer Butter Masala",
      category: "Main Course",
      price: 220,
      ingredients: ["Paneer", "Butter", "Tomato"],
      preparationTime: 25,
      imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7"
    },
    {
      name: "French Fries",
      category: "Appetizer",
      price: 100,
      ingredients: ["Potato", "Salt"],
      preparationTime: 8,
      imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add"
    },
    {
      name: "Cheesecake",
      category: "Dessert",
      price: 180,
      ingredients: ["Cheese", "Sugar"],
      preparationTime: 15,
      imageUrl: "https://tse1.mm.bing.net/th/id/OIP.wj0WdSLEgUwiuOS6ugdrMQHaLH?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "Chocolate Brownie",
      category: "Dessert",
      price: 150,
      ingredients: ["Chocolate", "Flour"],
      preparationTime: 15,
      imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
    },
    {
      name: "Coke",
      category: "Beverage",
      price: 50,
      imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97"
    },
    {
      name: "Veg Burger",
      category: "Main Course",
      price: 160,
      imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349"
    }
  ]);
};

const seedOrders = async (menuItems) => {
  await Order.deleteMany();

  await Order.insertMany([
    {
      orderNumber: "ORD-SEED-001",
      items: [
        {
          menuItem: menuItems[1]._id,
          quantity: 2,
          price: 250
        }
      ],
      totalAmount: 500,
      status: "Pending",
      customerName: "Ravi",
      tableNumber: 3
    },
    {
      orderNumber: "ORD-SEED-002",
      items: [
        {
          menuItem: menuItems[4]._id,
          quantity: 1,
          price: 180
        }
      ],
      totalAmount: 180,
      status: "Delivered",
      customerName: "Anita",
      tableNumber: 1
    },
    {
      orderNumber: "ORD-SEED-003",
      items: [
        {
          menuItem: menuItems[7]._id,
          quantity: 1,
          price: 160
        },
        {
          menuItem: menuItems[6]._id,
          quantity: 2,
          price: 50
        }
      ],
      totalAmount: 260,
      status: "Preparing",
      customerName: "Kiran",
      tableNumber: 5
    }
  ]);
};

const runSeed = async () => {
  try {
    await connectDB();
    const menuItems = await seedMenuItems();
    await seedOrders(menuItems);

    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

runSeed();
