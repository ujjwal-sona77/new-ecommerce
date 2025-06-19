import "dotenv/config";



// Verify environment variables
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in environment variables');
  process.exit(1);
}

import app from "./app.js";
import { createServer } from "http";
import connectDB from "./config/database.js";
connectDB();
// Import necessary modules and configurations
const PORT = process.env.PORT || 3000;
const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
