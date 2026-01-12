import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Box, Avatar, useTheme, alpha, Divider
} from "@mui/material";
import {
  Dashboard, Person, Event, AccountBalance, Badge,
  ReportProblem, Settings, Help, Groups, PersonPinCircle,
  ContactPhone, Home, ChevronRight
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 280;

const UserSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));

  const mainMenu = [
    { text: "Dashboard", icon: <Dashboard />, path: "/user/dashboard" },
    { text: "Profile", icon: <Person />, path: "/user/profile" },
    { text: "Tole Info", icon: <Home />, path: "/user/toleinfo" },
    { text: "Helpline", icon: <ContactPhone />, path: "/user/helpline" },
    { text: "Events", icon: <Event />, path: "/user/events" },
    { text: "Complain", icon: <ReportProblem />, path: "/user/complain" },
    { text: "Near Me", icon: <PersonPinCircle />, path: "/user/near-me" },
    { text: "Management", icon: <Groups />, path: "/user/management" },
    { text: "Government ID", icon: <Badge />, path: "/user/government-identity" },
    { text: "Ledger", icon: <AccountBalance />, path: "/user/ledger" },
  ];

  const secondaryMenu = [
    { text: "Settings", icon: <Settings />, path: "/user/settings" },
    { text: "Help & Support", icon: <Help />, path: "/user/help" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: `1px dashed ${theme.palette.divider}`,
          background: theme.palette.background.default,
        },
      }}
    >
      {/* BRANDING / LOGO SECTION */}
      <Box sx={{ px: 3, py: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box 
          sx={{ 
            width: 32, height: 32, borderRadius: 1, 
            bgcolor: theme.palette.primary.main,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.4)}`
          }}
        >
          <Home sx={{ color: '#fff', fontSize: 20 }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.5px', color: theme.palette.text.primary }}>
          TOLE<span style={{ color: theme.palette.primary.main }}>PORTAL</span>
        </Typography>
      </Box>

      {/* USER CARD - Glassmorphism style */}
      <Box sx={{ px: 2, mb: 3 }}>
        <Box sx={{ 
          p: 2, borderRadius: 3, 
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          display: "flex", alignItems: "center", gap: 2 
        }}>
          <Avatar
            src={user?.ProfilePic}
            sx={{ width: 45, height: 45, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          >
            {user?.FirstName?.[0]}
          </Avatar>
          <Box sx={{ overflow: "hidden" }}>
            <Typography variant="subtitle2" fontWeight={700} noWrap>
              {user?.FirstName} {user?.LastName}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              {user?.ToleName || "Member"}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* MENU ITEMS */}
      <Box sx={{ px: 2, overflowY: 'auto', '&::-webkit-scrollbar': { width: '4px' } }}>
        <Typography variant="overline" sx={{ px: 2, fontWeight: 700, color: 'text.disabled' }}>
          Overview
        </Typography>
        
        <List sx={{ mb: 2 }}>
          {mainMenu.map((item) => {
            const active = isActive(item.path);
            return (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  mb: 0.5, borderRadius: 2,
                  py: 1.2, px: 2,
                  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
                  bgcolor: active ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 38, 
                  color: active ? theme.palette.primary.main : 'inherit',
                  transition: '0.3s'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontSize: '0.875rem', 
                    fontWeight: active ? 700 : 500 
                  }} 
                />
                {active && <ChevronRight sx={{ fontSize: 16 }} />}
              </ListItemButton>
            );
          })}
        </List>

        <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

        <Typography variant="overline" sx={{ px: 2, fontWeight: 700, color: 'text.disabled' }}>
          Others
        </Typography>
        
        <List>
          {secondaryMenu.map((item) => {
            const active = isActive(item.path);
            return (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  mb: 0.5, borderRadius: 2, py: 1, px: 2,
                  color: theme.palette.text.secondary,
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.04) }
                }}
              >
                <ListItemIcon sx={{ minWidth: 38, color: 'inherit' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* FOOTER ACTION */}
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Box sx={{ 
          p: 2, borderRadius: 3, textAlign: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: '#fff'
        }}>
          <Typography variant="body2" fontWeight={600}>Need Help?</Typography>
          <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 1.5 }}>
            Check our documentation
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default UserSidebar;