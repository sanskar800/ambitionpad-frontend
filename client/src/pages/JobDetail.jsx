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
            // Show elegant modal instead of alert
            document.getElementById('apply-modal').showModal();
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
                    <h3 key={index} className="text-xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-100">
                        {paragraph.trim()}
                    </h3>
                );
            }
            const lines = paragraph.split('\n');
            return (
                <div key={index} className="mb-6">
                    {lines.map((line, lineIndex) =>
                        line.trim() ? (
                            <p key={lineIndex} className="text-gray-700 mb-3 leading-relaxed">
                                {line.trim()}
                            </p>
                        ) : null
                    )}
                </div>
            );
        });
    };

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center mb-8">
                            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse mr-4"></div>
                            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="p-8 md:p-12">
                                <div className="h-10 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/2 mb-8 animate-pulse"></div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse"></div>
                                    ))}
                                </div>

                                <div className="space-y-4 mb-12">
                                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100">
                                    <div className="h-14 bg-blue-200 rounded-xl flex-1 animate-pulse"></div>
                                    <div className="h-14 bg-gray-200 rounded-xl flex-1 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h1>
                        <p className="text-gray-600 text-lg mb-8">
                            {error.includes('404') || error === 'Failed to fetch job details'
                                ? `The job with ID ${id} does not exist or has been removed.`
                                : `We encountered an error: ${error}`}
                        </p>
                        <button
                            onClick={handleBackToJobs}
                            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Browse All Jobs
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Not Found State
    if (!job || !job._id) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h1>
                        <p className="text-gray-600 text-lg mb-8">
                            The job with ID {id} doesn't exist or has been removed.
                        </p>
                        <button
                            onClick={handleBackToJobs}
                            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Browse All Jobs
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const companyName = getCompanyName(job);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Back Button */}
                    <button
                        onClick={handleBackToJobs}
                        className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors group font-medium"
                    >
                        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Back to all jobs
                    </button>

                    {/* Main Card */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 md:px-12 py-10">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                {job.companyImage ? (
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white p-2 shadow-md flex items-center justify-center flex-shrink-0">
                                        <img
                                            src={job.companyImage}
                                            alt={`${companyName} Logo`}
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold text-xl shadow-md">
                                        {companyName.charAt(0)}
                                    </div>
                                )}

                                <div className="flex-1">
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                        {job.jobTitle || 'Job Title Not Available'}
                                    </h1>
                                    <p className="text-xl text-gray-700 font-medium">{companyName}</p>

                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {job.isUrgent && (
                                            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path>
                                                </svg>
                                                Urgent Hiring
                                            </span>
                                        )}
                                        {job.isResponsive && (
                                            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                                                </svg>
                                                Responsive
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Job Details Grid */}
                        <div className="p-8 md:p-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                {job.region && job.region !== 'N/A' && (
                                    <div className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow">
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            <span className="font-medium">Location</span>
                                        </div>
                                        <p className="text-gray-900 font-semibold">{job.region}</p>
                                    </div>
                                )}

                                {job.jobType && job.jobType !== 'N/A' && (
                                    <div className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow">
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8"></path>
                                            </svg>
                                            <span className="font-medium">Type</span>
                                        </div>
                                        <p className="text-gray-900 font-semibold">{job.jobType}</p>
                                    </div>
                                )}

                                {job.neededExperience && job.neededExperience !== 'N/A' && (
                                    <div className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow">
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span className="font-medium">Experience</span>
                                        </div>
                                        <p className="text-gray-900 font-semibold">{job.neededExperience}</p>
                                    </div>
                                )}

                                {job.salary && job.salary !== 'N/A' && (
                                    <div className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow">
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span className="font-medium">Salary</span>
                                        </div>
                                        <p className="text-gray-900 font-semibold">{job.salary}</p>
                                    </div>
                                )}
                            </div>

                            {/* Skills Tags */}
                            {job.tags && job.tags.length > 0 && (
                                <div className="mb-12">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {job.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Job Description */}
                            <div className="prose prose-lg max-w-none mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">Job Description</h2>
                                <div className="text-gray-700 leading-relaxed">
                                    {formatDescription(job.description)}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100">
                                <button
                                    onClick={handleApplyNow}
                                    className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center group"
                                >
                                    <svg className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Apply for this Position
                                </button>
                                <button
                                    onClick={handleBackToJobs}
                                    className="flex-1 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                    </svg>
                                    Browse Jobs
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Apply Modal */}
            <dialog id="apply-modal" className="rounded-2xl shadow-2xl backdrop:bg-black/30 backdrop:backdrop-blur-sm">
                <div className="p-8 max-w-md">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Application Process</h3>
                        <p className="text-gray-600">Application instructions will be available soon. Please check back later.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => document.getElementById('apply-modal').close()}
                            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default JobDetail;