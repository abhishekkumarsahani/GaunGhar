import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Alert,
  useTheme,
  alpha
} from "@mui/material";
import { CalendarToday as CalendarIcon } from "@mui/icons-material";

const ExtendExpiryDialog = ({ open, onClose, onSubmit, tole }) => {
  const theme = useTheme();
  const [expiryDate, setExpiryDate] = useState("");
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (open && tole) {
      // Set default to 1 year from current date
      const defaultDate = new Date();
      defaultDate.setFullYear(defaultDate.getFullYear() + 1);
      setExpiryDate(defaultDate.toISOString().split('T')[0]);
    }
  }, [open, tole]);

  const handleSubmit = () => {
    if (!expiryDate) {
      setError("Please select an expiry date");
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      setError("Expiry date must be in the future");
      return;
    }

    onSubmit(expiryDate);
    setExpiryDate("");
    setError("");
  };

  const handleClose = () => {
    setExpiryDate("");
    setError("");
    onClose();
  };

  if (!tole) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
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
        alignItems: "center",
        gap: 2
      }}>
        <CalendarIcon color="primary" />
        <Typography variant="h6" fontWeight="600">
          Extend Expiry Date
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" gutterBottom>
            Extending expiry for: <strong>{tole.Name}</strong>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Current expiry: {new Date(tole.ExpiryDate).toLocaleDateString()}
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="New Expiry Date"
          type="date"
          value={expiryDate}
          onChange={(e) => {
            setExpiryDate(e.target.value);
            setError("");
          }}
          InputLabelProps={{ shrink: true }}
          error={!!error}
          helperText={error}
          sx={{ mt: 2 }}
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Alert severity="info" sx={{ mt: 3 }}>
          This action will extend the validity of the tole. Make sure to select an appropriate future date.
        </Alert>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            px: 4,
            fontWeight: 600
          }}
        >
          Extend Expiry
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExtendExpiryDialog;