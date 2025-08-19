import React, { useState } from 'react';
import { Search, MapPin, TrendingUp } from 'lucide-react';
import heroImg from '../assets/hero-img.png';

const Hero = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('Florence, Italy');

    const popularTags = ['UI Designer', 'UX Researcher', 'Android', 'Admin'];

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Geometric Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-xl"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full blur-lg"></div>
                <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-200 rounded-full blur-2xl"></div>

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
            <div className="relative z-10 container mx-auto px-4 pt-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                Discover
                                <br />
                                <span className="text-gray-800">more than</span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    5000+ Jobs
                                </span>
                            </h1>

                            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>

                            <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                                Great platform for the job seeker that searching for
                                new career heights and passionate about startups.
                            </p>
                        </div>

                        {/* Search Section */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Job title or keywords"
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg whitespace-nowrap">
                                    Search Remote Jobs
                                </button>
                            </div>
                        </div>

                        {/* Popular Tags */}
                        <div className="space-y-3">
                            <p className="text-gray-600 font-medium">Popular:</p>
                            <div className="flex flex-wrap gap-3">
                                {popularTags.map((tag, index) => (
                                    <button
                                        key={index}
                                        className="px-4 py-2 bg-white/60 backdrop-blur-sm text-gray-700 rounded-lg border border-white/30 hover:bg-white/80 hover:shadow-md transition-all duration-200"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Hero Image */}
                    <div className="relative">
                        <div className="relative z-10">
                            {/* Hero Image Container */}
                            <div className="w-full h-[600px] relative">
                                <img
                                    src={heroImg}
                                    alt="Job seeker professional"
                                    className="w-full h-full object-contain"
                                />

                                {/* Geometric decorations */}
                                <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-300/80 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-20 right-10 w-12 h-12 bg-pink-300/80 rounded-full animate-bounce"></div>
                                <div className="absolute top-1/2 left-5 w-8 h-8 bg-blue-300/80 rounded-full animate-pulse"></div>

                                {/* Success indicators */}
                                <div className="absolute top-16 right-16 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                                        <span className="text-sm font-medium text-gray-700">Job Match Found!</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-16 left-16 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                                    <div className="flex items-center space-x-2">
                                        <TrendingUp className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm font-medium text-gray-700">Career Growth</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -top-8 -left-8 w-24 h-24 bg-purple-300/30 rounded-full blur-sm"></div>
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-300/30 rounded-full blur-sm"></div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Hero;