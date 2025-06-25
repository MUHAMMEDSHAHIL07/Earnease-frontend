import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import StudentDashboard from './pages/Student/StudentDashboard';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmployer from './pages/Employer/verifyEmployer';


function App() {
  return (
    <>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register/student" />} />
        <Route path="/register/student" element={<Register />} />
        <Route path="/register/employer" element={<Register />} />
         <Route path="/student/dashboard" element={<StudentDashboard />} />
         <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/verify/employer" element={<VerifyEmployer/>} />
        
        <Route path ="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
export default App;
