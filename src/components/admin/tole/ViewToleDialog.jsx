import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Avatar,
  Chip,
  Divider,
  useTheme,
  alpha
} from "@mui/material";
import {
  Close as CloseIcon,
  Store as StoreIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Language as WebsiteIcon,
  Facebook as FacebookIcon,
  Info as InfoIcon,
  CalendarToday as CalendarIcon
} from "@mui/icons-material";

const ViewToleDialog = ({ open, onClose, tole }) => {
  const theme = useTheme();

  if (!tole) return null;

  const getStatusColor = (status, expiryDate) => {
    if (status === "N") return "error";
    if (new Date(expiryDate) < new Date()) return "warning";
    return "success";
  };

  const getStatusText = (status, expiryDate) => {
    if (status === "N") return "Disabled";
    if (new Date(expiryDate) < new Date()) return "Expired";
    return "Active";
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
          backdropFilter: "blur(20px)"
        }
      }}
    >
      <DialogTitle sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <StoreIcon color="primary" />
          <Box>
            <Typography variant="h6" fontWeight="600">
              {tole.Name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID: {tole.ToleID}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label={getStatusText(tole.AllowApp, tole.ExpiryDate)}
            color={getStatusColor(tole.AllowApp, tole.ExpiryDate)}
            size="small"
          />
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {/* Logo and Basic Info */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
              <Avatar
                src={tole.Logo || "/default-logo.png"}
                sx={{
                  width: 100,
                  height: 100,
                  border: `3px solid ${theme.palette.divider}`
                }}
              >
                <StoreIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="600" gutterBottom>
                  {tole.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {tole.Address}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                  <CalendarIcon fontSize="small" color="action" />
                  <Typography variant="caption">
                    Registered: {new Date(tole.RegDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Location Details */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="600" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationIcon color="primary" />
              Location Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" color="text.secondary">Province</Typography>
                <Typography variant="body2">{tole.ProvinceName || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" color="text.secondary">District</Typography>
                <Typography variant="body2">{tole.DistrictName || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" color="text.secondary">Municipality</Typography>
                <Typography variant="body2">{tole.MunicipalityName || "N/A"}</Typography>
              </Grid>
              {tole.WadaNo && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">Wada No</Typography>
                  <Typography variant="body2">{tole.WadaNo}</Typography>
                </Grid>
              )}
              {(tole.GoogLat || tole.GoogLong) && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">Coordinates</Typography>
                  <Typography variant="body2">
                    {tole.GoogLat}, {tole.GoogLong}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Contact Details */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="600" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon color="primary" />
              Contact Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">Contact Number</Typography>
                <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon fontSize="small" />
                  {tole.Contact}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">Email</Typography>
                <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon fontSize="small" />
                  {tole.Email}
                </Typography>
              </Grid>
              {tole.Website && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">Website</Typography>
                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <WebsiteIcon fontSize="small" />
                    <a href={tole.Website} target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.primary.main }}>
                      {tole.Website}
                    </a>
                  </Typography>
                </Grid>
              )}
              {tole.Fb && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">Facebook</Typography>
                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FacebookIcon fontSize="small" />
                    <a href={tole.Fb} target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.primary.main }}>
                      {tole.Fb}
                    </a>
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* About Section */}
          {tole.About && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="600" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <InfoIcon color="primary" />
                About
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                {tole.About}
              </Typography>
            </Grid>
          )}

          {/* Expiry Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Expiry Date</Typography>
                <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarIcon fontSize="small" />
                  {new Date(tole.ExpiryDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="caption" color={new Date(tole.ExpiryDate) < new Date() ? "error" : "success"}>
                {new Date(tole.ExpiryDate) < new Date() ? "Expired" : "Active"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ViewToleDialog;