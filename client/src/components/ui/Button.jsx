import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
    const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-300";

    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
        secondary: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;