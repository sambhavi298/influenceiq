// /src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-black to-[#0d0d0d] text-white flex items-center justify-center px-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl text-center space-y-6">
        <h1 className="text-5xl font-bold text-cyan-400 uppercase">About ImpactIndex</h1>
        <p className="text-lg text-gray-300">
          ImpactIndex is a cutting-edge platform that evaluates and scores influencers based on credibility, engagement, and audience authenticity. Our goal is to bring transparency to the world of influencer marketing using AI-driven insights and robust data analytics.
        </p>
        <p className="text-md text-gray-400">
          Whether you're a brand looking to partner with trustworthy influencers or a content creator aiming to boost your credibility score, ImpactIndex has you covered.
        </p>
      </div>
    </motion.div>
  );
};

export default About;
