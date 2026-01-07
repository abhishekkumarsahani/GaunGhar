import { useEffect, useState, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  Stack,
  Tooltip,
  Switch,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import AdminLayout from "../../components/admin/AdminLayout";
import { manageYearApi } from "../../api/manageYearApi";

const ManagementYear = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"))?.loginLst?.[0];

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasFetched = useRef(false);

  const [form, setForm] = useState({
    Name: "",
    DateFrom: "",
    DateTo: "",
    IsCurrent: "N",
  });

  /* ================= FETCH ================= */
  const fetchYears = async () => {
    setLoading(true);
    try {
      const res = await manageYearApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "S",
      });

      setRows(res?.ManagementYearLst || []);
    } catch {
      setError("Failed to load management years");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.ToleID) return;
    if (hasFetched.current) return;

    hasFetched.current = true;
    fetchYears();
  }, [user]);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleOpen = (row = null) => {
    if (row) {
      setEditData(row);
      setForm({
        Name: row.Name,
        DateFrom: row.DateFrom?.substring(0, 10),
        DateTo: row.DateTo?.substring(0, 10),
        IsCurrent: row.IsCurrent,
      });
    } else {
      setEditData(null);
      setForm({
        Name: "",
        DateFrom: "",
        DateTo: "",
        IsCurrent: "N",
      });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!form.Name || !form.DateFrom || !form.DateTo) {
      setError("All fields are required");
      return;
    }

    try {
      if (editData) {
        await manageYearApi({
          ToleID: user.ToleID,
          UserID: user.UserID,
          Flag: "U",
          ManagementYearID: editData.ManagementYearID,
          Name: form.Name,
          DateFrom: form.DateFrom,
          DateTo: form.DateTo,
        });
      } else {
        await manageYearApi({
          ToleID: user.ToleID,
          UserID: user.UserID,
          Flag: "I",
          Name: form.Name,
          DateFrom: form.DateFrom,
          DateTo: form.DateTo,
          IsCurrent: form.IsCurrent,
        });
      }
      handleClose();
      fetchYears();
    } catch {
      setError("Failed to save management year");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (row) => {
    if (row.IsCurrent === "Y") {
      alert("You cannot delete the current management year");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this year?")) return;

    try {
      await manageYearApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "R",
        ManagementYearID: row.ManagementYearID,
      });
      fetchYears();
    } catch {
      setError("Failed to remove management year");
    }
  };

  return (
    <AdminLayout>
      {/* ===== HEADER ===== */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Management Year</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Add Year
        </Button>
      </Box>

      <Paper sx={{ overflow: "hidden" }}>
        {loading ? (
          <Box py={6} textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  {[
                    "ID",
                    "Name",
                    "From Date",
                    "To Date",
                    "Current",
                    "Created Date",
                    "Actions",
                  ].map((h) => (
                    <TableCell
                      key={h}
                      sx={{ color: "#fff", fontWeight: 600 }}
                      align={h === "Actions" ? "right" : "left"}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                      No management years found
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((row) => (
                    <TableRow
                      key={row.ManagementYearID}
                      sx={{ "&:hover": { bgcolor: "#f5f7ff" } }}
                    >
                      <TableCell>{row.ManagementYearID}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {row.Name}
                      </TableCell>
                      <TableCell>{row.DateFrom}</TableCell>
                      <TableCell>{row.DateTo}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.IsCurrent === "Y" ? "Current" : "Past"}
                          color={
                            row.IsCurrent === "Y" ? "success" : "default"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(row.CreatedDate).toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => handleOpen(row)}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(row)}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* ===== DIALOG ===== */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {editData ? "Update Management Year" : "Add Management Year"}
        </DialogTitle>

        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}

          <Stack spacing={2} mt={2}>
            <TextField
              label="Name"
              name="Name"
              value={form.Name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="From Date"
              type="date"
              name="DateFrom"
              value={form.DateFrom}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="To Date"
              type="date"
              name="DateTo"
              value={form.DateTo}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            {!editData && (
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography>Is Current?</Typography>
                <Switch
                  checked={form.IsCurrent === "Y"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      IsCurrent: e.target.checked ? "Y" : "N",
                    })
                  }
                />
              </Stack>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default ManagementYear;
