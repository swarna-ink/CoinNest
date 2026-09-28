// backend/server.js
// Express Server Main Setup

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// Environment Variables Load
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transactions', require('./routes/transactionRoutes'));

// Test Route
app.get('/', (req, res) => {
  res.send('CoinNest API is running smoothly...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});