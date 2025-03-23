// src/components/CTA.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="bg-[#0D0D0D] py-20 flex justify-center items-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#00E5FF] to-[#FF00FF] p-10 rounded-xl shadow-xl max-w-4xl w-full text-center relative z-10"
      >
        <h2 className="text-4xl font-bold text-white mb-4 uppercase font-orbitron">
          Ready to Uncover Influencer Trust?
        </h2>
        <p className="text-gray-200 mb-6">Analyze profiles and make data-backed decisions now.</p>
        <Link to="/analyze">
          <button className="bg-black hover:bg-gray-900 text-white py-3 px-8 rounded-full transition-all duration-300">
            Start Now
          </button>
        </Link>
      </motion.div>
      <div className="absolute w-60 h-60 bg-[#39FF14] opacity-10 rounded-full blur-3xl animate-ping bottom-[-20px] left-[-20px]"></div>
    </section>
  );
};

export default CTA;
