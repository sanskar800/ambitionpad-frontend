import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobCard from '../components/ui/JobCard';
import { useJobs } from '../hooks/useJobs';
import { useSearchParams } from 'react-router-dom';

// Virtual scrolling component for better performance with large lists
const VirtualizedJobGrid = React.memo(({ jobs, visibleCount }) => {
    return (
        <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {jobs.slice(0, visibleCount).map((job, index) => (
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
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [visibleJobsCount, setVisibleJobsCount] = useState(30);

    const { jobs, loading, error } = useJobs();

    // Memoized filter categories to prevent recreating on every render
    const filterCategories = useMemo(() => ({
        'Work Type': ['Remote', 'Full-Time', 'Part-Time', 'Contract', 'Internship', 'Flexible Work', 'Remote-Friendly'],
        'Company Size': ['Global', 'Startup', 'Enterprise'],
        'Department': ['Marketing', 'Sales', 'Product', 'Design', 'HR', 'Operations', 'Finance'],
        'Experience Level': ['Entry-Level', 'Mid-Level', 'Senior-Level', 'Executive'],
        'Industry': ['SaaS', 'FinTech', 'Technology', 'Software', 'E-commerce'],
        'Languages': ['English', 'Multilingual'],
        'Frontend': ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Angular', 'Vue', 'Next.js', 'Svelte', 'TailwindCSS'],
        'Backend': ['Node.js', 'Express', 'Django', 'Flask', 'Spring', '.NET', 'FastAPI', 'Python', 'Java', 'C#', 'PHP', 'Go', 'Ruby', 'Rust', 'Kotlin', 'Swift', 'Scala'],
        'Database': ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle', 'Firebase'],
        'Cloud & DevOps': ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
        'Data & AI': ['Machine Learning', 'Deep Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn', 'Big Data', 'Data Analysis', 'Analytics'],
        'Mobile & Other': ['Android', 'iOS', 'React Native', 'Flutter', 'Git', 'GraphQL', 'REST API', 'WebSockets', 'Blockchain', 'Cybersecurity'],
        'Benefits': ['Health Benefits', 'Flexible Hours', 'Paid Time Off'],
        'Marketing & Sales': ['Paid Ads', 'Digital Marketing', 'Account Management', 'Project Management']
    }), []);

    // Initialize search from URL params
    useEffect(() => {
        const search = searchParams.get('search') || '';
        const filters = searchParams.get('filters') || '';
        setSearchTerm(search);
        setSelectedFilters(filters ? filters.split(',') : []);
    }, [searchParams]);

    // Debounced URL update to prevent excessive updates
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams();
            if (searchTerm) params.set('search', searchTerm);
            if (selectedFilters.length > 0) params.set('filters', selectedFilters.join(','));
            setSearchParams(params);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, selectedFilters, setSearchParams]);

    // Create search index for faster filtering (only when jobs change)
    const searchIndex = useMemo(() => {
        if (!Array.isArray(jobs)) return new Map();

        const index = new Map();
        jobs.forEach(job => {
            if (job?._id && job?.jobTitle) {
                const searchText = [
                    job.jobTitle || '',
                    job.region || '',
                    // Removed description for performance as mentioned
                    ...(job.tags || [])
                ].join(' ').toLowerCase();
                index.set(job._id, searchText);
            }
        });
        return index;
    }, [jobs]);

    // Optimized filter and search logic with better performance
    const filteredJobs = useMemo(() => {
        if (!Array.isArray(jobs)) return [];

        const searchLower = searchTerm.toLowerCase().trim();
        const hasSearch = searchLower.length > 0;
        const hasFilters = selectedFilters.length > 0;

        // If no filters, return all valid jobs early
        if (!hasSearch && !hasFilters) {
            return jobs.filter(job => job?._id && job?.jobTitle);
        }

        return jobs.filter(job => {
            // Basic validation
            if (!job?._id || !job?.jobTitle) return false;

            // Search filtering with indexed text
            if (hasSearch) {
                const searchText = searchIndex.get(job._id) || '';
                if (!searchText.includes(searchLower)) return false;
            }

            // Tag filtering with early exit
            if (hasFilters) {
                const jobTags = job.tags || [];
                const hasMatch = selectedFilters.some(filter =>
                    jobTags.some(tag => tag.toLowerCase() === filter.toLowerCase())
                );
                if (!hasMatch) return false;
            }

            return true;
        });
    }, [jobs, searchTerm, selectedFilters, searchIndex]);

    // Memoized callbacks to prevent unnecessary re-renders
    const handleFilterToggle = useCallback((filter) => {
        setSelectedFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    }, []);

    const clearAllFilters = useCallback(() => {
        setSelectedFilters([]);
        setSearchTerm('');
        setVisibleJobsCount(30); // Reset visible count
    }, []);

    const clearFilter = useCallback((filter) => {
        setSelectedFilters(prev => prev.filter(f => f !== filter));
    }, []);

    const handleLoadMore = useCallback(() => {
        setVisibleJobsCount(prev => Math.min(prev + 30, filteredJobs.length));
    }, [filteredJobs.length]);

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
        setVisibleJobsCount(30); // Reset visible count on search
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

                    {/* Filter Toggle Button */}
                    <div className="flex justify-center mb-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
                            </svg>
                            Filters {selectedFilters.length > 0 && `(${selectedFilters.length})`}
                            <svg className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Active Filters */}
                    {selectedFilters.length > 0 && (
                        <div className="mb-4">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {selectedFilters.map((filter) => (
                                    <motion.span
                                        key={filter}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full border border-blue-200"
                                    >
                                        {filter}
                                        <button
                                            onClick={() => clearFilter(filter)}
                                            className="ml-2 text-blue-500 hover:text-blue-700"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </motion.span>
                                ))}
                            </div>
                            <button
                                onClick={clearAllFilters}
                                className="text-sm text-gray-500 hover:text-gray-700 underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}

                    {/* Filter Categories */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-t border-gray-200 pt-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {Object.entries(filterCategories).map(([category, filters]) => (
                                        <div key={category} className="space-y-3">
                                            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                                                {category}
                                            </h3>
                                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                                {filters.map((filter) => (
                                                    <label
                                                        key={filter}
                                                        className="flex items-center text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedFilters.includes(filter)}
                                                            onChange={() => handleFilterToggle(filter)}
                                                            className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        />
                                                        {filter}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Results Summary */}
                {!loading && (
                    <div className="mb-6 text-center">
                        <p className="text-gray-600">
                            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
                            {selectedFilters.length > 0 && ' with selected filters'}
                            {visibleJobsCount < filteredJobs.length && ` (showing ${visibleJobsCount})`}
                        </p>
                    </div>
                )}

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
                    <>
                        {filteredJobs && filteredJobs.length > 0 ? (
                            <VirtualizedJobGrid
                                jobs={filteredJobs}
                                visibleCount={visibleJobsCount}
                            />
                        ) : jobs && jobs.length > 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No jobs found matching your criteria</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No jobs available</p>
                            </div>
                        )}
                    </>
                )}

                {filteredJobs && filteredJobs.length > visibleJobsCount && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
                        >
                            Load More Jobs ({visibleJobsCount} of {filteredJobs.length} shown)
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;