require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// ✅ Fix CORS Issue
// app.use(
//   cors({
//     origin: "https://vercel-frontend-smoky.vercel.app", // Replace with your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true,
//   })
// );

// ✅ Additional Middleware to Fix CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://vercel-frontend-smoky.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ Verify Backend is Running
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
