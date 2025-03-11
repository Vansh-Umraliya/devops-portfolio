require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
