import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/home.css';

const Home = () => {
    return (
        <motion.section 
            className="home-section flex flex-col justify-center items-center text-center min-h-screen px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
        >
            <h1 className="title text-cyan-400 font-orbitron text-6xl mb-6">Welcome to ImpactIndex</h1>
            <p className="description text-gray-300 font-poppins max-w-xl mb-8">
                The AI-powered platform to verify and assess influencer credibility using real-time data analytics.
            </p>
            <Link to="/analyze" className="cta-button px-8 py-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-lg font-poppins text-lg text-black font-bold hover:scale-105 transition">
                Analyze Now
            </Link>
        </motion.section>
    );
}

export default Home;
