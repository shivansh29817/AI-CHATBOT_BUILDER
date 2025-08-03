import express from 'express';
import { generateChatResponse } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', 
  (req, res, next) => {
    console.log('📥 Received POST /api/chat'); // log before auth
    next();
  },
  protect, 
  (req, res, next) => {
    console.log('✅ Auth successful, calling controller'); // after auth
    next();
  },
  generateChatResponse
);

export default router;
