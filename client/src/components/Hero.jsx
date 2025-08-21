import React, { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';

const Hero = () => {
    const [jobTitle, setJobTitle] = useState('');

    const popularTags = ['UI Designer', 'UX Researcher', 'Android', 'Admin'];

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Geometric Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-xl"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full blur-lg"></div>
                <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-200 rounded-full blur-2xl"></div>
                <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-green-200 rounded-full blur-lg"></div>
                <div className="absolute bottom-1/3 right-10 w-28 h-28 bg-yellow-200 rounded-full blur-xl"></div>

                {/* Striped pattern overlay */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(255, 255, 255, 0.1) 20px,
            rgba(255, 255, 255, 0.1) 40px
          )`
                }}></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 pt-32 pb-10">
                <div className="text-center max-w-4xl mx-auto space-y-12 min-h-[calc(100vh-8rem)] flex flex-col justify-center">

                    {/* Hero Title */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                <span className="block">Discover more than</span>
                                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    5000+ Jobs
                                </span>
                            </h1>

                            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>

                            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                Great platform for the job seeker that searching for
                                new career heights and passionate about startups.
                            </p>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-300">
                            <div className="flex items-center gap-0">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Enter the title, keywords or phrase"
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        className="w-full pl-6 pr-6 py-5 text-lg border-0 rounded-l-3xl focus:outline-none bg-transparent"
                                    />
                                </div>

                                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 mr-2">
                                    <Search className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Popular Tags */}
                    <div className="space-y-6">
                        <p className="text-gray-600 font-medium text-lg">Popular:</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {popularTags.map((tag, index) => (
                                <button
                                    key={index}
                                    className="px-6 py-3 bg-white/70 backdrop-blur-sm text-gray-700 rounded-2xl border border-white/40 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200 font-medium"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Hero;