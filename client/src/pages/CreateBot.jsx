import React, { useState } from "react";
import "./CreateBot.css";
import { toast } from "react-toastify";

const CreateBot = () => {
  const [formData, setFormData] = useState({
    name: "",
    tone: "",
    persona: "",
    samplePrompt: "",
    apiKey: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Save formData to MongoDB via backend API
    try {
      const res = await fetch("/api/bots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Bot created successfully!");
        setFormData({
          name: "",
          tone: "",
          persona: "",
          samplePrompt: "",
          apiKey: "",
        });
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Server error.");
    }
  };

  return (
    <div className="create-bot-container">
      <h2>Create Your Chatbot</h2>
      <form onSubmit={handleSubmit} className="create-bot-form">
        <input
          type="text"
          name="name"
          placeholder="Bot Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tone"
          placeholder="Bot Tone (e.g., friendly, professional)"
          value={formData.tone}
          onChange={handleChange}
        />
        <textarea
          name="persona"
          placeholder="Bot Persona / Description"
          value={formData.persona}
          onChange={handleChange}
          rows="3"
        />
        <textarea
          name="samplePrompt"
          placeholder="Sample Prompt Behavior"
          value={formData.samplePrompt}
          onChange={handleChange}
          rows="3"
        />
        <input
          type="text"
          name="apiKey"
          placeholder="Your OpenAI/Gemini API Key (optional)"
          value={formData.apiKey}
          onChange={handleChange}
        />

        <button type="submit">Save Bot</button>
      </form>
    </div>
  );
};

export default CreateBot;
