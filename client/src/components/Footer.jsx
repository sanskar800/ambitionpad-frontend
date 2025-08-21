import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github } from 'lucide-react';
import ambitionLogo from '../assets/logo-ambition.png';

const Footer = () => {
    return (
        <motion.footer
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white py-6"
        >
            <div className="container mx-auto px-4 py-8 sm:px-8 lg:px-16 xl:px-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* First Column: Logo */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="flex flex-col items-start space-y-4"
                    >
                        <Link to="/" className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-0.5">
                                <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                    <img
                                        src={ambitionLogo}
                                        alt="Ambition Pad Logo"
                                        className="w-8 h-8 object-contain rounded-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Ambition Pad
                                </h3>
                                <p className="text-xs text-gray-400">Remote Career Platform</p>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Second Column: For Job Seekers */}
                    <div className="space-y-4">
                        <h4 className="text-md font-semibold text-white relative">
                            For Job Seekers
                            <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        </h4>
                        <ul className="space-y-3">
                            {['Browse Jobs', 'Join Our Talent Pool'].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link === 'Browse Jobs' ? '/jobs' : '#'}
                                        className="text-gray-400 hover:text-white transition-all duration-200 flex items-center group text-sm"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-200">{link}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Third Column: Company */}
                    <div className="space-y-4">
                        <h4 className="text-md font-semibold text-white relative">
                            Company
                            <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"></div>
                        </h4>
                        <ul className="space-y-3">
                            {['About Us', 'Blogs', 'Terms of Service', 'Privacy Policy'].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link === 'About Us' ? '/about' : link === 'Blogs' ? '/blogs' : link === 'Terms of Service' ? '/terms' : '/privacy'}
                                        className="text-gray-400 hover:text-white transition-all duration-200 flex items-center group text-sm"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-200">{link}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Fourth Column: Follow Us */}
                    <div className="space-y-4">
                        <h4 className="text-md font-semibold text-white relative">
                            Follow Us
                            <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        </h4>
                        <div className="flex items-center space-x-4">
                            {[
                                { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
                                { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
                                { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-300' }
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className={`w-8 h-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-lg`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-18 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Ambition Pad. All rights reserved.
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;