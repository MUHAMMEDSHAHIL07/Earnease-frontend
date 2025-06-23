import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.includes('employer') ? 'employer' : 'student';
  const handleTabClick = (role) => navigate(`/register/${role}`);
  const otpRefs = useRef([]);

  const handleOtpChange = (e, i) => {
    const value = e.target.value;
    if (/^\d$/.test(value) && i < otpRefs.current.length - 1) {
      otpRefs.current[i + 1].focus();
    } else if (value === '' && i > 0) {
      otpRefs.current[i - 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-pink-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
        
        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white p-10 w-full md:w-1/2">
          <img src={logo} alt="Logo" className="w-14 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-sm text-blue-100 text-center">
            Register your account and explore opportunities with us.
          </p>
        </div>

        {/* Right Panel - Form */}
        <div className="p-8 md:p-10 w-full md:w-1/2">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Create Your Account</h1>
            <p className="text-sm text-gray-500">It's quick and easy</p>
          </div>

          {/* Tabs */}
          <div className="flex mb-6 border rounded-full overflow-hidden text-sm font-medium">
            <button
              onClick={() => handleTabClick("student")}
              className={`flex-1 py-2 transition ${
                activeTab === "student"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => handleTabClick("employer")}
              className={`flex-1 py-2 transition ${
                activeTab === "employer"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Employer
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="button"
                className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Verify
              </button>
            </div>

            {/* OTP */}
            <div className="flex justify-between gap-1">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  onChange={(e) => handleOtpChange(e, i)}
                  ref={(el) => (otpRefs.current[i] = el)}
                  className="w-10 h-10 border text-center rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              ))}
            </div>

            <div className="text-right text-xs text-blue-600 cursor-pointer">
              Resend in 30s
            </div>

            <div className="flex gap-2">
              <select className="border rounded-lg px-3 py-2 text-sm">
                <option>+1</option>
                <option>+91</option>
                <option>+44</option>
              </select>
              <input
                type="text"
                placeholder="Phone Number"
                className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <ul className="text-xs mt-1 ml-1">
                <li className="text-green-600">• At least 8 characters</li>
                <li className="text-red-600">• Include numbers & symbols</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-500 mt-3">
              Already have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
