import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/logo-ambition.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-white shadow-md sticky top-0 z-50"
        >
            <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3" onClick={closeMenu}>
                        <img
                            src={Logo}
                            alt="Ambition Pad Logo"
                            className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full border border-gray-300"
                        />
                        <span className="text-lg sm:text-xl font-bold text-gray-800">
                            Ambition Pad
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                        >
                            Browse Jobs
                        </Link>
                    </div>

                    {/* Desktop CTA Button */}
                    <div className="hidden md:flex items-center">
                        <button className="px-6 py-2.5 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap">
                            Join Our Talent Pool
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
                            aria-expanded={isOpen}
                            aria-label="Toggle navigation menu"
                        >
                            <svg
                                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <svg
                                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden mt-4 border-t border-gray-200 pt-4"
                        >
                            <div className="flex flex-col space-y-4">
                                <Link
                                    to="/"
                                    className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 px-2 py-1"
                                    onClick={closeMenu}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/jobs"
                                    className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 px-2 py-1"
                                    onClick={closeMenu}
                                >
                                    Browse Jobs
                                </Link>
                                <div className="pt-2">
                                    <button
                                        className="w-full px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
                                        onClick={closeMenu}
                                    >
                                        Join Our Talent Pool
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;