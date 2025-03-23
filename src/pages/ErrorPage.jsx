import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-9xl font-extrabold tracking-widest text-[#FF00FF]">404</h1>
      <div className="bg-[#FF00FF] px-4 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <p className="mt-5 text-lg text-gray-400">Oops! The page you're looking for does not exist.</p>
      <Link to="/" className="mt-8">
        <button className="relative px-8 py-3 font-semibold bg-[#00E5FF] text-black rounded-md shadow-lg hover:scale-105 transition-all">
          Go Home
        </button>
      </Link>
    </motion.div>
  );
};

export default ErrorPage;
