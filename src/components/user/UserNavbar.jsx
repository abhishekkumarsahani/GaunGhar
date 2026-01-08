import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Logout,
  Person,
  Home,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UserNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fullName = `${user?.FirstName || ""} ${user?.LastName || ""}`;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LEFT */}
        <Box display="flex" alignItems="center" gap={1}>
          <Home color="primary" />
          <Typography variant="h6" fontWeight={700}>
            {user?.ToleName || "Tole System"}
          </Typography>
        </Box>

        {/* RIGHT */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box textAlign="right">
            <Typography variant="body2" fontWeight={600}>
              {fullName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              User
            </Typography>
          </Box>

          <Tooltip title="Account">
            <IconButton onClick={handleMenuOpen}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 36,
                  height: 36,
                }}
              >
                {user?.FirstName?.[0] || "U"}
              </Avatar>
            </IconButton>
          </Tooltip>

          {/* MENU */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/profile");
              }}
            >
              <Person fontSize="small" sx={{ mr: 1 }} />
              My Profile
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <Logout fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default UserNavbar;
