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
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Alert,
  Grid,
  Tooltip,
} from "@mui/material";
import { Add, Delete, Edit, Refresh } from "@mui/icons-material";

import AdminLayout from "../../components/admin/AdminLayout";
import { incExpApi } from "../../api/incExpApi"; // Your API function

const IncomeExpense = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"))?.loginLst?.[0];

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [form, setForm] = useState({
    AccNo: "",
    AccType: "I",
    EngDate: new Date().toISOString().split("T")[0],
    NepDate: "",
    Particulars: "",
    Debit: "",
    Credit: "",
  });

  // ================= LOAD LIST =================
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await incExpApi({
        ToleID: user?.ToleID || "ES25",
        UserID: user?.UserID || 1,
        Flag: "S",
        AccType: "-1", // Show all types
      });
      if (res.StatusCode === 200) setRows(res.IncExpLst || []);
      else setError(res.Message || "Failed to load data");
    } catch (err) {
      setError("Error loading data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ================= OPEN MODAL =================
  const handleOpen = (row = null) => {
    if (row) {
      setEditData(row);
      setForm({
        AccNo: row.AccNo,
        AccType: row.AccType === "Income" ? "I" : "E",
        EngDate: row.EngDate,
        NepDate: row.NepDate,
        Particulars: row.Particulars,
        Debit: row.Debit || "",
        Credit: row.Credit || "",
      });
    } else {
      setEditData(null);
      setForm({
        AccNo: "",
        AccType: "I",
        EngDate: new Date().toISOString().split("T")[0],
        NepDate: "",
        Particulars: "",
        Debit: "",
        Credit: "",
      });
    }
    setOpen(true);
    setError("");
  };

  // ================= SAVE =================
  const handleSave = async () => {
    if (!form.AccNo || !form.AccType || !form.Particulars) {
      setError("Account number, type, and particulars are required");
      return;
    }

    const payload = {
      ToleID: user?.ToleID || "ES25",
      UserID: user?.UserID || 1,
      Flag: editData ? "U" : "i",
      AccNo: form.AccNo,
      AccType: form.AccType,
      EngDate: form.EngDate,
      NepDate: form.NepDate,
      Particulars: form.Particulars,
      Debit: form.Debit || "0",
      Credit: form.Credit || "0",
    };

    if (editData) payload.AccID = editData.AccID;

    try {
      setLoading(true);
      const res = await incExpApi(payload);
      if (res.StatusCode === 200) {
        setOpen(false);
        setEditData(null);
        loadData();
      } else setError(res.Message || "Operation failed");
    } catch (err) {
      setError("Error saving data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (row) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const res = await incExpApi({
        ToleID: user?.ToleID || "ES25",
        UserID: user?.UserID || 1,
        Flag: "R",
        AccID: row.AccID,
      });

      if (res.StatusCode === 200) loadData();
      else setError(res.Message || "Failed to delete");
    } catch (err) {
      setError("Error deleting record: " + err.message);
    }
  };

  return (
    <AdminLayout>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Income/Expense Management</Typography>
        <Box display="flex" gap={1}>
          <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
            Add Record
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Acc No</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Eng Date</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Nep Date</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Particulars</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Debit</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Credit</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">Loading...</TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">No records found</TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.AccID}>
                  <TableCell>{row.AccID}</TableCell>
                  <TableCell>{row.AccNo}</TableCell>
                  <TableCell>{row.AccType}</TableCell>
                  <TableCell>{row.EngDate}</TableCell>
                  <TableCell>{row.NepDate}</TableCell>
                  <TableCell>{row.Particulars}</TableCell>
                  <TableCell>{row.Debit || 0}</TableCell>
                  <TableCell>{row.Credit || 0}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleOpen(row)}>
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

      {/* ================= MODAL ================= */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editData ? "Update Record" : "Add Record"}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Account Number"
                fullWidth
                value={form.AccNo}
                onChange={(e) => setForm({ ...form, AccNo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={form.AccType}
                  label="Type"
                  onChange={(e) => setForm({ ...form, AccType: e.target.value })}
                >
                  <MenuItem value="I">Income</MenuItem>
                  <MenuItem value="E">Expense</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Eng Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.EngDate}
                onChange={(e) => setForm({ ...form, EngDate: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Nep Date"
                fullWidth
                value={form.NepDate}
                onChange={(e) => setForm({ ...form, NepDate: e.target.value })}
                placeholder="YYYY/MM/DD"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Particulars"
                fullWidth
                value={form.Particulars}
                onChange={(e) => setForm({ ...form, Particulars: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Debit"
                type="number"
                fullWidth
                value={form.Debit}
                onChange={(e) => setForm({ ...form, Debit: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Credit"
                type="number"
                fullWidth
                value={form.Credit}
                onChange={(e) => setForm({ ...form, Credit: e.target.value })}
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

export default IncomeExpense;
