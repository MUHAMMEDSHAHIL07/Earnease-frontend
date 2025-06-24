import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useFormik } from 'formik';
import { SignupSchema } from '../Schema';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.includes('employer') ? 'employer' : 'student';
  const handleTabClick = (role) => navigate(`/register/${role}`);
  const otpRefs = useRef([]);
  const [otp, setOtps] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phonenumber: "",
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched
  } = useFormik({
    initialValues,
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const endpoint = activeTab === "student"
        ? "http://localhost:5000/api/auth/userregister"
        : "http://localhost:5000/api/auth/employerregister";

      const payload = activeTab === "student"
        ? {
            name: values.name,
            email: values.email,
            password: values.password,
            phonenumber: values.phonenumber
          }
        : {
            companyname: values.name,
            email: values.email,
            password: values.password,
            phonenumber: values.phonenumber
          };

      try {
        const res = await axios.post(endpoint, payload, { withCredentials: true });
        toast.success("Account created successfully");
        if (activeTab === "student") {
          navigate("/login");
        } else {
          navigate("/verify", { state: { email: values.email } });
        }
      } catch (error) {
        toast.error("Error to register");
      }
    }
  });

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

        <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white p-10 w-full md:w-1/2">
          <img src={logo} alt="Logo" className="w-14 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-sm text-blue-100 text-center">
            Register your account and explore opportunities with us.
          </p>
        </div>

        <div className="p-8 md:p-10 w-full md:w-1/2">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Create Your Account</h1>
            <p className="text-sm text-gray-500">It's quick and easy</p>
          </div>

          <div className="flex mb-6 border rounded-full overflow-hidden text-sm font-medium">
            <button
              onClick={() => handleTabClick("student")}
              className={`flex-1 py-2 transition ${activeTab === "student"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => handleTabClick("employer")}
              className={`flex-1 py-2 transition ${activeTab === "employer"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
              }`}
            >
              Employer
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              name='name'
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.name && touched.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
               <button
                type="button"
                className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                onClick={()=>setOtps(true)}
              >
                Verify
              </button>
            </div>
             {errors.email && touched.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            {otp && (
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
            )}

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
                name='phonenumber'
                value={values.phonenumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            {errors.phonenumber && <p className="text-red-500 text-sm">{errors.phonenumber}</p>}

            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.password &&  <p className="text-red-500 text-sm">{errors.password}</p>}
              {/* <ul className="text-xs mt-1 ml-1">
                <li className="text-green-600">• At least 8 characters</li>
                <li className="text-red-600">• Include numbers & symbols</li>
              </ul> */}
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