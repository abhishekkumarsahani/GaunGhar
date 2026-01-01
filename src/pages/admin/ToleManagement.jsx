import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Grid,
  Avatar,
  Tooltip,
  Fade,
  LinearProgress,
  alpha,
  useTheme
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Block as BlockIcon,
  CheckCircle as AllowIcon,
  CalendarToday as CalendarIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Store as StoreIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as WebsiteIcon,
  Facebook as FacebookIcon,
  Info as InfoIcon
} from "@mui/icons-material";
import { toleApi } from "../../api/toleApi";
import ToleForm from "../../components/admin/tole/ToleForm";
import ConfirmationDialog from "../../components/admin/tole/ConfirmationDialog";
import ExtendExpiryDialog from "../../components/admin/tole/ExtendExpiryDialog";
import ViewToleDialog from "../../components/admin/tole/ViewToleDialog";

const ToleManagement = () => {
  const theme = useTheme();
  const [toes, setToes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Dialog states
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openExtend, setOpenExtend] = useState(false);
  const [selectedTole, setSelectedTole] = useState(null);
  const [formMode, setFormMode] = useState("create"); // 'create' or 'edit'

  // Confirmation dialog states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {
    fetchToes();
  }, []);

const fetchToes = async () => {
  setLoading(true);
  try {
    const response = await toleApi.getToleList();

    if (response.StatusCode === 200) {
      const mappedData = (response.ToleLst || []).map(t => ({
        ToleID: t.toleid,
        Name: t.name,
        Address: t.address,
        District: t.district,
        Logo: t.logo,
        Email: t.email,
        Contact: t.contact || "", // if exists later
        ExpiryDate: t.expirydate,
        AllowApp: t.allowapp,
        CreatedDate: t.createddate
      }));

      setToes(mappedData);
    } else {
      setError(response.Message || "Failed to fetch toles");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    setError("Failed to fetch tole data");
  } finally {
    setLoading(false);
  }
};


  const handleCreateTole = async (toleData) => {
    try {
      const response = await toleApi.createTole(toleData);
      if (response.StatusCode === 200) {
        setSuccess("Tole created successfully!");
        fetchToes();
        setOpenForm(false);
      } else {
        setError(response.Message || "Failed to create tole");
      }
    } catch (err) {
      console.error("Create error:", err);
      setError("Failed to create tole");
    }
  };

  const handleUpdateTole = async (toleData) => {
    try {
      const response = await toleApi.updateTole(toleData);
      if (response.StatusCode === 200) {
        setSuccess("Tole updated successfully!");
        fetchToes();
        setOpenForm(false);
      } else {
        setError(response.Message || "Failed to update tole");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update tole");
    }
  };

  const handleDeleteTole = async () => {
    if (!selectedTole) return;
    try {
      const response = await toleApi.removeTole(selectedTole.ToleID);
      if (response.StatusCode === 200) {
        setSuccess("Tole removed successfully!");
        fetchToes();
      } else {
        setError(response.Message || "Failed to remove tole");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to remove tole");
    }
    setConfirmOpen(false);
  };

const handleToggleAccess = async (allowApp) => {
  if (!selectedTole) return;

  try {
    // Make sure we pass "Y" or "N"
    const response = await toleApi.toggleToleAccess(
      selectedTole.ToleID,
      allowApp ? "Y" : "N"  // if allowApp is true → "Y", else → "N"
    );

    if (response.StatusCode === 200) {
      setSuccess(`Tole ${allowApp ? "allowed" : "disallowed"} successfully!`);
      fetchToes();
    } else {
      setError(response.Message || "Failed to update access");
    }
  } catch (err) {
    console.error("Toggle access error:", err);
    setError("Failed to update access");
  }

  setConfirmOpen(false);
};


const handleExtendExpiry = async (expiryDate) => {
  if (!selectedTole) return;

  try {
    const userId = 1; // from auth later

    // normalize date (optional but safe)
    const formattedDate = new Date(expiryDate)
      .toISOString()
      .split("T")[0];

    const response = await toleApi.extendExpiry({
      ToleID: selectedTole.ToleID,
      UserID: userId,
      Flag: "ex",
      ExpiryDate: formattedDate
    });

    if (response.StatusCode === 200) {
      setSuccess("Expiry date extended successfully!");
      fetchToes();
      setOpenExtend(false);
    } else {
      setError(response.Message || "Failed to extend expiry");
    }
  } catch (err) {
    console.error(err);
    setError("Failed to extend expiry");
  }
};


  const handleOpenForm = (mode = "create", tole = null) => {
    setFormMode(mode);
    setSelectedTole(tole);
    setOpenForm(true);
  };

  const handleOpenView = (tole) => {
    setSelectedTole(tole);
    setOpenView(true);
  };

  const handleOpenExtend = (tole) => {
    setSelectedTole(tole);
    setOpenExtend(true);
  };

  const confirmActionDialog = (action, tole, message) => {
    setSelectedTole(tole);
    setConfirmAction(action);
    setConfirmMessage(message);
    setConfirmOpen(true);
  };

  // Filter and search
  const filteredToes = toes.filter(tole => {
    const matchesSearch = 
      tole.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tole.ToleID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tole.Contact?.includes(searchTerm);

    const matchesStatus = 
      filterStatus === "all" ||
      (filterStatus === "active" && tole.AllowApp === "Y") ||
      (filterStatus === "inactive" && tole.AllowApp === "N") ||
      (filterStatus === "expired" && new Date(tole.ExpiryDate) < new Date());

    return matchesSearch && matchesStatus;
  });

  const paginatedToes = filteredToes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getStatusColor = (status, expiryDate) => {
    if (status === "N") return "error";
    if (new Date(expiryDate) < new Date()) return "warning";
    return "success";
  };

  const getStatusText = (status, expiryDate) => {
    if (status === "N") return "Disabled";
    if (new Date(expiryDate) < new Date()) return "Expired";
    return "Active";
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Tole Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage all tole data and configurations
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenForm("create")}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`
            }}
          >
            Add New Tole
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Toles
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {toes.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: alpha(theme.palette.success.main, 0.1) }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Active
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {toes.filter(t => t.AllowApp === "Y" && new Date(t.ExpiryDate) > new Date()).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1) }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Expired
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {toes.filter(t => new Date(t.ExpiryDate) < new Date()).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: alpha(theme.palette.error.main, 0.1) }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Disabled
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {toes.filter(t => t.AllowApp === "N").length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filter */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by name, ID, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Disabled</MenuItem>
                  <MenuItem value="expired">Expired</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  startIcon={<RefreshIcon />}
                  onClick={fetchToes}
                  variant="outlined"
                  fullWidth
                >
                  Refresh
                </Button>
                <Button
                  startIcon={<DownloadIcon />}
                  variant="outlined"
                  fullWidth
                >
                  Export
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Loading State */}
      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ bgcolor: theme.palette.background.default }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Tole ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Logo</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Expiry Date</TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedToes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No toles found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedToes.map((tole) => (
                <TableRow key={tole.ToleID} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="500">
                      {tole.ToleID}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Avatar
                      src={tole.Logo || "/default-logo.png"}
                      sx={{ width: 40, height: 40, border: `2px solid ${theme.palette.divider}` }}
                    >
                      <StoreIcon />
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="500">
                      {tole.Name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {tole.Address}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PhoneIcon fontSize="small" color="action" />
                      <Typography variant="body2">{tole.Contact}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {tole.Email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(tole.AllowApp, tole.ExpiryDate)}
                      color={getStatusColor(tole.AllowApp, tole.ExpiryDate)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        {new Date(tole.ExpiryDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenView(tole)}
                          sx={{ color: theme.palette.info.main }}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenForm("edit", tole)}
                          sx={{ color: theme.palette.warning.main }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      
                      {tole.AllowApp === "Y" ? (
                        <Tooltip title="Disable">
                          <IconButton
                            size="small"
                            onClick={() => confirmActionDialog("disable", tole, `Disable ${tole.Name}?`)}
                            sx={{ color: theme.palette.error.main }}
                          >
                            <BlockIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Enable">
                          <IconButton
                            size="small"
                            onClick={() => confirmActionDialog("enable", tole, `Enable ${tole.Name}?`)}
                            sx={{ color: theme.palette.success.main }}
                          >
                            <AllowIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      
                      <Tooltip title="Extend Expiry">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenExtend(tole)}
                          sx={{ color: theme.palette.primary.main }}
                        >
                          <CalendarIcon />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => confirmActionDialog("delete", tole, `Delete ${tole.Name}?`)}
                          sx={{ color: theme.palette.error.main }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredToes.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[10, 25, 50]}
      />

      {/* Dialogs */}
      <ToleForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={formMode === "create" ? handleCreateTole : handleUpdateTole}
        mode={formMode}
        initialData={selectedTole}
      />

      <ViewToleDialog
        open={openView}
        onClose={() => setOpenView(false)}
        tole={selectedTole}
      />

      <ExtendExpiryDialog
        open={openExtend}
        onClose={() => setOpenExtend(false)}
        onSubmit={handleExtendExpiry}
        tole={selectedTole}
      />

      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          switch (confirmAction) {
            case "delete":
              handleDeleteTole();
              break;
            case "enable":
              handleToggleAccess("Y");
              break;
            case "disable":
              handleToggleAccess("N");
              break;
          }
        }}
        title="Confirm Action"
        message={confirmMessage}
      />

      {/* Notifications */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setError("")} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSuccess("")} severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ToleManagement;