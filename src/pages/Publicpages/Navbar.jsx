import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("earneaseUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("earneaseUser");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 fixed top-0 w-full z-50 transition-shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Earnease Logo" className="h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/jobs" className="text-gray-700 hover:text-blue-600">Find Jobs</Link>
          <Link to="/post-job" className="text-gray-700 hover:text-blue-600">Post Job</Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600">How It Works</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
        </div>

        {/* Desktop Auth / Avatar */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative group">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register/student" className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pt-4 pb-2 space-y-2">
          <Link to="/jobs" className="block text-gray-700 hover:text-blue-600">Find Jobs</Link>
          <Link to="/post-job" className="block text-gray-700 hover:text-blue-600">Post Job</Link>
          <Link to="/how-it-works" className="block text-gray-700 hover:text-blue-600">How It Works</Link>
          <Link to="/about" className="block text-gray-700 hover:text-blue-600">About</Link>
          <hr className="my-2" />
          {user ? (
            <>
              <Link to="/dashboard" className="block text-sm text-gray-700 hover:text-blue-600">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-sm text-gray-700 hover:text-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-sm text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register/student" className="block bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium text-center">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
