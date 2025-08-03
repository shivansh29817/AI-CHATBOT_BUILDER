import Bot from '../models/Bot.js';

// @desc    Create a new chatbot
// @route   POST /api/bots
// @access  Private (requires Firebase auth)
export const createBot = async (req, res) => {
  try {
    const { name, tone, persona, samplePrompt, apiKey } = req.body;

    if (!req.user || !req.user.uid) {
      return res.status(401).json({ message: 'Unauthorized. No user found.' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Bot name is required.' });
    }

    const newBot = new Bot({
      name,
      tone,
      persona,
      samplePrompt,
      apiKey,
      createdBy: req.user.uid, // ✅ Store UID for filtering
    });

    const savedBot = await newBot.save();
    res.status(201).json(savedBot);
  } catch (error) {
    console.error('❌ Error creating bot:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all bots for the logged-in user
// @route   GET /api/bots
// @access  Private
export const getUserBots = async (req, res) => {
  try {
    if (!req.user || !req.user.uid) {
      return res.status(401).json({ message: 'Unauthorized. No user found.' });
    }

    const uid = req.user.uid;
    console.log('🔥 UID requesting bots:', uid);

    const bots = await Bot.find({ createdBy: uid }).sort({ createdAt: -1 });

    console.log('📦 Bots found:', bots.length);
    res.status(200).json(bots);
  } catch (error) {
    console.error('❌ Error fetching bots:', error.message);
    res.status(500).json({ message: 'Server error while fetching bots' });
  }
};

// @desc    Delete a bot by ID for the logged-in user
// @route   DELETE /api/bots/:id
// @access  Private
export const deleteBot = async (req, res) => {
  try {
    const botId = req.params.id;
    const userId = req.user.uid;

    const bot = await Bot.findOne({ _id: botId, createdBy: userId });

    if (!bot) {
      return res.status(404).json({ message: 'Bot not found or unauthorized.' });
    }

    await Bot.deleteOne({ _id: botId });
    res.status(200).json({ message: 'Bot deleted successfully.' });
  } catch (error) {
    console.error('❌ Error deleting bot:', error.message);
    res.status(500).json({ message: 'Server error while deleting bot.' });
  }
};
