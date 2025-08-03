import express from 'express';
import { createBot, getUserBots, deleteBot } from '../controllers/botController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ POST /api/bots - Create a new bot (protected)
router.post('/', protect, createBot);

// ✅ GET /api/bots - Get all bots created by the logged-in user (protected)
router.get('/', protect, getUserBots);

// ✅ DELETE /api/bots/:id - Delete a bot by ID (protected)
router.delete('/:id', protect, deleteBot);

export default router;
