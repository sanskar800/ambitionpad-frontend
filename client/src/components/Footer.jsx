import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight, Twitter, Linkedin, Github } from 'lucide-react';
import ambitionLogo from '../assets/logo-ambition.png';

const Footer = () => {
    return (
        <motion.footer
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white relative overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 60px,
                            rgba(255, 255, 255, 0.02) 60px,
                            rgba(255, 255, 255, 0.02) 61px
                        )`
                    }}
                ></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Brand Section */}
                        <div className="lg:col-span-4 space-y-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="flex items-center space-x-4"
                            >
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-0.5">
                                    <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                        <img
                                            src={ambitionLogo}
                                            alt="Ambition Pad Logo"
                                            className="w-10 h-10 object-contain rounded-full"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        Ambition Pad
                                    </h3>
                                    <p className="text-sm text-gray-400">Remote Career Platform</p>
                                </div>
                            </motion.div>

                            <p className="text-gray-300 leading-relaxed max-w-md">
                                Connecting ambitious professionals with remote opportunities worldwide.
                                Build your career without boundaries and work from anywhere.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <div className="flex items-center text-gray-400 hover:text-white transition-colors group">
                                    <Mail className="w-4 h-4 mr-3 group-hover:text-blue-400 transition-colors" />
                                    <span className="text-sm">hello@ambitionpad.com</span>
                                </div>
                                <div className="flex items-center text-gray-400 hover:text-white transition-colors group">
                                    <Phone className="w-4 h-4 mr-3 group-hover:text-green-400 transition-colors" />
                                    <span className="text-sm">+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center text-gray-400 hover:text-white transition-colors group">
                                    <MapPin className="w-4 h-4 mr-3 group-hover:text-red-400 transition-colors" />
                                    <span className="text-sm">San Francisco, CA</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* For Job Seekers */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-white relative">
                                    For Job Seekers
                                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        'Browse Jobs',
                                        'Career Resources',
                                        'Resume Builder',
                                        'Interview Prep',
                                        'Salary Guide',
                                        'Remote Work Tips'
                                    ].map((link, index) => (
                                        <li key={index}>
                                            <a
                                                href="#"
                                                className="text-gray-400 hover:text-white transition-all duration-200 flex items-center group text-sm"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-200">{link}</span>
                                                <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* For Employers */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-white relative">
                                    For Employers
                                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        'Post a Job',
                                        'Search Candidates',
                                        'Pricing Plans',
                                        'Employer Branding',
                                        'Hiring Solutions',
                                        'Analytics Dashboard'
                                    ].map((link, index) => (
                                        <li key={index}>
                                            <a
                                                href="#"
                                                className="text-gray-400 hover:text-white transition-all duration-200 flex items-center group text-sm"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-200">{link}</span>
                                                <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Company */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-white relative">
                                    Company
                                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"></div>
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        'About Us',
                                        'Our Mission',
                                        'Careers',
                                        'Press Kit',
                                        'Privacy Policy',
                                        'Terms of Service'
                                    ].map((link, index) => (
                                        <li key={index}>
                                            <a
                                                href="#"
                                                className="text-gray-400 hover:text-white transition-all duration-200 flex items-center group text-sm"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-200">{link}</span>
                                                <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="py-8 border-t border-gray-700/50">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="text-center lg:text-left">
                            <h4 className="text-lg font-semibold text-white mb-2">Stay Updated</h4>
                            <p className="text-gray-400 text-sm">Get the latest remote job opportunities delivered to your inbox.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all min-w-[300px]"
                            />
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="py-8 border-t border-gray-700/50">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="text-center lg:text-left">
                            <p className="text-gray-400 text-sm">
                                &copy; {new Date().getFullYear()} Ambition Pad. All rights reserved.
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                                Empowering remote careers since 2024
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-400 text-sm mr-2">Follow us:</span>
                            {[
                                { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
                                { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
                                { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-300' }
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className={`w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-lg`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to top indicator */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </motion.footer>
    );
};

export default Footer;