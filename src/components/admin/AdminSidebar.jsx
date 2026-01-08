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
} from "@mui/material";

import {
  Dashboard,
  People,
  Settings,
  Event,
  Payments,
  Store,
  Call,
  Badge,
  AccountBalance,
  CalendarMonth,
  ViewCarousel,
  ReportProblem,
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 260;
const collapsedWidth = 72;

const menuItems = [
  {
    section: "CORE",
    items: [
      { text: "Dashboard", icon: <Dashboard />, path: "/admin/dashboard" },
      { text: "Users", icon: <People />, path: "/admin/users" },
    ],
  },
  {
    section: "TOLE MANAGEMENT",
    items: [
      { text: "Tole", icon: <Store />, path: "/admin/tole" },
      { text: "Helpline", icon: <Call />, path: "/admin/helpline" },
      { text: "Events", icon: <Event />, path: "/admin/event" },
      { text: "Slider", icon: <ViewCarousel />, path: "/admin/slider" },
      { text: "Government Identity", icon: <Badge />, path: "/admin/government-identity" },
    ],
  },
  {
    section: "COMPLAINTS",
    items: [
      { text: "Complain Topics", icon: <ReportProblem />, path: "/admin/complain" },
      { text: "Complains", icon: <ReportProblem />, path: "/admin/complaints" },
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

const AdminSidebar = ({ sidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: "width 0.3s",
        [`& .MuiDrawer-paper`]: {
          width: sidebarOpen ? drawerWidth : collapsedWidth,
          overflowX: "hidden",
          transition: "width 0.3s",
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Toolbar />

      {/* HEADER */}
      <Box sx={{ p: 2, textAlign: "center" }}>
        {sidebarOpen && (
          <>
            <Typography variant="h6" fontWeight={700}>
              ADMIN PANEL
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Tole Management
            </Typography>
          </>
        )}
      </Box>

      <Divider />

      {/* MENU */}
      <List sx={{ px: 1 }}>
        {menuItems.map((group) => (
          <Box key={group.section} sx={{ mb: 1 }}>
            {sidebarOpen && (
              <Typography
                variant="caption"
                sx={{ px: 2, color: "text.secondary", fontWeight: 600 }}
              >
                {group.section}
              </Typography>
            )}

            {group.items.map((item) => {
              const isSelected = location.pathname === item.path;

              return (
                <Tooltip
                  title={!sidebarOpen ? item.text : ""}
                  placement="right"
                  key={item.text}
                >
                  <ListItemButton
                    selected={isSelected}
                    onClick={() => navigate(item.path)}
                    sx={{
                      my: 0.5,
                      mx: 0.5,
                      borderRadius: 2,
                      justifyContent: sidebarOpen ? "initial" : "center",
                      "&.Mui-selected": {
                        bgcolor: alpha(theme.palette.primary.main, 0.15),
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 36,
                        color: isSelected
                          ? theme.palette.primary.main
                          : "text.secondary",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    {sidebarOpen && (
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{ fontSize: "0.9rem" }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              );
            })}
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
