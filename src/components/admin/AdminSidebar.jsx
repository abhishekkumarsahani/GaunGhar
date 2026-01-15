import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Tooltip,
  Collapse,
  IconButton,
  Avatar,
  Badge,
  useTheme,
  alpha,
  keyframes,
} from "@mui/material";

import {
  Dashboard,
  People,
  Settings,
  Event,
  Payments,
  Store,
  Call,
  Badge as BadgeIcon,
  AccountBalance,
  CalendarMonth,
  ViewCarousel,
  ReportProblem,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  Logout,
  Star,
  Security,
  Insights,
  TrendingUp,
  Circle,
  FiberManualRecord,
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const drawerWidth = 280;
const collapsedWidth = 88;

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

const menuItems = [
  {
    section: "CORE",
    items: [
      { 
        text: "Dashboard", 
        icon: <Dashboard />, 
        path: "/admin/dashboard",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      },
      { 
        text: "Users", 
        icon: <People />, 
        path: "/admin/users",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      },
    ],
  },
  {
    section: "TOLE MANAGEMENT",
    items: [
      { 
        text: "Tole", 
        icon: <Store />, 
        path: "/admin/tole",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      },
      { 
        text: "Helpline", 
        icon: <Call />, 
        path: "/admin/helpline",
        gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
      },
      { 
        text: "Events", 
        icon: <Event />, 
        path: "/admin/event",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
      },
      { 
        text: "Slider", 
        icon: <ViewCarousel />, 
        path: "/admin/slider",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      },
      { 
        text: "Government Identity", 
        icon: <BadgeIcon />, 
        path: "/admin/government-identity",
        gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
      },
    ],
  },
  {
    section: "COMPLAINTS",
    items: [
      { 
        text: "Complain Topics", 
        icon: <ReportProblem />, 
        path: "/admin/complain",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)"
      },
      { 
        text: "Complains", 
        icon: <ReportProblem />, 
        path: "/admin/complaints",
        gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
      },
    ],
  },
  {
    section: "FINANCE",
    items: [
      { 
        text: "Payments", 
        icon: <Payments />, 
        path: "/admin/payments",
        gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
      },
      { 
        text: "Account Ledger", 
        icon: <AccountBalance />, 
        path: "/admin/ledger",
        gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)"
      },
      { 
        text: "Income Expense", 
        icon: <AccountBalance />, 
        path: "/admin/income-expense",
        gradient: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)"
      },
      { 
        text: "Management Year", 
        icon: <CalendarMonth />, 
        path: "/admin/management-year",
        gradient: "linear-gradient(135deg, #a6c0fe 0%, #f68084 100%)"
      },
    ],
  },
  {
    section: "SYSTEM",
    items: [
      { 
        text: "Settings", 
        icon: <Settings />, 
        path: "/admin/settings",
        gradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)"
      },
    ],
  },
];

const AdminSidebar = ({ sidebarOpen, toggleSidebar, toggleDarkMode, isDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  
  const [expandedSections, setExpandedSections] = useState({});
  const [activeHover, setActiveHover] = useState(null);
  const [sidebarHover, setSidebarHover] = useState(false);

  // Auto-expand sections based on current route
  useEffect(() => {
    const currentSection = menuItems.find(group => 
      group.items.some(item => item.path === location.pathname)
    )?.section;
    if (currentSection && !expandedSections[currentSection]) {
      setExpandedSections(prev => ({ ...prev, [currentSection]: true }));
    }
  }, [location.pathname]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const getMenuItemStyles = (item, isSelected) => ({
    my: 0.5,
    mx: sidebarOpen ? 1 : 0.5,
    borderRadius: sidebarOpen ? 2 : 12,
    height: sidebarOpen ? 48 : 44,
    width: sidebarOpen ? 'auto' : 44,
    minWidth: sidebarOpen ? 'auto' : 44,
    justifyContent: sidebarOpen ? "flex-start" : "center",
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
      transform: sidebarOpen ? 'translateX(8px)' : 'scale(1.1)',
      boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
    },
    '&.Mui-selected': {
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
      '& .MuiListItemIcon-root': {
        color: theme.palette.primary.main,
      },
    },
  });

  const iconGradientStyle = (gradient, isSelected) => ({
    background: isSelected ? gradient : 'none',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: isSelected ? `${pulseAnimation} 2s infinite` : 'none',
  });

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setSidebarHover(true)}
      onMouseLeave={() => setSidebarHover(false)}
      sx={{
        width: sidebarOpen ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? drawerWidth : collapsedWidth,
          overflowX: "hidden",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
          background: isDarkMode
            ? `linear-gradient(195deg, 
                #0a1929 0%, 
                #1a3a5f 50%, 
                #0a1929 100%)`
            : `linear-gradient(195deg, 
                ${alpha('#ffffff', 0.98)} 0%, 
                ${alpha('#f8faff', 0.95)} 50%, 
                ${alpha('#ffffff', 0.98)} 100%)`,
          backdropFilter: 'blur(15px)',
          boxShadow: sidebarOpen 
            ? `0 10px 40px ${alpha(theme.palette.primary.main, 0.08)},
               0 1px 3px ${alpha(theme.palette.primary.main, 0.1)}`
            : `0 5px 20px ${alpha(theme.palette.primary.main, 0.05)}`,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, 
              #667eea 0%, 
              #764ba2 25%, 
              #f093fb 50%, 
              #f5576c 75%, 
              #4facfe 100%)`,
            backgroundSize: '500% 100%',
            animation: `${shimmerAnimation} 8s infinite linear`,
          },
        },
      }}
    >


      {/* MENU SECTION - Enhanced with section indicators */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        px: sidebarOpen ? 2 : 0.5,
        py: 2,
        '&::-webkit-scrollbar': {
          width: 4,
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          borderRadius: 2,
        },
      }}>
        {menuItems.map((group) => (
          <Box key={group.section} sx={{ mb: sidebarOpen ? 2 : 1 }}>
            {sidebarOpen && (
              <ListItemButton
                onClick={() => toggleSection(group.section)}
                onMouseEnter={() => setActiveHover(group.section)}
                onMouseLeave={() => setActiveHover(null)}
                sx={{
                  my: 0.5,
                  borderRadius: 2,
                  minHeight: 40,
                  background: expandedSections[group.section] 
                    ? `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 100%)`
                    : 'transparent',
                  transition: 'all 0.3s',
                  '&:hover': {
                    background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 100%)`,
                  },
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ 
                    flex: 1,
                    color: expandedSections[group.section] ? 'primary.main' : 'text.secondary', 
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Circle sx={{ fontSize: 6 }} />
                  {group.section}
                </Typography>
                {expandedSections[group.section] ? 
                  <ExpandLess fontSize="small" sx={{ color: 'primary.main' }} /> : 
                  <ExpandMore fontSize="small" />
                }
              </ListItemButton>
            )}

            <Collapse 
              in={!sidebarOpen || expandedSections[group.section] || expandedSections[group.section] === undefined}
              timeout="auto"
              unmountOnExit
            >
              {group.items.map((item) => {
                const isSelected = location.pathname === item.path;

                return (
                  <Tooltip
                    title={!sidebarOpen ? (
                      <Box sx={{ 
                        p: 1, 
                        background: `linear-gradient(135deg, ${item.gradient})`,
                        borderRadius: 2,
                        color: 'white',
                        fontWeight: 600,
                      }}>
                        {item.text}
                      </Box>
                    ) : ""}
                    placement="right"
                    key={item.text}
                    arrow
                    enterDelay={200}
                    leaveDelay={0}
                  >
                    <ListItemButton
                      selected={isSelected}
                      onClick={() => navigate(item.path)}
                      onMouseEnter={() => setActiveHover(item.text)}
                      onMouseLeave={() => setActiveHover(null)}
                      sx={getMenuItemStyles(item, isSelected)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: sidebarOpen ? 40 : 32,
                          marginLeft: sidebarOpen ? 0 : '2px',
                          color: activeHover === item.text || isSelected 
                            ? theme.palette.primary.main 
                            : 'text.secondary',
                          transition: 'all 0.3s',
                        }}
                      >
                        {item.badge ? (
                          <Badge
                            badgeContent={item.badge}
                            color="error"
                            size="small"
                            sx={{
                              '& .MuiBadge-badge': {
                                fontSize: '0.6rem',
                                height: 18,
                                minWidth: 18,
                                animation: `${pulseAnimation} 2s infinite`,
                              },
                            }}
                          >
                            <Box sx={iconGradientStyle(item.gradient, isSelected)}>
                              {item.icon}
                            </Box>
                          </Badge>
                        ) : (
                          <Box sx={iconGradientStyle(item.gradient, isSelected)}>
                            {item.icon}
                          </Box>
                        )}
                      </ListItemIcon>

                      {sidebarOpen && (
                        <>
                          <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{ 
                              fontSize: "0.875rem",
                              fontWeight: isSelected ? 700 : 600,
                              color: isSelected ? 'primary.main' : 'text.primary',
                            }}
                            sx={{ ml: 1 }}
                          />
                          
                          {isSelected && (
                            <FiberManualRecord 
                              sx={{ 
                                fontSize: 8, 
                                color: theme.palette.success.main,
                                animation: `${pulseAnimation} 1.5s infinite`,
                              }} 
                            />
                          )}
                        </>
                      )}

                      {sidebarOpen && item.badge && !isSelected && (
                        <Box
                          sx={{
                            px: 1,
                            py: 0.25,
                            borderRadius: 10,
                            background: `linear-gradient(135deg, ${theme.palette.error.light} 0%, ${theme.palette.error.main} 100%)`,
                            color: 'white',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            animation: `${pulseAnimation} 3s infinite`,
                          }}
                        >
                          {item.badge}
                        </Box>
                      )}
                    </ListItemButton>
                  </Tooltip>
                );
              })}
            </Collapse>
          </Box>
        ))}
      </Box>

      {/* FOOTER SECTION - Enhanced with status indicator */}
      <Box sx={{ 
        p: 2, 
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Active status indicator */}
        <Box sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}>
          <Box sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: theme.palette.success.main,
            animation: `${pulseAnimation} 2s infinite`,
          }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
            Active
          </Typography>
        </Box>

        {sidebarOpen ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              p: 1,
              borderRadius: 2,
              background: alpha(theme.palette.primary.main, 0.05),
            }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                  fontWeight: 600,
                }}
              >
                A
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" fontWeight={600}>
                  Admin User
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Super Admin
                </Typography>
              </Box>
              <Star sx={{ fontSize: 14, color: theme.palette.warning.main }} />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={toggleDarkMode}
                sx={{
                  flex: 1,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
                  },
                }}
              >
                <Insights fontSize="small" />
              </IconButton>
              
              <IconButton
                onClick={handleLogout}
                sx={{
                  flex: 1,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)} 0%, ${alpha(theme.palette.error.light, 0.1)} 100%)`,
                  color: theme.palette.error.main,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.2)} 0%, ${alpha(theme.palette.error.light, 0.2)} 100%)`,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                <Logout fontSize="small" />
                <Typography variant="button" sx={{ ml: 1, fontSize: '0.75rem', fontWeight: 600 }}>
                  Logout
                </Typography>
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                fontWeight: 600,
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s',
              }}
            >
              A
            </Avatar>
            
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Tooltip title="Theme" placement="right">
                <IconButton
                  onClick={toggleDarkMode}
                  size="small"
                  sx={{
                    borderRadius: 2,
                    background: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.2),
                    },
                  }}
                >
                  <Insights fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Logout" placement="right">
                <IconButton
                  onClick={handleLogout}
                  size="small"
                  sx={{
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)} 0%, ${alpha(theme.palette.error.light, 0.1)} 100%)`,
                    color: theme.palette.error.main,
                    '&:hover': {
                      transform: 'rotate(10deg)',
                    },
                  }}
                >
                  <Logout fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;