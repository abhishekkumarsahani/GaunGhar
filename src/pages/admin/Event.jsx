import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Switch,
  Grid,
  Alert,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import AdminLayout from "../../components/admin/AdminLayout";
import { eventApi } from "../../api/eventApi";

const Event = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"))?.loginLst?.[0];

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");

  const emptyForm = {
    EventID: "",
    Title: "",
    Slug: "",
    EventType: "M",
    Description: "",
    DateFrom: "",
    DateTo: "",
    FromTime: "",  // API expects FromTime (not TimeFrom)
    ToTime: "",    // API expects ToTime (not TimeTo)
    Venue: "",
    OrganisedBy: "",
    Contact: "",
    Email: "",
    EveLink: "",
    Banner: "",
    IsActive: "A",
    NotifyUser: "Y",
  };

  const [form, setForm] = useState(emptyForm);

  // ================= LOAD EVENTS =================
  const loadEvents = async () => {
    try {
      const res = await eventApi({
        ToleID: user?.ToleID,
        UserID: user?.UserID,
        Flag: "S",
        EventType: "-1",
        IsActive: "-1",
      });

      if (res.StatusCode === 200) {
        setRows(res.eventlst || res.EventLst || []);
      }
    } catch (error) {
      console.error("Error loading events:", error);
      setError("Failed to load events");
    }
  };

  useEffect(() => {
    if (user?.ToleID && user?.UserID) {
      loadEvents();
    }
  }, [user]);

  // ================= IMAGE TO BASE64 =================
  const handleBanner = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.includes(",")
        ? reader.result.split(",")[1]
        : reader.result;

      setForm({
        ...form,
        Banner: base64,
      });
    };

    reader.onerror = () => {
      setError("Failed to read image file");
    };

    reader.readAsDataURL(file);
  };

  // ================= VALIDATE FORM =================
  const validateForm = () => {
    if (!form.Title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!form.DateFrom) {
      setError("From Date is required");
      return false;
    }
    if (!form.DateTo) {
      setError("To Date is required");
      return false;
    }
    if (!form.Venue.trim()) {
      setError("Venue is required");
      return false;
    }
    return true;
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      // Clear previous errors
      setError("");

      // Validate form
      if (!validateForm()) {
        return;
      }

      if (!user?.ToleID || !user?.UserID) {
        setError("User information not found");
        return;
      }

      // Prepare payload according to API format
      const payload = {
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: editData ? "u" : "i",
        ...form,
      };

      // If updating, include EventID
      if (editData) {
        payload.EventID = editData.EventID;
      }

      console.log("Sending payload:", payload);

      const res = await eventApi(payload);

      if (res.StatusCode !== 200) {
        setError(res.Message || "Failed to save event");
        return;
      }

      setOpen(false);
      setEditData(null);
      setForm(emptyForm);
      loadEvents();
      
      // Show success message
      alert(editData ? "Event updated successfully!" : "Event created successfully!");
    } catch (error) {
      console.error("Error saving event:", error);
      setError("An error occurred while saving");
    }
  };

  // ================= ACTIVATE / DEACTIVATE =================
  const toggleActive = async (row) => {
    try {
      const newStatus = row.IsActive === "A" ? "I" : "A";
      
      await eventApi({
        ToleID: user?.ToleID,
        UserID: user?.UserID,
        Flag: "ai",
        EventID: row.EventID,
        IsActive: newStatus,
      });
      
      // Update local state immediately for better UX
      setRows(prevRows => 
        prevRows.map(item => 
          item.EventID === row.EventID 
            ? { ...item, IsActive: newStatus }
            : item
        )
      );
      
      alert(`Event ${newStatus === "A" ? "activated" : "deactivated"} successfully!`);
    } catch (error) {
      console.error("Error toggling active status:", error);
      alert("Failed to update status");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await eventApi({
        ToleID: user?.ToleID,
        UserID: user?.UserID,
        Flag: "R",
        EventID: id,
      });
      
      loadEvents();
      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };

  // ================= OPEN EDIT MODAL =================
  const handleEdit = (row) => {
    setEditData(row);
    setForm({
      EventID: row.EventID || "",
      Title: row.Title || "",
      Slug: row.Slug || "",
      EventType: row.EventType || "M",
      Description: row.Description || "",
      DateFrom: row.DateFrom || "",
      DateTo: row.DateTo || "",
      FromTime: row.FromTime || row.TimeFrom || "", // Handle both field names
      ToTime: row.ToTime || row.TimeTo || "",       // Handle both field names
      Venue: row.Venue || "",
      OrganisedBy: row.OrganisedBy || "",
      Contact: row.Contact || "",
      Email: row.Email || "",
      EveLink: row.EveLink || "",
      Banner: row.Banner || "",
      IsActive: row.IsActive || "A",
      NotifyUser: row.NotifyUser || "Y",
    });
    setOpen(true);
    setError("");
  };

  // ================= FORMAT TIME DISPLAY =================
  const formatTimeDisplay = (time) => {
    if (!time) return "";
    
    // If time is already in AM/PM format, return as is
    if (time.includes("AM") || time.includes("PM")) {
      return time;
    }
    
    // If time is in 24-hour format, convert to 12-hour format
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    
    return `${hour12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  return (
    <AdminLayout>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Event Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditData(null);
            setForm(emptyForm);
            setOpen(true);
            setError("");
          }}
        >
          Add Event
        </Button>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Time</strong></TableCell>
              <TableCell><strong>Venue</strong></TableCell>
              <TableCell><strong>Views</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="textSecondary">
                    No events found. Click "Add Event" to create one.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow 
                  key={row.EventID}
                  hover
                  sx={{ 
                    '&:hover': { backgroundColor: 'action.hover' },
                    opacity: row.IsActive === "I" ? 0.6 : 1
                  }}
                >
                  <TableCell>{row.EventID}</TableCell>

                  <TableCell>
                    <Typography fontWeight={600}>{row.Title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {row.Slug}
                    </Typography>
                  </TableCell>

                  <TableCell>{row.EventType}</TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {row.DateFrom} {row.DateFrom !== row.DateTo && `→ ${row.DateTo}`}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {formatTimeDisplay(row.FromTime || row.TimeFrom)} → {formatTimeDisplay(row.ToTime || row.TimeTo)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" noWrap>
                      {row.Venue}
                    </Typography>
                  </TableCell>

                  <TableCell>{row.NoOfView || 0}</TableCell>

                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Switch
                        checked={row.IsActive === "A"}
                        onChange={() => toggleActive(row)}
                        color="success"
                      />
                      <Typography variant="caption" ml={1}>
                        {row.IsActive === "A" ? "Active" : "Inactive"}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton 
                      onClick={() => handleEdit(row)}
                      color="primary"
                      size="small"
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(row.EventID)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* ================= MODAL ================= */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setError("");
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', pb: 2 }}>
          {editData ? "Update Event" : "Create New Event"}
        </DialogTitle>

        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Title *"
                fullWidth
                value={form.Title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    Title: e.target.value,
                    Slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
                  })
                }
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Slug *"
                fullWidth
                value={form.Slug}
                onChange={(e) => setForm({ ...form, Slug: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Event Type"
                select
                fullWidth
                value={form.EventType}
                onChange={(e) => setForm({ ...form, EventType: e.target.value })}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="M">M</option>
                <option value="E">E</option>
                <option value="O">O</option>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Organized By"
                fullWidth
                value={form.OrganisedBy}
                onChange={(e) => setForm({ ...form, OrganisedBy: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="From Date *"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={form.DateFrom}
                onChange={(e) => setForm({ ...form, DateFrom: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="To Date *"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={form.DateTo}
                onChange={(e) => setForm({ ...form, DateTo: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="From Time (e.g., 01:00 AM)"
                fullWidth
                value={form.FromTime}
                onChange={(e) => setForm({ ...form, FromTime: e.target.value })}
                placeholder="01:00 AM"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="To Time (e.g., 02:00 PM)"
                fullWidth
                value={form.ToTime}
                onChange={(e) => setForm({ ...form, ToTime: e.target.value })}
                placeholder="02:00 PM"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Venue *"
                fullWidth
                value={form.Venue}
                onChange={(e) => setForm({ ...form, Venue: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Contact"
                fullWidth
                value={form.Contact}
                onChange={(e) => setForm({ ...form, Contact: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={form.Email}
                onChange={(e) => setForm({ ...form, Email: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Event Link"
                fullWidth
                value={form.EveLink}
                onChange={(e) => setForm({ ...form, EveLink: e.target.value })}
                placeholder="https://example.com"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description *"
                multiline
                rows={4}
                fullWidth
                value={form.Description}
                onChange={(e) =>
                  setForm({ ...form, Description: e.target.value })
                }
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ border: '1px dashed', borderColor: 'primary.main', p: 2, borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Banner Image
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<Add />}
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleBanner}
                  />
                </Button>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                  Maximum file size: 2MB. Supported formats: JPG, PNG, GIF
                </Typography>
                {form.Banner && (
                  <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 1 }}>
                    ✓ Image uploaded successfully
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center">
                <Switch
                  checked={form.IsActive === "A"}
                  onChange={(e) => setForm({ ...form, IsActive: e.target.checked ? "A" : "I" })}
                  color="success"
                />
                <Typography>Active</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center">
                <Switch
                  checked={form.NotifyUser === "Y"}
                  onChange={(e) => setForm({ ...form, NotifyUser: e.target.checked ? "Y" : "N" })}
                  color="primary"
                />
                <Typography>Notify Users</Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ borderTop: 1, borderColor: 'divider', p: 2 }}>
          <Button 
            onClick={() => {
              setOpen(false);
              setError("");
            }}
            color="inherit"
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSave}
            disabled={!form.Title || !form.DateFrom || !form.DateTo || !form.Venue || !form.Description}
          >
            {editData ? "Update Event" : "Create Event"}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default Event;