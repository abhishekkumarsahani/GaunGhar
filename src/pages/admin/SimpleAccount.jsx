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
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import AdminLayout from "../../components/admin/AdminLayout";
import { simpleAccountApi } from "../../api/simpleAccountApi";

const SimpleAccount = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"))?.loginLst?.[0];

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasFetched = useRef(false);

  const [form, setForm] = useState({
    LedgerID: "",
    AccNo: "",
    AccType: "D",
    EngDate: "",
    NepDate: "",
    Particulars: "",
    Debit: "",
    Credit: "",
  });

  const accountTypes = [
    { value: "D", label: "Default" },
    { value: "L", label: "Loan" },
    { value: "DP", label: "Deposit" },
    { value: "E", label: "Expense" },
    { value: "I", label: "Income" },
  ];

  /* ================= FETCH ================= */
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await simpleAccountApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "S",
        LedgerID: -1,
        MemID: -1,
      });
      setRows(res?.AccountLst || []);
    } catch {
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.ToleID) return;
    if (hasFetched.current) return;

    hasFetched.current = true;
    fetchAccounts();
  }, [user]);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleOpen = () => {
    setForm({
      LedgerID: "",
      AccNo: "",
      AccType: "D",
      EngDate: "",
      NepDate: "",
      Particulars: "",
      Debit: "",
      Credit: "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!form.LedgerID || !form.AccNo || !form.EngDate || !form.Particulars) {
      setError("Please fill all required fields");
      return;
    }

    try {
      await simpleAccountApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "i",
        MemID: user.UserID,
        LedgerID: Number(form.LedgerID),
        AccNo: Number(form.AccNo),
        AccType: form.AccType,
        EngDate: form.EngDate,
        NepDate: form.NepDate,
        Particulars: form.Particulars,
        Debit: form.Debit || "0",
        Credit: form.Credit || "0",
      });
      handleClose();
      fetchAccounts();
    } catch {
      setError("Failed to save transaction");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;

    await simpleAccountApi({
      ToleID: user.ToleID,
      UserID: user.UserID,
      Flag: "R",
      AccID: id,
    });
    fetchAccounts();
  };

  return (
    <AdminLayout>
      {/* ===== HEADER ===== */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Simple Account</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
          Add Transaction
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
                    "Member Name",
                    "Date",
                    "Particulars",
                    "Type",
                    "Debit",
                    "Credit",
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
                    <TableCell colSpan={8} align="center" sx={{ py: 5 }}>
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((row) => (
                    <TableRow
                      key={row.AccID}
                      sx={{ "&:hover": { bgcolor: "#f5f7ff" } }}
                    >
                      <TableCell sx={{ fontWeight: 600 }}>
                        {row.AccNo}
                      </TableCell>

                      <TableCell>{row.FullName}</TableCell>

                      <TableCell>
                        <Typography variant="body2">{row.EngDate}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {row.NepDate}
                        </Typography>
                      </TableCell>

                      <TableCell>{row.Particulars}</TableCell>

                      <TableCell>
                        <Chip
                          label={row.AccType}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>

                      <TableCell sx={{ color: "error.main", fontWeight: 600 }}>
                        ₹{Number(row.Debit || 0).toFixed(2)}
                      </TableCell>

                      <TableCell
                        sx={{ color: "success.main", fontWeight: 600 }}
                      >
                        ₹{Number(row.Credit || 0).toFixed(2)}
                      </TableCell>

                      <TableCell align="right">
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(row.AccID)}
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
          </TableContainer>
        )}
      </Paper>

      {/* ===== DIALOG ===== */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Transaction</DialogTitle>

        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}

          <Stack spacing={2} mt={2}>
            <TextField
              label="Ledger ID"
              name="LedgerID"
              value={form.LedgerID}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Account No"
              name="AccNo"
              value={form.AccNo}
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

            <TextField
              type="date"
              label="English Date"
              name="EngDate"
              value={form.EngDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Nepali Date"
              name="NepDate"
              value={form.NepDate}
              onChange={handleChange}
            />

            <TextField
              label="Particulars"
              name="Particulars"
              value={form.Particulars}
              onChange={handleChange}
              multiline
              rows={2}
            />

            <TextField
              label="Debit"
              name="Debit"
              value={form.Debit}
              onChange={handleChange}
            />

            <TextField
              label="Credit"
              name="Credit"
              value={form.Credit}
              onChange={handleChange}
            />
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

export default SimpleAccount;
