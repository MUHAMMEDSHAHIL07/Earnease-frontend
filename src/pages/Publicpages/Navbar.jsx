import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600 flex items-center">
          <img src={logo} alt="Earnease Logo" className="h-13 w-auto object-contain" />
        </Link>
        <div className="space-x-6 hidden md:flex">
          <Link to="/jobs" className="text-gray-700 hover:text-blue-600">Find Jobs</Link>
          <Link to="/post-job" className="text-gray-700 hover:text-blue-600">Post Job</Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600">How It Works</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-sm text-gray-700 hover:text-blue-600">Login</Link>
          <Link to="/register/student" className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
