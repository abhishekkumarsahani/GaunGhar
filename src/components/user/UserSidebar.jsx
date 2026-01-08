import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText
} from "@mui/material";
import {
  Dashboard, Person, Event, AccountBalance, Badge, ReportProblem
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserSidebar = () => {
  const navigate = useNavigate();

  const menu = [
    { text: "Dashboard", icon: <Dashboard />, path: "/user/dashboard" },
    { text: "Profile", icon: <Person />, path: "/profile" },
    { text: "Complaints", icon: <ReportProblem />, path: "/complaints" },
    { text: "Government ID", icon: <Badge />, path: "/government-identity" },
    { text: "Ledger", icon: <AccountBalance />, path: "/ledger" },
    { text: "Account", icon: <AccountBalance />, path: "/account" },
    { text: "Events", icon: <Event />, path: "/events" },
  ];

  return (
    <Drawer variant="permanent" sx={{ width: 240 }}>
      <List>
        {menu.map(item => (
          <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default UserSidebar;
