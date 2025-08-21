import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobCard from '../components/ui/JobCard';
import { useJobs } from '../hooks/useJobs';
import { useSearchParams } from 'react-router-dom';

// Virtual scrolling component for better performance with large lists
const VirtualizedJobGrid = React.memo(({ jobs }) => {
    return (
        <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {jobs.map((job, index) => (
                <motion.div
                    key={job._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.3) }}
                >
                    <JobCard job={job} />
                </motion.div>
            ))}
        </motion.div>
    );
});

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

    // Debounced URL update to prevent excessive updates
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams();
            if (searchTerm) params.set('search', searchTerm);
            setSearchParams(params);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, setSearchParams]);

    // Filter jobs client-side for search term (if needed for instant search)
    const filteredJobs = useMemo(() => {
        if (!Array.isArray(jobs)) return [];

        // Since backend already handles search, we might not need client-side filtering
        // But keeping this for instant search experience if desired
        if (!searchTerm.trim()) {
            return jobs.filter(job => job?._id && job?.jobTitle);
        }

        const searchLower = searchTerm.toLowerCase().trim();
        return jobs.filter(job => {
            if (!job?._id || !job?.jobTitle) return false;

            const searchText = [
                job.jobTitle || '',
                job.region || '',
                ...(job.tags || [])
            ].join(' ').toLowerCase();

            return searchText.includes(searchLower);
        });
    }, [jobs, searchTerm]);

    // Reset page when search changes
    useEffect(() => {
        if (searchTerm !== searchParams.get('search')) {
            setCurrentPage(1);
        }
    }, [searchTerm, searchParams]);

    // Memoized callbacks to prevent unnecessary re-renders
    const clearAllFilters = useCallback(() => {
        setSearchTerm('');
        setCurrentPage(1);
    }, []);

    const handleLoadMore = useCallback(() => {
        if (hasMore && !loading) {
            setCurrentPage(prev => prev + 1);
        }
    }, [hasMore, loading]);

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-8 sm:px-16 lg:px-24 xl:px-32">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse Remote Jobs</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Find your perfect remote job opportunity from top companies worldwide.
                    </p>
                </div>

                {/* Search and Filter Controls */}
                <div className="mb-8 bg-white rounded-xl shadow-md p-6">
                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto mb-6">
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <svg className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>

                {/* Results Summary */}
                {!loading && (
                    <div className="mb-6 text-center">
                        <p className="text-gray-600">
                            {totalJobs > 0 ? (
                                <>
                                    Showing {filteredJobs.length} of {totalJobs} jobs
                                    {searchTerm && ` for "${searchTerm}"`}
                                </>
                            ) : (
                                <>
                                    {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
                                    {searchTerm && ` for "${searchTerm}"`}
                                </>
                            )}
                        </p>
                    </div>
                )}

                {loading && currentPage === 1 ? (
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
                    <>
                        {filteredJobs && filteredJobs.length > 0 ? (
                            <VirtualizedJobGrid jobs={filteredJobs} />
                        ) : jobs && jobs.length > 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No jobs found matching your search</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Clear Search
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No jobs available</p>
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
                            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            {loading && currentPage > 1 && (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            <span>
                                {loading && currentPage > 1 ? 'Loading...' : `Load More Jobs`}
                            </span>
                        </button>
                    </div>
                )}

                {/* No more jobs message */}
                {!hasMore && filteredJobs.length > 0 && (
                    <div className="mt-12 text-center">
                        <p className="text-gray-500">You've reached the end of all available jobs</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;