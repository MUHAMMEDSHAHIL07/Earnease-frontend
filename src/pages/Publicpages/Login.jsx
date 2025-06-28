import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LoginSchema } from '../../Schema';
import { GoogleLogin } from "@react-oauth/google";
const Login = () => {
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
        const response = await axios.post('http://localhost:5000/api/auth/login', values, {
          withCredentials: true
        });
        const user = response.data;
        console.log(user);
        localStorage.setItem("earneaseUser", JSON.stringify(user.user));
        toast.success('Login successful');

        if (user.role === 'student') {
          navigate('/');
        } else {
          navigate('/employer/dashboard');
        }
      } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Login failed";
        const employerId = error.response?.data?.employerId;
        const role = error.response?.data?.role
        toast.info(message);
        if (status === 401 && role === "employer" && employerId) {
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

          <Link to={"/forgot-password"} className="text-blue-500 text-sm mt-2 block text-left">
            Forgot password?
          </Link>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-3 text-sm text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>
          <div>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await axios.post(
                    'http://localhost:5000/api/auth/googlelogin',
                    {
                      credential: credentialResponse.credential,
                    },
                    { withCredentials: true }
                  );

                  toast.success("Google login successful");

                  if (res.data.role === "employer" && res.data.isNew) {
                    localStorage.setItem("employerId", res.data.employerId);
                    navigate("/verify/employer", { state: { employerId: res.data.employerId } });
                  } else if (res.data.role === "employer") {
                    navigate("/employer/dashboard");
                  } else {
                    navigate("/");
                  }

                } catch (err) {
                  console.error(err);
                  toast.error(err.message);
                }
              }}
              onError={() => {
                toast.error("Google login failed");
              }}
            />
            <br />
          </div>

          <p className="text-sm mt-4 text-gray-600">
            Don't have an account?{' '}
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
