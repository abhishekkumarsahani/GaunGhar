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
} from "@mui/material";

import { Add, Edit, Delete } from "@mui/icons-material";

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
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      setForm((prev) => ({
        ...prev,
        Logo: reader.result, // ✅ BASE64
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
            ProvinceNo: t.provinceno,
            DistrictID: t.districtid,
            MunicipalityID: t.municipalityid,
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
        setForm(prev => ({ ...prev, MunicipalityID: "" }));
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

      {error && !open && (
        <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>
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
                        style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }}
                      />
                    ) : (
                      <Box sx={{ width: 40, height: 40, bgcolor: 'grey.200', borderRadius: 1 }} />
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
                  <TableCell>{row.ExpiryDate || 'N/A'}</TableCell>

                  <TableCell>
                    <Switch
                      checked={row.AllowApp === "Y"}
                      onChange={() => toggleAllow(row)}
                    />
                  </TableCell>

                  <TableCell align="right">
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

      {/* ================= MODAL ================= */}
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
                  onChange={(e) => setForm({ ...form, ProvinceNo: e.target.value })}
                >
                  <MenuItem value="">Select Province</MenuItem>
                  {province.map((p) => (
                    <MenuItem key={p.RefID} value={p.RefID}>
                      {p.RefName}
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
                  onChange={(e) => setForm({ ...form, DistrictID: e.target.value })}
                  disabled={!form.ProvinceNo}
                >
                  <MenuItem value="">Select District</MenuItem>
                  {district.map((d) => (
                    <MenuItem key={d.RefID} value={d.RefID}>
                      {d.RefName}
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
                  onChange={(e) => setForm({ ...form, MunicipalityID: e.target.value })}
                  disabled={!form.DistrictID}
                >
                  <MenuItem value="">Select Municipality</MenuItem>
                  {municipality.map((m) => (
                    <MenuItem key={m.RefID} value={m.RefID}>
                      {m.RefName}
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
                  onChange: handleLogoUpload
                }}
                onChange={handleLogoUpload}
              />
              {form.Logo && (
                <Box mt={1}>
                  <img
                    src={form.Logo}
                    alt="preview"
                    style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }}
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
          <Button 
            variant="contained" 
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default Tole;