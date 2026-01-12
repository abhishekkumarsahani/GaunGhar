import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, Dialog, DialogTitle, DialogContent, CircularProgress,
  Stack, Divider, Avatar, Tooltip
} from "@mui/material";
import { 
  Groups, Visibility, Phone, CalendarMonth, Badge 
} from "@mui/icons-material";
import { getManagementApi } from "../../api/user/getManagementApi"; // Using your provided API import
import UserLayout from "../../components/user/UserLayout";

const ManagementClient = () => {
  const [managementList, setManagementList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getManagementApi();
      if (res.StatusCode === 200) {
        // Sorting by Order to ensure President/Top officials appear first
        const sorted = (res.ManagementLst || []).sort((a, b) => a.Order - b.Order);
        setManagementList(sorted);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <UserLayout>
      <Box p={3}>
        {/* Header Section - Same style as Complaints */}
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: "#3f51b5" }}><Groups /></Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">Management Committee</Typography>
              <Typography variant="body2" color="text.secondary">Meet the leadership team and board members</Typography>
            </Box>
          </Box>
        </Stack>

        {/* Table Section - Matching your shared styling exactly */}
        <Paper sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: "#3f51b5" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Member</TableCell>
                <TableCell sx={{ color: "white" }}>Designation</TableCell>
                <TableCell sx={{ color: "white" }}>Contact</TableCell>
                <TableCell sx={{ color: "white" }}>Management Year</TableCell>
                <TableCell sx={{ color: "white" }}>Tenure</TableCell>
                <TableCell sx={{ color: "white" }} align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : managementList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                    No management records found.
                  </TableCell>
                </TableRow>
              ) : (
                managementList.map((m) => (
                  <TableRow key={m.ManagementID} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar src={m.UserImage} sx={{ width: 35, height: 35 }} />
                        <Typography variant="body2" fontWeight="bold">{m.FullName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="primary" fontWeight="500">
                        {m.Title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{m.Contact}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{m.ManagementYear}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ display: 'block', lineHeight: 1.2 }}>
                        {m.DateFrom} <br/> 
                        <span style={{ color: '#999' }}>to</span> {m.DateTo}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => setSelectedMember(m)}>
                        <Visibility fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>

        {/* Modal: View Details - Consistent with your Details Dialog */}
        <Dialog open={!!selectedMember} onClose={() => setSelectedMember(null)} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontWeight: 'bold' }}>Member Profile</DialogTitle>
          <DialogContent>
            {selectedMember && (
              <Stack spacing={2} py={1} alignItems="center">
                <Avatar 
                  src={selectedMember.UserImage} 
                  sx={{ width: 100, height: 100, border: '3px solid #3f51b5', mb: 1 }} 
                />
                <Box textAlign="center">
                  <Typography variant="h6" fontWeight="bold">{selectedMember.FullName}</Typography>
                  <Typography variant="subtitle1" color="primary" sx={{ mb: 2 }}>{selectedMember.Title}</Typography>
                </Box>
                
                <Divider sx={{ width: '100%' }} />
                
                <Box width="100%" sx={{ bgcolor: '#f9f9f9', p: 2, borderRadius: 2 }}>
                  <Stack direction="row" spacing={2} mb={2}>
                    <Badge color="action" />
                    <Typography variant="body2"><strong>Role:</strong> {selectedMember.ManagementYear}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} mb={2}>
                    <Phone color="action" />
                    <Typography variant="body2"><strong>Contact:</strong> {selectedMember.Contact}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <CalendarMonth color="action" />
                    <Box>
                      <Typography variant="body2"><strong>Duration:</strong></Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedMember.DateFrom} — {selectedMember.DateTo}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </UserLayout>
  );
};

export default ManagementClient;