require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { seedAnimals } = require('./controllers/animalController');

const app = express();

// Connect to MongoDB
connectDB().then(() => seedAnimals());

// Middleware
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:4201'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Routes
app.use('/api/animals', require('./routes/animals'));
app.use('/api/scores', require('./routes/scores'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Kids Games API running!', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API Docs: http://localhost:${PORT}/api/health`);
});
