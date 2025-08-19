import { useState, useEffect } from 'react';
import { getJobs } from '../services/api';

export const useJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await getJobs();
                // Handle different possible response structures
                const jobsData = response.jobs || response.data || response;
                setJobs(Array.isArray(jobsData) ? jobsData : []);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return { jobs, loading, error };
};
