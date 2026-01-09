import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Dashboard,
  Person,
  Event,
  AccountBalance,
  Badge,
  ReportProblem,
  Home,
  Notifications,
  Settings,
  Help,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 280;

const UserSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const mainMenu = [
    { text: "Dashboard", icon: <Dashboard />, path: "/user/dashboard" },
    { text: "Profile", icon: <Person />, path: "/user/profile" },
    { 
      text: "Complaints", 
      icon: <ReportProblem />, 
      path: "/user/complaints",
      badge: 3 // Example badge count
    },
    { text: "Government ID", icon: <Badge />, path: "/user/government-identity" },
    { text: "Ledger", icon: <AccountBalance />, path: "/user/ledger" },
    { text: "Events", icon: <Event />, path: "/user/events" },
  ];

  const secondaryMenu = [
    { text: "Settings", icon: <Settings />, path: "/user/settings" },
    { text: "Help & Support", icon: <Help />, path: "/user/help" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          bgcolor: 'background.paper',
          borderRight: 'none',
          boxShadow: '0 0 24px rgba(0, 0, 0, 0.08)',
          overflowX: 'hidden',
        },
      }}
    >
      {/* Header Section */}
      <Box sx={{ 
        p: 3, 
        bgcolor: 'primary.main',
        color: 'white',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              width: 48,
              height: 48,
              fontWeight: 'bold',
              fontSize: '1.25rem'
            }}
          >
            {user?.FirstName?.[0] || "U"}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600} noWrap>
              {`${user?.FirstName || ""} ${user?.LastName || ""}`}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              {user?.ToleName || "Tole Resident"}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Menu */}
      <Box sx={{ p: 2, pt: 3 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            px: 2, 
            color: 'text.secondary',
            fontWeight: 600,
            letterSpacing: '0.5px',
            display: 'block',
            mb: 1
          }}
        >
          MAIN MENU
        </Typography>
        
        <List sx={{ px: 1 }}>
          {mainMenu.map((item) => {
            const active = location.pathname === item.path || 
                          location.pathname.startsWith(item.path + "/");

            return (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  mb: 0.5,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  bgcolor: active ? 'primary.light' : 'transparent',
                  color: active ? 'primary.contrastText' : 'text.primary',
                  '&:hover': {
                    bgcolor: active ? 'primary.light' : 'action.hover',
                    transform: 'translateX(4px)',
                    transition: 'transform 0.2s ease',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: active ? 'primary.contrastText' : 'text.secondary',
                    minWidth: 40
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontWeight: active ? 600 : 400,
                    fontSize: '0.95rem'
                  }}
                />
                {item.badge && (
                  <Chip 
                    label={item.badge} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'error.main',
                      color: 'white',
                      height: 20,
                      fontSize: '0.75rem'
                    }}
                  />
                )}
              </ListItemButton>
            );
          })}
        </List>

        {/* Secondary Menu */}
        <Box sx={{ mt: 4 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              px: 2, 
              color: 'text.secondary',
              fontWeight: 600,
              letterSpacing: '0.5px',
              display: 'block',
              mb: 1
            }}
          >
            PREFERENCES
          </Typography>
          
          <List sx={{ px: 1 }}>
            {secondaryMenu.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  mb: 0.5,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  '&:hover': {
                    bgcolor: 'action.hover',
                    transform: 'translateX(4px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ fontSize: '0.95rem' }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default UserSidebar;