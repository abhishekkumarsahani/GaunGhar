import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
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
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  AccessTime,
  Send,
  ArrowBack,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  WhatsApp,
  Chat,
  SupportAgent,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/user/UserNavbar";
import Footer from "../../components/user/Footer";
import { useState } from "react";

const ContactPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const contactMethods = [
    {
      icon: <Email sx={{ fontSize: 40 }} />,
      title: "Email",
      description: "We respond within 24 hours",
      details: "support@smarttole.com",
      action: "mailto:support@smarttole.com",
      color: theme.palette.primary.main,
    },
    {
      icon: <Phone sx={{ fontSize: 40 }} />,
      title: "Phone",
      description: "Mon-Fri from 9AM to 6PM",
      details: "+977-1-1234567",
      action: "tel:+97711234567",
      color: theme.palette.secondary.main,
    },
    {
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      title: "Office",
      description: "Visit our headquarters",
      details: "Kathmandu, Nepal",
      action: "https://maps.google.com",
      color: theme.palette.success.main,
    },
    {
      icon: <Chat sx={{ fontSize: 40 }} />,
      title: "Live Chat",
      description: "Instant support",
      details: "Click to chat now",
      action: "#chat",
      color: theme.palette.warning.main,
    },
  ];

  const faqs = [
    {
      question: "How do I set up Smart Tole for my community?",
      answer: "Setting up is simple! Sign up, verify your community, invite residents, and start using the platform. Our team provides onboarding support.",
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a 30-day free trial for all plans with full access to all features.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept online payments, bank transfers, and digital wallets. Contact our sales team for annual payment discounts.",
    },
    {
      question: "Can I export our community data?",
      answer: "Yes, community administrators can export all data in CSV or PDF format at any time.",
    },
    {
      question: "How secure is our community data?",
      answer: "We use enterprise-grade security with end-to-end encryption, regular backups, and compliance with data protection regulations.",
    },
  ];

  const teamMembers = [
    {
      name: "Rohan Shrestha",
      role: "Support Lead",
      email: "rohan@smarttole.com",
      expertise: "Community Onboarding",
    },
    {
      name: "Anita Gurung",
      role: "Technical Support",
      email: "anita@smarttole.com",
      expertise: "Platform Setup",
    },
    {
      name: "Suresh Kumar",
      role: "Account Manager",
      email: "suresh@smarttole.com",
      expertise: "Enterprise Solutions",
    },
  ];

  const socialLinks = [
    { icon: <Facebook />, label: "Facebook", url: "https://facebook.com/smarttole" },
    { icon: <Twitter />, label: "Twitter", url: "https://twitter.com/smarttole" },
    { icon: <LinkedIn />, label: "LinkedIn", url: "https://linkedin.com/company/smarttole" },
    { icon: <Instagram />, label: "Instagram", url: "https://instagram.com/smarttole" },
    { icon: <WhatsApp />, label: "WhatsApp", url: "https://wa.me/9779800000000" },
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
                label="Get In Touch"
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
                We're Here to{" "}
                <Box component="span" sx={{ color: theme.palette.secondary.light }}>
                  Help
                </Box>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                Have questions about Smart Tole? Our team is ready to assist you 
                with setup, features, pricing, and everything in between.
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/features")}
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
                  Explore Features
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="#contact-form"
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
                  Send Message
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Customer Support"
                sx={{
                  width: "100%",
                  borderRadius: 4,
                  boxShadow: 8,
                  transform: "perspective(1000px) rotateY(5deg)",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Methods */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 2, fontWeight: 700, color: "text.primary" }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 6, color: "text.secondary" }}
        >
          Choose your preferred way to reach out
        </Typography>
        
        <Grid container spacing={4}>
          {contactMethods.map((method, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: `2px solid ${alpha(method.color, 0.2)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 20px 40px ${alpha(method.color, 0.2)}`,
                    borderColor: method.color,
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      bgcolor: alpha(method.color, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      color: method.color,
                      mx: "auto",
                    }}
                  >
                    {method.icon}
                  </Box>
                  
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {method.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {method.description}
                  </Typography>
                  
                  <Typography variant="body1" fontWeight={600} gutterBottom>
                    {method.details}
                  </Typography>
                  
                  <Button
                    component="a"
                    href={method.action}
                    variant="outlined"
                    fullWidth
                    sx={{
                      mt: 2,
                      borderColor: method.color,
                      color: method.color,
                      "&:hover": {
                        bgcolor: alpha(method.color, 0.1),
                        borderColor: method.color,
                      },
                    }}
                  >
                    Contact via {method.title}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form & Info */}
      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05), py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <Card id="contact-form" sx={{ borderRadius: 3, height: "100%" }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    Send us a Message
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </Typography>
                  
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                +977
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Your Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          multiline
                          rows={4}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={<Send />}
                          sx={{
                            px: 6,
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 600,
                          }}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>

            {/* Contact Info & Social */}
            <Grid item xs={12} md={5}>
              <Stack spacing={4}>
                {/* Office Hours */}
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTime /> Office Hours
                    </Typography>
                    <List>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText 
                          primary="Monday - Friday"
                          secondary="9:00 AM - 6:00 PM"
                          secondaryTypographyProps={{ color: "text.secondary" }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText 
                          primary="Saturday"
                          secondary="10:00 AM - 4:00 PM"
                          secondaryTypographyProps={{ color: "text.secondary" }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText 
                          primary="Sunday & Holidays"
                          secondary="Emergency Support Only"
                          secondaryTypographyProps={{ color: "text.secondary" }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      Connect With Us
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Follow us on social media for updates, tips, and community stories.
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      {socialLinks.map((social, index) => (
                        <IconButton
                          key={index}
                          component="a"
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            "&:hover": {
                              bgcolor: theme.palette.primary.main,
                              color: "white",
                            },
                          }}
                          aria-label={social.label}
                        >
                          {social.icon}
                        </IconButton>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>

                {/* Support Team */}
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SupportAgent /> Your Support Team
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Meet the team dedicated to helping your community succeed.
                    </Typography>
                    <List>
                      {teamMembers.map((member, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon>
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: theme.palette.primary.main,
                              }}
                            >
                              {member.name.charAt(0)}
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={member.name}
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.primary">
                                  {member.role}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {member.expertise}
                                </Typography>
                                <Typography variant="body2" color="primary">
                                  {member.email}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Frequently Asked Questions
        </Typography>
        
        <Grid container spacing={3}>
          {faqs.map((faq, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: theme.palette.primary.main }}>
                  {faq.question}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {faq.answer}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Map & Location */}
      <Box sx={{ py: 8, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Our Location
          </Typography>
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
                <Box
                  component="iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5367089626436!2d85.32759731501113!3d27.700032582793815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a64b5f13e1%3A0x28b2d0eacda46b98!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2s!4v1642345678901!5m2!1sen!2s"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Smart Tole Office Location"
                />
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3, height: "100%" }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn /> Visit Our Office
                  </Typography>
                  
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <LocationOn color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Smart Tole Headquarters"
                        secondary="Kathmandu, Nepal"
                      />
                    </ListItem>
                    
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <AccessTime color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Best Time to Visit"
                        secondary="Monday to Friday, 10AM - 4PM"
                      />
                    </ListItem>
                    
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Phone color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Call Before Visiting"
                        secondary="+977-1-1234567 (Ext. 101)"
                      />
                    </ListItem>
                  </List>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                    We recommend scheduling an appointment before visiting to ensure 
                    that the right team member is available to assist you.
                  </Typography>
                  
                  <Button
                    variant="contained"
                    startIcon={<Phone />}
                    href="tel:+97711234567"
                    sx={{ mt: 3 }}
                  >
                    Call to Schedule Visit
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box sx={{ py: 8, background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`, color: "white" }}>
        <Container maxWidth="md">
          <Typography variant="h2" align="center" sx={{ mb: 3, fontWeight: 700 }}>
            Still Have Questions?
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 4, opacity: 0.9 }}>
            We're just a click away. Get in touch for personalized assistance.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" gap={2}>
            <Button
              variant="contained"
              size="large"
              href="mailto:support@smarttole.com"
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
              Email Us Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="tel:+97711234567"
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
              Call Support
            </Button>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default ContactPage;