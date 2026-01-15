import { Box, Toolbar, CssBaseline, ThemeProvider, createTheme, alpha } from "@mui/material";
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
      primary: { 
        main: "#667eea",
        light: "#a3b5ff",
        dark: "#764ba2"
      },
      secondary: { 
        main: "#f093fb",
        light: "#ffc5fa",
        dark: "#f5576c"
      },
      background: {
        default: themeMode === "light" ? "#f8fafc" : "#0a1929",
        paper: themeMode === "light" ? "#ffffff" : "#1a3a5f",
      },
    },
    shape: { 
      borderRadius: 12 
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Box sx={{ 
        display: "flex", 
        minHeight: "100vh",
        background: themeMode === "light" 
          ? `linear-gradient(135deg, ${alpha('#f8fafc', 0.8)} 0%, ${alpha('#e2e8f0', 0.8)} 100%)`
          : `linear-gradient(135deg, ${alpha('#0a1929', 0.8)} 0%, ${alpha('#1e293b', 0.8)} 100%)`,
      }}>
        <UserNavbar
          toggleTheme={toggleTheme}
          themeMode={themeMode}
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        <UserSidebar 
          sidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar}
          toggleTheme={toggleTheme}
          themeMode={themeMode}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            minHeight: "100vh",
            transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            ml: sidebarOpen ? 0 : `-${280 - 80}px`,
            width: `calc(100% - ${sidebarOpen ? 280 : 80}px)`,
          }}
        >
          <Toolbar />
          <Box sx={{ 
            mt: 2,
            animation: 'fadeIn 0.5s ease-in',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(10px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}>
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserLayout;