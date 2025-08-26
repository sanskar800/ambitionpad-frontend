import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogs } from "../assets/assets.js"; // ✅ import blogs directly

const BlogCard = ({ blog }) => {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <Link to={`/blogs/${blog.id}`} className="block"> {/* ✅ Fixed: use blog.id instead of id */}
                <div className="aspect-video overflow-hidden">
                    <img
                        src={blog.image}  // ✅ directly use blog.image
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                            {blog.category || "Remote Work"}
                        </span>
                        <span className="text-gray-500 text-sm">{blog.readTime || "5 min read"}</span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                        {blog.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">{blog.author || "Ambition Pad Team"}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">
                                {blog.date
                                    ? new Date(blog.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })
                                    : "2025"}
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
        const cats = [...new Set(blogs.map(blog => blog.category || "Remote Work"))];
        return ['All', ...cats];
    }, []);

    // Filter blogs
    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => {
            const matchesSearch =
                searchTerm === '' ||
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory =
                selectedCategory === '' ||
                selectedCategory === 'All' ||
                blog.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
        setVisibleCount(6);
    }, []);

    const handleCategoryChange = useCallback((category) => {
        setSelectedCategory(category);
        setVisibleCount(6);
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

                {/* Search & Filters */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    {/* Search */}
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

                    {/* Categories */}
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

                        {/* Load More */}
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