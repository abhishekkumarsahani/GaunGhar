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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Switch,
  Alert,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import AdminLayout from "../../components/admin/AdminLayout";
import { complainTopicApi } from "../../api/complainTopicApi";

const ComplainTopic = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"))?.loginLst?.[0];
  
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");
  const [topic, setTopic] = useState("");

  // ================= LOAD TOPICS =================
  const loadTopics = async () => {
    try {
      const res = await complainTopicApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "S"
      });

      if (res.StatusCode === 200) {
        // The API returns ComplainTopicLst, not TopicLst
        setRows(res.ComplainTopicLst || []);
      } else {
        setError(res.Message || "Failed to load topics");
      }
    } catch (err) {
      setError("Error loading topics");
      console.error(err);
    }
  };

  useEffect(() => {
    loadTopics();
  }, []);

  // ================= SAVE (Create/Update) =================
  const handleSave = async () => {
    if (!topic.trim()) {
      setError("Topic is required");
      return;
    }

    try {
      // Prepare payload based on whether we're editing or creating
      let payload = {
        ToleID: user.ToleID,
        UserID: user.UserID,
        Topic: topic,
      };

      if (editData) {
        // Update existing topic
        payload = {
          ...payload,
          Flag: "U",
          TopicID: editData.TopicID || editData.topicid,
        };
      } else {
        // Create new topic
        payload = {
          ...payload,
          Flag: "i",
          IsActive: "A"
        };
      }

      const res = await complainTopicApi(payload);

      if (res.StatusCode !== 200) {
        setError(res.Message || "Operation failed");
        return;
      }

      // Success - reset and refresh
      setOpen(false);
      setEditData(null);
      setTopic("");
      setError("");
      loadTopics();
    } catch (err) {
      setError("Error saving topic");
      console.error(err);
    }
  };

  // ================= ACTIVATE / DEACTIVATE =================
  const toggleActive = async (row) => {
    try {
      const newStatus = row.IsActive === "A" ? "I" : "A";
      const topicId = row.TopicID || row.topicid;
      
      const res = await complainTopicApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "ai",
        TopicID: topicId,
        IsActive: newStatus
      });

      if (res.StatusCode === 200) {
        loadTopics();
      }
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complain topic?")) return;

    try {
      const res = await complainTopicApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "R",
        TopicID: id
      });

      if (res.StatusCode === 200) {
        loadTopics();
      }
    } catch (err) {
      console.error("Error deleting topic:", err);
    }
  };

  // Open modal for create/edit
  const handleOpenModal = (row = null) => {
    setEditData(row);
    setTopic(row ? (row.Topic || row.topic) : "");
    setError("");
    setOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setOpen(false);
    setEditData(null);
    setTopic("");
    setError("");
  };

  return (
    <AdminLayout>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Complain Topic Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenModal()}
        >
          Add Topic
        </Button>
      </Box>

      {error && !open && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Paper sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell>ID</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell>No. of Complaints</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.TopicID || row.topicid}>
                <TableCell>{row.TopicID || row.topicid}</TableCell>
                <TableCell>{row.Topic || row.topic}</TableCell>
                <TableCell>{row.NoOfComplain || 0}</TableCell>
                <TableCell>
                  <Switch
                    checked={(row.IsActive || row.isactive) === "A"}
                    onChange={() => toggleActive(row)}
                  />
                  <span style={{ marginLeft: 8 }}>
                    {(row.IsActive || row.isactive) === "A" ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenModal(row)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row.TopicID || row.topicid)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Topics Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* ================= MODAL ================= */}
      <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>
          {editData ? "Update Complain Topic" : "Create Complain Topic"}
        </DialogTitle>

        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="Topic"
            fullWidth
            sx={{ mt: 2 }}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            error={!!error && !topic}
            helperText={error && !topic ? "Topic is required" : ""}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editData ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default ComplainTopic;