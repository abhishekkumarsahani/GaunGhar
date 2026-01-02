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
  Select,
  MenuItem,
  IconButton,
  Switch,
  Grid,
  Alert,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";

import { Add, Edit, Delete, Info, CalendarToday } from "@mui/icons-material";

import AdminLayout from "../../components/admin/AdminLayout";
import { toleApi } from "../../api/toleApi";
import { refApi } from "../../api/refApi";

const emptyForm = {
  ToleId: "",
  Name: "",
  Address: "",
  ProvinceNo: "",
  DistrictID: "",
  MunicipalityID: "",
  WadaNo: "",
  Contact: "",
  Email: "",
  Logo: "",
  About: "",
  Website: "",
  Fb: "",
  RegDate: new Date().toISOString().split("T")[0], // Default to today
  GoogLat: "",
  GoogLong: "",
  AllowApp: "A",
  ExpiryDate: "",
};

const Tole = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"))?.loginLst?.[0];

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [expiryOpen, setExpiryOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toleInfo, setToleInfo] = useState(null);
  const [selectedTole, setSelectedTole] = useState(null);
  const [newExpiryDate, setNewExpiryDate] = useState("");

  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [municipality, setMunicipality] = useState([]);

  const [form, setForm] = useState(emptyForm);

  // ================= LOGO UPLOAD (BASE64) =================
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (e.g., max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size should be less than 2MB");
      return;
    }

    // Validate file type
    if (!file.type.match("image.*")) {
      setError("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      // Extract pure Base64 string (remove "data:image/...;base64," prefix)
      const base64String = dataUrl.split(',')[1] || dataUrl;
      
      setForm((prev) => ({
        ...prev,
        Logo: base64String, // ✅ PURE BASE64 (no Data URL prefix)
      }));
      setError("");
    };
    reader.onerror = () => {
      setError("Failed to read file");
    };
    reader.readAsDataURL(file);
  };

  // ================= LOAD TOLES =================
  const loadToles = async () => {
    try {
      setLoading(true);
      const res = await toleApi({
        ToleID: user.ToleID,
        Flag: "s",
      });

      if (res?.StatusCode === 200) {
        setRows(
          res.ToleLst?.map((t) => ({
            ToleID: t.toleid,
            ToleId: t.toleid, // Add this for edit
            Name: t.name,
            Address: t.address,
            ProvinceNo: t.province,
            DistrictID: t.district,
            MunicipalityID: t.municipality,
            WadaNo: t.wadano,
            Contact: t.contact,
            Email: t.email,
            Logo: t.logo,
            About: t.about,
            Website: t.website,
            Fb: t.fb,
            RegDate: t.regdate,
            GoogLat: t.googlat,
            GoogLong: t.googlong,
            AllowApp: t.allowapp,
            ExpiryDate: t.expirydate,
          })) || []
        );
      }
    } catch (error) {
      console.error("Error loading toles:", error);
      setError("Failed to load toles");
    } finally {
      setLoading(false);
    }
  };

  // ================= REF DATA =================
  const loadProvince = async () => {
    try {
      const res = await refApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "SP",
      });
      if (res?.StatusCode === 200) setProvince(res.RefLst || []);
    } catch (error) {
      console.error("Error loading provinces:", error);
    }
  };

  const loadDistrict = async (provinceId) => {
    if (!provinceId) {
      setDistrict([]);
      setMunicipality([]);
      return;
    }
    try {
      const res = await refApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "SD",
        ProvinceID: provinceId,
      });
      if (res?.StatusCode === 200) {
        setDistrict(res.RefLst || []);
        // Reset municipality when district changes
        setMunicipality([]);
        setForm((prev) => ({ ...prev, MunicipalityID: "" }));
      }
    } catch (error) {
      console.error("Error loading districts:", error);
    }
  };

  const loadMunicipality = async (provinceId, districtId) => {
    if (!provinceId || !districtId) {
      setMunicipality([]);
      return;
    }
    try {
      const res = await refApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "SM",
        ProvinceID: provinceId,
        DistrictID: districtId,
      });
      if (res?.StatusCode === 200) setMunicipality(res.RefLst || []);
    } catch (error) {
      console.error("Error loading municipalities:", error);
    }
  };

  // ================= SHOW TOLES INFO =================
  const handleShowInfo = async (toleId) => {
    try {
      setLoading(true);
      const res = await toleApi({
        ToleID: toleId,
        Flag: "si",
      });

      if (res?.StatusCode === 200) {
        const toleData = res.ToleLst?.[0];
        if (toleData) {
          setToleInfo({
            ToleID: toleData.toleid,
            Name: toleData.name,
            Address: toleData.address,
            Province: toleData.province,
            District: toleData.district,
            Municipality: toleData.municipality,
            WadaNo: toleData.wadano,
            Contact: toleData.contact,
            Email: toleData.email,
            Logo: toleData.logo,
            About: toleData.about,
            Website: toleData.website,
            Fb: toleData.fb,
            RegDate: toleData.regdate,
            GoogLat: toleData.googlat,
            GoogLong: toleData.googlong,
            ExpiryDate: toleData.expirydate,
            AllowApp: toleData.allowapp,
          });
          setInfoOpen(true);
        }
      }
    } catch (error) {
      console.error("Error loading tole info:", error);
      setError("Failed to load tole information");
    } finally {
      setLoading(false);
    }
  };

  // ================= EXTEND EXPIRY =================
  const handleOpenExtendExpiry = (tole) => {
    setSelectedTole(tole);
    // Set default new expiry date to current expiry date or tomorrow if none
    const currentDate = tole.ExpiryDate || new Date().toISOString().split('T')[0];
    setNewExpiryDate(currentDate);
    setExpiryOpen(true);
    setError("");
  };

  const handleExtendExpiry = async () => {
    if (!newExpiryDate) {
      setError("Please select a new expiry date");
      return;
    }

    try {
      setLoading(true);
      const res = await toleApi({
        ToleID: selectedTole.ToleID,
        UserID: user.UserID,
        Flag: "ex",
        ExpiryDate: newExpiryDate,
      });

      if (res.StatusCode !== 200) {
        setError(res.Message || "Failed to extend expiry date");
        return;
      }

      setExpiryOpen(false);
      setSelectedTole(null);
      setNewExpiryDate("");
      loadToles();
      
      // Show success message
      setError("Expiry date extended successfully");
      setTimeout(() => setError(""), 3000);
    } catch (error) {
      console.error("Error extending expiry:", error);
      setError("Failed to extend expiry date");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadToles();
      loadProvince();
    }
  }, []);

  // Effect for loading district when province changes
  useEffect(() => {
    if (form.ProvinceNo) {
      loadDistrict(form.ProvinceNo);
    }
  }, [form.ProvinceNo]);

  // Effect for loading municipality when district changes
  useEffect(() => {
    if (form.ProvinceNo && form.DistrictID) {
      loadMunicipality(form.ProvinceNo, form.DistrictID);
    }
  }, [form.DistrictID]);

  // ================= SAVE (CREATE / UPDATE) =================
  const handleSave = async () => {
    // Validation
    if (!form.Name || !form.Contact || !form.Email || !form.Address) {
      setError("Please fill in all required fields");
      return;
    }

    if (!form.ProvinceNo || !form.DistrictID || !form.MunicipalityID) {
      setError("Please select Province, District and Municipality");
      return;
    }

    const payload = {
      ToleId: editData ? editData.ToleID : form.ToleId,
      Flag: editData ? "U" : "i", // Note: "i" should be lowercase in payload
      Name: form.Name,
      Address: form.Address,
      ProvinceNo: Number(form.ProvinceNo),
      DistrictID: Number(form.DistrictID),
      MunicipalityID: Number(form.MunicipalityID),
      WadaNo: form.WadaNo ? Number(form.WadaNo) : 0,
      Contact: form.Contact,
      Email: form.Email,
      Logo: form.Logo || "",
      About: form.About || "",
      Website: form.Website || "",
      Fb: form.Fb || "",
      RegDate: form.RegDate || new Date().toISOString().split("T")[0],
      GoogLat: form.GoogLat || "0",
      GoogLong: form.GoogLong || "0",
      AllowApp: form.AllowApp || "A",
      ExpiryDate: form.ExpiryDate || "",
      UserID: user.UserID,
    };

    console.log("FINAL PAYLOAD 👉", payload);

    try {
      setLoading(true);
      setError("");
      const res = await toleApi(payload);

      if (res.StatusCode !== 200) {
        setError(res.Message || "Operation failed");
        return;
      }

      setOpen(false);
      setEditData(null);
      setForm(emptyForm);
      loadToles();
    } catch (error) {
      console.error("Error saving tole:", error);
      setError("Failed to save tole");
    } finally {
      setLoading(false);
    }
  };

  // ================= TOGGLE ALLOW =================
  const toggleAllow = async (row) => {
    try {
      await toleApi({
        ToleID: row.ToleID,
        UserID: user.UserID,
        Flag: "ai",
        AllowApp: row.AllowApp === "Y" ? "N" : "Y",
      });
      loadToles();
    } catch (error) {
      console.error("Error toggling allow app:", error);
      setError("Failed to update status");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this Tole?")) return;

    try {
      await toleApi({
        ToleID: id,
        UserID: user.UserID,
        Flag: "R",
      });
      loadToles();
    } catch (error) {
      console.error("Error deleting tole:", error);
      setError("Failed to delete tole");
    }
  };

  // Handle edit
  const handleEdit = (row) => {
    setEditData(row);
    setForm({
      ToleId: row.ToleId || row.ToleID,
      Name: row.Name || "",
      Address: row.Address || "",
      ProvinceNo: row.ProvinceNo?.toString() || "",
      DistrictID: row.DistrictID?.toString() || "",
      MunicipalityID: row.MunicipalityID?.toString() || "",
      WadaNo: row.WadaNo?.toString() || "",
      Contact: row.Contact || "",
      Email: row.Email || "",
      Logo: row.Logo || "",
      About: row.About || "",
      Website: row.Website || "",
      Fb: row.Fb || "",
      RegDate: row.RegDate || new Date().toISOString().split("T")[0],
      GoogLat: row.GoogLat || "",
      GoogLong: row.GoogLong || "",
      AllowApp: row.AllowApp || "A",
      ExpiryDate: row.ExpiryDate || "",
    });
    setOpen(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Tole Management</Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => {
            setEditData(null);
            setForm(emptyForm);
            setOpen(true);
            setError("");
          }}
        >
          Add Tole
        </Button>
      </Box>

      {error && !open && !expiryOpen && (
        <Alert 
          severity={error.includes("successfully") ? "success" : "error"} 
          onClose={() => setError("")} 
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}

      {/* ================= LIST ================= */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Tole</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Expiry</TableCell>
              <TableCell>Allow App</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No toles found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.ToleID}>
                  <TableCell>
                    {row.Logo ? (
                      <img
                        src={row.Logo}
                        alt="logo"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 6,
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: "grey.200",
                          borderRadius: 1,
                        }}
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {row.Name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {row.Address}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.Contact}</TableCell>
                  <TableCell>{row.Email}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">
                        {formatDate(row.ExpiryDate)}
                      </Typography>
                      {row.ExpiryDate && new Date(row.ExpiryDate) < new Date() && (
                        <Chip 
                          label="Expired" 
                          color="error" 
                          size="small"
                          sx={{ mt: 0.5 }}
                        />
                      )}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Switch
                      checked={row.AllowApp === "Y"}
                      onChange={() => toggleAllow(row)}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton 
                      onClick={() => handleShowInfo(row.ToleID)} 
                      size="small"
                      color="info"
                      title="View Details"
                    >
                      <Info fontSize="small" />
                    </IconButton>

                    <IconButton 
                      onClick={() => handleOpenExtendExpiry(row)} 
                      size="small"
                      color="primary"
                      title="Extend Expiry"
                    >
                      <CalendarToday fontSize="small" />
                    </IconButton>

                    <IconButton onClick={() => handleEdit(row)} size="small">
                      <Edit fontSize="small" />
                    </IconButton>

                    <IconButton
                      onClick={() => handleDelete(row.ToleID)}
                      color="error"
                      size="small"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* ================= EXTEND EXPIRY MODAL ================= */}
      <Dialog
        open={expiryOpen}
        onClose={() => setExpiryOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Extend Expiry Date</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}
          
          {selectedTole && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Extend expiry date for <strong>{selectedTole.Name}</strong>
              </Typography>
              
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Current Tole ID: {selectedTole.ToleID}
              </Typography>
              
              {selectedTole.ExpiryDate && (
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Current Expiry Date: {formatDate(selectedTole.ExpiryDate)}
                </Typography>
              )}
              
              <TextField
                type="date"
                label="New Expiry Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={newExpiryDate}
                onChange={(e) => setNewExpiryDate(e.target.value)}
                sx={{ mt: 2 }}
                required
              />
              
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                Select a new expiry date for this tole
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setExpiryOpen(false);
              setError("");
            }}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleExtendExpiry} 
            disabled={loading || !newExpiryDate}
          >
            {loading ? "Extending..." : "Extend Expiry"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= INFO MODAL ================= */}
      <Dialog
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Tole Information</DialogTitle>
        <DialogContent>
          {toleInfo && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                {toleInfo.Logo && (
                  <img
                    src={toleInfo.Logo}
                    alt="logo"
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 8,
                      objectFit: "cover",
                      marginRight: 16,
                    }}
                  />
                )}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {toleInfo.Name}
                  </Typography>
                  <Chip 
                    label={toleInfo.AllowApp === "Y" ? "Active" : "Inactive"} 
                    color={toleInfo.AllowApp === "Y" ? "success" : "error"}
                    size="small"
                  />
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">Tole ID</Typography>
                  <Typography variant="body1">{toleInfo.ToleID}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">Contact</Typography>
                  <Typography variant="body1">{toleInfo.Contact}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                  <Typography variant="body1">{toleInfo.Email}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">Registration Date</Typography>
                  <Typography variant="body1">{formatDate(toleInfo.RegDate)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">Expiry Date</Typography>
                  <Typography variant="body1">
                    {formatDate(toleInfo.ExpiryDate)}
                    {toleInfo.ExpiryDate && new Date(toleInfo.ExpiryDate) < new Date() && (
                      <Chip 
                        label="Expired" 
                        color="error" 
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">Wada No</Typography>
                  <Typography variant="body1">{toleInfo.WadaNo || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">Address</Typography>
                  <Typography variant="body1">{toleInfo.Address}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color="textSecondary">Province</Typography>
                  <Typography variant="body1">{toleInfo.Province}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color="textSecondary">District</Typography>
                  <Typography variant="body1">{toleInfo.District}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color="textSecondary">Municipality</Typography>
                  <Typography variant="body1">{toleInfo.Municipality}</Typography>
                </Grid>
                {toleInfo.Website && (
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">Website</Typography>
                    <Typography variant="body1">
                      <a href={toleInfo.Website} target="_blank" rel="noopener noreferrer">
                        {toleInfo.Website}
                      </a>
                    </Typography>
                  </Grid>
                )}
                {toleInfo.Fb && (
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">Facebook</Typography>
                    <Typography variant="body1">
                      <a href={toleInfo.Fb} target="_blank" rel="noopener noreferrer">
                        {toleInfo.Fb}
                      </a>
                    </Typography>
                  </Grid>
                )}
                {toleInfo.GoogLat && toleInfo.GoogLong && toleInfo.GoogLat !== "0" && toleInfo.GoogLong !== "0" && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">Coordinates</Typography>
                    <Typography variant="body1">
                      {toleInfo.GoogLat}, {toleInfo.GoogLong}
                    </Typography>
                  </Grid>
                )}
                {toleInfo.About && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">About</Typography>
                    <Typography variant="body1">{toleInfo.About}</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInfoOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ================= EDIT/CREATE MODAL ================= */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setError("");
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{editData ? "Update Tole" : "Create Tole"}</DialogTitle>

        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <TextField
                label="Tole ID *"
                fullWidth
                value={form.ToleId}
                onChange={(e) => setForm({ ...form, ToleId: e.target.value })}
                disabled={editData} // Cannot edit ToleId when updating
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Tole Name *"
                fullWidth
                value={form.Name}
                onChange={(e) => setForm({ ...form, Name: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Contact *"
                fullWidth
                value={form.Contact}
                onChange={(e) => setForm({ ...form, Contact: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Email *"
                type="email"
                fullWidth
                value={form.Email}
                onChange={(e) => setForm({ ...form, Email: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Address *"
                fullWidth
                multiline
                rows={2}
                value={form.Address}
                onChange={(e) => setForm({ ...form, Address: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Province</InputLabel>
                <Select
                  value={form.ProvinceNo}
                  label="Province"
                  onChange={(e) =>
                    setForm({ ...form, ProvinceNo: e.target.value })
                  }
                >
                  <MenuItem value="">Select Province</MenuItem>
                  {province.map((p) => (
                    <MenuItem key={p.ProvinceID} value={p.ProvinceID}>
                      {p.Province}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>District</InputLabel>
                <Select
                  value={form.DistrictID}
                  label="District"
                  onChange={(e) =>
                    setForm({ ...form, DistrictID: e.target.value })
                  }
                  disabled={!form.ProvinceNo}
                >
                  <MenuItem value="">Select District</MenuItem>
                  {district.map((d) => (
                    <MenuItem key={d.DistrictID} value={d.DistrictID}>
                      {d.District}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Municipality</InputLabel>
                <Select
                  value={form.MunicipalityID}
                  label="Municipality"
                  onChange={(e) =>
                    setForm({ ...form, MunicipalityID: e.target.value })
                  }
                  disabled={!form.DistrictID}
                >
                  <MenuItem value="">Select Municipality</MenuItem>
                  {municipality.map((m) => (
                    <MenuItem key={m.MunicipalityID} value={m.MunicipalityID}>
                      {m.Municipality}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Wada No"
                type="number"
                fullWidth
                value={form.WadaNo}
                onChange={(e) => setForm({ ...form, WadaNo: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                type="date"
                label="Registration Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={form.RegDate}
                onChange={(e) => setForm({ ...form, RegDate: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                type="date"
                label="Expiry Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={form.ExpiryDate}
                onChange={(e) =>
                  setForm({ ...form, ExpiryDate: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Google Latitude"
                fullWidth
                value={form.GoogLat}
                onChange={(e) => setForm({ ...form, GoogLat: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Google Longitude"
                fullWidth
                value={form.GoogLong}
                onChange={(e) => setForm({ ...form, GoogLong: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Website"
                fullWidth
                value={form.Website}
                onChange={(e) => setForm({ ...form, Website: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Facebook Page"
                fullWidth
                value={form.Fb}
                onChange={(e) => setForm({ ...form, Fb: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="About"
                fullWidth
                multiline
                rows={3}
                value={form.About}
                onChange={(e) => setForm({ ...form, About: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Logo Upload
              </Typography>
              <TextField
                type="file"
                fullWidth
                inputProps={{
                  accept: "image/*",
                  onChange: handleLogoUpload,
                }}
                onChange={handleLogoUpload}
              />
              {form.Logo && (
                <Box mt={1}>
                  <img
                    src={form.Logo}
                    alt="preview"
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setError("");
            }}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default Tole;