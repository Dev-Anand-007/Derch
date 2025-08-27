import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(isLogin ? 'Login' : 'Signup', formData);
    };

    const formVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            x: -50,
            transition: { duration: 0.3, ease: "easeIn" }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-60"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-3xl opacity-50"
                    animate={{
                        scale: [1.1, 1, 1.1],
                        rotate: [360, 180, 0]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute top-2/3 left-1/6 w-64 h-64 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full blur-2xl opacity-40"
                    animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <motion.div
                className="w-full max-w-md relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Logo/Brand */}
                <motion.div
                    className="text-center mb-8"
                    variants={itemVariants}
                >
                    <motion.h1
                        className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        Derch
                    </motion.h1>
                    <motion.p
                        className="text-gray-600 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Welcome to the future
                    </motion.p>
                </motion.div>

                {/* Auth Card */}
                <motion.div
                    className="bg-white rounded-3xl p-8 shadow-2xl shadow-blue-500/10 border border-gray-100 relative overflow-hidden"
                    variants={itemVariants}
                >
                    {/* Subtle card gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 pointer-events-none" />

                    <div className="relative z-10">
                        {/* Toggle Buttons */}
                        <div className="flex bg-gray-100 rounded-2xl p-1.5 mb-8">
                            <motion.button
                                className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${isLogin
                                        ? 'bg-white text-blue-600 shadow-lg shadow-blue-500/20'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                onClick={() => setIsLogin(true)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                layout
                            >
                                Login
                            </motion.button>
                            <motion.button
                                className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${!isLogin
                                        ? 'bg-white text-purple-600 shadow-lg shadow-purple-500/20'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                onClick={() => setIsLogin(false)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                layout
                            >
                                Sign Up
                            </motion.button>
                        </div>

                        {/* Form */}
                        <AnimatePresence mode="wait">
                            <motion.form
                                key={isLogin ? 'login' : 'signup'}
                                variants={formVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                {/* Name field (only for signup) */}
                                {!isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Full Name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white transition-all duration-300"
                                                required={!isLogin}
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Email field */}
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300"
                                        required
                                    />
                                </div>

                                {/* Password field */}
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-14 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300"
                                        required
                                    />
                                    <motion.button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </motion.button>
                                </div>

                                {/* Confirm Password field (only for signup) */}
                                {!isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                placeholder="Confirm Password"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                className="w-full pl-12 pr-14 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white transition-all duration-300"
                                                required={!isLogin}
                                            />
                                            <motion.button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Forgot Password (only for login) */}
                                {isLogin && (
                                    <motion.div
                                        className="text-right"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <motion.a
                                            href="#"
                                            className="text-sm text-blue-500 hover:text-blue-600 transition-colors font-medium"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Forgot your password?
                                        </motion.a>
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-white shadow-xl transition-all duration-300 group ${isLogin
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/30'
                                            : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-purple-500/30'
                                        } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {isLogin ? 'Sign In' : 'Create Account'}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.button>

                                {/* Divider */}
                                <div className="relative my-8">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                {/* Social Login */}
                                <div className="grid grid-cols-2 gap-4">
                                    <motion.button
                                        type="button"
                                        className="flex items-center justify-center py-3 px-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all duration-300 group"
                                        whileHover={{ scale: 1.02, y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                        GitHub
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        className="flex items-center justify-center py-3 px-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all duration-300 group"
                                        whileHover={{ scale: 1.02, y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Chrome className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                        Google
                                    </motion.button>
                                </div>
                            </motion.form>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    className="text-center mt-8 text-gray-500"
                    variants={itemVariants}
                >
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <motion.button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-500 hover:text-blue-600 transition-colors font-semibold"
                            whileHover={{ scale: 1.05 }}
                        >
                            {isLogin ? "Sign up" : "Sign in"}
                        </motion.button>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}