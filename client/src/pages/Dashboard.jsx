import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Dashboard.css";
import BASE_URL from "../config"; // ✅ Centralized base URL

const Dashboard = () => {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.warn("⚠️ No user is logged in");
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
        console.log("✅ Bots fetched:", res.data);
      } catch (error) {
        console.error("❌ Failed to fetch bots:", error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (botId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bot?"
    );
    if (!confirmDelete) return;

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("❌ No user logged in for deletion");
        return;
      }

      const token = await user.getIdToken();

      await axios.delete(`${BASE_URL}/api/bots/${botId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBots((prevBots) => prevBots.filter((bot) => bot._id !== botId));
      console.log(`🗑 Bot ${botId} deleted`);
    } catch (error) {
      console.error("❌ Failed to delete bot:", error);
      alert("Failed to delete bot. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Your Bots</h2>
      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading your bots...</p>
        </div>
      ) : bots.length === 0 ? (
        <div className="empty-state">
          <p>No bots created yet.</p>
          <small>Create your first bot to get started!</small>
        </div>
      ) : (
        <div className="table-container">
          <table className="bots-table">
            <thead>
              <tr>
                <th>Bot Name</th>
                <th>Tone</th>
                <th>Persona</th>
                <th>Sample Prompt</th>
                
              </tr>
            </thead>
            <tbody>
              {bots.map((bot) => (
                <tr key={bot._id}>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <strong>{bot.name}</strong>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(bot._id)}
                        style={{ marginTop: "6px", padding: "4px 8px" }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td>{bot.tone}</td>
                  <td>{bot.persona}</td>
                  <td>{bot.samplePrompt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
