import mongoose from 'mongoose';

const botSchema = new mongoose.Schema({
  createdBy: { type: String, required: true }, // ✅ Firebase UID
  name: { type: String, required: true },
  tone: { type: String },
  persona: { type: String },
  samplePrompt: { type: String },
  apiKey: { type: String }
}, {
  timestamps: true
});

const Bot = mongoose.model('Bot', botSchema, 'Bots');

export default Bot;
