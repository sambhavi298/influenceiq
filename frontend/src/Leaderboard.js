import React from "react";

const Leaderboard = () => {
    const topThree = [
        { name: "Lopendebank3", points: 5560, color: "bg-green-500", place: 1 },
        { name: "Norme_Debiel", points: 4615, color: "bg-gray-500", place: 2 },
        { name: "DJUHHHHHHH", points: 3260, color: "bg-red-500", place: 3 }
    ];

    const others = [
        { name: "Influencer4", points: 2900 },
        { name: "Influencer5", points: 2750 },
        { name: "Influencer6", points: 2600 }
    ];

    return (
        <div className="p-8 text-center text-white">
            <h1 className="text-4xl font-bold text-left">InfluenceIQ</h1>
            
            {/* Top 3 Ranking */}
            <div className="flex justify-center items-end mt-8 space-x-4">
                {topThree.sort((a, b) => a.place - b.place).map((influencer) => (
                    <div key={influencer.name} className={`p-4 ${influencer.color} rounded-lg shadow-lg w-32 text-center`}>
                        <p className="text-lg font-bold">#{influencer.place}</p>
                        <p className="text-xl">{influencer.name}</p>
                        <p className="text-sm">{influencer.points} points</p>
                    </div>
                ))}
            </div>
            
            {/* Other Influencers */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {others.map((influencer, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                        <p className="text-lg font-bold">{influencer.name}</p>
                        <p className="text-sm">{influencer.points} points</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
