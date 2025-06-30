import { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LoginSchema } from "../../Schema";
import { GoogleLogin } from "@react-oauth/google";

const RoleSelectModal = ({ onSelect, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white p-6 rounded shadow-md w-80 text-center">
      <h3 className="text-lg font-semibold mb-4">Continue as</h3>
      <button
        onClick={() => onSelect("student")}
        className="w-full mb-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Student
      </button>
      <button
        onClick={() => onSelect("employer")}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Employer
      </button>
      <p
        onClick={onClose}
        className="mt-4 text-sm text-gray-500 cursor-pointer hover:underline"
      >
        Cancel
      </p>
    </div>
  </div>
);

const Login = () => {
 const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [googleCred, setGoogleCred] = useState(null);

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: async (vals) => {
      setLoading(true);
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/login",
          vals,
          { withCredentials: true }
        );
        toast.success("Login successful");

        // ✅ Store in localStorage (normal login)
        localStorage.setItem("earneaseUser", JSON.stringify({
          name: data.name,
          email: data.email,
          avatarUrl: data.avatarUrl,
          role: data.role
        }));

        if (data.role === "student") navigate("/");
        else navigate("/employer/dashboard");
      } catch (err) {
        const status = err.response?.status;
        const role = err.response?.data?.role;
        const empId = err.response?.data?.employerId;
        toast.error(err.response?.data?.message || "Login failed");
        if (status === 401 && role === "employer" && empId) {
          navigate("/verify/employer", { state: { employerId: empId } });
        }
        if (status === 403 && role === "employer") {
          navigate("/employer/verification-pending");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const handleGoogleSuccess = async (credResp) => {
    setGLoading(true);
    try {
      const first = await axios.post(
        "http://localhost:5000/api/auth/googlelogin",
        { credential: credResp.credential },
        { withCredentials: true }
      );

      if (first.data.exists) {
        localStorage.setItem("earneaseUser", JSON.stringify({
          avatarUrl: first.data.user.avatarUrl,
          role: first.data.role
        }));

        toast.success("Login successful");
        if (first.data.role === "employer") {
          if (!first.data.verified) {
            return navigate("/verify/employer", {
              state: { employerId: first.data.employerId },
            });
          }
          navigate("/employer/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setGoogleCred(credResp.credential);
        setShowModal(true);
      }
    } catch (err) {
  console.error("Google login error:", err.response || err);
  toast.error(err.response?.data?.message || err.message || "Google login failed");
}finally {
      setGLoading(false);
    }
  };

  const finishSignup = async (role) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/googlelogin",
        { credential: googleCred, role },
        { withCredentials: true }
      );
      toast.success("Account created");

      // ✅ Store new Google user in localStorage
      localStorage.setItem("earneaseUser", JSON.stringify({
        avatarUrl: res.data.user.avatarUrl,
      }));

      if (role === "employer") {
        navigate("/verify/employer", {
          state: { employerId: res.data.employerId },
        });
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-white-100">
      {showModal && (
        <RoleSelectModal
          onSelect={finishSignup}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px] text-center">
        <h2 className="text-3xl font-bold mb-1 text-gray-800">Welcome back 👋</h2>
        <p className="text-gray-500 mb-5">Login to continue your journey</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="text-left">
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <Link
            to={"/forgot-password"}
            className="text-blue-500 text-sm mt-2 block text-left"
          >
            Forgot password?
          </Link>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-3 text-sm text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <div className="flex justify-center">
            {gLoading ? (
              <p className="text-sm text-gray-500">Loading Google Login...</p>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google login failed")}
              />
            )}
          </div>

          <p className="text-sm mt-4 text-gray-600">
            Don't have an account?{" "}
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
