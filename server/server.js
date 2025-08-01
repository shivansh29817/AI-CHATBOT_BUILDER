// server/server.js

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import botRoutes from './routes/botRoutes.js';

dotenv.config();
import cors from "cors";


const app = express();
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Bot routes
app.use('/api/bots', botRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });