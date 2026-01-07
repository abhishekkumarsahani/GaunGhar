import { useEffect, useState } from "react";
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Add, Edit, Delete, Refresh } from "@mui/icons-material";

import AdminLayout from "../../components/admin/AdminLayout";
import { managementApi } from "../../api/managementApi"; // Your API function

const Management = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"))?.loginLst?.[0];

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({
    MemID: "",
    ManagementYearID: "",
    Title: "",
    Order: "",
  });

  // ================= LOAD MANAGEMENT LIST =================
  const loadManagement = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await managementApi({
        ToleID: user?.ToleID || "ES25",
        UserID: user?.UserID || 1,
        Flag: "S",
        ManagementYearID: form.ManagementYearID || 1,
      });

      if (res.StatusCode === 200) setRows(res.ManagementLst || []);
      else setError(res.Message || "Failed to load data");
    } catch (err) {
      setError("Error loading data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadManagement();
  }, []);

  // ================= OPEN MODAL =================
  const handleOpen = () => {
    setEditData(null);
    setForm({ MemID: "", ManagementYearID: "", Title: "", Order: "" });
    setOpen(true);
    setError("");
  };

  // ================= SAVE =================
  const handleSave = async () => {
    if (!form.MemID || !form.ManagementYearID || !form.Title || !form.Order) {
      setError("All fields are required");
      return;
    }

    const payload = {
      ToleID: user?.ToleID || "ES25",
      UserID: user?.UserID || 1,
      Flag: editData ? "U" : "I",
      ...form,
    };

    if (editData) payload.ManagementID = editData.ManagementID;

    try {
      setLoading(true);
      const res = await managementApi(payload);

      if (res.StatusCode === 200) {
        setOpen(false);
        setEditData(null);
        loadManagement();
      } else setError(res.Message || "Operation failed");
    } catch (err) {
      setError("Error saving data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (row) => {
    setEditData(row);
    setForm({
      MemID: row.UserID,
      ManagementYearID: row.ManagementYearID,
      Title: row.Title,
      Order: row.Order,
    });
    setOpen(true);
    setError("");
  };

  // ================= DELETE =================
  const handleDelete = async (row) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      const res = await managementApi({
        ToleID: user?.ToleID || "ES25",
        UserID: user?.UserID || 1,
        Flag: "R",
        ManagementID: row.ManagementID,
      });

      if (res.StatusCode === 200) loadManagement();
      else setError(res.Message || "Failed to delete");
    } catch (err) {
      setError("Error deleting: " + err.message);
    }
  };

  return (
    <AdminLayout>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Management Committee</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
          Add Member
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Member Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Title</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Year</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Order</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Management Year</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Created Date</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">Loading...</TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No members found</TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.ManagementID}>
                  <TableCell>{row.ManagementID}</TableCell>
                  <TableCell>{row.FullName}</TableCell>
                  <TableCell>{row.Title}</TableCell>
                  <TableCell>{row.ManagementYear}</TableCell>
                  <TableCell>{row.Order}</TableCell>
                  <TableCell>{row.ManagementYear}</TableCell>
                  <TableCell>{row.CreatedDate}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleEdit(row)}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => handleDelete(row)}>
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

      {/* ================= ADD / EDIT MODAL ================= */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editData ? "Update Member" : "Add Member"}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Member ID"
                fullWidth
                value={form.MemID}
                onChange={(e) => setForm({ ...form, MemID: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Management Year ID"
                fullWidth
                value={form.ManagementYearID}
                onChange={(e) => setForm({ ...form, ManagementYearID: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                value={form.Title}
                onChange={(e) => setForm({ ...form, Title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Order"
                type="number"
                fullWidth
                value={form.Order}
                onChange={(e) => setForm({ ...form, Order: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editData ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default Management;
