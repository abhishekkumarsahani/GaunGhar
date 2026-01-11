import { Box, Toolbar, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import UserNavbar from "./UserNavbar";
import UserSidebar from "./UserSidebar";

const UserLayout = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: { main: "#667eea" },
      background: {
        default: themeMode === "light" ? "#f8fafc" : "#121212",
        paper: themeMode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
    shape: { borderRadius: 12 },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <UserNavbar
          toggleTheme={toggleTheme}
          themeMode={themeMode}
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        <UserSidebar sidebarOpen={sidebarOpen} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            minHeight: "100vh",
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserLayout;
