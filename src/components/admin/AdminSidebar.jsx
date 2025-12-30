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
  alpha, // Add this import
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  ShoppingCart,
  BarChart,
  Category,
  LocalShipping,
  Payment,
  Store,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 260;

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin/dashboard",
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    text: "Users",
    icon: <PeopleIcon />,
    path: "/admin/users",
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    text: "Products",
    icon: <Store />,
    path: "/admin/products",
    color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    text: "Orders",
    icon: <ShoppingCart />,
    path: "/admin/orders",
    color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    text: "Categories",
    icon: <Category />,
    path: "/admin/categories",
    color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    text: "Shipping",
    icon: <LocalShipping />,
    path: "/admin/shipping",
    color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
  {
    text: "Analytics",
    icon: <BarChart />,
    path: "/admin/analytics",
    color: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
  },
  {
    text: "Payments",
    icon: <Payment />,
    path: "/admin/payments",
    color: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    path: "/admin/settings",
    color: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
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
          boxShadow: "4px 0 20px rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          ADMIN PANEL
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Complete Management System
        </Typography>
      </Box>
      <Divider />
      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.text}
              selected={isSelected}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 1,
                py: 1.5,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateX(5px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                },
                "&::before": isSelected
                  ? {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: "100%",
                      width: 4,
                      background: item.color,
                      borderRadius: "0 4px 4px 0",
                    }
                  : {},
                "&.Mui-selected": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  "& .MuiListItemIcon-root": {
                    color: theme.palette.primary.main,
                  },
                  "& .MuiListItemText-primary": {
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isSelected ? "primary.main" : "text.secondary",
                  transition: "all 0.3s ease",
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
      </List>
      <Box sx={{ p: 3, mt: "auto" }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Typography variant="body2" fontWeight={600} gutterBottom>
            Need Help?
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Contact support@gaunghar.com
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;