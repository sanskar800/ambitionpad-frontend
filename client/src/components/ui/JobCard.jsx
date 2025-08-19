import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    if (!job) return null;

    const handleViewDetails = () => {
        navigate(`/jobs/${job._id}`);
    };

    const getCompanyName = (job) => {
        if (job.companyName) return job.companyName;
        if (job.company) return job.company;

        if (job.description) {
            const lines = job.description.split('\n').filter(line => line.trim());
            if (lines.length > 0) {
                const firstLine = lines[0].trim();
                if (firstLine.length < 100 &&
                    !firstLine.toLowerCase().startsWith('we are looking') &&
                    !firstLine.toLowerCase().startsWith('job description') &&
                    !firstLine.toLowerCase().startsWith('about the role') &&
                    !firstLine.toLowerCase().startsWith('who we are')) {
                    return firstLine;
                }
            }
        }

        return 'Remote Company';
    };

    const companyName = getCompanyName(job);

    return (
        <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 ease-out overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Content container */}
            <div className="relative p-6">
                {/* Company Logo Section */}
                <div className="flex flex-col items-center mb-4">
                    {job.companyImage ? (
                        <div className="relative w-16 h-16 mb-3 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-1.5 ring-1 ring-gray-200 group-hover:ring-blue-200 transition-all duration-300">
                            <img
                                src={job.companyImage}
                                alt={`${companyName} Logo`}
                                className="w-full h-full object-contain rounded-lg"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `
                                        <div class="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                                            <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z" clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                    `;
                                }}
                            />
                            {/* Subtle shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                        </div>
                    ) : (
                        <div className="w-16 h-16 mb-3 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center ring-1 ring-gray-200 group-hover:ring-blue-200 transition-all duration-300">
                            <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                    )}

                    {/* Company Name with enhanced styling */}
                    <p className="text-sm font-medium text-blue-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {companyName}
                    </p>
                </div>

                {/* Job Title Section */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center line-clamp-2 min-h-[3.5rem] flex items-center justify-center group-hover:text-gray-800 transition-colors duration-300">
                    {job.jobTitle || 'Job Title Not Available'}
                </h3>

                {/* Location Section */}
                <div className="flex items-center justify-center text-gray-500 mb-4 group-hover:text-gray-600 transition-colors duration-300">
                    <div className="flex items-center px-2.5 py-1 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors duration-300">
                        <svg className="w-4 h-4 mr-1.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span className="text-sm">
                            {job.region || 'Location Not Specified'}
                        </span>
                    </div>
                </div>

                {/* Enhanced CTA Button */}
                <button
                    onClick={handleViewDetails}
                    className="relative w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform active:scale-95 overflow-hidden group/btn"
                >
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>

                    <div className="relative flex items-center justify-center">
                        <span className="mr-2">View Details</span>
                        <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                </button>
            </div>

            {/* Subtle corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    );
};

export default JobCard;