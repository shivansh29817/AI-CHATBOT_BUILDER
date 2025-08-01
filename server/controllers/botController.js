 
// server/controllers/botController.js

import Bot from '../models/Bot.js';

// @desc    Create a new chatbot
// @route   POST /api/bots
// @access  Public
export const createBot = async (req, res) => {
  try {
    const { name, tone, persona, samplePrompt, apiKey } = req.body;

    // Basic validation
    if (!name) {
      return res.status(400).json({ message: 'Bot name is required.' });
    }

    // Create and save the bot
    const newBot = new Bot({ name, tone, persona, samplePrompt, apiKey });
    const savedBot = await newBot.save();

    res.status(201).json(savedBot);
  } catch (error) {
    console.error('Error creating bot:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
