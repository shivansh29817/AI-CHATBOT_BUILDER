// server/controllers/botController.js

import Bot from '../models/Bot.js';

// @desc    Create a new chatbot
// @route   POST /api/bots
// @access  Private (requires Firebase auth)
export const createBot = async (req, res) => {
  try {
    const { name, tone, persona, samplePrompt, apiKey } = req.body;

    // Ensure user is authenticated
    if (!req.user || !req.user.uid) {
      return res.status(401).json({ message: 'Unauthorized. No user found.' });
    }

    // Basic validation
    if (!name) {
      return res.status(400).json({ message: 'Bot name is required.' });
    }

    // Create and save the bot with UID
    const newBot = new Bot({
      name,
      tone,
      persona,
      samplePrompt,
      apiKey,
      createdBy: req.user.uid, // ✅ Store UID here
    });

    const savedBot = await newBot.save();

    res.status(201).json(savedBot);
  } catch (error) {
    console.error('Error creating bot:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
