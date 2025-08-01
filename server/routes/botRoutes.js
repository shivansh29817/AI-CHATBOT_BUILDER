import express from 'express';
import { createBot } from '../controllers/botController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/bots
// @access  Private
router.post('/', protect, createBot);

// You can add GET later when needed
// router.get('/', protect, getUserBots);

export default router;
