import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Building2, Users, TrendingUp } from 'lucide-react';
import heroImg from '../assets/heroo-img.png';

// Counter animation component
const CountUp = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                    let startTime = null;

                    const animate = (currentTime) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);

                        const easeOut = 1 - Math.pow(1 - progress, 2);
                        const currentCount = Math.floor(easeOut * end);

                        setCount(currentCount);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );

        const element = document.getElementById(`counter-${end}`);
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, [end, duration, hasStarted]);

    return (
        <span id={`counter-${end}`}>
            {count.toLocaleString()}{suffix}
        </span>
    );
};

const Hero = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');

    const suggestions = ['Designer', 'Programming', 'Digital Marketing', 'Video', 'Animation'];

    const stats = [
        { icon: Briefcase, label: 'Live Job', count: 5000, suffix: '+' },
        { icon: Building2, label: 'Companies', count: 300, suffix: '+' },
        { icon: Users, label: 'Candidates', count: 3000, suffix: '+' },
        { icon: TrendingUp, label: 'New Jobs', count: 2200, suffix: '' }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-16">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                    {/* Left Side - Content */}
                    <div className="flex-1 space-y-8 text-center lg:text-left fade-in">
                        {/* Heading */}
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                                Find a job that suits your interest & skills.
                            </h1>

                            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                                Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget sollicitudin velit bestibulum.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="space-y-4">
                            <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-lg max-w-2xl hover:shadow-xl transition-shadow duration-300">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            placeholder="Job title, Keyword…"
                                            value={jobTitle}
                                            onChange={(e) => setJobTitle(e.target.value)}
                                            className="w-full px-4 py-3 text-gray-700 rounded-xl border-0 focus:outline-none bg-gray-50 focus:bg-white transition-colors duration-200"
                                        />
                                    </div>

                                    <div className="flex-1 relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Your Location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 text-gray-700 rounded-xl border-0 focus:outline-none bg-gray-50 focus:bg-white transition-colors duration-200"
                                        />
                                    </div>

                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2">
                                        <Search className="w-5 h-5" />
                                        Find Job
                                    </button>
                                </div>
                            </div>

                            {/* Suggestions */}
                            <div className="text-sm text-gray-500 max-w-2xl">
                                <span className="font-medium">Suggestion: </span>
                                {suggestions.map((suggestion, index) => (
                                    <span key={index}>
                                        <span
                                            className={suggestion === 'Digital Marketing' ? 'text-blue-600 font-medium' : ''}
                                        >
                                            {suggestion}
                                        </span>
                                        {index < suggestions.length - 1 && ', '}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Hero Image */}
                    <div className="flex-1 flex justify-center lg:justify-end fade-in-delay">
                        <div className="w-full max-w-md lg:max-w-lg">
                            <img
                                src={heroImg}
                                alt="Person with laptop and creative icons"
                                className="w-full h-auto"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            {/* Fallback placeholder */}
                            <div
                                className="hidden w-full h-80 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl items-center justify-center"
                                style={{ display: 'none' }}
                            >
                                <div className="text-center space-y-4">
                                    <div className="w-20 h-20 bg-blue-200 rounded-full mx-auto flex items-center justify-center">
                                        <Briefcase className="w-10 h-10 text-blue-600" />
                                    </div>
                                    <p className="text-gray-500 text-sm">Hero Image</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                        <IconComponent className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-black">
                                            <CountUp
                                                end={stat.count}
                                                duration={1500}
                                                suffix={stat.suffix}
                                            />
                                        </div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                .fade-in {
                    opacity: 0;
                    animation: fadeIn 0.8s ease-out 0.2s forwards;
                }

                .fade-in-delay {
                    opacity: 0;
                    animation: fadeIn 0.8s ease-out 0.4s forwards;
                }

                @keyframes fadeIn {
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default Hero;