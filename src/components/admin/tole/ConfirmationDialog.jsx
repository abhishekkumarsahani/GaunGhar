import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
  alpha
} from "@mui/material";
import {
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from "@mui/icons-material";

const ConfirmationDialog = ({ open, onClose, onConfirm, title, message }) => {
  const theme = useTheme();

  const getIcon = () => {
    if (title.toLowerCase().includes("delete") || title.toLowerCase().includes("remove")) {
      return <ErrorIcon color="error" sx={{ fontSize: 40 }} />;
    } else if (title.toLowerCase().includes("warning")) {
      return <WarningIcon color="warning" sx={{ fontSize: 40 }} />;
    }
    return <InfoIcon color="info" sx={{ fontSize: 40 }} />;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
          backdropFilter: "blur(20px)"
        }
      }}
    >
      <DialogContent sx={{ pt: 3, textAlign: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mb: 3 }}>
          {getIcon()}
          <Typography variant="h6" fontWeight="600">
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Button onClick={onClose} sx={{ px: 3 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          color={title.toLowerCase().includes("delete") ? "error" : "primary"}
          sx={{
            px: 4,
            fontWeight: 600,
            ...(title.toLowerCase().includes("delete") && {
              background: `linear-gradient(45deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`
            })
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;