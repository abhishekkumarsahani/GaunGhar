import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
  CircularProgress,
  Stack,
  Divider,
  Avatar,
  Grid,
} from "@mui/material";
import {
  Info,
  Close,
  Phone,
  Email,
  Map, // For District
  LocationCity, // For Municipality
  CalendarToday, // For Reg
  EventBusy, // For Expiry
} from "@mui/icons-material";
import { clientToleApi } from "../../api/user/clientToleApi"; 
import UserLayout from "../../components/user/UserLayout"; 

// --- Helper Functions ---
const getImageUrl = (path) => {
  if (!path) return "";
  return path.startsWith("http")
    ? path
    : `/api/images?path=${encodeURIComponent(path)}`;
};

// --- Sub-Component: Tole Details Modal ---
// REFACTORED TO MATCH THE UPLOADED IMAGE DESIGN EXACTLY
const ToleDetailsModal = ({ open, onClose, data }) => {
  if (!data) return null;

  // Helper styles for the icon+text rows
  const rowStyle = {
    display: "flex",
    alignItems: "center",
    gap: 1, // Space between icon and text
    flexWrap: "wrap",
    mb: 1.5, // Margin bottom for spacing between rows
  };

  const labelStyle = {
    fontWeight: "bold",
    mr: 0.5, // Space between "Label:" and value
    color: "#333",
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box display="flex" justifyContent="space-between" alignItems="center" px={3} py={2}>
        <Typography variant="h6">Tole Details</Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </Box>
      
      <Divider />

      <DialogContent sx={{ p: 4 }}>
        {/* --- Header Section: Logo + Name + Tag --- */}
        <Box display="flex" gap={3} alignItems="center" mb={4}>
          <Avatar
            src={getImageUrl(data.Logo || data.ToleLogo)}
            alt={data.Name || data.ToleName}
            sx={{ width: 90, height: 90, border: "1px solid #eee" }}
          />
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontSize: "1.5rem" }}>
              {data.Name || data.ToleName}
            </Typography>
            <Chip 
              label={data.Municipality || "KMC"} // Defaulting to KMC if empty to match design
              size="small" 
              sx={{ bgcolor: "#f0f0f0", color: "#555", fontWeight: 500, borderRadius: 1 }} 
            />
          </Box>
        </Box>

        {/* --- Info Section: Matched to Image Layout --- */}
        <Box>
          {/* Row 1: Contact & Email */}
          <Box sx={rowStyle}>
            {/* Contact */}
            <Box display="flex" alignItems="center" mr={3}>
              <Phone sx={{ color: "#757575", fontSize: 20, mr: 1 }} />
              <Typography variant="body1">
                <Box component="span" sx={labelStyle}>Contact:</Box> 
                {data.Contact || data.ToleContact}
              </Typography>
            </Box>
            
            {/* Email */}
            {(data.Email || data.ToleEmail) && (
              <Box display="flex" alignItems="center">
                <Email sx={{ color: "#757575", fontSize: 20, mr: 1 }} />
                <Typography variant="body1">
                  <Box component="span" sx={labelStyle}>Email:</Box> 
                  {data.Email || data.ToleEmail}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Row 2: District, Municipality, Reg */}
          <Box sx={rowStyle}>
            {/* District */}
            <Box display="flex" alignItems="center" mr={3}>
              <Map sx={{ color: "#757575", fontSize: 20, mr: 1 }} />
              <Typography variant="body1">
                <Box component="span" sx={labelStyle}>District:</Box> 
                {data.District || data.ToleDistrict}
              </Typography>
            </Box>

            {/* Municipality (Repeated here as per design) */}
            <Box display="flex" alignItems="center" mr={3}>
              <LocationCity sx={{ color: "#757575", fontSize: 20, mr: 1 }} />
              <Typography variant="body1">
                <Box component="span" sx={labelStyle}>Municipality:</Box> 
                {data.Municipality || data.ToleMunicipality}
              </Typography>
            </Box>

            {/* Registration */}
            <Box display="flex" alignItems="center">
              <CalendarToday sx={{ color: "#757575", fontSize: 20, mr: 1 }} />
              <Typography variant="body1">
                <Box component="span" sx={labelStyle}>Reg:</Box> 
                {data.RegDate || data.RegistrationDate}
              </Typography>
            </Box>
          </Box>

          {/* Row 3: Expiry (Red Icon) */}
          <Box sx={rowStyle}>
            <Box display="flex" alignItems="center">
              <EventBusy sx={{ color: "#d32f2f", fontSize: 20, mr: 1 }} /> {/* Red color */}
              <Typography variant="body1">
                <Box component="span" sx={labelStyle}>Expiry:</Box> 
                {data.ExpiryDate}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// --- Main Page Component ---
const ToleClient = () => {
  const [toleList, setToleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTole, setSelectedTole] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Load all toles
  const loadToles = async () => {
    try {
      setLoading(true);
      const res = await clientToleApi({ Flag: "S" });
      if (res.StatusCode === 200) setToleList(res.ToleInfoLst || []);
    } catch (err) {
      console.error("Error loading toles:", err);
    } finally {
      setLoading(false);
    }
  };

  // View Details Handler
  const viewTole = async (toleId) => {
    try {
      setLoading(true);
      // Fetch specific details (Flag SI)
      const res = await clientToleApi({ Flag: "SI", ToleID: toleId });
      if (res.StatusCode === 200 && res.ToleInfoLst?.length > 0) {
        setSelectedTole(res.ToleInfoLst[0]);
        setDetailOpen(true);
      }
    } catch (err) {
      console.error("Error loading tole details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadToles();
  }, []);

  return (
    <UserLayout>
      <Box p={3}>
        <Typography variant="h5" mb={3} color="text.primary">
          Tole Directory
        </Typography>

        <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 2 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: "#3f51b5", color: "white", fontWeight: "bold" }}>ToleID</TableCell>
                <TableCell sx={{ bgcolor: "#3f51b5", color: "white", fontWeight: "bold" }}>Logo</TableCell>
                <TableCell sx={{ bgcolor: "#3f51b5", color: "white", fontWeight: "bold" }}>Tole Information</TableCell>
                <TableCell sx={{ bgcolor: "#3f51b5", color: "white", fontWeight: "bold" }}>Location</TableCell>
                <TableCell sx={{ bgcolor: "#3f51b5", color: "white", fontWeight: "bold" }}>Contact</TableCell>
                <TableCell sx={{ bgcolor: "#3f51b5", color: "white", fontWeight: "bold" }} align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading && toleList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : toleList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    No Records Found
                  </TableCell>
                </TableRow>
              ) : (
                toleList.map((t) => (
                  <TableRow key={t.ToleID} hover>

                    {/* Column 2: Name & Reg Date */}
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {t.ToleID}
                      </Typography>
                    </TableCell>
                    {/* Column 1: Logo */}
                    <TableCell>
                      <Avatar 
                        src={getImageUrl(t.ToleLogo)} 
                        variant="rounded"
                        sx={{ width: 40, height: 40 }}
                      />
                    </TableCell>

                    {/* Column 2: Name & Reg Date */}
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {t.ToleName}
                      </Typography>
                    </TableCell>

                    {/* Column 3: Location */}
                    <TableCell>
                       <Stack direction="row" alignItems="center" spacing={1}>
                        <Phone fontSize="inherit" color="action" />
                        <Typography variant="body2">{t.ToleAddress}</Typography>
                      </Stack>
                    </TableCell>

                    {/* Column 4: Contact */}
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Phone fontSize="inherit" color="action" />
                        <Typography variant="body2">{t.ToleContact}</Typography>
                      </Stack>
                    </TableCell>

                    {/* Column 5: Action */}
                    <TableCell align="right">
                      <IconButton 
                        color="primary" 
                        size="small" 
                        onClick={() => viewTole(t.ToleID)}
                        sx={{ bgcolor: "#e8eaf6" }}
                      >
                        <Info fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>

        {/* Modal Instance */}
        <ToleDetailsModal 
          open={detailOpen} 
          onClose={() => setDetailOpen(false)} 
          data={selectedTole} 
        />
      </Box>
    </UserLayout>
  );
};

export default ToleClient;