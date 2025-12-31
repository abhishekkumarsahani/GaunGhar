import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  IconButton,
  Typography,
  Avatar,
  FormHelperText,
  Alert,
  CircularProgress,
  useTheme,
  alpha
} from "@mui/material";
import {
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  Store as StoreIcon
} from "@mui/icons-material";
import { toleApi } from "../../../api/toleApi";

const ToleForm = ({ open, onClose, onSubmit, mode, initialData }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [loadingLookup, setLoadingLookup] = useState(false);
  const [lookupData, setLookupData] = useState({
    provinces: [],
    districts: [],
    municipalities: []
  });
  const [formData, setFormData] = useState({
    ToleId: "",
    Name: "",
    Address: "",
    DistrictID: "",
    WadaNo: "",
    MunicipalityID: "",
    ProvinceNo: "",
    Contact: "",
    Email: "",
    Logo: "",
    About: "",
    Website: "",
    Fb: "",
    RegDate: new Date().toISOString().split('T')[0],
    GoogLat: "",
    GoogLong: "",
    AllowApp: "Y",
    ExpiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState("");
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    if (open) {
      fetchProvinces();
      if (mode === "edit" && initialData) {
        const editData = { ...initialData };
        // Ensure date format is correct
        if (editData.RegDate) {
          editData.RegDate = editData.RegDate.split('T')[0];
        }
        if (editData.ExpiryDate) {
          editData.ExpiryDate = editData.ExpiryDate.split('T')[0];
        }
        setFormData(editData);
        setLogoPreview(editData.Logo || "");
      } else {
        resetForm();
      }
    }
  }, [open, mode, initialData]);

  // Fetch provinces
  const fetchProvinces = async () => {
    setLoadingLookup(true);
    try {
      const response = await toleApi.getProvinces();
      if (response.StatusCode === 200) {
        setLookupData(prev => ({
          ...prev,
          provinces: response.refLst || []
        }));
      }
    } catch (err) {
      console.error("Failed to fetch provinces:", err);
    } finally {
      setLoadingLookup(false);
    }
  };

  // Fetch districts when province is selected
  useEffect(() => {
    if (formData.ProvinceNo) {
      fetchDistricts(formData.ProvinceNo);
    }
  }, [formData.ProvinceNo]);

  const fetchDistricts = async (provinceId) => {
    setLoadingLookup(true);
    try {
      const response = await toleApi.getDistricts(provinceId);
      if (response.StatusCode === 200) {
        setLookupData(prev => ({
          ...prev,
          districts: response.refLst || []
        }));
      }
    } catch (err) {
      console.error("Failed to fetch districts:", err);
    } finally {
      setLoadingLookup(false);
    }
  };

  // Fetch municipalities when district is selected
  useEffect(() => {
    if (formData.DistrictID && formData.ProvinceNo) {
      fetchMunicipalities(formData.ProvinceNo, formData.DistrictID);
    }
  }, [formData.DistrictID, formData.ProvinceNo]);

  const fetchMunicipalities = async (provinceId, districtId) => {
    setLoadingLookup(true);
    try {
      const response = await toleApi.getMunicipalities(provinceId, districtId);
      if (response.StatusCode === 200) {
        setLookupData(prev => ({
          ...prev,
          municipalities: response.refLst || []
        }));
      }
    } catch (err) {
      console.error("Failed to fetch municipalities:", err);
    } finally {
      setLoadingLookup(false);
    }
  };

  const resetForm = () => {
    setFormData({
      ToleId: "",
      Name: "",
      Address: "",
      DistrictID: "",
      WadaNo: "",
      MunicipalityID: "",
      ProvinceNo: "",
      Contact: "",
      Email: "",
      Logo: "",
      About: "",
      Website: "",
      Fb: "",
      RegDate: new Date().toISOString().split('T')[0],
      GoogLat: "",
      GoogLong: "",
      AllowApp: "Y",
      ExpiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString().split('T')[0]
    });
    setLogoPreview("");
    setLogoFile(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.ToleId?.trim()) newErrors.ToleId = "Tole ID is required";
    if (!formData.Name?.trim()) newErrors.Name = "Name is required";
    if (!formData.Address?.trim()) newErrors.Address = "Address is required";
    if (!formData.DistrictID) newErrors.DistrictID = "District is required";
    if (!formData.ProvinceNo) newErrors.ProvinceNo = "Province is required";
    if (!formData.Contact?.trim()) newErrors.Contact = "Contact is required";
    if (!formData.Email?.trim()) {
      newErrors.Email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      newErrors.Email = "Invalid email format";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      let finalLogo = formData.Logo;
      
      // If new logo file uploaded, convert to base64
      if (logoFile) {
        finalLogo = await convertToBase64(logoFile);
      }

      const payload = {
        ...formData,
        Logo: finalLogo
      };

      await onSubmit(payload);
      resetForm();
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, Logo: "Please select an image file" }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, Logo: "File size should be less than 5MB" }));
        return;
      }
      
      setLogoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
      setErrors(prev => ({ ...prev, Logo: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Reset dependent fields when province/district changes
    if (name === "ProvinceNo") {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        DistrictID: "", // Reset district
        MunicipalityID: "" // Reset municipality
      }));
    } else if (name === "DistrictID") {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        MunicipalityID: "" // Reset municipality
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
          backdropFilter: "blur(20px)"
        }
      }}
    >
      <DialogTitle sx={{ 
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <StoreIcon color="primary" />
          <Typography variant="h6" fontWeight="600">
            {mode === "create" ? "Add New Tole" : "Edit Tole"}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Logo Upload Section */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="logo-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="logo-upload">
                  <IconButton component="span" sx={{ p: 0, mb: 1 }}>
                    <Avatar
                      src={logoPreview}
                      sx={{
                        width: 120,
                        height: 120,
                        border: `3px dashed ${errors.Logo ? theme.palette.error.main : theme.palette.divider}`,
                        bgcolor: theme.palette.background.default,
                        "&:hover": {
                          borderColor: theme.palette.primary.main,
                          cursor: "pointer"
                        }
                      }}
                    >
                      {logoPreview ? null : (
                        <Box sx={{ textAlign: "center" }}>
                          <UploadIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
                          <Typography variant="caption" display="block">
                            Upload Logo
                          </Typography>
                        </Box>
                      )}
                    </Avatar>
                  </IconButton>
                </label>
                {errors.Logo && (
                  <FormHelperText error>{errors.Logo}</FormHelperText>
                )}
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  Recommended: 200x200px, PNG/JPG
                </Typography>
              </Box>
            </Grid>

            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" fontWeight="600" color="primary" gutterBottom>
                Basic Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tole ID"
                name="ToleId"
                value={formData.ToleId}
                onChange={handleChange}
                error={!!errors.ToleId}
                helperText={errors.ToleId}
                required
                disabled={mode === "edit"}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tole Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                error={!!errors.Name}
                helperText={errors.Name}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                error={!!errors.Address}
                helperText={errors.Address}
                required
                multiline
                rows={2}
              />
            </Grid>

            {/* Location Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" fontWeight="600" color="primary" gutterBottom>
                Location Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth error={!!errors.ProvinceNo} disabled={loadingLookup}>
                <InputLabel>Province *</InputLabel>
                <Select
                  name="ProvinceNo"
                  value={formData.ProvinceNo}
                  onChange={handleChange}
                  label="Province *"
                >
                  <MenuItem value="">Select Province</MenuItem>
                  {lookupData.provinces.map((province) => (
                    <MenuItem key={province.ProvinceNo || province.id} value={province.ProvinceNo || province.id}>
                      {province.ProvinceName || province.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.ProvinceNo && (
                  <FormHelperText>{errors.ProvinceNo}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl 
                fullWidth 
                error={!!errors.DistrictID} 
                disabled={!formData.ProvinceNo || loadingLookup}
              >
                <InputLabel>District *</InputLabel>
                <Select
                  name="DistrictID"
                  value={formData.DistrictID}
                  onChange={handleChange}
                  label="District *"
                >
                  <MenuItem value="">Select District</MenuItem>
                  {lookupData.districts.map((district) => (
                    <MenuItem key={district.DistrictID || district.id} value={district.DistrictID || district.id}>
                      {district.DistrictName || district.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.DistrictID && (
                  <FormHelperText>{errors.DistrictID}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl 
                fullWidth 
                disabled={!formData.DistrictID || loadingLookup}
              >
                <InputLabel>Municipality</InputLabel>
                <Select
                  name="MunicipalityID"
                  value={formData.MunicipalityID}
                  onChange={handleChange}
                  label="Municipality"
                >
                  <MenuItem value="">Select Municipality</MenuItem>
                  {lookupData.municipalities.map((municipality) => (
                    <MenuItem key={municipality.MunicipalityID || municipality.id} value={municipality.MunicipalityID || municipality.id}>
                      {municipality.MunicipalityName || municipality.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Wada No"
                name="WadaNo"
                value={formData.WadaNo}
                onChange={handleChange}
                type="number"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Latitude"
                name="GoogLat"
                value={formData.GoogLat}
                onChange={handleChange}
                placeholder="e.g., 27.7172"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Longitude"
                name="GoogLong"
                value={formData.GoogLong}
                onChange={handleChange}
                placeholder="e.g., 85.3240"
              />
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" fontWeight="600" color="primary" gutterBottom>
                Contact Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="Contact"
                value={formData.Contact}
                onChange={handleChange}
                error={!!errors.Contact}
                helperText={errors.Contact}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="Email"
                type="email"
                value={formData.Email}
                onChange={handleChange}
                error={!!errors.Email}
                helperText={errors.Email}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Website"
                name="Website"
                value={formData.Website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Facebook Page"
                name="Fb"
                value={formData.Fb}
                onChange={handleChange}
                placeholder="https://facebook.com/yourpage"
              />
            </Grid>

            {/* About Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" fontWeight="600" color="primary" gutterBottom>
                About Tole
              </Typography>
              <TextField
                fullWidth
                label="Description"
                name="About"
                value={formData.About}
                onChange={handleChange}
                multiline
                rows={3}
                placeholder="Tell us about your tole..."
              />
            </Grid>

            {/* Date Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" fontWeight="600" color="primary" gutterBottom>
                Date Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Registration Date"
                name="RegDate"
                type="date"
                value={formData.RegDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                name="ExpiryDate"
                type="date"
                value={formData.ExpiryDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Status */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="AllowApp"
                  value={formData.AllowApp}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="Y">Active</MenuItem>
                  <MenuItem value="N">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            px: 4,
            fontWeight: 600,
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`
            }
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : mode === "create" ? (
            "Create Tole"
          ) : (
            "Update Tole"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ToleForm;