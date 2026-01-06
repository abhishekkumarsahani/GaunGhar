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

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
