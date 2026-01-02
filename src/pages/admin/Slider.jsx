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
  Alert,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";

import {
  Edit,
  Delete,
  Add,
  Link as LinkIcon,
  Visibility,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";

import AdminLayout from "../../components/admin/AdminLayout";
import { sliderApi } from "../../api/sliderApi";

const BASE_IMAGE_URL = "https://yourdomain.com/photo/slider/"; // Replace with your server's image URL

const Slider = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"))?.loginLst?.[0];

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [form, setForm] = useState({
    Title: "",
    ImgUrl: "",
    RedUrl: "",
    ImgOrder: "",
    IsActive: "A",
  });

  // 🔹 Load sliders
  const loadSliders = async () => {
    try {
      setLoading(true);
      const res = await sliderApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "S",
        IsActive: "A",
      });

      if (res.StatusCode === 200) {
        const normalized = (res.sliderlst || []).map((item) => ({
          SliderID: item.SliderID || item.sliderid,
          Title: item.Title || item.title,
          ImgUrl: item.ImgUrl || item.imgurl,
          RedUrl: item.RedUrl || item.redurl || "",
          ImgOrder: Number(item.Imgorder || item.imgorder),
          IsActive: item.IsActive || item.isactive,
          CreatedDate: item.CreatedDate || item.createddate || "",
          UpdatedDate: item.UpdatedDate || item.updateddate || "",
        }));

        normalized.sort((a, b) => a.ImgOrder - b.ImgOrder);
        setRows(normalized);
      }
    } catch (err) {
      console.error("Error loading sliders:", err);
      setError("Failed to load sliders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadSliders();
  }, []);

  // 🔹 Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Image size should be less than 2MB");
      return;
    }

    if (!file.type.match("image.*")) {
      setError("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const base64String = dataUrl.split(",")[1] || dataUrl;

      setForm((prev) => ({
        ...prev,
        ImgUrl: base64String,
      }));
      setImagePreview(dataUrl);
      setError("");
    };
    reader.onerror = () => {
      setError("Failed to read file");
    };
    reader.readAsDataURL(file);
  };

  // 🔹 Open modal
  const handleOpen = () => {
    setEditData(null);
    setForm({
      Title: "",
      ImgUrl: "",
      RedUrl: "",
      ImgOrder: "",
      IsActive: "A",
    });
    setImagePreview("");
    setOpen(true);
    setError("");
  };

  // 🔹 Save slider
  const handleSave = async () => {
    if (!form.Title || !form.ImgOrder) {
      setError("Title and Image Order are required fields");
      return;
    }

    if (!form.ImgUrl && !editData) {
      setError("Please upload an image");
      return;
    }

    const imgOrder = parseInt(form.ImgOrder);
    if (isNaN(imgOrder) || imgOrder <= 0) {
      setError("Image Order must be a positive number");
      return;
    }

    const payload = {
      ToleID: user.ToleID,
      UserID: user.UserID,
      Flag: editData ? "U" : "i",
      Title: form.Title,
      ImgUrl: form.ImgUrl,
      RedUrl: form.RedUrl || "",
      ImgOrder: imgOrder,
      IsActive: form.IsActive,
    };

    if (editData) payload.SliderID = editData.SliderID;

    try {
      setLoading(true);
      setError("");
      const res = await sliderApi(payload);

      if (res.StatusCode !== 200) {
        setError(res.Message || "Operation failed");
        return;
      }

      setOpen(false);
      setEditData(null);
      loadSliders();
    } catch (err) {
      console.error("Error saving slider:", err);
      setError("Failed to save slider");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Toggle active/inactive
  const toggleStatus = async (sliderId) => {
    try {
      const res = await sliderApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "AI",
        SliderID: sliderId,
      });

      if (res.StatusCode === 200) loadSliders();
      else setError("Failed to update status");
    } catch (err) {
      console.error("Error toggling status:", err);
      setError("Failed to update status");
    }
  };

  // 🔹 Delete slider
  const handleDelete = async (sliderId) => {
    if (!window.confirm("Are you sure you want to delete this slider?")) return;

    try {
      const res = await sliderApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "R",
        SliderID: sliderId,
      });

      if (res.StatusCode === 200) loadSliders();
      else setError("Failed to delete slider");
    } catch (err) {
      console.error("Error deleting slider:", err);
      setError("Failed to delete slider");
    }
  };

  // 🔹 Move slider up/down
  const handleMoveOrder = async (sliderId, direction) => {
    try {
      let sorted = [...rows].sort((a, b) => a.ImgOrder - b.ImgOrder);
      const index = sorted.findIndex(s => s.SliderID === sliderId);
      if (index === -1) return;

      const swapIndex = direction === "up" ? index - 1 : index + 1;
      if (swapIndex < 0 || swapIndex >= sorted.length) return;

      const current = sorted[index];
      const target = sorted[swapIndex];

      const res1 = await sliderApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "U",
        SliderID: current.SliderID,
        ImgOrder: target.ImgOrder,
        Title: current.Title,
        ImgUrl: current.ImgUrl,
        RedUrl: current.RedUrl,
        IsActive: current.IsActive,
      });

      const res2 = await sliderApi({
        ToleID: user.ToleID,
        UserID: user.UserID,
        Flag: "U",
        SliderID: target.SliderID,
        ImgOrder: current.ImgOrder,
        Title: target.Title,
        ImgUrl: target.ImgUrl,
        RedUrl: target.RedUrl,
        IsActive: target.IsActive,
      });

      if (res1.StatusCode === 200 && res2.StatusCode === 200) loadSliders();
    } catch (err) {
      console.error("Error moving slider:", err);
      setError("Failed to update slider order");
    }
  };

  // 🔹 Convert API ImgUrl to displayable image
  const getImageUrl = (imgUrl) => {
    if (!imgUrl) return null;

    if (imgUrl.startsWith("data:")) return imgUrl;
    if (imgUrl.length > 100 && !imgUrl.includes("/") && !imgUrl.includes("\\")) {
      return `data:image/jpeg;base64,${imgUrl}`;
    }

    // Convert Windows path to public URL
    if (imgUrl.includes("photo\\photo/slider") || imgUrl.includes("photo/photo/slider")) {
      const fileName = imgUrl.split(/[/\\]/).pop();
      return `${BASE_IMAGE_URL}${fileName}`;
    }

    return null;
  };

  // 🔹 Preview image
  const handlePreview = (imgUrl) => {
    const url = getImageUrl(imgUrl);
    if (url) setImagePreview(url);
    else setError("Cannot preview image. Please re-upload.");
  };

  return (
    <AdminLayout>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Slider Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
          Add Slider
        </Button>
      </Box>

      {error && !open && (
        <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="60">Preview</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Redirect URL</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">Loading...</TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">No sliders found</TableCell>
              </TableRow>
            ) : (
              rows.map(row => {
                const img = getImageUrl(row.ImgUrl);
                return (
                  <TableRow key={row.SliderID}>
                    <TableCell>
                      <Tooltip title="Click to preview">
                        <Box
                          onClick={() => handlePreview(row.ImgUrl)}
                          sx={{ width: 50, height: 50, borderRadius: 1, overflow: "hidden", cursor: img ? "pointer" : "default" }}
                        >
                          {img ? (
                            <img src={img} alt={row.Title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            <Box sx={{ width: "100%", height: "100%", bgcolor: "grey.200", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Typography variant="caption" color="textSecondary">No Image</Typography>
                            </Box>
                          )}
                        </Box>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{row.Title}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography>{row.ImgOrder}</Typography>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <IconButton size="small" disabled={row.ImgOrder <= 1} onClick={() => handleMoveOrder(row.SliderID, "up")}>
                            <ArrowUpward fontSize="small" />
                          </IconButton>
                          <IconButton size="small" disabled={row.ImgOrder >= rows.length} onClick={() => handleMoveOrder(row.SliderID, "down")}>
                            <ArrowDownward fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {row.RedUrl ? (
                        <Tooltip title={row.RedUrl}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <LinkIcon fontSize="small" color="primary" />
                            <Typography sx={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.RedUrl}</Typography>
                          </Box>
                        </Tooltip>
                      ) : <Typography color="textSecondary">No URL</Typography>}
                    </TableCell>
                    <TableCell>
                      <Switch checked={row.IsActive === "A"} onChange={() => toggleStatus(row.SliderID)} />
                      <Chip label={row.IsActive === "A" ? "Active" : "Inactive"} color={row.IsActive === "A" ? "success" : "error"} size="small" sx={{ ml: 1 }} />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Preview">
                        <span>
                          <IconButton size="small" color="info" onClick={() => handlePreview(row.ImgUrl)} disabled={!img}>
                            <Visibility fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => {
                          setEditData(row);
                          setForm({ Title: row.Title, ImgUrl: row.ImgUrl, RedUrl: row.RedUrl, ImgOrder: row.ImgOrder.toString(), IsActive: row.IsActive });
                          setImagePreview(getImageUrl(row.ImgUrl) || "");
                          setOpen(true);
                        }}>
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error" onClick={() => handleDelete(row.SliderID)}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* ================= PREVIEW MODAL ================= */}
      <Dialog open={!!imagePreview && !open} onClose={() => setImagePreview("")} maxWidth="md">
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: "center", p: 2 }}>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "60vh", objectFit: "contain" }} />
            ) : <Typography color="textSecondary">No image to preview</Typography>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImagePreview("")}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ================= CREATE/EDIT MODAL ================= */}
      <Dialog open={open} onClose={() => { setOpen(false); setError(""); }} maxWidth="md" fullWidth>
        <DialogTitle>{editData ? "Update Slider" : "Add Slider"}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}
          <Grid container spacing={3} mt={1}>
            <Grid item xs={12}>
              <TextField label="Title *" fullWidth value={form.Title} onChange={e => setForm({ ...form, Title: e.target.value })} helperText="Enter a descriptive title for the slider" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>{editData ? "Replace Image (optional)" : "Upload Image *"}</Typography>
              <TextField type="file" fullWidth inputProps={{ accept: "image/*" }} onChange={handleImageUpload} helperText={editData ? "Leave empty to keep existing image" : "Upload an image (max 2MB)"}/>
              {imagePreview && <Box mt={2} sx={{ textAlign: "center" }}><img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: 200, objectFit: "contain", borderRadius: 4, border: "1px solid #ddd" }} /></Box>}
            </Grid>
            <Grid item xs={12}><TextField label="Redirect URL" fullWidth value={form.RedUrl} onChange={e => setForm({ ...form, RedUrl: e.target.value })} placeholder="https://example.com" helperText="Optional: URL to redirect when slider is clicked" /></Grid>
            <Grid item xs={6}><TextField label="Image Order *" type="number" fullWidth value={form.ImgOrder} onChange={e => setForm({ ...form, ImgOrder: e.target.value })} helperText="Determines display order (1 = first)" inputProps={{ min: 1 }} /></Grid>
            <Grid item xs={6}><FormControl fullWidth><InputLabel>Status</InputLabel><Select value={form.IsActive} label="Status" onChange={e => setForm({ ...form, IsActive: e.target.value })}><MenuItem value="A">Active</MenuItem><MenuItem value="I">Inactive</MenuItem></Select></FormControl></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false); setError(""); }} disabled={loading}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default Slider;
