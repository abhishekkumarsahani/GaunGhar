import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import ToleManagement from "./pages/admin/Tole";
import HelpLine from "./pages/admin/Helpline";
import Slider from "./pages/admin/Slider";
import Event from "./pages/admin/Event";
import Complain from "./pages/admin/ComplainTopic";
import MyProfile from "./pages/admin/MyProfile";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Complaints from "./pages/admin/Complaints";
import GovernmentIdentity from "./pages/admin/GovernmentIdentity";
import Ledger from "./pages/admin/Ledger";
import Account from "./pages/admin/SimpleAccount";
import ManagementYear from "./pages/admin/ManagementYear";
import Management from "./pages/admin/Management";
import Income from "./pages/admin/IncomeExpense";

//for the user 
import HomePage from "./pages/user/HomePage";
import UserProtectedRoute from "./components/user/UserProtectedRoute";
import UserLogin from "./pages/user/UserLogin";
import UserDashboard from "./pages/user/UserDashboard";
import About from "./pages/user/AboutPage";
import Features from "./pages/user/FeaturesPage";
import ToleClient from "./pages/user/ToleClient";
import HelplineClient from "./pages/user/HelplineClient";
import EventClient from "./pages/user/EventClient";
import ComplainClient from "./pages/user/ComplainClient";
import NearMeClient from "./pages/user/NearMeClient";
import ManagementClient from "./pages/user/ManagementTeam";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        
        <Route path="/admin/login" element={<AdminLoginPage />} />
        {/* Protected Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/tole" element={<ProtectedRoute><ToleManagement /></ProtectedRoute>} />
        <Route path="/admin/helpline" element={<ProtectedRoute><HelpLine /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        <Route path="/admin/slider" element={<ProtectedRoute><Slider /></ProtectedRoute>} />
        <Route path="/admin/event" element={<ProtectedRoute><Event /></ProtectedRoute>} />
        <Route path="/admin/complain" element={<ProtectedRoute><Complain /></ProtectedRoute>} />
        <Route path="/admin/complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />
        <Route path="/admin/government-identity" element={<ProtectedRoute><GovernmentIdentity /></ProtectedRoute>} />
        <Route path="/admin/ledger" element={<ProtectedRoute><Ledger /></ProtectedRoute>} />
        <Route path="/admin/simple-account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/admin/management-year" element={<ProtectedRoute><ManagementYear /></ProtectedRoute>} />
        <Route path="/admin/management" element={<ProtectedRoute><Management /></ProtectedRoute>} />
        <Route path="/admin/income-expense" element={<ProtectedRoute><Income /></ProtectedRoute>} />

         {/* ================= USER ================= */}
        <Route path="/login" element={<UserLogin />} />

        <Route path="/user/dashboard" element={<UserProtectedRoute><UserDashboard /></UserProtectedRoute>} />
        <Route path="/user/toleinfo" element={<UserProtectedRoute><ToleClient /></UserProtectedRoute>} />
        <Route path="/user/helpline" element={<UserProtectedRoute><HelplineClient /></UserProtectedRoute>} />
        <Route path="/user/events" element={<UserProtectedRoute><EventClient /></UserProtectedRoute>} />
        <Route path="/user/complain" element={<UserProtectedRoute><ComplainClient /></UserProtectedRoute>} />
        <Route path="/user/near-me" element={<UserProtectedRoute><NearMeClient /></UserProtectedRoute>} />
        <Route path="/user/management" element={<UserProtectedRoute><ManagementClient /></UserProtectedRoute>} />
         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
