import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/navbar.css';

const Navbar = () => {
    return (
        <motion.nav 
            className="navbar flex justify-between items-center px-10 py-4"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Link to="/" className="logo text-cyan-400 font-orbitron text-3xl">ImpactIndex</Link>
            <div className="flex space-x-8 text-white font-poppins">
                <Link to="/">Home</Link>
                <Link to="/analyze">Analyze</Link>
                <Link to="/about">About</Link>
            </div>
        </motion.nav>
    );
}

export default Navbar;
