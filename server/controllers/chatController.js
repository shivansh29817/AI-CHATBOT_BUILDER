// controllers/chatController.js
import axios from 'axios';
import Bot from '../models/Bot.js';
import { decryptApiKey } from '../utils/crypto.js';
import dotenv from 'dotenv';
dotenv.config();

export const generateChatResponse = async (req, res) => {
  try {
    console.log('➡️ Received chat request');
    const { prompt } = req.body;
    const userId = req.user.uid;
    console.log('🧾 Prompt:', prompt);
    console.log('👤 UserID:', userId);

    if (!prompt) {
      console.log('❌ Missing prompt');
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const bot = await Bot.findOne({ createdBy: userId }).sort({ createdAt: -1 });
    console.log('🤖 Bot Found:', bot);

    if (!bot) {
      console.log('❌ No bot found');
      return res.status(404).json({ error: 'No bot found for this user.' });
    }

    const { apiKey: encryptedApiKey, tone, persona } = bot;

    let decryptedApiKey = null;
    if (encryptedApiKey && encryptedApiKey.trim() !== '') {
      try {
        decryptedApiKey = decryptApiKey(encryptedApiKey);
        console.log('🔓 API key decrypted successfully');
      } catch (error) {
        console.error('❌ Error decrypting API key:', error.message);
        console.log('🔄 Falling back to default API key');
      }
    }

    const apiKeyToUse = decryptedApiKey || process.env.DEFAULT_API_KEY;

    if (!apiKeyToUse) {
      console.log('❌ No valid API key found (user + default)');
      return res.status(400).json({ error: 'No valid API key available.' });
    }

    console.log(`🔑 Using ${decryptedApiKey ? 'user-provided (decrypted)' : 'default'} API key`);

    const finalPrompt = `
You are a chatbot with the following configuration:
- Persona: ${persona}
- Tone: ${tone}

User says: "${prompt}"
Respond accordingly:
    `;

    console.log('📤 Sending prompt to Gemini...');

    const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

    const geminiRes = await axios.post(
      geminiUrl,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: finalPrompt }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKeyToUse,
        },
      }
    );

    const text = geminiRes.data.candidates[0].content.parts[0].text;
    console.log('✅ Gemini response received');
    res.json({ reply: text });

  } catch (error) {
    console.error('❌ Chat error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
