const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

console.log('Server running in LOCAL-ONLY mode (no database)');

const app = express();
app.use(cors());
app.use(express.json());

// Enhanced MongoDB connection with auto-reconnect
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 5000,
  socketTimeoutMS: 30000,
  retryWrites: true,
  retryReads: true
};

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected to:', mongoose.connection.host);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected! Attempting to reconnect...');
  setTimeout(() => connectDB(), 5000);
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err.message);
});

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, mongooseOptions);
  } catch (err) {
    console.error('Initial connection failed:', err.message);
    process.exit(1); // Exit if first connection fails
  }
}

connectDB();

// Simple in-memory storage
const messages = [];

// Mock database routes
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  messages.push(req.body);
  res.json({ success: true });
});

// API Routes
app.use('/api/messages', require('./routes/messages'));

const server = http.createServer(app);

// Setup Sockets
require('./sockets/socket')(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
