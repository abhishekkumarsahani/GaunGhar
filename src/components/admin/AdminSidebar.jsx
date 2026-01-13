import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
  useTheme,
  alpha,
  Tooltip,
  Collapse,
  Avatar,
  Chip,
  Badge,
  useMediaQuery,
  IconButton,
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
  Notifications,
  Logout,
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const drawerWidth = 280;
const collapsedWidth = 80;

const menuItems = [
  {
    section: "CORE",
    items: [
      { text: "Dashboard", icon: <Dashboard />, path: "/admin/dashboard", badge: 3 },
      { text: "Users", icon: <People />, path: "/admin/users", badge: 12 },
    ],
  },
  {
    section: "TOLE MANAGEMENT",
    items: [
      { text: "Tole", icon: <Store />, path: "/admin/tole" },
      { text: "Helpline", icon: <Call />, path: "/admin/helpline", badge: 5 },
      { text: "Events", icon: <Event />, path: "/admin/event", badge: 8 },
      { text: "Slider", icon: <ViewCarousel />, path: "/admin/slider" },
      { text: "Government Identity", icon: <BadgeIcon />, path: "/admin/government-identity" },
    ],
  },
  {
    section: "COMPLAINTS",
    items: [
      { text: "Complain Topics", icon: <ReportProblem />, path: "/admin/complain" },
      { text: "Complains", icon: <ReportProblem />, path: "/admin/complaints", badge: 24 },
    ],
  },
  {
    section: "FINANCE",
    items: [
      { text: "Payments", icon: <Payments />, path: "/admin/payments" },
      { text: "Account Ledger", icon: <AccountBalance />, path: "/admin/ledger" },
      { text: "Income Expense", icon: <AccountBalance />, path: "/admin/income-expense" },
      { text: "Management Year", icon: <CalendarMonth />, path: "/admin/management-year" },
    ],
  },
  {
    section: "SYSTEM",
    items: [
      { text: "Settings", icon: <Settings />, path: "/admin/settings" },
    ],
  },
];

const AdminSidebar = ({ sidebarOpen, toggleSidebar, toggleDarkMode, isDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [expandedSections, setExpandedSections] = useState({});
  const [activeSection, setActiveSection] = useState(null);

  const gradientColors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    accent: theme.palette.success.main,
  };

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

  const getMenuItemStyles = (isSelected) => ({
    my: 0.5,
    mx: sidebarOpen ? 1 : 0.5,
    borderRadius: sidebarOpen ? 2 : '50%',
    height: sidebarOpen ? 48 : 40,
    width: sidebarOpen ? 'auto' : 40,
    minWidth: sidebarOpen ? 'auto' : 40,
    justifyContent: sidebarOpen ? "flex-start" : "center",
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': isSelected ? {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: '4px',
      background: `linear-gradient(180deg, ${gradientColors.primary}, ${gradientColors.secondary})`,
      borderRadius: '0 4px 4px 0',
    } : {},
    '&:hover': {
      backgroundColor: alpha(isSelected ? gradientColors.primary : theme.palette.action.hover, 0.1),
      transform: 'translateX(4px)',
      '&::before': {
        width: '4px',
        opacity: 1,
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(gradientColors.primary, 0.08),
      color: gradientColors.primary,
      '& .MuiListItemIcon-root': {
        color: gradientColors.primary,
      },
    },
    '&:active': {
      transform: 'translateX(2px)',
    },
  });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? drawerWidth : collapsedWidth,
          overflowX: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          background: sidebarOpen 
            ? `linear-gradient(180deg, 
                ${alpha(theme.palette.background.default, 0.95)} 0%, 
                ${alpha(theme.palette.background.paper, 0.95)} 100%)`
            : alpha(theme.palette.background.paper, 0.98),
          backdropFilter: 'blur(10px)',
          boxShadow: sidebarOpen 
            ? `0 0 20px ${alpha(theme.palette.primary.main, 0.1)}`
            : 'none',
        },
      }}
    >
      {/* HEADER SECTION */}
      <Box>
        {sidebarOpen ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: 3,
                background: `linear-gradient(45deg, ${gradientColors.primary}, ${gradientColors.secondary})`,
                boxShadow: `0 4px 20px ${alpha(gradientColors.primary, 0.3)}`,
              }}
            >
              <Store sx={{ fontSize: 28, color: 'white' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={700} noWrap>
                Tole Admin
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                Management System
              </Typography>
            </Box>
            <IconButton 
              onClick={toggleSidebar}
              size="small"
              sx={{
                borderRadius: 2,
                background: alpha(theme.palette.action.hover, 0.1),
                '&:hover': {
                  background: alpha(theme.palette.action.hover, 0.2),
                },
              }}
            >
              <ChevronLeft />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
            <Box
              onClick={toggleSidebar}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: 3,
                background: `linear-gradient(45deg, ${gradientColors.primary}, ${gradientColors.secondary})`,
                boxShadow: `0 4px 20px ${alpha(gradientColors.primary, 0.3)}`,
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Store sx={{ fontSize: 24, color: 'white' }} />
            </Box>
          </Box>
        )}
      </Box>

      
      {/* MENU SECTION */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
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
        <List sx={{ px: sidebarOpen ? 1 : 0.5, py: 1 }}>
          {menuItems.map((group) => (
            <Box key={group.section} sx={{ mb: 0.5 }}>
              {sidebarOpen && (
                <ListItemButton
                  onClick={() => toggleSection(group.section)}
                  sx={{
                    my: 0.5,
                    mx: 1,
                    borderRadius: 2,
                    minHeight: 36,
                    background: expandedSections[group.section] 
                      ? alpha(gradientColors.primary, 0.05)
                      : 'transparent',
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{ 
                      flex: 1,
                      color: 'text.secondary', 
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      letterSpacing: '0.5px',
                      opacity: 0.8,
                    }}
                  >
                    {group.section}
                  </Typography>
                  {expandedSections[group.section] ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
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
                      title={!sidebarOpen ? item.text : ""}
                      placement="right"
                      key={item.text}
                      arrow
                      enterDelay={300}
                    >
                      <ListItemButton
                        selected={isSelected}
                        onClick={() => navigate(item.path)}
                        sx={getMenuItemStyles(isSelected)}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: sidebarOpen ? 36 : 24,
                            color: isSelected ? gradientColors.primary : 'text.secondary',
                            marginLeft: sidebarOpen ? 0 : '4px',
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
                                  height: 16,
                                  minWidth: 16,
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
                          <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{ 
                              fontSize: "0.875rem",
                              fontWeight: isSelected ? 600 : 500,
                            }}
                            sx={{ ml: 1 }}
                          />
                        )}

                        {sidebarOpen && item.badge && (
                          <Chip
                            label={item.badge}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.65rem',
                              fontWeight: 600,
                              background: alpha(theme.palette.error.main, 0.1),
                              color: theme.palette.error.main,
                            }}
                          />
                        )}
                      </ListItemButton>
                    </Tooltip>
                  );
                })}
              </Collapse>
            </Box>
          ))}
        </List>
      </Box>

      {/* FOOTER SECTION */}
      <Box sx={{ 
        p: 2, 
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: alpha(gradientColors.primary, 0.02),
      }}>
        {sidebarOpen ? (
          <Box sx={{ display: 'flex', gap: 1 }}>
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
              <Logout fontSize="small" />
              <Typography variant="button" sx={{ ml: 1, fontSize: '0.75rem' }}>
                Logout
              </Typography>
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
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
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;