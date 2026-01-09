import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  alpha,
  Stack,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  ArrowUpward,
} from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Social Links */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
          {[
            { icon: <Facebook />, color: "#1877F2" },
            { icon: <Twitter />, color: "#1DA1F2" },
            { icon: <Instagram />, color: "#E4405F" },
            { icon: <LinkedIn />, color: "#0A66C2" },
          ].map((social, index) => (
            <IconButton
              key={index}
              size="small"
              sx={{
                bgcolor: alpha(social.color, 0.1),
                color: social.color,
                "&:hover": {
                  bgcolor: social.color,
                  color: "white",
                  transform: "translateY(-3px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              {social.icon}
            </IconButton>
          ))}
        </Box>

        {/* Divider */}
        <Divider sx={{ mb: 3, borderColor: alpha(theme.palette.divider, 0.1) }} />

        {/* Links */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 3, flexWrap: "wrap" }}>
          {["Home", "Features", "About", "Contact", "Privacy", "Terms"].map((item, index) => (
            <Link
              key={index}
              href="#"
              color="text.secondary"
              underline="hover"
              sx={{
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              {item}
            </Link>
          ))}
        </Box>

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mb: 2 }}
        >
          © {currentYear} Smart Tole. All rights reserved.
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          sx={{ display: "block", opacity: 0.7 }}
        >
          Building stronger communities through technology
        </Typography>

        {/* Back to Top (Fixed position alternative) */}
        <Box sx={{ position: "relative", mt: 2 }}>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              size="small"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: "primary.main",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                },
                transition: "all 0.2s ease",
              }}
            >
              <ArrowUpward />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;