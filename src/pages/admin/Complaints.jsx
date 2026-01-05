import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Grid,
  Alert,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from "@mui/material";

import { Visibility, CheckCircle, Cancel, Refresh } from "@mui/icons-material";
import AdminLayout from "../../components/admin/AdminLayout";
import { complainApi } from "../../api/complainApi";

const Complaints = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"))?.loginLst?.[0];

  const [rows, setRows] = useState([]);
  const [detail, setDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("-1");
  const [selectedDate, setSelectedDate] = useState("-1");
  const [notifyUser, setNotifyUser] = useState(true);
  const [loading, setLoading] = useState(false);

  // ================= LOAD COMPLAINTS =================
  const loadComplaints = async () => {
    try {
      setLoading(true);
      setError("");
      
      const res = await complainApi({
        ToleID: user?.ToleID || "ES25",
        UserID: user?.UserID || 1,
        Flag: "ST",
        Topic: selectedTopic,
        ComplainDate: selectedDate,
      });

      if (res.StatusCode === 200) {
        setRows(res.ComplainLst || []);
      } else {
        setError(res.Message || "Failed to load complaints");
      }
    } catch (error) {
      setError("Error loading complaints: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  // ================= VIEW DETAIL =================
  const viewDetail = async (id) => {
    try {
      setError("");
      const res = await complainApi({
        ToleID: user?.ToleID || "ES25",
        UserID: user?.UserID || 1,
        Flag: "SI",
        ComplainID: id,
      });

      if (res.StatusCode === 200) {
        setDetail(res.ComplainInfo || res.ComplainLst?.[0]);
        setRemarks(res.ComplainInfo?.ComplainRemarks || "");
        setOpen(true);
      } else {
        setError(res.Message || "Failed to load complaint details");
      }
    } catch (error) {
      setError("Error loading details: " + error.message);
    }
  };

  // ================= APPROVE / DISAPPROVE =================
  const updateStatus = async (status) => {
    try {
      setError("");
      
      if (!detail) {
        setError("No complaint selected");
        return;
      }

      const res = await complainApi({
        ToleID: user?.ToleID || "ES25",
        UserID: user?.UserID || 1,
        Flag: "AD",
        ComplainID: detail.ComplainID,
        ComplainStatus: status,
        ComplainRemarks: remarks,
        NotifyUser: notifyUser ? "Y" : "N",
      });

      if (res.StatusCode === 200) {
        alert(`Complaint ${status === "A" ? "approved" : "disapproved"} successfully`);
        setOpen(false);
        setRemarks("");
        loadComplaints();
      } else {
        setError(res.Message || "Failed to update status");
      }
    } catch (error) {
      setError("Error updating status: " + error.message);
    }
  };

  // ================= GET TOPICS FROM DATA =================
  const getTopics = () => {
    const topics = new Set();
    rows.forEach(row => {
      if (row.Topic) {
        topics.add(row.Topic);
      }
    });
    return Array.from(topics);
  };

  // ================= GET DATES FROM DATA =================
  const getDates = () => {
    const dates = new Set();
    rows.forEach(row => {
      if (row.CreatedDate) {
        dates.add(row.CreatedDate);
      }
    });
    return Array.from(dates).sort().reverse(); // Sort descending (newest first)
  };

  // ================= FORMAT DATE =================
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // ================= STATUS COLOR AND LABEL =================
  const getStatusInfo = (status) => {
    switch (status) {
      case "A":
        return { color: "success", label: "Approved" };
      case "R":
        return { color: "error", label: "Rejected" };
      case "P":
      default:
        return { color: "warning", label: "Pending" };
    }
  };

  return (
    <AdminLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Complaints Management</Typography>
        
        <Box display="flex" gap={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Topic</InputLabel>
            <Select
              value={selectedTopic}
              label="Filter by Topic"
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <MenuItem value="-1">All Topics</MenuItem>
              {getTopics().map((topic, index) => (
                <MenuItem key={index} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Date</InputLabel>
            <Select
              value={selectedDate}
              label="Filter by Date"
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <MenuItem value="-1">All Dates</MenuItem>
              {getDates().map((date, index) => (
                <MenuItem key={index} value={date}>
                  {formatDate(date)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={loadComplaints}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell>ID</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Loading complaints...
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No complaints found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => {
                const statusInfo = getStatusInfo(row.ComplainStatus);
                return (
                  <TableRow key={row.ComplainID}>
                    <TableCell>{row.ComplainID}</TableCell>
                    <TableCell>
                     {row.Topic}             
                    </TableCell>
                    <TableCell>{row.FullName}</TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {row.Description}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(row.CreatedDate)}</TableCell>
                    <TableCell>
                      <Chip
                        label={statusInfo.label}
                        color={statusInfo.color}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        onClick={() => viewDetail(row.ComplainID)}
                        title="View Details"
                      >
                        <Visibility />
                      </IconButton>
                      
                      {row.ComplainStatus === "A" ? (
                        <IconButton 
                          color="success"
                          title="Approved"
                          disabled
                        >
                          <CheckCircle />
                        </IconButton>
                      ) : (
                        <IconButton 
                          color="primary"
                          onClick={() => viewDetail(row.ComplainID)}
                          title="Take Action"
                        >
                          <CheckCircle />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* ================= DETAIL MODAL ================= */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Complaint Details
          {detail && (
            <Chip 
              label={getStatusInfo(detail.ComplainStatus).label}
              color={getStatusInfo(detail.ComplainStatus).color}
              size="small"
              sx={{ ml: 2 }}
            />
          )}
        </DialogTitle>

        <DialogContent>
          {detail ? (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Alert severity="info">
                  Complaint ID: <strong>{detail.ComplainID}</strong>
                </Alert>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Topic
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {detail.Topic}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  User
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {detail.FullName}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Created Date
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {formatDate(detail.CreatedDate)}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Status
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <Chip
                    label={getStatusInfo(detail.ComplainStatus).label}
                    color={getStatusInfo(detail.ComplainStatus).color}
                    size="small"
                  />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Description
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                  <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                    {detail.Description}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Remarks / Response"
                  multiline
                  rows={3}
                  fullWidth
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter your response or remarks here..."
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifyUser}
                      onChange={(e) => setNotifyUser(e.target.checked)}
                    />
                  }
                  label="Notify User about this update"
                />
                <Typography variant="caption" color="textSecondary" display="block">
                  User will receive a notification if enabled
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Typography>Loading details...</Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>
          
          {detail?.ComplainStatus !== "A" && (
            <Button 
              onClick={() => updateStatus("R")} 
              color="error"
              variant="outlined"
              startIcon={<Cancel />}
            >
              Disapprove
            </Button>
          )}
          
          {detail?.ComplainStatus !== "A" && (
            <Button 
              variant="contained" 
              onClick={() => updateStatus("A")}
              startIcon={<CheckCircle />}
            >
              Approve
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default Complaints;