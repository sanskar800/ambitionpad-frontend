import { useState, useEffect } from 'react';
import * as api from '../services/api';

export const useJobDetails = (jobId) => {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!jobId) {
            setError('No job ID provided');
            return;
        }

        const fetchJobDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await api.getJobById(jobId);
                console.log('Raw response from /job/:jobID:', response);

                // Extract job from response.data.data (expected to be an array)
                const jobDataArray = response?.data?.data;
                if (!Array.isArray(jobDataArray)) {
                    throw new Error('Invalid response structure: Expected data to be an array');
                }
                if (jobDataArray.length === 0) {
                    throw new Error('No job data found in response');
                }

                const jobData = jobDataArray[0]; // Extract the first job object
                if (!jobData || !jobData._id) {
                    throw new Error('Invalid job data: No valid job object found');
                }

                setJob(jobData);
            } catch (err) {
                console.error('Job details fetch error:', err);
                setError(err.response?.data?.message || err.message || 'Failed to load job details');
                setJob(null);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    return { job, loading, error };
};