import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.includes("employer") ? "employer" : "student";
  const handleTabClick = (role) => navigate(`/register/${role}`);


  const otpRefs = useRef([]);

  //--------------otp field handle ------------------------//
  const handleOtpChange = (e, i) => {
    const value = e.target.value;
    if (/^\d$/.test(value) && i < otpRefs.current.length - 1) {
      otpRefs.current[i + 1].focus();
    } else if (value === "" && i > 0) {
      otpRefs.current[i - 1].focus(); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="mx-auto mb-2 w-10" />
          <h1 className="text-xl font-semibold text-gray-800">Create Your Account</h1>
          <p className="text-sm text-gray-500">Join our platform to start your journey</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            className={`flex-1 py-2 font-medium border-b-2 ${
              activeTab === "student"
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent"
            }`}
            onClick={() => handleTabClick("student")}
          >
            Student
          </button>
          <button
            className={`flex-1 py-2 font-medium border-b-2 ${
              activeTab === "employer"
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent"
            }`}
            onClick={() => handleTabClick("employer")}
          >
            Employer
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border rounded px-4 py-2 text-sm"
          />

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 border rounded px-4 py-2 text-sm"
            />
            <button
              type="button"
              className="bg-blue-600 text-white px-3 py-2 rounded text-sm"
            >
              Verify Email
            </button>
          </div>

          {/* OTP Fields */}
          <div className="flex justify-between gap-2">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                onChange={(e) => handleOtpChange(e, i)}
                ref={(el) => (otpRefs.current[i] = el)}
                className="w-10 h-10 border text-center rounded text-lg"
              />
            ))}
          </div>

          <div className="text-right text-sm text-blue-600 cursor-pointer">
            Resend (30s)
          </div>

          <div className="flex gap-2">
            <select className="border rounded-md px-3 py-2 text-sm">
              <option>+1</option>
              <option>+91</option>
              <option>+44</option>
            </select>
            <input
              type="text"
              placeholder="Enter phone number"
              className="flex-1 border rounded px-4 py-2 text-sm"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border rounded px-4 py-2 text-sm"
            />
            <ul className="text-xs mt-1 ml-1">
              <li className="text-green-600">• At least 8 characters</li>
              <li className="text-red-600">• Include numbers and symbols</li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded mt-2"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Already have an account? <a href="#" className="text-blue-600">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
