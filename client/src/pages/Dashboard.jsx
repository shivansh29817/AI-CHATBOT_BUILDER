import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    // Listen for auth state (handles async currentUser issue)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('✅ Logged-in user UID:', user.uid);
        try {
          const res = await axios.get(`http://localhost:5000/api/bots/${user.uid}`);
          console.log('✅ Fetched bots:', res.data);
          setBots(res.data);
        } catch (err) {
          console.error('❌ Error fetching bots:', err);
        }
      } else {
        console.warn('⚠️ No user is logged in');
      }

      setLoading(false);
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  return (
    <div>
      <h2>Your Bots</h2>
      {loading ? (
        <p>Loading...</p>
      ) : bots.length === 0 ? (
        <p>No bots created yet.</p>
      ) : (
        <ul>
          {bots.map((bot) => (
            <li key={bot._id}>
              <strong>{bot.name}</strong> – {bot.tone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
