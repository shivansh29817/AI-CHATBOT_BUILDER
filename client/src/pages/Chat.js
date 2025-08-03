import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [botId, setBotId] = useState(null); // Optional: can be selected from dropdown if multiple bots
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Set botId if you want to use specific one
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();

      const res = await axios.post(
        'https://ai-chatbot-builder-1.onrender.com/api/chat',
        {
          prompt: input,
          botId: botId, // Optional
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const reply = res.data.reply;
      setMessages([...newMessages, { role: 'assistant', text: reply }]);
    } catch (err) {
      console.error('❌ Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h2>💬 IntelliBot Chat</h2>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.role}`}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
        {loading && <div className="chat-message assistant">Typing...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your bot something..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
