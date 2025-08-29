import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    if (!job) return null;

    const handleViewDetails = () => {
        navigate(`/jobs/${job._id}`);
    };

    const getCompanyName = (job) => {
        return job.companyName || job.company || 'Remote Company';
    };

    const postedTime = () => {
        const date = new Date(job.createdAt || job.datePosted);
        const diffInHours = Math.floor((Date.now() - date) / (1000 * 60 * 60));
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    };

    const companyName = getCompanyName(job);

    // Truncate long text
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden group flex flex-col h-full">
            {/* Header */}
            <div className="p-5 pb-4 flex-grow">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                        {/* Fixed-size company logo with proper containment */}
                        <div className="w-10 h-10 flex-shrink-0 relative">
                            {job.companyImage ? (
                                <img
                                    src={job.companyImage}
                                    alt={`${companyName} Logo`}
                                    className="w-10 h-10 object-contain bg-gray-100 rounded-lg border border-gray-200"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-gray-200">
                                    <span className="text-blue-600 font-semibold text-xs">
                                        {companyName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="min-h-[2rem] flex flex-col">
                            <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm md:text-base group-hover:text-blue-600 transition-colors">
                                {truncateText(job.jobTitle || 'Job Title', 40)}
                            </h3>
                            <p className="text-xs text-gray-600 truncate">
                                {truncateText(companyName, 25)}
                            </p>
                        </div>
                    </div>
                    {/* Fixed time display with consistent sizing */}
                    <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded flex-shrink-0 whitespace-nowrap min-w-[3.5rem] text-center">
                        {postedTime()}
                    </span>
                </div>

                {/* Location and Job Type on same line */}
                <div className="flex items-center justify-between text-xs text-gray-600 mb-3 min-h-[1.25rem]">
                    <div className="flex items-center">
                        <svg className="w-3 h-3 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span className="truncate">{truncateText(job.region || 'Remote', 30)}</span>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{job.jobType || 'Full-time'}</span>
                    </div>
                </div>

                {/* Badges */}
                {(job.isUrgent || job.isResponsive) && (
                    <div className="flex space-x-1.5 mb-3">
                        {job.isUrgent && (
                            <span className="px-1.5 py-0.5 bg-red-50 text-red-700 text-xs font-medium rounded whitespace-nowrap">
                                Urgent
                            </span>
                        )}
                        {job.isResponsive && (
                            <span className="px-1.5 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded whitespace-nowrap">
                                Responsive
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Footer - Centered View Details button */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-center">
                    <button
                        onClick={handleViewDetails}
                        className="px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;