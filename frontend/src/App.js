import React, { useEffect, useState } from "react";
import axios from "axios";
import Leaderboard from "./Leaderboard";

function App() {
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/mock-influencers")
      .then(response => setInfluencers(response.data))
      .catch(error => console.error("Error fetching influencers:", error));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-10">
      {/* Leaderboard */}
      <Leaderboard influencers={influencers} />

      {/* Influencer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {influencers.map((influencer, index) => (
          <div key={index} className="p-5 bg-gray-800 rounded-lg shadow-lg border border-gray-600">
            <h2 className="text-xl font-semibold text-white">{influencer.name}</h2>
            <p className="text-gray-400 italic">"{influencer.text}"</p>
            <p><strong>Emotion:</strong> {influencer.emotion}</p>
            <p><strong>Credibility:</strong> {influencer.credibility_score}</p>
            <p><strong>InfluenceIQ:</strong> {influencer.influenceiq_score}</p>
            <p><strong>News:</strong> {influencer.news}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
