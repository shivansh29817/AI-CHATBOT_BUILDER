import mongoose from 'mongoose';

const botSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tone: {
      type: String,
      required: true,
    },
    persona: {
      type: String,
      required: true,
    },
    samplePrompt: {
      type: String,
      required: false,
    },
    apiKey: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String, // Firebase UID
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bot = mongoose.model('Bot', botSchema);

export default Bot;
