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
  Switch,
  Stack,
  Alert,
  Chip,
  Tooltip,
} from "@mui/material";

import { Edit, Delete, Add } from "@mui/icons-material";
import AdminLayout from "../../components/admin/AdminLayout";
import { helplineApi } from "../../api/helplineApi";

const Helpline = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"))?.loginLst?.[0];

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    ForHelp: "",
    ContactName: "",
    Contact: "",
    IsActive: "A",
  });

  // ================= LOAD HELPLINES =================
  const loadHelplines = async () => {
    try {
      const res = await helplineApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "s",
        IsActive: "A",
      });

      if (res.StatusCode === 200) {
        const normalized = (res.HelpLineLst || []).map((item) => ({
          HelplineID: item.helplineid,
          ForHelp: item.forhelp,
          ContactName: item.contactname,
          Contact: item.contact,
          IsActive: item.isactive,
        }));

        setRows(normalized);
      }
    } catch (err) {
      setError("Failed to load helplines");
      console.error(err);
    }
  };

  useEffect(() => {
    loadHelplines();
  }, []);

  // ================= OPEN MODAL =================
  const handleOpen = () => {
    setEditData(null);
    setForm({ ForHelp: "", ContactName: "", Contact: "", IsActive: "A" });
    setOpen(true);
    setError("");
  };

  // ================= SAVE (CREATE / UPDATE) =================
  const handleSave = async () => {
    if (!form.ForHelp || !form.ContactName || !form.Contact) {
      setError("All fields are required");
      return;
    }

    const payload = {
      ToleID: user.ToleID,
      UserID: user.UserID,
      Flag: editData ? "U" : "I",
      IsActive: form.IsActive,
      ...form,
    };

    if (editData) payload.HelplineID = editData.HelplineID;

    try {
      const res = await helplineApi(payload);

      if (res.StatusCode !== 200) {
        setError(res.Message || "Operation failed");
        return;
      }

      setOpen(false);
      loadHelplines();
    } catch (err) {
      setError("Failed to save helpline");
      console.error(err);
    }
  };

  // ================= TOGGLE STATUS =================
  const toggleStatus = async (row) => {
    try {
      await helplineApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "AI",
        HelplineID: row.HelplineID,
      });
      loadHelplines();
    } catch (err) {
      setError("Failed to update status");
      console.error(err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this helpline?")) return;

    try {
      await helplineApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "R",
        HelplineID: id,
      });
      loadHelplines();
    } catch (err) {
      setError("Failed to delete helpline");
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      {/* ===== HEADER ===== */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Helpline Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
          Add Helpline
        </Button>
      </Box>

      {/* ===== ERROR ALERT ===== */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* ===== HELPLINE TABLE ===== */}
      <Paper sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Help For</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Contact Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Contact</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No helplines found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.HelplineID}>
                  <TableCell>{row.ForHelp}</TableCell>
                  <TableCell>{row.ContactName}</TableCell>
                  <TableCell>{row.Contact}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Switch
                        checked={row.IsActive === "A"}
                        onChange={() => toggleStatus(row)}
                      />
                      <Chip
                        label={row.IsActive === "A" ? "Active" : "Inactive"}
                        color={row.IsActive === "A" ? "success" : "error"}
                        size="small"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => {
                          setEditData(row);
                          setForm(row);
                          setOpen(true);
                          setError("");
                        }}
                        size="small"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(row.HelplineID)}
                        size="small"
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

      {/* ===== MODAL ===== */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editData ? "Update Helpline" : "Add Helpline"}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Stack spacing={2} mt={2}>
            <TextField
              label="For Help *"
              fullWidth
              value={form.ForHelp}
              onChange={(e) => setForm({ ...form, ForHelp: e.target.value })}
            />
            <TextField
              label="Contact Name *"
              fullWidth
              value={form.ContactName}
              onChange={(e) => setForm({ ...form, ContactName: e.target.value })}
            />
            <TextField
              label="Contact *"
              fullWidth
              value={form.Contact}
              onChange={(e) => setForm({ ...form, Contact: e.target.value })}
            />
          </Stack>
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

export default Helpline;
