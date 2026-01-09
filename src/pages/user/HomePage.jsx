import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  Stack,
  alpha,
  useTheme,
  Avatar,
} from "@mui/material";
import {
  Security,
  Groups,
  Event,
  AccountBalance,
  Dashboard,
  ArrowForward,
  Email,
  Phone,
  Star,
  TrendingFlat,
  Handshake,
  Shield,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/user/UserNavbar";
import Footer from "../../components/user/Footer";

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: <Security sx={{ fontSize: 36 }} />,
      title: "Secure Complaints",
      description: "File and track complaints with real-time updates",
      color: theme.palette.primary.main,
    },
    {
      icon: <Groups sx={{ fontSize: 36 }} />,
      title: "Community Ledger",
      description: "Transparent financial records for development",
      color: theme.palette.secondary.main,
    },
    {
      icon: <Event sx={{ fontSize: 36 }} />,
      title: "Local Events",
      description: "Stay updated with community activities",
      color: theme.palette.success.main,
    },
    {
      icon: <AccountBalance sx={{ fontSize: 36 }} />,
      title: "Digital Governance",
      description: "Access government services and documents",
      color: theme.palette.warning.main,
    },
  ];

  const testimonials = [
    {
      name: "John Doe",
      role: "Resident, Tole A",
      comment: "This platform revolutionized how we manage our community!",
      rating: 5,
    },
    {
      name: "Jane Smith",
      role: "Resident, Tole B",
      comment: "The complaint system is efficient and transparent.",
      rating: 5,
    },
    {
      name: "Robert Johnson",
      role: "Tole Representative",
      comment: "Perfect tool for community financial management.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "50+", label: "Active Toles", icon: "🏘️" },
    { number: "10,000+", label: "Happy Residents", icon: "😊" },
    { number: "95%", label: "Satisfaction", icon: "⭐" },
    { number: "24/7", label: "Support", icon: "🕒" },
  ];

  // Optimized placeholder images (smaller size, local if possible)
  const heroImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  const supportImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80";

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />

      {/* Hero Section - Optimized */}
      <Box
        sx={{
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 800,
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                Welcome to{" "}
                <Box component="span" sx={{ color: theme.palette.secondary.light }}>
                  Smart Tole
                </Box>{" "}
                Management
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  fontWeight: 400,
                }}
              >
                Transform your neighborhood with our all-in-one digital platform.
                Connect, manage, and grow together in the smartest way possible.
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/login")}
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    bgcolor: "white",
                    color: theme.palette.primary.main,
                    "&:hover": {
                      bgcolor: alpha("#fff", 0.9),
                      transform: "translateY(-2px)",
                    },
                    transition: "transform 0.2s ease",
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    borderColor: "white",
                    color: "white",
                    "&:hover": {
                      bgcolor: alpha("#fff", 0.1),
                    },
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={8}
                sx={{
                  p: 1,
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  bgcolor: alpha("#fff", 0.1),
                  backdropFilter: "blur(10px)",
                }}
              >
                <Box
                  component="img"
                  src={heroImage}
                  alt="Dashboard Preview"
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 2,
                    display: "block",
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section - Simple */}
      <Box sx={{ py: 6, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h2" fontWeight={900} color="primary">
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section - Optimized */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              fontWeight: 800,
              color: "text.primary",
            }}
          >
            Everything You Need for{" "}
            <Box component="span" color="primary.main">
              Community Excellence
            </Box>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
            Designed to simplify complex community management tasks with intuitive tools
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  height: "100%",
                  borderRadius: 2,
                  border: `1px solid ${alpha(feature.color, 0.1)}`,
                  bgcolor: "background.paper",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  transform: hoveredCard === index ? "translateY(-4px)" : "none",
                  boxShadow: hoveredCard === index ? 6 : 2,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      bgcolor: alpha(feature.color, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Typography variant="caption" fontWeight={700} color={feature.color}>
                      Learn More
                    </Typography>
                    <TrendingFlat sx={{ fontSize: 16, color: feature.color }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works - Simple */}
      <Box sx={{ py: 8, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h2" fontWeight={800} gutterBottom>
              Simple, Fast &{" "}
              <Box component="span" color="primary.main">
                Effective
              </Box>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
              Get started in minutes and see the difference immediately
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                step: "01",
                title: "Sign Up",
                description: "Create your account in under 2 minutes",
                color: theme.palette.primary.main,
              },
              {
                step: "02",
                title: "Explore Dashboard",
                description: "Navigate through intuitive interface",
                color: theme.palette.secondary.main,
              },
              {
                step: "03",
                title: "Start Managing",
                description: "File complaints, check ledger, join events",
                color: theme.palette.success.main,
              },
              {
                step: "04",
                title: "Grow Together",
                description: "Watch your community thrive digitally",
                color: theme.palette.warning.main,
              },
            ].map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      bgcolor: step.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                      color: "white",
                      fontWeight: 900,
                      fontSize: "1.5rem",
                    }}
                  >
                    {step.step}
                  </Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials - Optimized */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h2" fontWeight={800} gutterBottom>
            Loved by{" "}
            <Box component="span" color="primary.main">
              Communities
            </Box>{" "}
            Everywhere
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
            See what residents and community leaders are saying about us
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  boxShadow: 2,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        sx={{
                          color: theme.palette.warning.main,
                          mr: 0.5,
                          fontSize: "1rem",
                        }}
                      />
                    ))}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      fontStyle: "italic",
                      color: "text.primary",
                      lineHeight: 1.6,
                    }}
                  >
                    "{testimonial.comment}"
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        width: 50,
                        height: 50,
                        fontWeight: 700,
                      }}
                    >
                      {testimonial.name[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Info - Simple */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: "background.paper",
            boxShadow: 2,
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Need Help?
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Our support team is here to help you with any questions about
                the platform.
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Phone sx={{ color: theme.palette.primary.main }} />
                  <Typography>+977-1-XXXXXXX</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Email sx={{ color: theme.palette.primary.main }} />
                  <Typography>support@smarttole.com</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={supportImage}
                alt="Support"
                loading="lazy"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Final CTA - Optimized */}
      <Box
        sx={{
          py: 8,
          background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
          color: "white",
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Ready to Transform Your{" "}
              <Box component="span" sx={{ color: theme.palette.primary.light }}>
                Community?
              </Box>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 6,
                opacity: 0.9,
                fontWeight: 400,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Join thousands of residents already experiencing the future of community management
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" gap={2}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/login")}
                endIcon={<ArrowForward />}
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  bgcolor: "white",
                  color: theme.palette.secondary.main,
                  "&:hover": {
                    bgcolor: alpha("#fff", 0.9),
                    transform: "translateY(-2px)",
                  },
                  transition: "transform 0.2s ease",
                }}
              >
                Start Free Trial
              </Button>
              <Button
                variant="outlined"
                size="large"
                endIcon={<Shield />}
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  borderColor: "white",
                  color: "white",
                  "&:hover": {
                    bgcolor: alpha("#fff", 0.1),
                  },
                }}
              >
                Schedule Demo
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default HomePage;