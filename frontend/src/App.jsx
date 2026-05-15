import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';

import LandingPage from './pages/public/LandingPage'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import VerifyOtp from './pages/auth/verifyOtp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

import MainLayout from './layout/MainLayout'

import About from './pages/public/About'
import ContactUs from './pages/public/ContactUs'

import Settings from './pages/settings/Settings'

import PublicProfile from './pages/profile/PublicProfile';

import Search from './pages/search/Search';

import UserProfileView from './pages/profile/UserProfileView';

import ScrollToTop from './components/scrollTop/ScrollToTop';

import ProtectedRoute from './components/protectedRoutes/ProtectedRoute'

// ✅ Employee pages
import EmployeeDashboard from './pages/employee/Dashboard'
import EmployeeProfile from './pages/employee/Profile'
import EmployeeEditProfile from './pages/employee/EditProfile'
import EmployeeApplications from './pages/employee/Applications'
import EmployeeComplaint from './pages/employee/Complaint'
import EmployeeConnections from './pages/employee/Connections'
import EmployeeFindJobs from './pages/employee/FindJobs'
import EmployeeMessages from './pages/employee/Messages'
import EmployeeTrustScore from './pages/employee/TrustScore'
import EmployeeWorkHistory from './pages/employee/WorkHistory'
import JobDetails from "./pages/employee/JobDetails";
import SavedJobs from "./pages/employee/SavedJobs";


// ✅ Employer pages
import EmployerDashboard from './pages/employer/Dashboard'
import EmployerProfile from './pages/employer/Profile'
import EmployerEditProfile from './pages/employer/EditProfile'
import EmployerPostJob from './pages/employer/PostJob'
import EmployerMyJobs from './pages/employer/MyJobs'
import EmployerApplicants from './pages/employer/Applicants'
import EmployerMessages from './pages/employer/Messages'
import EmployerConnections from './pages/employer/Connections'
import EmployerComplaint from './pages/employer/Complaint'
import ApplicantsPage from "./pages/employer/ApplicantsPage";


// ✅ Admin pages
import AdminDashboard from './pages/admin/Dashboard'
import AddAdmin from './pages/admin/AddAdmin'
import AdminUsers from './pages/admin/Users'
import AdminJobs from './pages/admin/Jobs'
import AdminMessages from './pages/admin/Messages'
import AdminReports from './pages/admin/Reports'
import AdminEditData from './pages/admin/EditData';
import Contacts from './pages/admin/Contacts';

const App = () => {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <ToastContainer />
    
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/signup/:role" element={<Signup />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />

        



        {/* ================= EMPLOYEE ================= */}
        <Route path="/employee" element={<ProtectedRoute allowedRole="employee"> <MainLayout role="employee" /> </ProtectedRoute>}>

          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="profile" element={<EmployeeProfile />} />
          <Route path="applications" element={<EmployeeApplications />} />
          <Route path="complaint" element={<EmployeeComplaint />} />
          <Route path="connections" element={<EmployeeConnections />} />
          <Route path="find-jobs" element={<EmployeeFindJobs />} />
          <Route path="messages" element={<EmployeeMessages  />} />
          <Route path="settings" element={<Settings />} />
          <Route path="trust-score" element={<EmployeeTrustScore />} />
          <Route path="work-history" element={<EmployeeWorkHistory />} />
          <Route path="edit-profile" element={<EmployeeEditProfile />} />
          <Route path="search" element={<Search />} />
          <Route path="profile/:userId" element={<PublicProfile />} />
          <Route path="profile-view/:userId" element={<UserProfileView/>} />

          <Route path="/employee/job/:jobId" element={<JobDetails />} />
          <Route path="/employee/saved-jobs" element={<SavedJobs />} />
          
        
        
        </Route>


        {/* ================= EMPLOYER ================= */}
        <Route path="/employer" element={<ProtectedRoute allowedRole="employer"> <MainLayout role="employer" /> </ProtectedRoute>}>

          <Route path="dashboard" element={<EmployerDashboard />} />
          <Route path="profile" element={<EmployerProfile />} />
          <Route path="post-job" element={<EmployerPostJob />} />
          <Route path="posted-jobs" element={<EmployerMyJobs />} />
          <Route path="applicants" element={<EmployerApplicants />} />
          <Route path="messages" element={<EmployerMessages />} />
          <Route path="connections" element={<EmployerConnections />} />
          <Route path="settings" element={<Settings />} />
          <Route path="complaint" element={<EmployerComplaint />} />
          <Route path="edit-profile" element={<EmployerEditProfile />} />
          <Route path="search" element={<Search />} />
          <Route path="profile/:userId" element={<PublicProfile />} />
          <Route path="profile-view/:userId" element={<UserProfileView/>} />
          <Route path="view-applicants" element={<ApplicantsPage />} />

        </Route>


        {/* ================= ADMIN ================= */}
        <Route path="/admin" element={<ProtectedRoute allowedRole="admin"> <MainLayout role="admin" /> </ProtectedRoute>}>

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path='add-admin' element={<AddAdmin />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="messages" element={<AdminMessages  />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="edit-data" element={<AdminEditData />} />
          <Route path="search" element={<Search />} />
          <Route path="profile/:userId" element={<PublicProfile />} />
          <Route path="profile-view/:userId" element={<UserProfileView/>} />
          <Route path="contacts" element={<Contacts  />} />

        </Route>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
