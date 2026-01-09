import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  alpha,
  useTheme,
  Paper,
  Stack,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Security,
  Groups,
  Event,
  AccountBalance,
  Dashboard,
  ReportProblem,
  Badge,
  Notifications,
  Speed,
  Verified,
  Timeline,
  ArrowBack,
  CheckCircle,
  Star,
  TrendingUp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/user/UserNavbar";
import Footer from "../../components/user/Footer";

const FeaturesPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const mainFeatures = [
    {
      icon: <ReportProblem sx={{ fontSize: 40 }} />,
      title: "Smart Complaint System",
      description: "File, track, and resolve community issues with real-time updates",
      highlights: [
        "Priority-based categorization",
        "Photo/video evidence upload",
        "Status tracking with notifications",
        "Resolution feedback system",
      ],
      color: theme.palette.primary.main,
      popular: true,
    },
    {
      icon: <AccountBalance sx={{ fontSize: 40 }} />,
      title: "Digital Community Ledger",
      description: "Transparent financial management for community funds",
      highlights: [
        "Real-time balance updates",
        "Transaction history with receipts",
        "Budget planning tools",
        "Financial report generation",
      ],
      color: theme.palette.secondary.main,
      popular: false,
    },
    {
      icon: <Event sx={{ fontSize: 40 }} />,
      title: "Event Management",
      description: "Organize and participate in community events",
      highlights: [
        "Calendar integration",
        "RSVP and attendance tracking",
        "Event reminders",
        "Photo galleries",
      ],
      color: theme.palette.success.main,
      popular: true,
    },
    {
      icon: <Badge sx={{ fontSize: 40 }} />,
      title: "Digital Identity & Documents",
      description: "Secure access to government and community documents",
      highlights: [
        "Digital ID cards",
        "Document repository",
        "Secure sharing",
        "Expiration alerts",
      ],
      color: theme.palette.warning.main,
      popular: false,
    },
  ];

  const additionalFeatures = [
    {
      icon: <Notifications sx={{ fontSize: 30 }} />,
      title: "Real-time Notifications",
      description: "Instant updates on complaints, events, and announcements",
    },
    {
      icon: <Groups sx={{ fontSize: 30 }} />,
      title: "Resident Directory",
      description: "Verified contact information for community members",
    },
    {
      icon: <Security sx={{ fontSize: 30 }} />,
      title: "Security Features",
      description: "Role-based access control and data encryption",
    },
    {
      icon: <Speed sx={{ fontSize: 30 }} />,
      title: "Performance Dashboard",
      description: "Analytics and insights for community leaders",
    },
    {
      icon: <Verified sx={{ fontSize: 30 }} />,
      title: "Verification System",
      description: "Verified resident status for trusted interactions",
    },
    {
      icon: <Timeline sx={{ fontSize: 30 }} />,
      title: "Progress Tracking",
      description: "Monitor community projects and initiatives",
    },
  ];

  const testimonials = [
    {
      name: "Community Leader, Baneshwor",
      text: "The complaint system reduced resolution time from weeks to days!",
      rating: 5,
    },
    {
      name: "Resident, Kirtipur",
      text: "Finally, transparent financial records we can all trust.",
      rating: 5,
    },
    {
      name: "Tole Committee, Patan",
      text: "Event management made organizing gatherings effortless.",
      rating: 4,
    },
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      description: "For small toles starting their digital journey",
      features: [
        "Up to 100 residents",
        "Basic complaint system",
        "Event calendar",
        "Community announcements",
        "Email support",
      ],
      highlighted: false,
    },
    {
      name: "Pro",
      price: "₹5,000/year",
      description: "For growing communities",
      features: [
        "Unlimited residents",
        "Advanced complaint system",
        "Digital ledger",
        "Document management",
        "Priority support",
        "Analytics dashboard",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large communities with special needs",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "Dedicated account manager",
        "Training sessions",
        "API access",
        "White-label option",
      ],
      highlighted: false,
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
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
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
              <Chip
                label="All-in-One Platform"
                sx={{
                  bgcolor: alpha("#fff", 0.2),
                  color: "white",
                  mb: 3,
                  fontWeight: 600,
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 800,
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                Everything Your{" "}
                <Box component="span" sx={{ color: theme.palette.secondary.light }}>
                  Community
                </Box>{" "}
                Needs
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                From complaint management to event planning, Smart Tole provides 
                all the tools for modern community governance in one intuitive platform.
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/login")}
                  sx={{
                    bgcolor: "white",
                    color: theme.palette.primary.main,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: alpha("#fff", 0.9),
                      transform: "translateY(-2px)",
                      boxShadow: 4,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Try All Features Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/about")}
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
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Dashboard Preview"
                sx={{
                  width: "100%",
                  borderRadius: 4,
                  boxShadow: 8,
                  transform: "perspective(1000px) rotateY(-5deg)",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Features */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 2, fontWeight: 700, color: "text.primary" }}
        >
          Core Features
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 6, color: "text.secondary" }}
        >
          Powerful tools designed specifically for community management
        </Typography>
        
        <Grid container spacing={4}>
          {mainFeatures.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: `2px solid ${alpha(feature.color, 0.2)}`,
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "visible",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 20px 40px ${alpha(feature.color, 0.2)}`,
                    borderColor: feature.color,
                  },
                }}
              >
                {feature.popular && (
                  <Chip
                    label="MOST POPULAR"
                    sx={{
                      position: "absolute",
                      top: -12,
                      right: 20,
                      bgcolor: feature.color,
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                )}
                
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
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
                  
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    {feature.title}
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {feature.description}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <List>
                    {feature.highlights.map((highlight, idx) => (
                      <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircle sx={{ color: feature.color, fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary={highlight} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Additional Features */}
      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05), py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 2, fontWeight: 700 }}
          >
            More Great Features
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ mb: 6, color: "text.secondary" }}
          >
            Everything you need for complete community management
          </Typography>
          
          <Grid container spacing={3}>
            {additionalFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    height: "100%",
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      color: theme.palette.primary.main,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Loved by Communities
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        sx={{
                          color: i < testimonial.rating 
                            ? theme.palette.warning.main 
                            : "action.disabled",
                          mr: 0.5,
                        }}
                      />
                    ))}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ mb: 3, fontStyle: "italic", color: "text.primary" }}
                  >
                    "{testimonial.text}"
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {testimonial.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Pricing Section */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 2, fontWeight: 700 }}
          >
            Simple, Transparent Pricing
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ mb: 6, color: "text.secondary" }}
          >
            Choose the plan that fits your community's needs
          </Typography>
          
          <Grid container spacing={4}>
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: plan.highlighted 
                      ? `2px solid ${theme.palette.primary.main}`
                      : `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: plan.highlighted ? 8 : 4,
                    },
                  }}
                >
                  {plan.highlighted && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        bgcolor: theme.palette.primary.main,
                      }}
                    />
                  )}
                  
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                      {plan.name}
                    </Typography>
                    
                    <Box sx={{ display: "flex", alignItems: "baseline", mb: 2 }}>
                      <Typography variant="h3" fontWeight={800}>
                        {plan.price}
                      </Typography>
                      {plan.price !== "Custom" && (
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          /community/year
                        </Typography>
                      )}
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {plan.description}
                    </Typography>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <List>
                      {plan.features.map((feature, idx) => (
                        <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircle 
                              sx={{ 
                                color: plan.highlighted 
                                  ? theme.palette.primary.main 
                                  : "text.secondary",
                                fontSize: 20 
                              }} 
                            />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature}
                            primaryTypographyProps={{
                              color: "text.primary",
                              fontWeight: plan.highlighted ? 500 : 400,
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Button
                      fullWidth
                      variant={plan.highlighted ? "contained" : "outlined"}
                      size="large"
                      onClick={() => navigate("/login")}
                      sx={{
                        mt: 3,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                      }}
                    >
                      {plan.highlighted ? "Get Started" : "Learn More"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Comparison Table */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Feature Comparison
        </Typography>
        <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Box sx={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ padding: "1rem", textAlign: "left", borderBottom: `2px solid ${theme.palette.divider}` }}>Feature</th>
                  {pricingPlans.map((plan, index) => (
                    <th key={index} style={{ padding: "1rem", textAlign: "center", borderBottom: `2px solid ${theme.palette.divider}` }}>
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Resident Capacity", basic: "Up to 100", pro: "Unlimited", enterprise: "Unlimited" },
                  { feature: "Complaint System", basic: "Basic", pro: "Advanced", enterprise: "Advanced + Custom" },
                  { feature: "Digital Ledger", basic: "❌", pro: "✅", enterprise: "✅" },
                  { feature: "Event Management", basic: "✅", pro: "✅", enterprise: "✅" },
                  { feature: "Document Storage", basic: "1GB", pro: "10GB", enterprise: "Unlimited" },
                  { feature: "Support", basic: "Email", pro: "Priority", enterprise: "24/7 Dedicated" },
                ].map((row, rowIndex) => (
                  <tr key={rowIndex} style={{ borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
                    <td style={{ padding: "1rem", fontWeight: 600 }}>{row.feature}</td>
                    <td style={{ padding: "1rem", textAlign: "center" }}>{row.basic}</td>
                    <td style={{ padding: "1rem", textAlign: "center", color: theme.palette.primary.main, fontWeight: 600 }}>{row.pro}</td>
                    <td style={{ padding: "1rem", textAlign: "center" }}>{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Paper>
      </Container>

      {/* Final CTA */}
      <Box sx={{ py: 8, background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`, color: "white" }}>
        <Container maxWidth="md">
          <Typography variant="h2" align="center" sx={{ mb: 3, fontWeight: 700 }}>
            Ready to Transform Your Community?
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of residents already using Smart Tole
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" gap={2}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                bgcolor: "white",
                color: theme.palette.secondary.main,
                px: 6,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: "1.1rem",
                "&:hover": {
                  bgcolor: alpha("#fff", 0.9),
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/about")}
              sx={{
                borderColor: "white",
                color: "white",
                px: 6,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: "1.1rem",
                "&:hover": {
                  bgcolor: alpha("#fff", 0.1),
                  borderColor: "white",
                },
              }}
            >
              Schedule Demo
            </Button>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default FeaturesPage;