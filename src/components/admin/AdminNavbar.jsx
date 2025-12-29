import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("adminUser"));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>

        <Box>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Avatar>
              {user?.UserName?.charAt(0)?.toUpperCase() || "A"}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem disabled>
              {user?.UserName || "Admin"}
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
