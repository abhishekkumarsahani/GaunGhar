import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Button,
  alpha,
  useTheme,
  Paper,
} from "@mui/material";
import {
  Groups,
  Timeline,
  Security,
  Diversity3,
  ConnectWithoutContact,
  LocationCity,
  ArrowBack,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/user/UserNavbar";
import Footer from "../../components/user/Footer";

const AboutPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const teamMembers = [
    {
      name: "Rajesh Sharma",
      role: "Community Coordinator",
      description: "5+ years in community management",
      avatarColor: theme.palette.primary.main,
    },
    {
      name: "Sunita Gurung",
      role: "Technical Lead",
      description: "Full-stack developer with focus on civic tech",
      avatarColor: theme.palette.secondary.main,
    },
    {
      name: "Bikash Thapa",
      role: "Operations Manager",
      description: "Specialized in community engagement",
      avatarColor: theme.palette.success.main,
    },
    {
      name: "Priya Basnet",
      role: "Support Specialist",
      description: "Ensuring smooth user experience",
      avatarColor: theme.palette.warning.main,
    },
  ];

  const milestones = [
    {
      year: "2021",
      title: "Concept Development",
      description: "Initial research and community needs assessment",
    },
    {
      year: "2022",
      title: "Pilot Launch",
      description: "Launched in 5 toles with 500+ users",
    },
    {
      year: "2023",
      title: "Expansion",
      description: "Covered 20+ toles with 5000+ active users",
    },
    {
      year: "2024",
      title: "Full Platform",
      description: "Complete digital ecosystem for community management",
    },
  ];

  const values = [
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: "Transparency",
      description: "Every transaction and decision is visible to all community members",
    },
    {
      icon: <Groups sx={{ fontSize: 40 }} />,
      title: "Inclusion",
      description: "Designed for all residents regardless of tech proficiency",
    },
    {
      icon: <Timeline sx={{ fontSize: 40 }} />,
      title: "Sustainability",
      description: "Built to serve communities for years to come",
    },
    {
      icon: <Diversity3 sx={{ fontSize: 40 }} />,
      title: "Collaboration",
      description: "Fostering cooperation between residents and local authorities",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 10 },
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/")}
            sx={{
              color: "white",
              mb: 4,
              "&:hover": {
                bgcolor: alpha("#fff", 0.1),
              },
            }}
          >
            Back to Home
          </Button>
          
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
                Building Stronger{" "}
                <Box component="span" sx={{ color: theme.palette.secondary.light }}>
                  Communities
                </Box>{" "}
                Together
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                Smart Tole is more than a platform—it's a movement to empower 
                neighborhoods through technology, transparency, and collaboration.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Community Gathering"
                sx={{
                  width: "100%",
                  borderRadius: 4,
                  boxShadow: 8,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Story */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 700, color: "text.primary" }}
        >
          Our Story
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Community Discussion"
                sx={{
                  width: "100%",
                  borderRadius: 3,
                  boxShadow: 4,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={600} gutterBottom>
                From Idea to Impact
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                Smart Tole was born from a simple observation: while our cities were 
                becoming "smart," our neighborhoods remained disconnected. Traditional 
                community management relied on paper records, word-of-mouth communication, 
                and in-person meetings that excluded many residents.
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                In 2021, a group of tech enthusiasts and community leaders came together 
                to solve this problem. We started with basic digital ledgers for five local 
                toles in Kathmandu. The response was overwhelming—within months, 
                hundreds of residents were using the platform.
              </Typography>
              <Typography variant="body1">
                Today, Smart Tole serves thousands of residents across multiple cities, 
                transforming how communities interact, make decisions, and manage resources.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Our Values */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Our Core Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {value.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Our Journey */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Our Journey
        </Typography>
        <Box sx={{ position: "relative" }}>
          {/* Timeline Line */}
          <Box
            sx={{
              position: "absolute",
              left: { xs: 20, md: "50%" },
              top: 0,
              bottom: 0,
              width: 4,
              bgcolor: theme.palette.primary.main,
              transform: { xs: "none", md: "translateX(-50%)" },
              zIndex: 0,
            }}
          />
          
          <Stack spacing={6}>
            {milestones.map((milestone, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  flexDirection: { xs: "column", md: index % 2 === 0 ? "row" : "row-reverse" },
                  gap: 3,
                }}
              >
                {/* Timeline Dot */}
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: theme.palette.primary.main,
                    border: `4px solid ${theme.palette.background.default}`,
                    zIndex: 1,
                    position: "relative",
                    flexShrink: 0,
                  }}
                />

                {/* Content */}
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    width: { xs: "100%", md: "45%" },
                    bgcolor: "background.paper",
                  }}
                >
                  <Typography
                    variant="h3"
                    color="primary"
                    fontWeight={800}
                    gutterBottom
                  >
                    {milestone.year}
                  </Typography>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {milestone.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {milestone.description}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>

      {/* Team Section */}
      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05), py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Meet Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: "center" }}>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        bgcolor: member.avatarColor,
                        mx: "auto",
                        mb: 3,
                        fontSize: "2rem",
                        fontWeight: 600,
                      }}
                    >
                      {member.name[0]}
                    </Avatar>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary"
                      fontWeight={500}
                      gutterBottom
                    >
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            textAlign: "center",
            background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
            color: "white",
          }}
        >
          <ConnectWithoutContact sx={{ fontSize: 60, mb: 3 }} />
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Join Our Community
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Be part of the movement transforming neighborhoods across Nepal
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                bgcolor: "white",
                color: theme.palette.secondary.main,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                "&:hover": {
                  bgcolor: alpha("#fff", 0.9),
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/#contact")}
              sx={{
                borderColor: "white",
                color: "white",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                "&:hover": {
                  bgcolor: alpha("#fff", 0.1),
                  borderColor: "white",
                },
              }}
            >
              Contact Us
            </Button>
          </Stack>
        </Paper>
      </Container>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {[
            { number: "50+", label: "Active Toles", icon: <LocationCity /> },
            { number: "10,000+", label: "Residents", icon: <Groups /> },
            { number: "95%", label: "Satisfaction Rate", icon: <Timeline /> },
            { number: "24/7", label: "Support", icon: <Security /> },
          ].map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                    color: theme.palette.primary.main,
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography variant="h3" fontWeight={800} color="primary">
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

      <Footer />
    </Box>
  );
};

export default AboutPage;