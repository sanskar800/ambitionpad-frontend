import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        About Ambition Pad
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Bridging talent with opportunity in the remote work era
                    </p>
                </motion.div>

                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
                >
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                            <p className="text-gray-700 text-lg mb-6">
                                We believe that great work can happen anywhere. Our mission is to connect talented professionals
                                with forward-thinking companies that embrace remote work, creating opportunities that transcend
                                geographical boundaries.
                            </p>
                            <p className="text-gray-700 text-lg">
                                Since 2020, we've helped over 50,000 professionals find their dream remote jobs while assisting
                                2,000+ companies build distributed teams of exceptional talent.
                            </p>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 w-full max-w-md">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
                                        <div className="text-gray-700">Remote Professionals</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-indigo-600 mb-2">2K+</div>
                                        <div className="text-gray-700">Global Companies</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
                                        <div className="text-gray-700">Success Rate</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-blue-600 mb-2">40+</div>
                                        <div className="text-gray-700">Countries</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Values Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Inclusivity",
                                description: "We champion equal opportunities for talent regardless of location, background, or experience level.",
                                icon: (
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                )
                            },
                            {
                                title: "Transparency",
                                description: "We maintain open communication with both job seekers and employers throughout the hiring process.",
                                icon: (
                                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                )
                            },
                            {
                                title: "Innovation",
                                description: "We continuously evolve our platform to meet the changing needs of the remote work landscape.",
                                icon: (
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                )
                            }
                        ].map((value, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
                                <div className="mb-5">{value.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Find Your Remote Dream Job?</h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Join thousands of professionals who have transformed their careers with RemoteConnect
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                            Browse Remote Jobs
                        </button>
                        <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-colors">
                            For Employers
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;