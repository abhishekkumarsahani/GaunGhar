import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

import { adminLogin } from "../../api/authApi";

const Login = () => {
  const navigate = useNavigate(); // ✅ Important: useNavigate hook

  const [formData, setFormData] = useState({
    ToleID: "ES25",
    UserName: "",
    Password: "",
    NoToken: "",
    Source: "W",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await adminLogin(formData);
      console.log("Login success:", res);

      // Save user data (or token) to localStorage
      localStorage.setItem("adminUser", JSON.stringify(res));

      // Navigate to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
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
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f4f6f8",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 380 }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Admin Login
        </Typography>

        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="UserName"
            margin="normal"
            value={formData.UserName}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="Password"
            margin="normal"
            value={formData.Password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
