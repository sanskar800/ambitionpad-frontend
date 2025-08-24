import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobCard from '../components/ui/JobCard';
import { useJobs } from '../hooks/useJobs';
import { useSearchParams } from 'react-router-dom';

const Jobs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const { jobs, loading, error, hasMore, totalJobs } = useJobs(currentPage, searchTerm);

    // Initialize search from URL params
    useEffect(() => {
        const search = searchParams.get('search') || '';
        setSearchTerm(search);
    }, [searchParams]);

    // Debounced URL update
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams();
            if (searchTerm) params.set('search', searchTerm);
            setSearchParams(params);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, setSearchParams]);

    // Filter jobs
    const filteredJobs = useMemo(() => {
        if (!Array.isArray(jobs)) return [];

        if (!searchTerm.trim()) {
            return jobs.filter(job => job?._id && job?.jobTitle);
        }

        const searchLower = searchTerm.toLowerCase().trim();
        return jobs.filter(job => {
            if (!job?._id || !job?.jobTitle) return false;

            const searchText = [
                job.jobTitle || '',
                job.region || '',
                job.companyName || job.company || '',
                ...(job.tags || [])
            ].join(' ').toLowerCase();

            return searchText.includes(searchLower);
        });
    }, [jobs, searchTerm]);

    // Reset page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleLoadMore = () => {
        if (hasMore && !loading) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const clearAllFilters = () => {
        setSearchTerm('');
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-8 sm:px-16 lg:px-24 xl:px-32">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Find Remote Jobs</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover your next remote opportunity from top companies worldwide
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-10 max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by job title, company, or skills..."
                            className="w-full px-6 py-4 pl-12 text-lg rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="w-6 h-6 absolute left-4 top-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>

                {/* Results Summary */}
                {!loading && (
                    <div className="mb-8 text-center">
                        <p className="text-gray-600">
                            {totalJobs > 0 ? (
                                <>
                                    Showing <span className="font-semibold">{filteredJobs.length}</span> of{' '}
                                    <span className="font-semibold">{totalJobs}</span> remote jobs
                                    {searchTerm && ` for "${searchTerm}"`}
                                </>
                            ) : (
                                <>
                                    <span className="font-semibold">{filteredJobs.length}</span> remote job{filteredJobs.length !== 1 ? 's' : ''} found
                                    {searchTerm && ` for "${searchTerm}"`}
                                </>
                            )}
                        </p>
                    </div>
                )}

                {/* Loading State */}
                {loading && currentPage === 1 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                                    <div>
                                        <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    </div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                                <div className="flex justify-between">
                                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <p className="text-red-500 text-lg mb-4">Error loading jobs: {error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        {filteredJobs && filteredJobs.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                <AnimatePresence>
                                    {filteredJobs.map((job, index) => (
                                        <motion.div
                                            key={job._id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.2, delay: Math.min(index * 0.05, 0.3) }}
                                        >
                                            <JobCard job={job} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.7-2.836C5.1 10.6 4.5 8.8 4.5 7.5C4.5 5.567 6.567 4 8.5 4c1.933 0 3.5 1.567 3.5 3.5 0 .5-.1 1-.3 1.5"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                                <p className="text-gray-600 mb-6">
                                    {searchTerm
                                        ? `No remote jobs match your search for "${searchTerm}"`
                                        : "No remote jobs available at the moment"
                                    }
                                </p>
                                {searchTerm && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Clear Search
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}

                {/* Load More Button */}
                {hasMore && filteredJobs.length > 0 && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            disabled={loading}
                            className="px-8 py-4 bg-white text-blue-600 font-medium rounded-xl border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 shadow-sm"
                        >
                            {loading && currentPage > 1 && (
                                <svg className="animate-spin h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            <span>
                                {loading && currentPage > 1 ? 'Loading more jobs...' : 'Load More Jobs'}
                            </span>
                        </button>
                    </div>
                )}

                {/* End of Results */}
                {!hasMore && filteredJobs.length > 0 && (
                    <div className="mt-12 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <p className="text-gray-600">You've viewed all available remote jobs</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;