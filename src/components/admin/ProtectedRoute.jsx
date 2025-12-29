import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("adminUser");
  return user ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
