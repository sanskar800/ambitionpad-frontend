import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useJobDetails } from '../hooks/useJobDetails';

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { job, loading, error } = useJobDetails(id);

    const handleApplyNow = () => {
        if (job?.applyNowLink) {
            window.open(job.applyNowLink, '_blank');
        } else {
            alert('Application process will be available soon!');
        }
    };

    const handleBackToJobs = () => {
        navigate('/jobs');
    };

    const getCompanyName = (job) => {
        if (!job) return 'Company Name Not Available';
        if (job.companyName) return job.companyName;
        if (job.company) return job.company;
        if (job.description) {
            const lines = job.description.split('\n').filter(line => line.trim());
            if (lines.length > 0) {
                const firstLine = lines[0].trim();
                if (
                    firstLine.length < 100 &&
                    !firstLine.toLowerCase().startsWith('we are looking') &&
                    !firstLine.toLowerCase().startsWith('job description') &&
                    !firstLine.toLowerCase().startsWith('about the role') &&
                    !firstLine.toLowerCase().startsWith('who we are')
                ) {
                    return firstLine;
                }
            }
        }
        return 'Company Name Not Available';
    };

    const formatDescription = (description) => {
        if (!description || description === '') return 'No description available.';
        const paragraphs = description.split('\n\n').filter(p => p.trim());
        if (paragraphs.length === 0) return 'No description available.';
        return paragraphs.map((paragraph, index) => {
            if (paragraph.length < 100 && !paragraph.includes('.') && paragraph.trim().endsWith(':')) {
                return (
                    <h3 key={index} className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                        {paragraph.trim()}
                    </h3>
                );
            }
            const lines = paragraph.split('\n');
            return (
                <div key={index} className="mb-4">
                    {lines.map((line, lineIndex) =>
                        line.trim() ? (
                            <p key={lineIndex} className="text-gray-700 mb-2">
                                {line.trim()}
                            </p>
                        ) : null
                    )}
                </div>
            );
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
                        <div className="h-12 bg-gray-200 rounded w-full mt-8"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Job</h1>
                        <p className="text-red-500 text-lg mb-4">
                            {error.includes('404') || error === 'Failed to fetch job details'
                                ? `The job with ID ${id} does not exist or has been removed.`
                                : `Error: ${error}`}
                        </p>
                        <button
                            onClick={handleBackToJobs}
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Jobs
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!job || !job._id) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
                        <div className="text-gray-400 text-6xl mb-4">📄</div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
                        <p className="text-gray-500 text-lg mb-4">
                            The job with ID {id} doesn't exist or has been removed.
                        </p>
                        <button
                            onClick={handleBackToJobs}
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Jobs
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const companyName = getCompanyName(job);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
                >
                    <div className="p-8">
                        <button
                            onClick={handleBackToJobs}
                            className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors group"
                        >
                            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            Back to Jobs
                        </button>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                            <div className="flex items-start space-x-4">
                                {job.companyImage && (
                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <img
                                            src={job.companyImage}
                                            alt="Company Logo"
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {job.jobTitle || 'Job Title Not Available'}
                                    </h1>
                                    <p className="text-xl text-gray-600 mb-2">{companyName}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg mb-8">
                            <div className="flex flex-wrap gap-6 mb-4">
                                {job.region && job.region !== 'N/A' && (
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        <span>{job.region}</span>
                                    </div>
                                )}
                                {job.jobType && job.jobType !== 'N/A' && (
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8"></path>
                                        </svg>
                                        <span>{job.jobType}</span>
                                    </div>
                                )}
                                {job.neededExperience && job.neededExperience !== 'N/A' && (
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span>{job.neededExperience}</span>
                                    </div>
                                )}
                                {job.salary && job.salary !== 'N/A' && (
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span>{job.salary}</span>
                                    </div>
                                )}
                            </div>
                            {job.tags && job.tags.length > 0 && (
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex items-start">
                                        <div className="flex items-center text-gray-600 mr-3 mt-1">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                            </svg>
                                            <span className="font-medium">Skills:</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 flex-1">
                                            {job.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full border border-blue-200 hover:bg-blue-200 transition-colors"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="prose max-w-none mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
                            <div className="text-gray-700 leading-relaxed">
                                {formatDescription(job.description)}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                            <button
                                onClick={handleApplyNow}
                                className="flex-1 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                                Apply Now
                            </button>
                            <button
                                onClick={handleBackToJobs}
                                className="flex-1 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                </svg>
                                Back to Jobs
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default JobDetail;