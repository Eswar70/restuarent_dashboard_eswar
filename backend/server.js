const dotenv = require("dotenv");
dotenv.config();

// Fix for querySrv ECONNREFUSED on Windows / some networks (use public DNS for MongoDB Atlas SRV lookup)
// Use public DNS so MongoDB Atlas SRV lookup works (fixes querySrv ECONNREFUSED on some networks/Windows)
require("dns").setServers(["1.1.1.1", "8.8.8.8"]);

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
