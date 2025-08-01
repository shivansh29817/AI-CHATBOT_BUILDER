import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Dashboard.css';
import BASE_URL from '../config'; // ✅ Import the centralized base URL

const Dashboard = () => {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.warn('⚠️ No user is logged in');
        setLoading(false);
        return;
      }

      try {
        const token = await user.getIdToken();

        const res = await axios.get(`${BASE_URL}/api/bots`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBots(res.data);
        console.log('✅ Bots fetched:', res.data);
      } catch (error) {
        console.error('❌ Failed to fetch bots:', error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Your Bots</h2>
      {loading ? (
        <p>Loading...</p>
      ) : bots.length === 0 ? (
        <p>No bots created yet.</p>
      ) : (
        <ul className="bot-list">
          {bots.map((bot) => (
            <li key={bot._id} className="bot-card">
              <h3>{bot.name}</h3>
              <p><strong>Tone:</strong> {bot.tone || 'N/A'}</p>
              <p><strong>Persona:</strong> {bot.persona || 'N/A'}</p>
              <p><strong>Sample Prompt:</strong> {bot.samplePrompt || 'N/A'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
