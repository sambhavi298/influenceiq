// src/components/Hero.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-[#0D0D0D] text-white px-6 text-center relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-extrabold uppercase text-cyan-400 mb-6 font-orbitron"
      >
        ImpactIndex
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg max-w-xl text-gray-300 mb-8"
      >
        Evaluate Influencer Credibility with AI-driven Insights & Data Visualization.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Link to="/analyze">
          <button className="bg-[#00E5FF] hover:bg-[#00c8e0] text-black font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300">
            Get Started
          </button>
        </Link>
      </motion.div>

      {/* Glow effect */}
      <div className="absolute w-80 h-80 bg-[#39FF14] opacity-20 rounded-full blur-3xl animate-pulse top-[-50px] right-[-50px] z-0"></div>
    </section>
  );
};

export default Hero;
