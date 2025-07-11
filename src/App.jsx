import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import StudentDashboard from './pages/Student/StudentDashboard';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmployer from './pages/Employer/verifyEmployer';
import VerificationPending from './pages/Employer/VerificationPending';
import HomePage from './pages/Publicpages/Home';
import Register from './pages/Publicpages/Register';
import Login from './pages/Publicpages/Login';
import ForgotPassword from './pages/Publicpages/ForgotPassword';
import ResetPassword from './pages/Publicpages/ResetPassword';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import PendingEmployers from './pages/Admin/PendingEmployers';
import EmployerDetail from './pages/Admin/EmployerDetail';
import StudentManagement from './pages/Admin/StudentManagement';
import EmployerManagement from './pages/Admin/EmployerManagement';
import PostJob from './pages/Employer/PostJob';
import ViewJob from './pages/Employer/ViewJob';
import EditJob from './pages/Employer/EditJob';
import JobListUI from './pages/Student/StudentJob';
import EmployerApplications from './pages/Employer/EmployerApplications';
import EmployerEditProfile from './pages/Employer/EmployerEditProfile';
import SingleViewEmployer from './pages/Admin/SingleViewEmp';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ------------------------------------------common routes-------------------------------------- */}
          <Route path="/" element={<HomePage />} /> 
          <Route path="/register/student" element={<Register />} />
          <Route path="/register/employer" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />

          {/*------------------------------------------student routes-------------------------------------- */}

          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/studentmanagement" element={<StudentManagement />} />
          <Route path="/job" element={<JobListUI/>} />

         {/*-------------------------------------------employer routes--------------------------------------*/}

          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/verify/employer" element={<VerifyEmployer />} />
          <Route path="/employer/verification-pending" element={<VerificationPending />} />
          <Route path="/admin/employers/pending" element={<PendingEmployers/>} />
          <Route path="/admin/employers/:id" element={<EmployerDetail />} />
           <Route path="/admin/employerview/:id" element={<SingleViewEmployer />} />
          <Route path="/employermanagement" element={<EmployerManagement />} />
          <Route path="/employer/editjob/:id" element={<EditJob />} />
          <Route path="/viewJob" element={<ViewJob />} />
          <Route path="/employer/post-job" element={<PostJob />} />
          <Route path="/employer/getApplication" element={<EmployerApplications />} />
          <Route path="/employer/editProfile" element={<EmployerEditProfile />} />

        {/*--------------------------------------------admin routes-----------------------------------------*/}
          <Route path="/adminlog" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />


       </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
export default App;
