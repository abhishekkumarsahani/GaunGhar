import { useEffect, useState } from "react";
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
} from "@mui/material";
import { Info } from "@mui/icons-material";
import { clientToleApi } from "../../api/user/clientToleApi";
import UserLayout from "../../components/user/UserLayout";

// Helper to get image URL from Windows path
const getImageUrl = (path) => {
  if (!path) return "";
  return `/api/images?path=${encodeURIComponent(path)}`;
};

const ToleClient = () => {
  const [toleList, setToleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTole, setSelectedTole] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Load all toles (Flag = "S")
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

  // Load single tole details (Flag = "SI")
  const viewTole = async (toleId) => {
    try {
      setLoading(true);
      const res = await clientToleApi({ Flag: "SI", ToleID: toleId });
      if (res.StatusCode === 200) {
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
        <Typography variant="h5" mb={3}>
          Tole Directory
        </Typography>

        <Paper>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                <TableCell sx={{ color: "#fff" }}>Logo</TableCell>
                <TableCell sx={{ color: "#fff" }}>Tole Name</TableCell>
                <TableCell sx={{ color: "#fff" }}>Contact</TableCell>
                <TableCell sx={{ color: "#fff" }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              ) : toleList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No toles found
                  </TableCell>
                </TableRow>
              ) : (
                toleList.map((t) => (
                  <TableRow key={t.ToleID} hover>
                    <TableCell>
                      <img
                        src={getImageUrl(t.ToleLogo)}
                        alt={t.ToleName}
                        width={50}
                        height={50}
                        style={{ borderRadius: 6, objectFit: "cover" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="bold">{t.ToleName}</Typography>
                      <Typography variant="caption">{t.ToleAddress}</Typography>
                    </TableCell>
                    <TableCell>{t.ToleContact}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => viewTole(t.ToleID)}>
                        <Info />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>

        {/* ================= DETAILS MODAL ================= */}
        <Dialog
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Tole Details</DialogTitle>
          <DialogContent>
            {selectedTole && (
              <Box>
                <Box display="flex" gap={2} mb={2}>
                  <img
                    src={getImageUrl(selectedTole.Logo)}
                    alt={selectedTole.Name}
                    width={80}
                    height={80}
                    style={{ borderRadius: 8 }}
                  />
                  <Box>
                    <Typography variant="h6">{selectedTole.Name}</Typography>
                    <Chip label={selectedTole.Municipality} />
                  </Box>
                </Box>

                <Typography>📞 Contact: {selectedTole.Contact}</Typography>
                <Typography>📧 Email: {selectedTole.Email || "-"}</Typography>
                <Typography>🏙 District: {selectedTole.District}</Typography>
                <Typography>
                  🏘 Municipality: {selectedTole.Municipality}
                </Typography>
                <Typography>🗓 Registration: {selectedTole.RegDate}</Typography>
                <Typography>⏰ Expiry: {selectedTole.ExpiryDate}</Typography>
                {selectedTole.About && (
                  <Typography mt={1}>ℹ About: {selectedTole.About}</Typography>
                )}
                {selectedTole.Website && (
                  <Typography>
                    🌐 Website:{" "}
                    <a href={selectedTole.Website} target="_blank">
                      {selectedTole.Website}
                    </a>
                  </Typography>
                )}
                {selectedTole.Fb && (
                  <Typography>
                    📘 Facebook:{" "}
                    <a href={selectedTole.Fb} target="_blank">
                      {selectedTole.Fb}
                    </a>
                  </Typography>
                )}
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </UserLayout>
  );
};

export default ToleClient;
