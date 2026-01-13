import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Fade,
  Alert,
  InputAdornment,
  IconButton,
  Container,
  useTheme,
  alpha,
  Stack,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock,
  Person,
  AdminPanelSettings,
  Login as LoginIcon,
  Security,
  Palette,
} from "@mui/icons-material";

import { adminLogin } from "../../api/authApi";

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [formData, setFormData] = useState({
    ToleID: "ES25",
    UserName: "",
    Password: "",
    NoToken: "",
    Source: "W",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gradientColors, setGradientColors] = useState({
    primary: "#667eea",
    secondary: "#764ba2",
    accent: "#f093fb",
  });

  // Generate random gradient on component mount
  useEffect(() => {
    const gradients = [
      { primary: "#667eea", secondary: "#764ba2", accent: "#f093fb" }, // Purple gradient
      { primary: "#f093fb", secondary: "#f5576c", accent: "#ff5858" }, // Pink-Red gradient
      { primary: "#4facfe", secondary: "#00f2fe", accent: "#00c6ff" }, // Blue gradient
      { primary: "#43e97b", secondary: "#38f9d7", accent: "#20e3b2" }, // Green gradient
      { primary: "#fa709a", secondary: "#fee140", accent: "#ff9a9e" }, // Sunset gradient
    ];
    
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    setGradientColors(randomGradient);
    localStorage.removeItem("adminUser");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.UserName.trim() || !formData.Password.trim()) {
      setError("Please enter both username and password");
      setLoading(false);
      return;
    }

    try {
      const res = await adminLogin(formData);
      
      if (res.StatusCode !== 200 || !res.loginLst) {
        const errorMessage = res.Message || "Invalid credentials. Please try again.";
        throw new Error(errorMessage);
      }
      
      localStorage.setItem("adminUser", JSON.stringify(res));
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit(e);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, 
          ${gradientColors.primary} 0%, 
          ${gradientColors.secondary} 50%, 
          ${gradientColors.accent} 100%)`,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: "moveBackground 20s linear infinite",
          "@keyframes moveBackground": {
            "0%": { transform: "translate(0, 0)" },
            "100%": { transform: "translate(-50px, -50px)" },
          },
        },
      }}
    >
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${alpha(
              "#ffffff",
              Math.random() * 0.1 + 0.05
            )} 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            "@keyframes float": {
              "0%, 100%": { 
                transform: `translate(0, 0) rotate(0deg)`,
                opacity: 0.5,
              },
              "50%": { 
                transform: `translate(${Math.random() * 100 - 50}px, ${
                  Math.random() * 100 - 50
                }px) rotate(${Math.random() * 360}deg)`,
                opacity: 0.2,
              },
            },
          }}
        />
      ))}

      <Fade in={true} timeout={1000}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={0}
          sx={{
            width: "90%",
            maxWidth: 1000,
            height: { xs: "auto", md: 600 },
            borderRadius: 6,
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Left Gradient Panel */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 6,
              background: `linear-gradient(45deg, 
                ${gradientColors.primary} 0%, 
                ${alpha(gradientColors.secondary, 0.8)} 100%)`,
              color: "white",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: alpha("#ffffff", 0.1),
              },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -100,
                left: -100,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: alpha("#ffffff", 0.05),
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: alpha("#ffffff", 0.2),
                  backdropFilter: "blur(10px)",
                  mb: 4,
                  border: `2px solid ${alpha("#ffffff", 0.3)}`,
                }}
              >
                <AdminPanelSettings sx={{ fontSize: 50, color: "white" }} />
              </Box>

              <Typography
                variant="h3"
                component="h1"
                fontWeight="700"
                gutterBottom
                sx={{
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  mb: 2,
                }}
              >
                Welcome Back
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  opacity: 0.9,
                  mb: 4,
                  fontWeight: 300,
                }}
              >
                Secure Admin Dashboard
              </Typography>

              <Stack spacing={2} sx={{ mt: 6 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Security sx={{ fontSize: 20 }} />
                  <Typography variant="body2">
                    Enterprise-grade security
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Palette sx={{ fontSize: 20 }} />
                  <Typography variant="body2">
                    Modern dashboard interface
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>

          {/* Right Login Form */}
          <Paper
            sx={{
              flex: 1,
              padding: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: 0,
              background: alpha(theme.palette.background.paper, 0.97),
              backdropFilter: "blur(20px)",
              borderLeft: { md: `1px solid ${alpha(theme.palette.divider, 0.1)}` },
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h4"
                component="h2"
                fontWeight="600"
                gutterBottom
                sx={{
                  background: `linear-gradient(45deg, 
                    ${gradientColors.primary}, 
                    ${gradientColors.secondary})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: { xs: "block", md: "none" },
                  mb: 2,
                }}
              >
                Admin Login
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                fontWeight="600"
                color="text.primary"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Sign in to Admin Portal
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your credentials to continue
              </Typography>
            </Box>

            {error && (
              <Fade in={!!error}>
                <Alert
                  severity="error"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    animation: "slideDown 0.3s ease-out",
                    "@keyframes slideDown": {
                      "0%": {
                        transform: "translateY(-20px)",
                        opacity: 0,
                      },
                      "100%": {
                        transform: "translateY(0)",
                        opacity: 1,
                      },
                    },
                  }}
                  onClose={() => setError("")}
                >
                  {error}
                </Alert>
              </Fade>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Username"
                name="UserName"
                margin="normal"
                value={formData.UserName}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
                variant="outlined"
                size="medium"
                disabled={loading}
                autoComplete="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person 
                        sx={{ 
                          color: formData.UserName ? gradientColors.primary : "action.active" 
                        }} 
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: gradientColors.primary,
                        borderWidth: 2,
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: gradientColors.primary,
                        borderWidth: 2,
                      },
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: gradientColors.primary,
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                name="Password"
                margin="normal"
                value={formData.Password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
                variant="outlined"
                size="medium"
                disabled={loading}
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock 
                        sx={{ 
                          color: formData.Password ? gradientColors.primary : "action.active" 
                        }} 
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        size="small"
                        disabled={loading}
                        sx={{
                          color: gradientColors.primary,
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: gradientColors.primary,
                      },
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: gradientColors.primary,
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || !formData.UserName || !formData.Password}
                startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
                sx={{
                  mt: 4,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "1rem",
                  fontWeight: "600",
                  textTransform: "none",
                  background: `linear-gradient(45deg, 
                    ${gradientColors.primary}, 
                    ${gradientColors.secondary})`,
                  boxShadow: `0 4px 20px ${alpha(gradientColors.primary, 0.3)}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 25px ${alpha(gradientColors.primary, 0.4)}`,
                    background: `linear-gradient(45deg, 
                      ${gradientColors.secondary}, 
                      ${gradientColors.primary})`,
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                  "&:disabled": {
                    background: theme.palette.action.disabledBackground,
                    transform: "none",
                    boxShadow: "none",
                  },
                }}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>

              {/* Info Panel */}
              <Box
                sx={{
                  mt: 4,
                  p: 2,
                  borderRadius: 2,
                  background: alpha(gradientColors.primary, 0.05),
                  borderLeft: `4px solid ${gradientColors.primary}`,
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: 500,
                  }}
                >
                  <Security fontSize="small" />
                  Secure Login • ToleID: ES25 • Source: W
                </Typography>
              </Box>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "block",
                  textAlign: "center",
                  mt: 3,
                  opacity: 0.7,
                }}
              >
                © {new Date().getFullYear()} Admin Portal • v2.0
              </Typography>
            </Box>
          </Paper>
        </Stack>
      </Fade>
    </Container>
  );
};

export default Login;