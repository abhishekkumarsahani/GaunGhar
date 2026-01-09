import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  Avatar,
  alpha,
  useTheme,
  Fade,
  Container,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import {
  Person,
  Lock,
  Login,
  ArrowBack,
  Visibility,
  VisibilityOff,
  Email,
  Security,
  Dashboard,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { userLoginApi } from "../../api/user/userAuthApi";

const UserLogin = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [form, setForm] = useState({
    ToleID: "ES25",
    UserName: "",
    Password: "",
    NoToken: "",
    Source: "A",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/user/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.UserName || !form.Password) {
      setError("Username and Password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await userLoginApi(form);
      if (res?.StatusCode === 200) {
        localStorage.setItem("user", JSON.stringify(res.loginLst[0]));
        navigate("/user/dashboard", { replace: true });
      } else {
        setError(res?.Message || "Invalid credentials");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setForm({
      ...form,
      UserName: "demo_user",
      Password: "demo123",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
      }}
    >
      {/* Animated Gradient Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 15% 50%, ${alpha("#4F46E5", 0.4)} 0%, transparent 50%),
            radial-gradient(circle at 85% 30%, ${alpha("#7C3AED", 0.3)} 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, ${alpha("#EC4899", 0.25)} 0%, transparent 50%),
            linear-gradient(135deg, #667eea 0%, #764ba2 100%)
          `,
          animation: "gradientShift 15s ease infinite",
          "@keyframes gradientShift": {
            "0%, 100%": {
              backgroundPosition: "0% 50%",
            },
            "50%": {
              backgroundPosition: "100% 50%",
            },
          },
        }}
      />

      {/* Floating Particles Effect */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: Math.random() * 60 + 20,
            height: Math.random() * 60 + 20,
            borderRadius: "50%",
            background: alpha("#fff", Math.random() * 0.1 + 0.05),
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 20 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            "@keyframes float": {
              "0%, 100%": {
                transform: "translateY(0) translateX(0)",
              },
              "50%": {
                transform: `translateY(${Math.random() * 50 - 25}px) translateX(${
                  Math.random() * 50 - 25
                }px)`,
              },
            },
          }}
        />
      ))}

      <Fade in timeout={800}>
        <Container maxWidth="md">
          <Paper
            elevation={24}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              minHeight: 520,
              display: "flex",
              background: alpha("#fff", 0.95),
              backdropFilter: "blur(10px)",
              boxShadow: `
                0 20px 80px rgba(0,0,0,0.3),
                0 0 0 1px ${alpha("#fff", 0.1)}
              `,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: "linear-gradient(90deg, #667eea, #764ba2, #ec4899)",
              },
            }}
          >
            {/* Left Side - Enhanced Brand Section */}
            <Box
              sx={{
                flex: 1,
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 6,
                background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Animated Orbs */}
              <Box
                sx={{
                  position: "absolute",
                  width: 400,
                  height: 400,
                  borderRadius: "50%",
                  background: alpha("#fff", 0.1),
                  top: -200,
                  right: -100,
                  animation: "orbFloat 20s ease-in-out infinite",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  background: alpha("#fff", 0.05),
                  bottom: -150,
                  left: -100,
                  animation: "orbFloat 25s ease-in-out infinite reverse",
                }}
              />

              {/* Content */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  textAlign: "center",
                }}
              >
                {/* Animated Logo/Avatar */}
                <Box
                  sx={{
                    width: 140,
                    height: 140,
                    background: "linear-gradient(135deg, #fff 0%, #f3f4f6 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 32px",
                    border: `8px solid ${alpha("#fff", 0.3)}`,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                    animation: "pulse 2s ease-in-out infinite",
                    "@keyframes pulse": {
                      "0%, 100%": {
                        transform: "scale(1)",
                      },
                      "50%": {
                        transform: "scale(1.05)",
                      },
                    },
                  }}
                >
                  <Dashboard sx={{ fontSize: 60, color: "#4F46E5" }} />
                </Box>

                <Typography
                  variant="h3"
                  fontWeight={900}
                  sx={{
                    mb: 2,
                    color: "white",
                    textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    background: "linear-gradient(to right, #fff, #f0f0f0)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Welcome Back
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: alpha("#fff", 0.9),
                    maxWidth: 320,
                    lineHeight: 1.6,
                  }}
                >
                  Sign in to your account and unlock powerful tools to manage your
                  business operations with ease and efficiency.
                </Typography>

                {/* Features List */}
                <Stack spacing={2} sx={{ mt: 4 }}>
                  {[
                    { icon: "🔒", text: "Enterprise-grade Security" },
                    { icon: "⚡", text: "Lightning Fast Performance" },
                    { icon: "📈", text: "Real-time Analytics" },
                  ].map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        color: alpha("#fff", 0.9),
                        animation: `fadeInUp 0.5s ease ${index * 0.1}s both`,
                      }}
                    >
                      <Box sx={{ fontSize: "1.2rem" }}>{feature.icon}</Box>
                      <Typography variant="body2">{feature.text}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>

            {/* Right Side - Enhanced Login Form */}
            <Box
              sx={{
                flex: 1,
                p: { xs: 4, md: 5 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: alpha("#fff", 0.98),
              }}
            >
              {/* Back Button - Enhanced */}
              <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate("/")}
                sx={{
                  alignSelf: "flex-start",
                  mb: 4,
                  color: "text.secondary",
                  textTransform: "none",
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  background: alpha(theme.palette.primary.main, 0.05),
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    transform: "translateX(-4px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Back to Home
              </Button>

              {/* Mobile Header */}
              <Box sx={{ display: { xs: "block", md: "none" }, mb: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
                  }}
                >
                  <Dashboard sx={{ fontSize: 30, color: "white" }} />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  align="center"
                  sx={{
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Welcome Back
                </Typography>
              </Box>

              {/* Form Header */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  gutterBottom
                  sx={{
                    background: "linear-gradient(135deg, #333, #666)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Sign In
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                    }}
                  />
                  Enter your credentials to continue
                </Typography>
              </Box>

              {/* Error Alert - Enhanced */}
              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    background: alpha(theme.palette.error.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                    color: theme.palette.error.dark,
                    animation: "shake 0.5s ease",
                    "@keyframes shake": {
                      "0%, 100%": { transform: "translateX(0)" },
                      "25%": { transform: "translateX(-5px)" },
                      "75%": { transform: "translateX(5px)" },
                    },
                  }}
                  onClose={() => setError("")}
                >
                  {error}
                </Alert>
              )}

              {/* Login Form */}
              <Stack component="form" onSubmit={handleLogin} spacing={3}>
                <TextField
                  fullWidth
                  label="Username"
                  name="UserName"
                  value={form.UserName}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "#667eea" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      background: alpha("#f8fafc", 0.8),
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: alpha("#f1f5f9", 0.9),
                      },
                      "&.Mui-focused": {
                        background: "#fff",
                        boxShadow: `0 0 0 3px ${alpha("#667eea", 0.2)}`,
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  value={form.Password}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "#667eea" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{ color: "#667eea" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      background: alpha("#f8fafc", 0.8),
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: alpha("#f1f5f9", 0.9),
                      },
                      "&.Mui-focused": {
                        background: "#fff",
                        boxShadow: `0 0 0 3px ${alpha("#667eea", 0.2)}`,
                      },
                    },
                  }}
                />

                {/* Demo Login Button */}
                <Button
                  variant="outlined"
                  onClick={handleDemoLogin}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                    py: 1,
                    border: `2px dashed ${alpha("#667eea", 0.3)}`,
                    color: "#667eea",
                    background: alpha("#667eea", 0.05),
                    "&:hover": {
                      background: alpha("#667eea", 0.1),
                      border: `2px dashed ${alpha("#667eea", 0.5)}`,
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Try Demo Credentials
                </Button>

                {/* Login Button - Enhanced */}
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  endIcon={!loading && <Login />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "1rem",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transition: "left 0.5s",
                    },
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 15px 40px rgba(102, 126, 234, 0.6)",
                      "&::before": {
                        left: "100%",
                      },
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </Button>

                {/* Support Link */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 2 }}
                >
                  Need assistance?{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "#667eea",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#764ba2",
                        gap: 1,
                      },
                    }}
                    onClick={() => {/* Add contact support handler */}}
                  >
                    <Email sx={{ fontSize: 16 }} />
                    Contact Support
                  </Box>
                </Typography>
              </Stack>

              {/* Footer */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  mt: 4,
                  pt: 3,
                  textAlign: "center",
                  display: "block",
                  borderTop: `1px solid ${alpha("#e5e7eb", 0.5)}`,
                }}
              >
                © {new Date().getFullYear()} Enterprise Solutions • v2.5.1
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Fade>
    </Box>
  );
};

export default UserLogin;