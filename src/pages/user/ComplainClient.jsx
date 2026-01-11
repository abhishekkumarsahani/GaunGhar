import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, Dialog, DialogTitle, DialogContent, Chip, CircularProgress,
  Stack, Button, TextField, MenuItem, Divider, Tooltip, Avatar
} from "@mui/material";
import { 
  Add, Delete, ReportProblem, Send, CheckCircle, 
  Cancel, HourglassEmpty, Feedback, Visibility 
} from "@mui/icons-material";
import { clientComplainApi } from "../../api/user/clientComplainApi";
import UserLayout from "../../components/user/UserLayout";

const ComplainClient = () => {
  const [complainList, setComplainList] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedComplain, setSelectedComplain] = useState(null);

  const [formData, setFormData] = useState({ topicId: "", description: "" });

  const TOLE_ID = "ES25";
  const USER_ID = 2; 

  const loadData = async () => {
    setLoading(true);
    try {
      // Get Topics (Flag: "st") -> Note: Uses 'Complain' field from your JSON
      const topicRes = await clientComplainApi({ ToleID: TOLE_ID, Flag: "st" });
      if (topicRes.StatusCode === 200) setTopics(topicRes.ClientComplainLst || []);

      // Get Complaints (Flag: "S")
      const listRes = await clientComplainApi({
        ToleID: TOLE_ID, Flag: "S", UserID: USER_ID, TopicID: -1, ComplainStatus: "-1"
      });
      if (listRes.StatusCode === 200) setComplainList(listRes.ClientComplainLst || []);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!formData.topicId || !formData.description) return;
    try {
      const res = await clientComplainApi({
        ToleID: TOLE_ID, Flag: "i", UserID: USER_ID,
        TopicID: formData.topicId, Description: formData.description
      });
      if (res.StatusCode === 200) {
        setOpenAdd(false);
        setFormData({ topicId: "", description: "" });
        loadData();
      }
    } catch (err) { console.error(err); }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Delete this complaint?")) return;
    try {
      const res = await clientComplainApi({ ToleID: TOLE_ID, Flag: "R", UserID: USER_ID, ComplainID: id });
      if (res.StatusCode === 200) loadData();
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadData(); }, []);

  const getStatusChip = (status) => {
    let color = "warning";
    let icon = <HourglassEmpty />;
    
    if (status === "Approved") { color = "success"; icon = <CheckCircle />; }
    if (status === "Rejected") { color = "error"; icon = <Cancel />; }

    return <Chip label={status} size="small" color={color} icon={icon} sx={{ fontWeight: 500 }} />;
  };

  return (
    <UserLayout>
      <Box p={3}>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: "#f44336" }}><Feedback /></Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">My Complaints</Typography>
              <Typography variant="body2" color="text.secondary">Track resolutions and admin feedback</Typography>
            </Box>
          </Box>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenAdd(true)} sx={{ borderRadius: 2, bgcolor: "#3f51b5" }}>
            New Complain
          </Button>
        </Stack>

        <Paper sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: "#3f51b5" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Date</TableCell>
                <TableCell sx={{ color: "white" }}>Topic</TableCell>
                <TableCell sx={{ color: "white" }}>Description</TableCell>
                <TableCell sx={{ color: "white" }}>Status</TableCell>
                <TableCell sx={{ color: "white" }}>Admin Remarks</TableCell>
                <TableCell sx={{ color: "white" }} align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} align="center" sx={{ py: 5 }}><CircularProgress /></TableCell></TableRow>
              ) : (
                complainList.map((c) => (
                  <TableRow key={c.ComplainID} hover>
                    <TableCell variant="caption">{c.CreatedDate}</TableCell>
                    <TableCell><Typography variant="body2" fontWeight="bold">{c.Topic}</Typography></TableCell>
                    <TableCell sx={{ maxWidth: 200 }}><Typography variant="body2" noWrap>{c.Description}</Typography></TableCell>
                    <TableCell>{getStatusChip(c.ComplainStatus)}</TableCell>
                    <TableCell>
                      {c.Remarks ? (
                        <Typography variant="caption" color="primary" sx={{ display: 'block' }}>
                          {c.Remarks} <br/> <small>By: {c.RemarksBy}</small>
                        </Typography>
                      ) : "--"}
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end">
                        <IconButton size="small" onClick={() => setSelectedComplain(c)}><Visibility fontSize="small" /></IconButton>
                        <IconButton size="small" color="error" onClick={() => handleRemove(c.ComplainID)}><Delete fontSize="small" /></IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>

        {/* Modal: Add New */}
        <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth maxWidth="xs">
          <DialogTitle>New Complaint</DialogTitle>
          <DialogContent>
            <Stack spacing={3} mt={1}>
              <TextField select fullWidth label="Select Topic" value={formData.topicId} onChange={(e) => setFormData({ ...formData, topicId: e.target.value })}>
                {topics.map((t) => (
                  <MenuItem key={t.ComplainID} value={t.ComplainID}>{t.Complain}</MenuItem>
                ))}
              </TextField>
              <TextField fullWidth label="Description" multiline rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ py: 1.5 }}>Submit</Button>
            </Stack>
          </DialogContent>
        </Dialog>

        {/* Modal: View Details & Remarks */}
        <Dialog open={!!selectedComplain} onClose={() => setSelectedComplain(null)} fullWidth maxWidth="sm">
          <DialogTitle>Complain Details</DialogTitle>
          <DialogContent>
            {selectedComplain && (
              <Stack spacing={2} py={1}>
                <Typography><strong>Topic:</strong> {selectedComplain.Topic}</Typography>
                <Typography><strong>Description:</strong> {selectedComplain.Description}</Typography>
                <Divider />
                <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                   <Typography variant="subtitle2" color="primary">Admin Response</Typography>
                   <Typography variant="body2"><strong>Status:</strong> {selectedComplain.ComplainStatus}</Typography>
                   <Typography variant="body2"><strong>Remarks:</strong> {selectedComplain.Remarks || "No remarks yet"}</Typography>
                   <Typography variant="caption"><strong>Responded By:</strong> {selectedComplain.RemarksBy} on {selectedComplain.RemarksDate}</Typography>
                </Box>
              </Stack>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </UserLayout>
  );
};

export default ComplainClient;