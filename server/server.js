// server/server.js

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import botRoutes from './routes/botRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize Express app
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// ✅ Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Routes
app.use('/api/bots', botRoutes);
app.use('/api/chat', chatRoutes); // Add authMiddleware later if needed

// ✅ Port
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB and start server
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
