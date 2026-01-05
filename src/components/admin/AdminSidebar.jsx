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
  ViewCarousel,
  ReportProblem,
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 260;

const menuItems = [
  // ================= CORE =================
  {
    section: "CORE",
    items: [
      {
        text: "Dashboard",
        icon: <Dashboard />,
        path: "/admin/dashboard",
      },
      {
        text: "Users",
        icon: <People />,
        path: "/admin/users",
      },
    ],
  },

  // ================= TOLE =================
  {
    section: "TOLE MANAGEMENT",
    items: [
      {
        text: "Tole",
        icon: <Store />,
        path: "/admin/tole",
      },
      {
        text: "Helpline",
        icon: <Call />,
        path: "/admin/helpline",
      },
      {
        text: "Events",
        icon: <Event />,
        path: "/admin/event",
      },
      {
        text: "Slider",
        icon: <ViewCarousel />,
        path: "/admin/slider",
      },
      {
        text: "Government Identity",
        icon: <Badge />,
        path: "/admin/government-identity",
      }
    ],
  },

  // ================= COMPLAIN =================
  {
    section: "COMPLAINTS",
    items: [
      {
        text: "Complain Topics",
        icon: <ReportProblem />,
        path: "/admin/complain",
      },
      {
        text: "Complains",
        icon: <ReportProblem />,
        path: "/admin/complaints",
      },
    ],
  },

  // ================= FINANCE =================
  {
    section: "FINANCE",
    items: [
      {
        text: "Payments",
        icon: <Payments />,
        path: "/admin/payments",
      },
    ],
  },

  // ================= SYSTEM =================
  {
    section: "SYSTEM",
    items: [
      {
        text: "Settings",
        icon: <Settings />,
        path: "/admin/settings",
      },
    ],
  },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.default,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Toolbar />

      {/* HEADER */}
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ADMIN PANEL
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Tole Management System
        </Typography>
      </Box>

      <Divider />

      {/* MENU */}
      <List sx={{ px: 2 }}>
        {menuItems.map((group) => (
          <Box key={group.section} sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                px: 1,
                color: "text.secondary",
                fontWeight: 600,
              }}
            >
              {group.section}
            </Typography>

            {group.items.map((item) => {
              const isSelected = location.pathname === item.path;

              return (
                <ListItemButton
                  key={item.text}
                  selected={isSelected}
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    mt: 0.5,
                    "&.Mui-selected": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.12),
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
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isSelected ? 600 : 500,
                      fontSize: "0.9rem",
                    }}
                  />
                </ListItemButton>
              );
            })}
          </Box>
        ))}
      </List>

      {/* FOOTER */}
      <Box sx={{ p: 2, mt: "auto" }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            background: alpha(theme.palette.primary.main, 0.08),
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Need Help?
          </Typography>
          <Typography variant="caption" color="text.secondary">
            support@gaunghar.com
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
