import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../assets/logo-ambition.png';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-white shadow-md sticky top-0 z-50"
        >
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <img
                        src={Logo}
                        alt="Ambition Pad Logo"
                        className="w-10 h-10 object-cover rounded-full border border-gray-300"
                    />
                    <span className="text-xl font-bold text-gray-800">
                        Ambition Pad
                    </span>
                </Link>

                <div className="hidden md:flex space-x-8">
                    <Link to="/" className="font-medium hover:text-blue-600 transition-colors">Home</Link>
                    <Link to="/jobs" className="font-medium hover:text-blue-600 transition-colors">Browse Jobs</Link>
                    <Link to="/post-job" className="font-medium hover:text-blue-600 transition-colors">Post Job</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                        Sign In
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
