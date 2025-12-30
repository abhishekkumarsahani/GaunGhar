import { Box, Toolbar, CssBaseline, ThemeProvider, createTheme, alpha } from "@mui/material";
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#667eea",
        light: "#a78bfa",
        dark: "#5a67d8",
      },
      secondary: {
        main: "#764ba2",
      },
      background: {
        default: themeMode === "light" ? "#f8fafc" : "#121212",
        paper: themeMode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            borderRadius: 16,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
            },
          },
        },
      },
    },
  });

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <AdminNavbar toggleTheme={toggleTheme} themeMode={themeMode} />
        <AdminSidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            background: themeMode === "light"
              ? "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)"
              : "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            minHeight: "100vh",
          }}
        >
          <Toolbar />
          <Box
            sx={{
              maxWidth: "1400px",
              mx: "auto",
              animation: "fadeIn 0.5s ease-in",
              "@keyframes fadeIn": {
                from: { opacity: 0, transform: "translateY(20px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;