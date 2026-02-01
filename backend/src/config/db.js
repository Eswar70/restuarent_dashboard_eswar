const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || typeof uri !== "string") {
    console.error(
      "MongoDB connection failed: MONGODB_URI is not set. " +
      "Add MONGODB_URI in Render Dashboard → Your Service → Environment."
    );
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    } else {
      console.warn("⚠️  Running without database connection (development mode)");
    }
  }
};

module.exports = connectDB;
