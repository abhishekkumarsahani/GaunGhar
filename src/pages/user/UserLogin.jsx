import { useState } from "react";
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
} from "@mui/material";
import {
  Person,
  Lock,
  Login,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { userLoginApi } from "../../api/user/userAuthApi";

const UserLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    ToleID: "ES25",
    UserName: "",
    Password: "",
    NoToken: "",
    Source: "A",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= HANDLERS =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleLogin = async () => {
    if (!form.UserName || !form.Password) {
      setError("Username and Password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await userLoginApi(form);

      if (res?.StatusCode === 200) {
        // Save user session
        localStorage.setItem("user", JSON.stringify(res.loginLst[0]));
        navigate("/user/dashboard");
      } else {
        setError(res?.Message || "Login failed");
      }
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <Card sx={{ width: 380, borderRadius: 3, boxShadow: 10 }}>
        <CardContent sx={{ p: 4 }}>
          {/* HEADER */}
          <Box textAlign="center" mb={3}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              User Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Login to your Tole account
            </Typography>
          </Box>

          {/* ERROR */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* USERNAME */}
          <TextField
            fullWidth
            label="Username"
            name="UserName"
            value={form.UserName}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          {/* PASSWORD */}
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="Password"
            value={form.Password}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />

          {/* LOGIN BUTTON */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={
              loading ? <CircularProgress size={20} /> : <Login />
            }
            sx={{
              mt: 3,
              py: 1.4,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* FOOTER */}
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            textAlign="center"
            mt={3}
          >
            © {new Date().getFullYear()} Tole Management System
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserLogin;
