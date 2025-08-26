import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogs } from "../assets/assets";

const BlogDetails = () => {
    const { id } = useParams();
    const blog = blogs.find((b) => b.id === parseInt(id));

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
                <p className="text-gray-600 mb-6">
                    Sorry, the blog you are looking for does not exist or has been removed.
                </p>
                <Link
                    to="/blogs"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Back to Blogs
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 max-w-4xl">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        to="/blogs"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        ← Back to Blogs
                    </Link>
                </div>

                {/* Blog Image */}
                <div className="w-full h-80 rounded-xl overflow-hidden shadow-md mb-8">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Blog Header */}
                <div className="mb-6">
                    <span className="px-4 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {blog.category || "Remote Work"}
                    </span>
                    <h1 className="mt-4 text-4xl font-bold text-gray-900 leading-tight">
                        {blog.title}
                    </h1>
                    <div className="flex items-center gap-3 mt-4 text-gray-600">
                        <span className="font-medium">{blog.author || "Ambition Pad Team"}</span>
                        <span>•</span>
                        <span>
                            {blog.date
                                ? new Date(blog.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })
                                : "2025"}
                        </span>
                        <span>•</span>
                        <span>{blog.readTime || "5 min read"}</span>
                    </div>
                </div>

                {/* Blog Content */}
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <p>{blog.description}</p>
                    {/* If you add `content` field in assets.js, render it here */}
                    {blog.content && <div dangerouslySetInnerHTML={{ __html: blog.content }} />}
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
