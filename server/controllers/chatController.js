// controllers/chatController.js

import Bot from '../models/Bot.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const generateChatResponse = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user.uid;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    // Get latest bot created by the user
    const bot = await Bot.findOne({ createdBy: userId }).sort({ createdAt: -1 });

    if (!bot) {
      return res.status(404).json({ error: 'No bot found for this user.' });
    }

    const { apiKey, tone, persona } = bot;

    if (!apiKey) {
      return res.status(400).json({ error: 'API key is missing for this bot.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const finalPrompt = `
      You are a chatbot with the following configuration:
      - Persona: ${persona}
      - Tone: ${tone}

      User says: "${prompt}"
      Respond accordingly:
    `;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error('❌ Chat error:', error.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
