import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell,
  CircularProgress, Stack, TextField, MenuItem, Avatar, Grid, Button, InputAdornment
} from "@mui/material";
import { 
  PersonPinCircle, Work, Bloodtype, Church, Wc, Favorite, 
  Call, Home, Search 
} from "@mui/icons-material";
import { clientNearMeApi } from "../../api/user/clientNearMeApi";
import UserLayout from "../../components/user/UserLayout";

const NearMeClient = () => {
  const [results, setResults] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [category, setCategory] = useState("SP"); 
  const [selectedNearID, setSelectedNearID] = useState("");

  const TOLE_ID = "ES25";

  const categories = [
    { label: "Profession", flag: "SP", icon: <Work fontSize="small"/> },
    { label: "Blood Group", flag: "SB", icon: <Bloodtype fontSize="small"/> },
    { label: "Religion", flag: "SR", icon: <Church fontSize="small"/> },
    { label: "Gender", flag: "SG", icon: <Wc fontSize="small"/> },
    { label: "Marital Status", flag: "SM", icon: <Favorite fontSize="small"/> },
  ];

  const loadOptions = async () => {
    setLoading(true);
    try {
      const res = await clientNearMeApi({ ToleID: TOLE_ID, Flag: category });
      if (res.StatusCode === 200) {
        const list = res.NearMeLst || [];
        setOptions(list);
        if (list.length > 0) setSelectedNearID(String(list[0].ID));
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const loadResults = async () => {
    if (!selectedNearID) return;
    setLoading(true);
    try {
      const res = await clientNearMeApi({
        ToleID: TOLE_ID,
        Flag: "S",
        DFlag: category,
        NearID: String(selectedNearID) 
      });
      if (res.StatusCode === 200) setResults(res.NearMeLst || []);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { loadOptions(); }, [category]);
  useEffect(() => { loadResults(); }, [selectedNearID]);

  // Filter results locally by name
  const filteredResults = results.filter(item => 
    item.MemberName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <UserLayout>
      <Box p={3}>
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Avatar sx={{ bgcolor: "#3f51b5" }}><PersonPinCircle /></Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">Near Me</Typography>
            <Typography variant="body2" color="text.secondary">Find neighbors by category</Typography>
          </Box>
        </Stack>

        {/* Filter Section */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                select fullWidth label="Category" value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.flag} value={cat.flag}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {cat.icon} <Typography variant="body2">{cat.label}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                select fullWidth label="Selection" value={selectedNearID}
                onChange={(e) => setSelectedNearID(e.target.value)}
                disabled={options.length === 0}
              >
                {options.map((opt) => (
                  <MenuItem key={opt.ID} value={String(opt.ID)}>{opt.Name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead sx={{ bgcolor: "#3f51b5" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Member</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>House No.</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} align="center" sx={{ py: 4 }}><CircularProgress size={30} /></TableCell></TableRow>
              ) : filteredResults.length === 0 ? (
                <TableRow><TableCell colSpan={4} align="center" sx={{ py: 3 }}>No neighbors found</TableCell></TableRow>
              ) : (
                filteredResults.map((row) => (
                  <TableRow key={row.MemberID} hover>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ width: 40, height: 40, bgcolor: category === 'SB' ? '#ffebee' : '#e8eaf6', color: category === 'SB' ? '#c62828' : '#3f51b5' }}>
                          {row.MemberName?.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" fontWeight="bold">{row.MemberName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Home fontSize="inherit" color="action" />
                        <Typography variant="body2">{row.HouseNo}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{row.Contact}</TableCell>
                    <TableCell align="right">
                      <Button 
                        variant="contained" 
                        color="success" 
                        size="small"
                        startIcon={<Call />} 
                        href={`tel:${row.Contact}`}
                        sx={{ borderRadius: 5, textTransform: 'none' }}
                      >
                        Call
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </UserLayout>
  );
};

export default NearMeClient;