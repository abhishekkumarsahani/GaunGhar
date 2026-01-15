import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Box, Avatar, useTheme, alpha, IconButton,
  Badge, Tooltip, Collapse, keyframes
} from "@mui/material";
import {
  Dashboard, Person, Event, AccountBalance, Badge as BadgeIcon,
  ReportProblem, Settings, Help, Groups, PersonPinCircle,
  ContactPhone, Home, ChevronRight, Logout, Notifications,
  ExpandLess, ExpandMore, Menu, LightMode, DarkMode,
  Shield, VerifiedUser, LocationOn, Payment, Group,
  CalendarToday, Chat, Security, Insights, TrendingUp
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const drawerWidth = 280;
const collapsedWidth = 80;

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const mainMenu = [
  {
    category: "DASHBOARD",
    items: [
      { 
        text: "Dashboard", 
        icon: <Dashboard />, 
        path: "/user/dashboard",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        notification: 3
      },
    ]
  },
  {
    category: "PERSONAL",
    items: [
      { 
        text: "Profile", 
        icon: <Person />, 
        path: "/user/profile",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      },
      { 
        text: "Government ID", 
        icon: <VerifiedUser />, 
        path: "/user/government-identity",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      },
    ]
  },
  {
    category: "COMMUNITY",
    items: [
      { 
        text: "Tole Info", 
        icon: <Home />, 
        path: "/user/toleinfo",
        gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
      },
      { 
        text: "Helpline", 
        icon: <ContactPhone />, 
        path: "/user/helpline",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        notification: 5
      },
      { 
        text: "Events", 
        icon: <CalendarToday />, 
        path: "/user/events",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      },
      { 
        text: "Near Me", 
        icon: <LocationOn />, 
        path: "/user/near-me",
        gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
      },
      { 
        text: "Management", 
        icon: <Group />, 
        path: "/user/management",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)"
      },
    ]
  },
  {
    category: "SERVICES",
    items: [
      { 
        text: "Complain", 
        icon: <ReportProblem />, 
        path: "/user/complain",
        gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
      },
      { 
        text: "Ledger", 
        icon: <AccountBalance />, 
        path: "/user/ledger",
        gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
      },
      { 
        text: "Payments", 
        icon: <Payment />, 
        path: "/user/payments",
        gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)"
      },
    ]
  }
];

const secondaryMenu = [
  { 
    text: "Settings", 
    icon: <Settings />, 
    path: "/user/settings",
    gradient: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)"
  },
  { 
    text: "Help & Support", 
    icon: <Help />, 
    path: "/user/help",
    gradient: "linear-gradient(135deg, #a6c0fe 0%, #f68084 100%)"
  },
];

const UserSidebar = ({ sidebarOpen, toggleSidebar, toggleTheme, themeMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  
  const [expandedCategories, setExpandedCategories] = useState({
    "DASHBOARD": true,
    "PERSONAL": true,
    "COMMUNITY": true,
    "SERVICES": true
  });

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const getMenuItemStyles = (isSelected, gradient) => ({
    my: 0.5,
    mx: sidebarOpen ? 1 : 0.5,
    borderRadius: sidebarOpen ? 12 : '50%',
    height: sidebarOpen ? 48 : 44,
    width: sidebarOpen ? 'auto' : 44,
    minWidth: sidebarOpen ? 'auto' : 44,
    justifyContent: sidebarOpen ? "flex-start" : "center",
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    background: isSelected 
      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`
      : 'transparent',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.1)}, transparent)`,
      transition: 'left 0.6s',
    },
    '&:hover': {
      '&::before': {
        left: '100%',
      },
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
      transform: sidebarOpen ? 'translateX(4px)' : 'scale(1.1)',
    },
    '&.Mui-selected': {
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
  });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? drawerWidth : collapsedWidth,
          overflowX: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          background: themeMode === 'dark'
            ? `linear-gradient(195deg, #0a1929 0%, #1a3a5f 50%, #0a1929 100%)`
            : `linear-gradient(195deg, #ffffff 0%, #f8faff 50%, #ffffff 100%)`,
          backdropFilter: 'blur(10px)',
          boxShadow: sidebarOpen 
            ? `0 8px 32px ${alpha(theme.palette.primary.main, 0.08)}`
            : 'none',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)`,
            backgroundSize: '500% 100%',
            animation: `${shimmerAnimation} 8s infinite linear`,
          },
        },
      }}
    >
      {/* HEADER - Branding */}
      <Box sx={{ p: sidebarOpen ? 3 : 2 }}>
        {sidebarOpen ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              onClick={toggleSidebar}
              sx={{
                position: 'relative',
                cursor: 'pointer',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -3,
                  background: `linear-gradient(45deg, #667eea, #764ba2)`,
                  borderRadius: 12,
                  opacity: 0,
                  transition: 'opacity 0.3s',
                },
                '&:hover::before': {
                  opacity: 0.5,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  position: 'relative',
                  '&:hover': {
                    transform: 'rotate(-5deg)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                <Home sx={{ 
                  fontSize: 24, 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }} />
              </Box>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h6" 
                fontWeight={800}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.5px',
                }}
              >
                ToleConnect
              </Typography>
              <Typography 
                variant="caption" 
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Shield fontSize="inherit" /> 
                Member Portal
              </Typography>
            </Box>
            
            <IconButton 
              onClick={toggleSidebar}
              size="small"
              sx={{
                borderRadius: 2,
                background: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.2),
                  transform: 'rotate(180deg)',
                },
                transition: 'all 0.3s',
              }}
            >
              <ChevronRight sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              onClick={toggleSidebar}
              sx={{
                position: 'relative',
                cursor: 'pointer',
                '&:hover::after': {
                  content: '"Open"',
                  position: 'absolute',
                  top: '50%',
                  left: '100%',
                  transform: 'translateY(-50%)',
                  ml: 1,
                  px: 1,
                  py: 0.5,
                  borderRadius: 2,
                  background: theme.palette.background.paper,
                  boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                <Home sx={{ 
                  fontSize: 22, 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }} />
              </Box>
            </Box>
          </Box>
        )}
      </Box>



      {/* MAIN MENU */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        px: sidebarOpen ? 1 : 0.5,
        '&::-webkit-scrollbar': {
          width: 4,
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: alpha(theme.palette.primary.main, 0.2),
          borderRadius: 2,
        },
      }}>
        {mainMenu.map((category) => (
          <Box key={category.category} sx={{ mb: 1 }}>
            {sidebarOpen && (
              <ListItemButton
                onClick={() => toggleCategory(category.category)}
                sx={{
                  borderRadius: 2,
                  minHeight: 32,
                  mb: 0.5,
                  background: expandedCategories[category.category] 
                    ? alpha(theme.palette.primary.main, 0.05)
                    : 'transparent',
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ 
                    flex: 1,
                    color: 'text.secondary', 
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  {category.category}
                </Typography>
                {expandedCategories[category.category] ? 
                  <ExpandLess fontSize="small" /> : 
                  <ExpandMore fontSize="small" />
                }
              </ListItemButton>
            )}

            <Collapse 
              in={!sidebarOpen || expandedCategories[category.category]}
              timeout="auto"
              unmountOnExit
            >
              {category.items.map((item) => {
                const selected = isActive(item.path);

                return (
                  <Tooltip
                    key={item.text}
                    title={!sidebarOpen ? item.text : ""}
                    placement="right"
                    arrow
                    enterDelay={300}
                  >
                    <ListItemButton
                      selected={selected}
                      onClick={() => navigate(item.path)}
                      sx={getMenuItemStyles(selected, item.gradient)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: sidebarOpen ? 36 : 24,
                          marginLeft: sidebarOpen ? 0 : '2px',
                          color: selected ? theme.palette.primary.main : 'text.secondary',
                          transition: 'all 0.3s',
                        }}
                      >
                        {item.notification ? (
                          <Badge
                            badgeContent={item.notification}
                            color="error"
                            size="small"
                            sx={{
                              '& .MuiBadge-badge': {
                                fontSize: '0.6rem',
                                height: 16,
                                minWidth: 16,
                                animation: `${pulseAnimation} 2s infinite`,
                              },
                            }}
                          >
                            {item.icon}
                          </Badge>
                        ) : (
                          item.icon
                        )}
                      </ListItemIcon>

                      {sidebarOpen && (
                        <>
                          <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{ 
                              fontSize: "0.875rem",
                              fontWeight: selected ? 700 : 500,
                            }}
                            sx={{ ml: 1 }}
                          />
                          
                          {selected && (
                            <ChevronRight sx={{ 
                              fontSize: 16, 
                              color: theme.palette.primary.main,
                              animation: `${pulseAnimation} 1.5s infinite`,
                            }} />
                          )}
                        </>
                      )}
                    </ListItemButton>
                  </Tooltip>
                );
              })}
            </Collapse>
          </Box>
        ))}
      </Box>

      {/* SECONDARY MENU & ACTIONS */}
      <Box sx={{ 
        p: 2, 
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: alpha(theme.palette.primary.main, 0.02),
      }}>
        {sidebarOpen ? (
          <>
            <List>
              {secondaryMenu.map((item) => (
                <ListItemButton
                  key={item.text}
                  onClick={() => navigate(item.path)}
                  sx={{
                    mb: 0.5,
                    borderRadius: 2,
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 36,
                    color: 'text.secondary',
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{ 
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  flex: 1,
                  borderRadius: 2,
                  background: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              >
                {themeMode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
              
              <IconButton
                onClick={handleLogout}
                sx={{
                  flex: 1,
                  borderRadius: 2,
                  background: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.main,
                  '&:hover': {
                    background: alpha(theme.palette.error.main, 0.2),
                  },
                }}
              >
                <Logout />
              </IconButton>
            </Box>
          </>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Toggle Theme" placement="right">
              <IconButton
                onClick={toggleTheme}
                size="small"
                sx={{
                  borderRadius: 2,
                  background: alpha(theme.palette.primary.main, 0.1),
                }}
              >
                {themeMode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Logout" placement="right">
              <IconButton
                onClick={handleLogout}
                size="small"
                sx={{
                  borderRadius: 2,
                  background: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.main,
                }}
              >
                <Logout fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {/* Version/Status */}
        {sidebarOpen && (
          <Box sx={{ 
            mt: 2, 
            pt: 2, 
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            textAlign: 'center',
          }}>
            <Typography variant="caption" color="text.secondary">
              v2.1.4 • <Box component="span" sx={{ color: theme.palette.success.main }}>●</Box> Online
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default UserSidebar;