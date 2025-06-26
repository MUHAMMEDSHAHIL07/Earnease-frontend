import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LoginSchema } from '../../Schema';

const Login = () => {
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const payload = { ...values, role };
        const response = await axios.post('http://localhost:5000/api/auth/login', payload, {
          withCredentials: true
        });
        const user = response.data;
        console.log(user);
        localStorage.setItem("earneaseUser", JSON.stringify(user.user));
        toast.success('Login successful');

        if (role === 'student') {
          navigate('/');
        } else {
          navigate('/employer/dashboard');
        }
      } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Login failed";
        const employerId = error.response?.data?.employerId;
        toast.info(message);
        if(status===401&&role==="employer"&&employerId){
            navigate("/verify/employer", { state: { employerId } });
            return;
        }
        if (status === 403 && role === "employer") {
          navigate("/employer/verification-pending");
        }
      }
    }
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-white-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px] text-center transition-transform hover:scale-[1.01]">
        <h2 className="text-3xl font-bold mb-1 text-gray-800">Welcome back 👋</h2>
        <p className="text-gray-500 mb-5">Login to continue your journey</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block mb-1 text-sm font-medium text-gray-600">Select Role</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          <div className="text-left">
            <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="text-left">
            <label className="block mb-1 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign in
          </button>

          <a href="#" className="text-blue-500 text-sm mt-2 block text-left">
            Forgot password?
          </a>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-3 text-sm text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* You can add Google Login button here later */}
          <button className="w-full border border-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-100 transition">
            Continue with Google
          </button>

          <p className="text-sm mt-4 text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register/student" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
