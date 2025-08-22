import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Building2, Users, TrendingUp, Loader2 } from 'lucide-react';
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
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

    const popularCities = [
        'New York, United States',
        'London, United Kingdom',
        'Toronto, Canada',
        'Sydney, Australia',
        'Berlin, Germany',
        'Tokyo, Japan',
        'Mumbai, India',
        'Dubai, UAE'
    ];

    const suggestions = ['Designer', 'Programming', 'Digital Marketing', 'Video', 'Animation'];

    const stats = [
        { icon: Briefcase, label: 'Live Job', count: 5000, suffix: '+' },
        { icon: Building2, label: 'Companies', count: 300, suffix: '+' },
        { icon: Users, label: 'Candidates', count: 3000, suffix: '+' },
        { icon: TrendingUp, label: 'New Jobs', count: 2200, suffix: '' }
    ];

    // Get user's location
    const getUserLocation = async () => {
        setIsLoadingLocation(true);
        console.log('Starting location detection...');

        // First try IP-based location (works everywhere)
        try {
            console.log('Trying IP-based location...');
            const response = await fetch('https://ipapi.co/json/');

            if (response.ok) {
                const data = await response.json();
                console.log('IP location data:', data);

                if (data.city && data.country_name) {
                    const locationStr = `${data.city}, ${data.country_name}`;
                    setLocation(locationStr);
                    setIsLoadingLocation(false);
                    console.log('IP location set:', locationStr);
                    return;
                }
            }
        } catch (error) {
            console.error('IP location failed:', error);
        }

        // Fallback: Try another IP service
        try {
            console.log('Trying backup IP service...');
            const response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=free');

            if (response.ok) {
                const data = await response.json();
                console.log('Backup IP data:', data);

                if (data.city && data.country_name) {
                    const locationStr = `${data.city}, ${data.country_name}`;
                    setLocation(locationStr);
                    setIsLoadingLocation(false);
                    console.log('Backup IP location set:', locationStr);
                    return;
                }
            }
        } catch (error) {
            console.error('Backup IP location failed:', error);
        }

        // If HTTPS, try GPS location
        if (navigator.geolocation && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
            console.log('Trying GPS location...');
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        console.log('GPS coordinates:', latitude, longitude);

                        const response = await fetch(
                            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                        );

                        if (response.ok) {
                            const data = await response.json();
                            console.log('GPS reverse geocoding data:', data);
                            const locationStr = `${data.city || data.locality || ''}, ${data.countryName || ''}`.replace(/^,\s*/, '');
                            if (locationStr.trim() !== ',') {
                                setLocation(locationStr);
                                console.log('GPS location set:', locationStr);
                            }
                        }
                    } catch (error) {
                        console.error('GPS reverse geocoding failed:', error);
                    }
                    setIsLoadingLocation(false);
                },
                (error) => {
                    console.error('GPS location denied/failed:', error);
                    setIsLoadingLocation(false);
                },
                {
                    enableHighAccuracy: false,
                    timeout: 15000,
                    maximumAge: 600000
                }
            );
        } else {
            console.log('GPS not available - no HTTPS or geolocation support');
            setIsLoadingLocation(false);
        }
    };

    // Auto-detect location on component mount
    useEffect(() => {
        getUserLocation();
    }, []);

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
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                                            {isLoadingLocation ? (
                                                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                                            ) : (
                                                <MapPin className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder={isLoadingLocation ? "Detecting location..." : "Your Location"}
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            onFocus={() => setShowLocationSuggestions(true)}
                                            onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                                            className="w-full pl-10 pr-10 py-3 text-gray-700 rounded-xl border-0 focus:outline-none bg-gray-50 focus:bg-white transition-colors duration-200"
                                        />
                                        <button
                                            onClick={getUserLocation}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700 transition-colors"
                                            title="Detect my location"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </button>

                                        {/* Location Suggestions Dropdown */}
                                        {showLocationSuggestions && (
                                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
                                                <div className="p-2">
                                                    <div className="text-xs text-gray-500 font-medium mb-2 px-2">Popular Locations</div>
                                                    {popularCities
                                                        .filter(city => city.toLowerCase().includes(location.toLowerCase()))
                                                        .map((city, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => {
                                                                    setLocation(city);
                                                                    setShowLocationSuggestions(false);
                                                                }}
                                                                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors"
                                                            >
                                                                {city}
                                                            </button>
                                                        ))}
                                                </div>
                                            </div>
                                        )}
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