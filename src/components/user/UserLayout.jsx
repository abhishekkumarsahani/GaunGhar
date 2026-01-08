import { Box } from "@mui/material";
import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";

const UserLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <UserSidebar />
      <Box sx={{ flexGrow: 1 }}>
        <UserNavbar />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default UserLayout;
