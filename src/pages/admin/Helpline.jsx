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
} from "@mui/material";

import {
  Edit,
  Delete,
  Add,
} from "@mui/icons-material";

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
  });

  // 🔹 Load helplines
const loadHelplines = async () => {
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
};

  useEffect(() => {
    loadHelplines();
  }, []);

  // 🔹 Open create modal
  const handleOpen = () => {
    setEditData(null);
    setForm({ ForHelp: "", ContactName: "", Contact: "" });
    setOpen(true);
  };

  // 🔹 Save (Create / Update)
  const handleSave = async () => {
    if (!form.ForHelp || !form.ContactName || !form.Contact) {
      setError("All fields are required");
      return;
    }

    const payload = {
      ToleID: user.ToleID,
      UserId: user.UserID,
      Flag: editData ? "U" : "I",
      IsActive: "A",
      ...form,
    };

    if (editData) payload.HelplineID = editData.HelplineID;

    const res = await helplineApi(payload);

    if (res.StatusCode !== 200) {
      setError(res.Message);
      return;
    }

    setOpen(false);
    loadHelplines();
  };

  // 🔹 Toggle Active
  const toggleStatus = async (row) => {
    await helplineApi({
      ToleID: user.ToleID,
      UserID: user.UserID,
      Flag: "AI",
      HelplineID: row.HelplineID,
    });

    loadHelplines();
  };

  // 🔹 Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this helpline?")) return;

    await helplineApi({
      ToleID: user.ToleID,
      UserID: user.UserID,
      Flag: "R",
      HelplineID: id,
    });

    loadHelplines();
  };

  return (
    <AdminLayout>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Helpline Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
          Add Helpline
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Help For</TableCell>
              <TableCell>Contact Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.HelplineID}>
                <TableCell>{row.ForHelp}</TableCell>
                <TableCell>{row.ContactName}</TableCell>
                <TableCell>{row.Contact}</TableCell>
                <TableCell>
                  <Switch
                    checked={row.IsActive === "A"}
                    onChange={() => toggleStatus(row)}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setEditData(row);
                      setForm(row);
                      setOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(row.HelplineID)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* ================= MODAL ================= */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{editData ? "Update Helpline" : "Add Helpline"}</DialogTitle>

        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}

          <Stack spacing={2} mt={2}>
            <TextField
              label="For Help"
              value={form.ForHelp}
              onChange={(e) => setForm({ ...form, ForHelp: e.target.value })}
            />
            <TextField
              label="Contact Name"
              value={form.ContactName}
              onChange={(e) => setForm({ ...form, ContactName: e.target.value })}
            />
            <TextField
              label="Contact"
              value={form.Contact}
              onChange={(e) => setForm({ ...form, Contact: e.target.value })}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default Helpline;
