import { motion } from 'framer-motion';
import { useState } from 'react';
import '../styles/analyze.css';

const Analyze = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);

    const handleAnalyze = () => {
        // Placeholder logic
        setResult({
            credibilityScore: Math.floor(Math.random() * 100),
            trustLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        });
    }

    return (
        <motion.section 
            className="analyze-section flex flex-col justify-center items-center min-h-screen px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
        >
            <h2 className="text-4xl font-orbitron text-cyan-400 mb-6">Run Influencer Analysis</h2>
            <input 
                type="text" 
                placeholder="Enter Influencer Username or URL"
                className="input-box px-6 py-3 rounded-md font-poppins w-80 mb-4 text-black"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button 
                onClick={handleAnalyze}
                className="analyze-btn px-8 py-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-lg font-poppins text-lg text-black font-bold hover:scale-105 transition"
            >
                Analyze
            </button>
            {result && (
                <motion.div 
                    className="result mt-8 p-6 bg-neutral-900 rounded-md text-white w-96 text-left"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <p><strong>Credibility Score:</strong> {result.credibilityScore}%</p>
                    <p><strong>Trust Level:</strong> {result.trustLevel}</p>
                </motion.div>
            )}
        </motion.section>
    );
}

export default Analyze;
