import AdminNavbar from "../../components/admin/AdminNavbar";
import { Box, Typography } from "@mui/material";

const AdminDashboard = () => {
  return (
    <>
      <AdminNavbar />
      <Box p={3}>
        <Typography variant="h4">
          Welcome to Admin Dashboard
        </Typography>
      </Box>
    </>
  );
};

export default AdminDashboard;
