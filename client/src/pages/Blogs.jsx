import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock blog data - replace with your actual data source
const mockBlogs = [
    {
        id: 1,
        title: "10 Tips for Remote Job Interviews",
        excerpt: "Master the art of remote interviewing with these proven strategies that will help you stand out from the competition.",
        author: "Sarah Johnson",
        date: "2024-03-15",
        readTime: "5 min read",
        category: "Career Tips",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
        tags: ["interviews", "remote work", "career"]
    },
    {
        id: 2,
        title: "The Future of Remote Work: Trends to Watch",
        excerpt: "Explore the latest trends shaping the remote work landscape and what they mean for job seekers and employers.",
        author: "Mike Chen",
        date: "2024-03-12",
        readTime: "8 min read",
        category: "Industry Insights",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
        tags: ["remote work", "trends", "future"]
    },
    {
        id: 3,
        title: "Building a Strong Remote Work Portfolio",
        excerpt: "Learn how to showcase your remote work skills and create a portfolio that attracts top employers.",
        author: "Emma Davis",
        date: "2024-03-10",
        readTime: "6 min read",
        category: "Career Development",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop",
        tags: ["portfolio", "skills", "career development"]
    },
    {
        id: 4,
        title: "Work-Life Balance in Remote Jobs",
        excerpt: "Discover strategies to maintain a healthy work-life balance while working from home.",
        author: "Alex Rodriguez",
        date: "2024-03-08",
        readTime: "7 min read",
        category: "Wellness",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop",
        tags: ["work-life balance", "wellness", "productivity"]
    },
    {
        id: 5,
        title: "Top Remote-Friendly Companies in 2024",
        excerpt: "A comprehensive list of companies that are leading the way in remote work opportunities.",
        author: "Lisa Park",
        date: "2024-03-05",
        readTime: "10 min read",
        category: "Company Spotlights",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop",
        tags: ["companies", "remote jobs", "opportunities"]
    },
    {
        id: 6,
        title: "Essential Tools for Remote Workers",
        excerpt: "A curated list of must-have tools and software that every remote worker should know about.",
        author: "David Kim",
        date: "2024-03-02",
        readTime: "9 min read",
        category: "Tools & Technology",
        image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=400&h=250&fit=crop",
        tags: ["tools", "technology", "productivity"]
    }
];

const BlogCard = ({ blog }) => {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <Link to={`/blog/${blog.id}`} className="block">
                <div className="aspect-video overflow-hidden">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                            {blog.category}
                        </span>
                        <span className="text-gray-500 text-sm">{blog.readTime}</span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                        {blog.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">{blog.author}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">
                                {new Date(blog.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

const Blogs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [visibleCount, setVisibleCount] = useState(6);

    // Get unique categories
    const categories = useMemo(() => {
        const cats = [...new Set(mockBlogs.map(blog => blog.category))];
        return ['All', ...cats];
    }, []);

    // Filter blogs based on search and category
    const filteredBlogs = useMemo(() => {
        return mockBlogs.filter(blog => {
            const matchesSearch = searchTerm === '' ||
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesCategory = selectedCategory === '' || selectedCategory === 'All' ||
                blog.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
        setVisibleCount(6); // Reset visible count on search
    }, []);

    const handleCategoryChange = useCallback((category) => {
        setSelectedCategory(category);
        setVisibleCount(6); // Reset visible count on category change
    }, []);

    const loadMore = useCallback(() => {
        setVisibleCount(prev => Math.min(prev + 6, filteredBlogs.length));
    }, [filteredBlogs.length]);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Career Insights & Tips
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Stay ahead in your remote career journey with expert advice, industry insights, and practical tips.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto mb-6">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <svg className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category || (selectedCategory === '' && category === 'All')
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="text-center mb-8">
                    <p className="text-gray-600">
                        {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
                        {visibleCount < filteredBlogs.length && ` (showing ${visibleCount})`}
                    </p>
                </div>

                {/* Blog Grid */}
                {filteredBlogs.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {filteredBlogs.slice(0, visibleCount).map(blog => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>

                        {/* Load More Button */}
                        {visibleCount < filteredBlogs.length && (
                            <div className="text-center">
                                <button
                                    onClick={loadMore}
                                    className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Load More Articles ({visibleCount} of {filteredBlogs.length} shown)
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-4">No articles found matching your criteria</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('');
                                setVisibleCount(6);
                            }}
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;