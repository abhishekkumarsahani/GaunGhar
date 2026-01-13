import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Badge,
  Menu,
  MenuItem,
  Divider,
  alpha,
  useTheme,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Notifications,
  Logout,
  Person,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminNavbar = ({ toggleTheme, themeMode, toggleSidebar }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear(); // or remove token
    navigate("/admin/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: theme.palette.background.paper,
        color: "text.primary",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar>
        {/* SIDEBAR TOGGLE */}
        <IconButton color="primary" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>
          GaunGhar Admin
        </Typography>

        {/* THEME TOGGLE */}
        <IconButton onClick={toggleTheme} color="primary">
          {themeMode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {/* NOTIFICATION */}
        <IconButton color="primary">
          <Badge badgeContent={3} color="error">
            <Notifications />
          </Badge>
        </IconButton>

        {/* USER AVATAR */}
        <IconButton onClick={handleOpenMenu}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 36,
              height: 36,
              cursor: "pointer",
            }}
          >
            A
          </Avatar>
        </IconButton>

        {/* USER MENU */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 180,
              borderRadius: 2,
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              navigate("/admin/profile");
              handleCloseMenu();
            }}
          >
            <Person sx={{ mr: 1 }} /> Profile
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={handleLogout}
            sx={{ color: "error.main" }}
          >
            <Logout sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
