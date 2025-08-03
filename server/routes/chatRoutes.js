import express from 'express';
import { generateChatResponse } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ POST /api/chat - Generate chatbot response (protected)
router.post('/', protect, generateChatResponse);

export default router;
