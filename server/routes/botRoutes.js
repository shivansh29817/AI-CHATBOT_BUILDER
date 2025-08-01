 
// server/routes/botRoutes.js

import express from 'express';
import { createBot } from '../controllers/botController.js';

const router = express.Router();

// POST /api/bots - Create a new bot
router.post('/', createBot);

export default router;
