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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import AdminLayout from "../../components/admin/AdminLayout";
import { ledgerApi } from "../../api/ledgerApi";

const Ledger = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"))?.loginLst?.[0];

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasFetched = useRef(false);

  const [form, setForm] = useState({
    AccNo: "",
    AccName: "",
    MemID: "",
    AccType: "",
  });

  const accountTypes = [
    { value: "Loan", label: "Loan" },
    { value: "Deposit", label: "Deposit" },
    { value: "Expense", label: "Expense" },
    { value: "Income", label: "Income" },
  ];

  /* ================= FETCH ================= */
  const fetchLedger = async () => {
    setLoading(true);
    try {
      const res = await ledgerApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "S",
        MemID: -1,
        AccType: "-1",
      });
      setRows(res?.AccountLedLst || []);
    } catch {
      setError("Failed to load ledger data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.ToleID) return;
    if (hasFetched.current) return;

    hasFetched.current = true;
    fetchLedger();
  }, [user]);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleOpen = (row = null) => {
    if (row) {
      setEditData(row);
      setForm({
        AccNo: row.AccNo,
        AccName: row.AccName,
        MemID: row.MemID,
        AccType: row.AccType,
      });
    } else {
      setEditData(null);
      setForm({
        AccNo: "",
        AccName: "",
        MemID: "",
        AccType: "",
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!form.AccNo || !form.AccName) {
      setError("Account No and Account Name are required");
      return;
    }

    try {
      if (editData) {
        await ledgerApi({
          ToleID: user.ToleID,
          UserID: user.UserID,
          Flag: "U",
          AccID: editData.AccID,
          AccNo: form.AccNo,
          AccName: form.AccName,
        });
      } else {
        await ledgerApi({
          ToleID: user.ToleID,
          UserID: user.UserID,
          Flag: "i",
          AccNo: form.AccNo,
          AccName: form.AccName,
          MemID: form.MemID,
          AccType: form.AccType,
        });
      }
      handleClose();
      fetchLedger();
    } catch {
      setError("Failed to save ledger");
    }
  };

  /* ================= STATUS ================= */
  const toggleStatus = async (row) => {
    await ledgerApi({
      ToleID: user.ToleID,
      UserID: user.UserID,
      Flag: "AD",
      AccID: row.AccID,
    });
    fetchLedger();
  };

  return (
    <AdminLayout>
      {/* ===== HEADER ===== */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Ledger Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
          Add Ledger
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
                    "Account No",
                    "Account Name",
                    "Member ID",
                    "Account Type",
                    "Status",
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
                    <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                      No ledger records found
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((row) => (
                    <TableRow
                      key={row.AccID}
                      sx={{ "&:hover": { bgcolor: "#f5f7ff" } }}
                    >
                      <TableCell>{row.AccNo}</TableCell>
                      <TableCell>{row.AccName}</TableCell>
                      <TableCell>{row.MemID || "-"}</TableCell>
                      <TableCell>
                        <Chip label={row.AccType} size="small" />
                      </TableCell>

                      {/* STATUS */}
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Switch
                            checked={row.IsActive === "A"}
                            onChange={() => toggleStatus(row)}
                            size="small"
                          />
                          <Chip
                            label={row.IsActive === "A" ? "Active" : "Inactive"}
                            color={row.IsActive === "A" ? "success" : "default"}
                            size="small"
                          />
                        </Stack>
                      </TableCell>

                      {/* ACTIONS */}
                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => handleOpen(row)}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
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
          {editData ? "Update Ledger" : "Add Ledger"}
        </DialogTitle>

        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}

          <Stack spacing={2} mt={2}>
            <TextField
              label="Account No"
              name="AccNo"
              value={form.AccNo}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Account Name"
              name="AccName"
              value={form.AccName}
              onChange={handleChange}
              fullWidth
            />

            {!editData && (
              <>
                <TextField
                  label="Member ID"
                  name="MemID"
                  value={form.MemID}
                  onChange={handleChange}
                  fullWidth
                />

                <FormControl fullWidth>
                  <InputLabel>Account Type</InputLabel>
                  <Select
                    name="AccType"
                    value={form.AccType}
                    onChange={handleChange}
                    label="Account Type"
                  >
                    {accountTypes.map((t) => (
                      <MenuItem key={t.value} value={t.value}>
                        {t.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
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

export default Ledger;
