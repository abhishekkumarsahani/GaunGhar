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
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock,
  Person,
  AdminPanelSettings,
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

  // Clear any existing admin user data on component mount
  useEffect(() => {
    localStorage.removeItem("adminUser");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!formData.UserName.trim() || !formData.Password.trim()) {
      setError("Please enter both username and password");
      setLoading(false);
      return;
    }

    try {
      const res = await adminLogin(formData);
      console.log("API Response:", res); // For debugging
      
      // Check if response indicates success
      // Your API returns StatusCode: 203 for failure, so we need to check this
      if (res.StatusCode !== 200 || !res.loginLst) {
        // Check for specific error message from API
        const errorMessage = res.Message || "Invalid credentials. Please try again.";
        throw new Error(errorMessage);
      }
      
      // Only store user data if login is successful
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

  // Handle Enter key press
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
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "300%",
          height: "300%",
          background: `radial-gradient(circle, ${alpha(
            theme.palette.common.white,
            0.1
          )} 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          animation: "moveBackground 20s linear infinite",
          "@keyframes moveBackground": {
            "0%": { transform: "translate(0, 0)" },
            "100%": { transform: "translate(-50px, -50px)" },
          },
        },
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(
            theme.palette.primary.light,
            0.2
          )} 0%, transparent 70%)`,
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-20px)" },
          },
        }}
      />

      <Fade in={true} timeout={800}>
        <Paper
          elevation={24}
          sx={{
            p: { xs: 3, sm: 5 },
            width: "100%",
            maxWidth: 420,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            background: alpha(theme.palette.background.paper, 0.95),
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: `linear-gradient(90deg, 
                ${theme.palette.primary.main}, 
                ${theme.palette.secondary.main})`,
            },
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: theme.palette.primary.main,
                mb: 3,
                boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            >
              <AdminPanelSettings sx={{ fontSize: 40, color: "white" }} />
            </Box>

            <Typography
              variant="h4"
              component="h1"
              fontWeight="600"
              gutterBottom
              sx={{
                background: `linear-gradient(45deg, 
                  ${theme.palette.primary.main}, 
                  ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Admin Portal
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to access your dashboard
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Fade in={!!error}>
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  animation: "shake 0.5s ease-in-out",
                  "@keyframes shake": {
                    "0%, 100%": { transform: "translateX(0)" },
                    "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
                    "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
                  },
                }}
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            </Fade>
          )}

          {/* Form Section */}
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
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: `0 0 0 2px ${alpha(
                      theme.palette.primary.main,
                      0.2
                    )}`,
                  },
                  "&.Mui-focused": {
                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                  },
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
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      size="small"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: `0 0 0 2px ${alpha(
                      theme.palette.primary.main,
                      0.2
                    )}`,
                  },
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading || !formData.UserName || !formData.Password}
              sx={{
                mt: 4,
                mb: 2,
                py: 1.5,
                borderRadius: 2,
                fontSize: "1rem",
                fontWeight: "600",
                textTransform: "none",
                background: `linear-gradient(45deg, 
                  ${theme.palette.primary.main}, 
                  ${theme.palette.secondary.main})`,
                boxShadow: `0 4px 20px ${alpha(
                  theme.palette.primary.main,
                  0.3
                )}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 6px 24px ${alpha(
                    theme.palette.primary.main,
                    0.4
                  )}`,
                },
                "&:disabled": {
                  background: theme.palette.action.disabledBackground,
                  transform: "none",
                  boxShadow: "none",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Demo credentials hint (remove in production) */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 2,
                opacity: 0.7,
                fontStyle: "italic",
              }}
            >
              ToleID: ES25 • Source: W
            </Typography>

            {/* Footer Note */}
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
              Secure Admin Portal • v2.0
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default Login;