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
                const responseData = await api.getJobById(jobId);
                console.log('Raw response from /job/:jobID:', responseData);

                // Since getJobById returns response.data, we're working directly with the API response data
                let jobData = null;

                // Case 1: responseData.data is an array (your API structure: {statusCode, data: [...], message})
                if (responseData.data && Array.isArray(responseData.data)) {
                    if (responseData.data.length === 0) {
                        throw new Error('No job data found in response array');
                    }
                    jobData = responseData.data[0];
                }
                // Case 2: responseData is directly an array
                else if (Array.isArray(responseData)) {
                    if (responseData.length === 0) {
                        throw new Error('No job data found in response array');
                    }
                    jobData = responseData[0];
                }
                // Case 3: responseData is a single job object
                else if (responseData._id) {
                    jobData = responseData;
                }
                // Case 4: Invalid structure
                else {
                    console.error('Unexpected response structure:', responseData);
                    throw new Error('Invalid response structure: Unable to extract job data');
                }

                // Validate the job data
                if (!jobData) {
                    throw new Error('Invalid job data: Job object is null or undefined');
                }

                if (!jobData._id) {
                    throw new Error('Invalid job data: No valid job ID found');
                }

                console.log('Successfully extracted job data:', jobData);
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