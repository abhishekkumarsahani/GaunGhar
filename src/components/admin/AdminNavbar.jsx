import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Badge,
  InputBase,
  alpha,
  styled,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  Person,
  Settings,
  ExitToApp,
} from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 12,
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  "&:hover": {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.primary.main,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

const AdminNavbar = ({ toggleTheme, themeMode, toggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("adminUser")) || { 
    UserName: "Admin", 
    role: "Super Admin" 
  };
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [quickActionsAnchorEl, setQuickActionsAnchorEl] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const notifications = [
    { id: 1, title: "New community registration", time: "5 min ago", read: false, type: "info" },
    { id: 2, title: "3 new members joined", time: "1 hour ago", read: false, type: "success" },
    { id: 3, title: "Content reported", time: "2 hours ago", read: true, type: "warning" },
    { id: 4, title: "System update available", time: "1 day ago", read: true, type: "info" },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: theme.palette.mode === "light"
          ? "linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%)"
          : "linear-gradient(135deg, #1A2235 0%, #121826 100%)",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Toolbar sx={{ minHeight: 70, px: { xs: 2, md: 3 } }}>
        <IconButton
          color="primary"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              color: "white",
              width: 36,
              height: 36,
              display: { xs: "none", md: "flex" },
            }}
          >
            G
          </Avatar>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              letterSpacing: "-0.5px",
              display: { xs: "none", md: "block" },
            }}
          >
            GaunGhar Admin
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              letterSpacing: "-0.5px",
              display: { xs: "block", md: "none" },
            }}
          >
            GG
          </Typography>
        </Box>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search users, communities, reports..."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton 
            color="primary" 
            onClick={toggleTheme}
            sx={{ 
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.2),
              }
            }}
          >
            {themeMode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <IconButton
            color="primary"
            onClick={(e) => setQuickActionsAnchorEl(e.currentTarget)}
            sx={{ 
              borderRadius: 2,
              bgcolor: alpha(theme.palette.info.main, 0.1),
              '&:hover': {
                bgcolor: alpha(theme.palette.info.main, 0.2),
              }
            }}
          >
            <Settings />
          </IconButton>

          <IconButton
            color="primary"
            onClick={(e) => setNotificationsAnchorEl(e.currentTarget)}
            sx={{ position: "relative" }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton 
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ 
              p: 0.5,
              border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                color: "white",
                fontWeight: 600,
                width: 36,
                height: 36,
              }}
            >
              {user?.UserName?.charAt(0)?.toUpperCase() || "A"}
            </Avatar>
          </IconButton>
        </Box>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            elevation: 8,
            sx: {
              mt: 1.5,
              minWidth: 240,
              borderRadius: 2,
              overflow: "visible",
              filter: "drop-shadow(0px 8px 24px rgba(0,0,0,0.15))",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
        >
          <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {user?.UserName || "Admin User"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user?.role || "Super Admin"}
            </Typography>
          </Box>
          <MenuItem sx={{ py: 1.5, gap: 1.5 }} onClick={() => navigate("/admin/profile")}>
            <Person fontSize="small" color="action" />
            My Profile
          </MenuItem>
          <MenuItem sx={{ py: 1.5, gap: 1.5 }}>
            <Settings fontSize="small" color="action" />
            Account Settings
          </MenuItem>
          <MenuItem 
            onClick={handleLogout}
            sx={{
              py: 1.5,
              gap: 1.5,
              color: "error.main",
              "&:hover": { 
                bgcolor: "error.light", 
                color: "white" 
              },
            }}
          >
            <ExitToApp fontSize="small" />
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationsAnchorEl}
          open={Boolean(notificationsAnchorEl)}
          onClose={() => setNotificationsAnchorEl(null)}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 360,
              maxHeight: 400,
              borderRadius: 2,
            },
          }}
        >
          <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Notifications ({unreadCount} new)
            </Typography>
          </Box>
          {notifications.map((notification) => (
            <MenuItem 
              key={notification.id} 
              sx={{ 
                py: 2,
                borderBottom: 1,
                borderColor: "divider",
                bgcolor: !notification.read ? alpha(theme.palette.info.light, 0.3) : "transparent",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: `${notification.type}.light`,
                    color: `${notification.type}.main`,
                  }}
                >
                  <NotificationsIcon fontSize="small" />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" fontWeight={500}>
                    {notification.title}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {notification.time}
                  </Typography>
                </Box>
                {!notification.read && (
                  <Box 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: "50%", 
                      bgcolor: "primary.main" 
                    }} 
                  />
                )}
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;