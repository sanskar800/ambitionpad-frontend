import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Hero from '../components/Hero';
import { Search, MapPin, TrendingUp, Users, Star, ArrowRight, Briefcase, Code, Palette, Megaphone, ShoppingBag, Settings, Headphones, ChevronRight, Building2, Globe, Clock, ChevronLeft, Heart, Bookmark, DollarSign, Calendar, ExternalLink, Timer } from 'lucide-react';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/v1`
    : 'https://ambition-pad-backend-1.onrender.com/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const Home = () => {
    const [currentJobIndex, setCurrentJobIndex] = useState(0);
    const [featuredJobs, setFeaturedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch featured jobs from API
    useEffect(() => {
        const fetchFeaturedJobs = async () => {
            try {
                console.log('Fetching featured jobs from:', `${API_BASE_URL}/alljobs`);

                const response = await api.get('/alljobs', {
                    params: { limit: 4 }
                });

                console.log('API Response:', response.data);

                // Handle different possible response structures
                let jobsArray = [];

                if (response.data) {
                    if (response.data.jobs && Array.isArray(response.data.jobs)) {
                        jobsArray = response.data.jobs;
                    } else if (Array.isArray(response.data)) {
                        jobsArray = response.data;
                    } else if (response.data.data && Array.isArray(response.data.data)) {
                        jobsArray = response.data.data;
                    } else if (response.data.results && Array.isArray(response.data.results)) {
                        jobsArray = response.data.results;
                    }
                }

                console.log('Extracted jobs array:', jobsArray);
                console.log('Jobs array length:', jobsArray.length);

                const validJobs = jobsArray
                    .filter(job => job && job._id && job.jobTitle)
                    .slice(0, 4);

                console.log('Valid featured jobs:', validJobs);
                setFeaturedJobs(validJobs);

            } catch (error) {
                console.error('Error fetching featured jobs:', error);
                console.error('Error response:', error.response?.data);
                console.error('Error status:', error.response?.status);
                setFeaturedJobs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedJobs();
    }, []);

    // Auto-advance carousel
    useEffect(() => {
        if (featuredJobs.length > 0) {
            const interval = setInterval(() => {
                setCurrentJobIndex((prev) => (prev + 1) % featuredJobs.length);
            }, 6000);
            return () => clearInterval(interval);
        }
    }, [featuredJobs.length]);

    const nextJob = () => {
        setCurrentJobIndex((prev) => (prev + 1) % featuredJobs.length);
    };

    const prevJob = () => {
        setCurrentJobIndex((prev) => (prev - 1 + featuredJobs.length) % featuredJobs.length);
    };

    const getCompanyName = (job) => {
        if (job.companyName) return job.companyName;
        if (job.company) return job.company;

        if (job.description) {
            const lines = job.description.split('\n').filter(line => line.trim());
            if (lines.length > 0) {
                const firstLine = lines[0].trim();
                if (firstLine.length < 100 &&
                    !firstLine.toLowerCase().startsWith('we are looking') &&
                    !firstLine.toLowerCase().startsWith('job description') &&
                    !firstLine.toLowerCase().startsWith('about the role') &&
                    !firstLine.toLowerCase().startsWith('who we are')) {
                    return firstLine;
                }
            }
        }
        return 'Remote Company';
    };

    const getJobGradient = (index) => {
        const gradients = [
            'from-blue-500 to-cyan-500',
            'from-purple-500 to-pink-500',
            'from-orange-500 to-red-500',
            'from-green-500 to-teal-500'
        ];
        return gradients[index % gradients.length];
    };

    return (
        <div>
            <Hero />

            {/* Featured Jobs Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
                </div>

                <div className="container mx-auto px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 border border-blue-100">
                            <Star className="w-4 h-4 mr-2" />
                            Featured Jobs
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Top remote opportunities
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> this week</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover handpicked remote positions from leading companies worldwide
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-gray-100 rounded-2xl p-6 animate-pulse">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-gray-200 rounded-xl mr-4"></div>
                                        <div className="flex-1">
                                            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                    <div className="h-6 bg-gray-200 rounded mb-3 w-4/5"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                                    <div className="flex gap-2 mb-4">
                                        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                                        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                                        <div className="h-6 bg-gray-200 rounded-full w-18"></div>
                                    </div>
                                    <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
                                </div>
                            ))}
                        </div>
                    ) : featuredJobs.length > 0 ? (
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {featuredJobs.map((job, index) => (
                                    <div key={job._id} className="group relative">
                                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-500 overflow-hidden group-hover:-translate-y-2">
                                            <div className="p-6 border-b border-gray-50">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center">
                                                        {job.companyImage ? (
                                                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 mr-4 ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300">
                                                                <img
                                                                    src={job.companyImage}
                                                                    alt={`${getCompanyName(job)} Logo`}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none';
                                                                        e.target.parentElement.innerHTML = `
                                                                            <div class="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                                                                                <svg class="w-7 h-7 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                                                    <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z" clip-rule="evenodd"></path>
                                                                                </svg>
                                                                            </div>
                                                                        `;
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mr-4 ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300">
                                                                <Building2 className="w-7 h-7 text-blue-600" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 text-base">{getCompanyName(job)}</h4>
                                                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                                                <MapPin className="w-3.5 h-3.5 mr-1" />
                                                                {job.region || 'Remote'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
                                                            Active
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                                                    {job.jobTitle || 'Exciting Opportunity'}
                                                </h3>

                                                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                                                    {job.description ?
                                                        job.description.split('\n')[0].substring(0, 100) + '...'
                                                        : 'Join our team and make an impact with this exciting remote opportunity.'}
                                                </p>

                                                {job.skills && job.skills.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        {job.skills.slice(0, 3).map((skill, skillIndex) => (
                                                            <span key={skillIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                        {job.skills.length > 3 && (
                                                            <span className="px-3 py-1 bg-gray-50 text-gray-500 text-sm rounded-full font-medium">
                                                                +{job.skills.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <Calendar className="w-4 h-4 mr-2" />
                                                        Posted recently
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <Users className="w-4 h-4 mr-2" />
                                                        {Math.floor(Math.random() * 50) + 5} applicants
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => navigate(`/jobs/${job._id}`)}
                                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 flex items-center justify-center group/btn"
                                                >
                                                    <span className="mr-2">Apply Now</span>
                                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                </button>
                                            </div>

                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-12">
                                <button
                                    onClick={() => navigate('/jobs')}
                                    className="inline-flex items-center bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <span className="mr-2">View All Jobs</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-16 max-w-md mx-auto">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Briefcase className="w-10 h-10 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-700 mb-3">No featured jobs available</h3>
                            <p className="text-gray-500 mb-6 leading-relaxed">Check back soon for exciting opportunities, or browse all available positions.</p>
                            <button
                                onClick={() => navigate('/jobs')}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                Browse All Jobs
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* How it Works Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-3">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                                            radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`
                        }}
                    ></div>
                </div>

                <div className="container mx-auto px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center bg-blue-50/80 backdrop-blur-sm text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Clock className="w-4 h-4 mr-2" />
                            How It Works
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Land your dream job in
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 3 simple steps</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We've streamlined the job search process to help you find remote opportunities faster than ever before.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                        <div className="hidden lg:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform -translate-y-1/2"></div>
                        <div className="hidden lg:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform -translate-y-1/2"></div>

                        {[
                            {
                                step: "01",
                                title: "Create Your Profile",
                                desc: "Build a compelling profile that showcases your skills, experience, and what makes you unique in the remote work landscape.",
                                icon: Users,
                                gradient: "from-blue-500 to-cyan-500",
                                delay: 0
                            },
                            {
                                step: "02",
                                title: "Discover Opportunities",
                                desc: "Browse curated remote jobs from vetted companies. Use our smart filters to find roles that match your preferences.",
                                icon: Search,
                                gradient: "from-purple-500 to-pink-500",
                                delay: 0.2
                            },
                            {
                                step: "03",
                                title: "Get Hired",
                                desc: "Apply with confidence and connect directly with hiring managers. Track your applications and land your dream remote job.",
                                icon: Star,
                                gradient: "from-orange-500 to-red-500",
                                delay: 0.4
                            }
                        ].map((step, index) => (
                            <div key={index} className="relative group">
                                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-4 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                                        <div className={`w-full h-full bg-gradient-to-br ${step.gradient} rounded-full blur-2xl`}></div>
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="text-6xl font-bold text-gray-100 group-hover:text-gray-50 transition-colors">
                                                {step.step}
                                            </span>
                                            <div className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                                                <step.icon className="w-8 h-8 text-white" />
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                        <p className="text-gray-600 leading-relaxed mb-6">{step.desc}</p>

                                        <button className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group">
                                            Learn More
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section
            <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `repeating-linear-gradient(
                                90deg,
                                transparent,
                                transparent 100px,
                                rgba(255, 255, 255, 0.03) 100px,
                                rgba(255, 255, 255, 0.03) 101px
                            )`
                        }}
                    ></div>
                </div>

                <div className="container mx-auto px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Job Categories
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            Explore opportunities in
                            <br />
                            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">trending categories</span>
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            From cutting-edge tech roles to creative positions, find your perfect remote opportunity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: 'Development', icon: Code, jobs: '1,234', color: 'from-green-400 to-blue-500', bgColor: 'bg-green-500/10' },
                            { name: 'Design', icon: Palette, jobs: '856', color: 'from-pink-400 to-red-500', bgColor: 'bg-pink-500/10' },
                            { name: 'Marketing', icon: Megaphone, jobs: '692', color: 'from-purple-400 to-pink-500', bgColor: 'bg-purple-500/10' },
                            { name: 'Sales', icon: TrendingUp, jobs: '543', color: 'from-orange-400 to-red-500', bgColor: 'bg-orange-500/10' },
                            { name: 'Product', icon: ShoppingBag, jobs: '421', color: 'from-cyan-400 to-blue-500', bgColor: 'bg-cyan-500/10' },
                            { name: 'Support', icon: Headphones, jobs: '378', color: 'from-indigo-400 to-purple-500', bgColor: 'bg-indigo-500/10' }
                        ].map((category, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                            <category.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                        {category.jobs} open positions
                                    </p>

                                    <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r ${category.color} rounded-full group-hover:animate-pulse`}
                                            style={{ width: `${Math.min(parseInt(category.jobs) / 15, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1">
                            View All Categories
                        </button>
                    </div>
                </div>
            </section> */}

            {/* CTA Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-3xl p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl"></div>

                            <div className="relative z-10">
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Ready to start your
                                    <br />
                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">remote career journey?</span>
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                                    Join thousands of professionals who have found their dream remote jobs through our platform.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1">
                                        Get Started Free
                                    </button>
                                    <button
                                        onClick={() => navigate('/jobs')}
                                        className="bg-white text-gray-700 px-8 py-4 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        Browse Jobs
                                    </button>
                                </div>

                                <div className="flex items-center justify-center mt-8 space-x-8 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                        Free to use
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                                        No hidden fees
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                                        Instant access
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;