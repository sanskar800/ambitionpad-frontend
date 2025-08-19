import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import JobCard from '../components/ui/JobCard';
import { useJobs } from '../hooks/useJobs';
import { useSearchParams } from 'react-router-dom';

const Jobs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const { jobs, loading, error } = useJobs();

    // Initialize search from URL params
    useEffect(() => {
        const search = searchParams.get('search') || '';
        setSearchTerm(search);
    }, [searchParams]);

    // Update URL params when search changes
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        setSearchParams(params);
    }, [searchTerm, setSearchParams]);

    // Simple filtering - just check if jobs exist and filter by search term
    const filteredJobs = React.useMemo(() => {
        if (!Array.isArray(jobs)) {
            return [];
        }

        const filtered = jobs.filter(job => {
            // Must have an _id and jobTitle to be valid
            if (!job?._id || !job?.jobTitle) {
                return false;
            }

            // If no search term, include all jobs
            if (!searchTerm.trim()) {
                return true;
            }

            // Search in jobTitle and region only (since those are what we display)
            const searchLower = searchTerm.toLowerCase();
            const jobTitle = (job.jobTitle || '').toLowerCase();
            const region = (job.region || '').toLowerCase();

            return jobTitle.includes(searchLower) || region.includes(searchLower);
        });

        return filtered;
    }, [jobs, searchTerm]);



    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse Remote Jobs</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Find your perfect remote job opportunity from top companies worldwide.
                    </p>
                </div>

                <div className="mb-10">
                    <div className="relative max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>



                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden p-6 animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                                <div className="h-10 bg-gray-200 rounded w-full"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-red-500 text-lg mb-4">Error loading jobs: {error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredJobs && filteredJobs.length > 0 ? (
                            filteredJobs.map((job, index) => (
                                <motion.div
                                    key={job._id || `job-${index}`}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <JobCard job={job} />
                                </motion.div>
                            ))
                        ) : jobs && jobs.length > 0 ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-gray-500 text-lg">No jobs found matching your search</p>
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Clear Search
                                </button>
                            </div>
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-gray-500 text-lg">No jobs available</p>
                            </div>
                        )}
                    </motion.div>
                )}

                {filteredJobs && filteredJobs.length > 0 && (
                    <div className="mt-12 flex justify-center">
                        <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors">
                            Load More Jobs ({filteredJobs.length} shown)
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;