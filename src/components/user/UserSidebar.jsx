import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Avatar,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Dashboard,
  Person,
  Event,
  AccountBalance,
  Badge,
  ReportProblem,
  Settings,
  Help,
  PersonPinCircle,
  ContactPhone,
  Home,
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
    {
      text: "ToleInfo",
      icon: <Home />,
      path: "/user/toleinfo"
    },
    { text: "Helpline", icon: <ContactPhone />, path: "/user/helpline" },
    { text: "Events", icon: <Event />, path: "/user/events" },
    { text: "Complain", icon: <ReportProblem />, path: "/user/complain" },
    { text: "Near Me", icon: <PersonPinCircle />, path: "/user/near-me" },
    { text: "Government ID", icon: <Badge />, path: "/user/government-identity" },
    { text: "Ledger", icon: <AccountBalance />, path: "/user/ledger" },

  ];

  const secondaryMenu = [
    { text: "Settings", icon: <Settings />, path: "/user/settings" },
    { text: "Help & Support", icon: <Help />, path: "/user/help" },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          overflowX: "hidden",
          borderRight: "none",
          background: `linear-gradient(180deg,
            ${alpha(theme.palette.primary.main, 0.04)},
            ${theme.palette.background.paper})`,
          boxShadow: "4px 0 12px rgba(0,0,0,0.05)",
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          p: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "#fff",
            width: 42,
            height: 42,
            fontWeight: 700,
          }}
        >
          {user?.FirstName?.[0] || "U"}
        </Avatar>

        <Box sx={{ overflow: "hidden" }}>
          <Typography fontWeight={700} fontSize={15} noWrap>
            {user?.FirstName} {user?.LastName}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {user?.ToleName || "Resident"}
          </Typography>
        </Box>
      </Box>

      {/* MAIN MENU */}
      <Box sx={{ px: 1 }}>
        <Typography
          variant="caption"
          sx={{
            px: 2,
            mt: 2,
            mb: 0.5,
            display: "block",
            letterSpacing: "0.08em",
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "text.secondary",
          }}
        >
          MAIN MENU
        </Typography>

        <List>
          {mainMenu.map((item) => {
            const active = isActive(item.path);

            return (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  my: 0.4,
                  mx: 1,
                  py: 1,
                  px: 2,
                  borderRadius: 2,
                  transition: "0.2s",

                  ...(active && {
                    background: `linear-gradient(90deg,
                      ${theme.palette.primary.main},
                      ${theme.palette.primary.light})`,
                    color: "#fff",
                    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                  }),

                  "&:hover": {
                    backgroundColor: active
                      ? theme.palette.primary.main
                      : alpha(theme.palette.primary.main, 0.08),
                    transform: "translateX(4px)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: active ? "#fff" : "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                    fontWeight: active ? 600 : 500,
                  }}
                />

                {item.badge && (
                  <Chip
                    label={item.badge}
                    size="small"
                    sx={{
                      bgcolor: "#ff1744",
                      color: "#fff",
                      height: 20,
                      fontSize: "0.7rem",
                    }}
                  />
                )}
              </ListItemButton>
            );
          })}
        </List>

        {/* PREFERENCES */}
        <Typography
          variant="caption"
          sx={{
            px: 2,
            mt: 3,
            mb: 0.5,
            display: "block",
            letterSpacing: "0.08em",
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "text.secondary",
          }}
        >
          PREFERENCES
        </Typography>

        <List>
          {secondaryMenu.map((item) => {
            const active = isActive(item.path);

            return (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  my: 0.4,
                  mx: 1,
                  py: 1,
                  px: 2,
                  borderRadius: 2,
                  transition: "0.2s",

                  ...(active && {
                    background: `linear-gradient(90deg,
                      ${theme.palette.primary.main},
                      ${theme.palette.primary.light})`,
                    color: "#fff",
                  }),

                  "&:hover": {
                    backgroundColor: active
                      ? theme.palette.primary.main
                      : alpha(theme.palette.primary.main, 0.08),
                    transform: "translateX(4px)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: active ? "#fff" : "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                    fontWeight: active ? 600 : 500,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default UserSidebar;
