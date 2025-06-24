import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
            return (
                <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
                        <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
                        <p className="text-gray-600 mb-4">Please enter your details to sign in</p>
                        <form>
                            <div className="mb-4 text-left">
                                <select className="w-full p-2 border border-gray-300 rounded-md">
                                    <option value="student">student</option>
                                    <option value="employer">employer</option>
                                </select>
                            </div>
                            <div className="mb-4 text-left">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4 text-left relative">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full p-2 border border-gray-300 rounded-md pr-10"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            >
                                Sign in
                            </button>
                            <a href="#" className="text-blue-500 text-sm mt-2 block">
                                Forgot password?
                            </a>
                            <Link to={"/register"} className="text-blue-500 text-sm mt-2 block">
                                Don't have an account? Register here
                            </Link>
                        </form>
                    </div>
                </div>
            );
        };

export default Login
