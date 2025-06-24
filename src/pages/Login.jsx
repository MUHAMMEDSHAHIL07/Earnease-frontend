import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';
import { SignupSchema } from '../Schema';

const Login = () => {
    const [role, setRole] = useState("student")
    const navigate = useNavigate()
    const initialValues = {
        email: "",
        password: ""
    }
    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues,
        validationSchema:SignupSchema,
        onSubmit: async (values) => {
            try {
                 const payload = { ...values, role };
                const response = await axios.post("http://localhost:5000/api/auth/login", payload, { withCredentials: true })
                const user = response.data
                console.log(user);                 
                toast.success("login succesfull")
                if (role === "student") {
                    navigate("/student/dashboard")
                }
                else {
                    navigate("/employer/dashboard")
                }
            }
            catch (error) {
                toast.error("invalid email or password")
            }
        }
    })
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
                <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
                <p className="text-gray-600 mb-4">Please enter your details to sign in</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-left">
                        <select className="w-full p-2 border border-gray-300 rounded-md"
                        value={role}
                        onChange={(e)=>setRole(e.target.value)}
                        >
                            <option value="student">student</option>
                            <option value="employer">employer</option>
                        </select>
                    </div>
                    <div className="mb-4 text-left">
                        <input
                            type="email"
                            name='email'
                            placeholder="Enter your email"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                         {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mb-4 text-left relative">
                        <input
                            type="password"
                            name='password'
                            placeholder="Password"
                            className="w-full p-2 border border-gray-300 rounded-md pr-10"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
                    <Link to={"/register/student"} className="text-blue-500 text-sm mt-2 block">
                        Don't have an account? Register here
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login
