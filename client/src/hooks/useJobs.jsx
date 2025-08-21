import { useState, useEffect } from 'react';
import * as api from '../services/api';

export const useJobs = (page = 1, query = '') => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [totalJobs, setTotalJobs] = useState(0);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await api.getBrowseJobs(page, query);

                // Extract jobs from the response structure
                const jobsData = response?.data?.jobs || [];
                const totalJobsCount = response?.data?.totalJobs || 0;
                const totalPagesCount = response?.data?.totalPages || 0;
                const currentPageNumber = response?.data?.page || page;

                if (page === 1) {
                    // Reset jobs for new search or first page
                    setJobs(jobsData);
                } else {
                    // Append jobs for subsequent pages
                    setJobs(prevJobs => [...prevJobs, ...jobsData]);
                }

                // Update pagination info
                setTotalJobs(totalJobsCount);
                setHasMore(currentPageNumber < totalPagesCount);

            } catch (err) {
                console.error('API Error:', err);
                setError(err.message);
                if (page === 1) {
                    setJobs([]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [page, query]);

    // Reset when query changes
    useEffect(() => {
        if (page === 1 && query !== '') {
            setJobs([]);
            setHasMore(true);
        }
    }, [query, page]);

    return { jobs, loading, error, hasMore, totalJobs };
};