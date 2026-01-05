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
  MenuItem,
  Switch,
  IconButton,
  Grid,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
} from "@mui/material";
import { Add, Edit, Delete, Refresh } from "@mui/icons-material";

import AdminLayout from "../../components/admin/AdminLayout";
import { govIdentityApi } from "../../api/govIdentityApi";

const defaultForm = {
  MemID: "",
  IdentType: "C",
  IdentNo: "",
  IdentDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD
  IdentBy: "",
  IsActive: "A",
};

const GovernmentIdentity = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"))?.loginLst?.[0];

  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedIdentType, setSelectedIdentType] = useState("-1");
  const [editId, setEditId] = useState(null);

  // ================= LOAD LIST =================
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const res = await govIdentityApi({
        ToleID: user?.ToleID || "ES25",
        UserID: user?.UserID || 1,
        Flag: "S",
        MemID: -1,
        IdentType: selectedIdentType,
      });

      if (res.StatusCode === 200) {
        setRows(res.govLst || []); // Fixed: API returns "govLst" not "GovIdentLst"
      } else {
        setError(res.Message || "Failed to load data");
      }
    } catch (error) {
      setError("Error loading data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedIdentType]);

  // ================= SAVE =================
  const saveData = async () => {
    try {
      setError("");
      
      // Validation
      if (!form.MemID) {
        setError("Member ID is required");
        return;
      }
      
      if (!form.IdentNo) {
        setError("Identity Number is required");
        return;
      }
      
      if (!form.IdentDate) {
        setError("Identity Date is required");
        return;
      }
      
      if (!form.IdentBy) {
        setError("Issued By is required");
        return;
      }

      const payload = {
        ToleID: user?.ToleID || "ES25",
        UserID: user?.UserID || 1,
        Flag: isEdit ? "U" : "I",
        ...form,
      };

      // For update, add IdentID
      if (isEdit && editId) {
        payload.IdentID = editId;
      }

      const res = await govIdentityApi(payload);

      if (res.StatusCode !== 200) {
        setError(res.Message || "Operation failed");
        return;
      }

      setOpen(false);
      resetForm();
      loadData();
      alert(isEdit ? "Identity updated successfully" : "Identity created successfully");
    } catch (error) {
      setError("Error saving data: " + error.message);
    }
  };

  // ================= EDIT =================
  const editRow = (row) => {
    setForm({
      MemID: row.MemiID || row.MemID || "", // Note: API returns "MemiID" not "MemID"
      IdentType: row.IdenType || row.IdentType || "C", // Note: API returns "IdenType"
      IdentNo: row.IdentNo || "",
      IdentDate: row.IdentDate || new Date().toISOString().split('T')[0],
      IdentBy: row.IdentBy || "",
      IsActive: row.IsActive || "A",
    });
    setEditId(row.IdentID);
    setIsEdit(true);
    setOpen(true);
    setError("");
  };

  // ================= STATUS =================
  const toggleStatus = async (row) => {
    if (!window.confirm(`Are you sure you want to ${row.IsActive === "A" ? "deactivate" : "activate"} this identity?`)) return;

    try {
      const res = await govIdentityApi({
        ToleID: user?.ToleID || "ES25",
        UserID: user?.UserID || 1,
        Flag: "ai", // Note: API uses lowercase "ai"
        IdentID: row.IdentID,
        IsActive: row.IsActive === "A" ? "N" : "A",
      });

      if (res.StatusCode === 200) {
        loadData();
        alert(`Identity ${row.IsActive === "A" ? "deactivated" : "activated"} successfully`);
      } else {
        setError(res.Message || "Failed to update status");
      }
    } catch (error) {
      setError("Error updating status: " + error.message);
    }
  };

  // ================= DELETE =================
  const deleteRow = async (row) => {
    if (!window.confirm("Are you sure you want to delete this identity?")) return;

    try {
      const res = await govIdentityApi({
        ToleID: user?.ToleID || "ES25",
        UserID: user?.UserID || 1,
        Flag: "R",
        IdentID: row.IdentID,
      });

      if (res.StatusCode === 200) {
        loadData();
        alert("Identity deleted successfully");
      } else {
        setError(res.Message || "Failed to delete");
      }
    } catch (error) {
      setError("Error deleting: " + error.message);
    }
  };

  // ================= RESET FORM =================
  const resetForm = () => {
    setForm(defaultForm);
    setIsEdit(false);
    setEditId(null);
    setError("");
  };

  // ================= GET IDENTITY TYPE LABEL =================
  const getIdentTypeLabel = (type) => {
    switch (type) {
      case "C": return "Citizenship";
      case "P": return "Passport";
      case "L": return "License";
      default: return type;
    }
  };

  // ================= FORMAT DATE =================
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Government Identity Management</Typography>
        
        <Box display="flex" gap={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Type</InputLabel>
            <Select
              value={selectedIdentType}
              label="Filter by Type"
              onChange={(e) => setSelectedIdentType(e.target.value)}
            >
              <MenuItem value="-1">All Types</MenuItem>
              <MenuItem value="C">Citizenship</MenuItem>
              <MenuItem value="P">Passport</MenuItem>
              <MenuItem value="L">License</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={loadData}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </Button>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              resetForm();
              setOpen(true);
            }}
          >
            Add Identity
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>{error}</Alert>}

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Member ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Issued By</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  Loading identities...
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No identities found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.IdentID}>
                  <TableCell>{row.IdentID}</TableCell>
                  <TableCell>{row.MemiID || row.MemID || "N/A"}</TableCell>
                  <TableCell>
                    <Chip 
                      label={getIdentTypeLabel(row.IdenType || row.IdentType)} 
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title={row.IdentNo}>
                      <Box sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.IdentNo}
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{formatDate(row.IdentDate)}</TableCell>
                  <TableCell>{row.IdentBy || "N/A"}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.IsActive === "A" ? "Active" : "Inactive"}
                      color={row.IsActive === "A" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatDate(row.CreatedDate)}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => editRow(row)} size="small">
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title={row.IsActive === "A" ? "Deactivate" : "Activate"}>
                      <span>
                        <Switch
                          checked={row.IsActive === "A"}
                          onChange={() => toggleStatus(row)}
                          size="small"
                          color={row.IsActive === "A" ? "success" : "error"}
                        />
                      </span>
                    </Tooltip>
                    
                    <Tooltip title="Delete">
                      <IconButton 
                        onClick={() => deleteRow(row)} 
                        size="small" 
                        color="error"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* ================= FORM DIALOG ================= */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEdit ? "Update Identity" : "Add Identity"}
        </DialogTitle>

        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                label="Member ID"
                fullWidth
                required
                value={form.MemID}
                onChange={(e) => setForm({ ...form, MemID: e.target.value })}
                error={!form.MemID}
                helperText={!form.MemID ? "Member ID is required" : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="Identity Type"
                fullWidth
                required
                value={form.IdentType}
                onChange={(e) => setForm({ ...form, IdentType: e.target.value })}
              >
                <MenuItem value="C">Citizenship</MenuItem>
                <MenuItem value="P">Passport</MenuItem>
                <MenuItem value="L">License</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Identity Number"
                fullWidth
                required
                value={form.IdentNo}
                onChange={(e) => setForm({ ...form, IdentNo: e.target.value })}
                error={!form.IdentNo}
                helperText={!form.IdentNo ? "Identity Number is required" : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="date"
                label="Identity Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                value={form.IdentDate}
                onChange={(e) => setForm({ ...form, IdentDate: e.target.value })}
                error={!form.IdentDate}
                helperText={!form.IdentDate ? "Identity Date is required" : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Issued By"
                fullWidth
                required
                value={form.IdentBy}
                onChange={(e) => setForm({ ...form, IdentBy: e.target.value })}
                error={!form.IdentBy}
                helperText={!form.IdentBy ? "Issued By is required" : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="Status"
                fullWidth
                value={form.IsActive}
                onChange={(e) => setForm({ ...form, IsActive: e.target.value })}
              >
                <MenuItem value="A">Active</MenuItem>
                <MenuItem value="N">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
            setOpen(false);
            resetForm();
          }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={saveData}>
            {isEdit ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default GovernmentIdentity;