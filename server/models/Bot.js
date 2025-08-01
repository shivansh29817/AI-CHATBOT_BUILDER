import mongoose from 'mongoose';

const botSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tone: { type: String },
  persona: { type: String },
  samplePrompt: { type: String },
  apiKey: { type: String }
}, {
  timestamps: true
});

const Bot = mongoose.model('Bot', botSchema, 'Bots');

export default Bot;  // ✅ FIXED: Default export
