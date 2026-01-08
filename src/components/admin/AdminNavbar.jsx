import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Badge,
  alpha,
  useTheme,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Notifications,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ toggleTheme, themeMode, toggleSidebar }) => {
  const navigate = useNavigate();
  const theme = useTheme();

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

        {/* USER */}
        <IconButton onClick={() => navigate("/admin/profile")}>
          <Avatar sx={{ bgcolor: "primary.main" }}>A</Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
