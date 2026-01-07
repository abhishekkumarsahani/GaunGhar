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
  IconButton,
  Switch,
  Grid,
  Avatar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  DialogContentText,
  Tabs,
  Tab,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";

import { Add, Edit, Delete, LockReset, Image, Visibility, Save } from "@mui/icons-material";
import AdminLayout from "../../components/admin/AdminLayout";
import { userApi } from "../../api/userApi";

const Users = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"))?.loginLst?.[0];

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [viewImageFile, setViewImageFile] = useState(null);
  const [resetPassword, setResetPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [resetError, setResetError] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    Title: "Mr.",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    UserName: "",
    Password: "Elite@123",
    Contact: "",
    Phone: "",
    Email: "",
    UserType: "Admin",
    Gender: "M",
    AllowApp: "Y",
    UserImage: "",
    BirthAD: "",
    BirthBS: "",
    Nationality: "Nepalese",
    PAN: "",
    Religion: "H",
    MaritalStatus: "S",
    BloodGroup: "O+",
    FatherName: "",
    MotherName: "",
    GrandFatherName: "",
    EdQualification: "",
    EdStatus: "",
    Profession: "",
    PermAddress: "",
    PerProvince: 3,
    PerDistrict: 1,
    PerMunicipality: 1,
    PerWard: 5,
    PerHouse: 15,
    TempAddress: "",
    TempProvince: 3,
    TempDistrict: 1,
    TempMunicipality: 2,
    TempWard: 6,
    TempHouse: 21,
  });

  // ================= LOAD USERS =================
  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await userApi({
        ToleID: user?.ToleID || "ES25",
        Flag: "S",
        UserID: user?.UserID || 1,
      });

      if (res.StatusCode === 200) {
        setRows(res.userLst || []);
      } else {
        setError(res.Message || "Failed to load users");
      }
    } catch (error) {
      setError("Error loading users: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ================= LOAD USER DETAILS =================
  const loadUserDetails = async (userData) => {
    try {
      setLoading(true);
      const res = await userApi({
        ToleID: user?.ToleID || "ES25",
        Flag: "SI",
        UserID: userData.UserID,
        MemID: userData.UserID,
      });

      if (res.StatusCode === 200 && res.userLst && res.userLst.length > 0) {
        setUserDetails(res.userLst[0]);
        setOpenViewDialog(true);
      } else {
        setError(res.Message || "Failed to load user details");
      }
    } catch (error) {
      setError("Error loading user details: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= IMAGE TO BASE64 =================
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      setForm({ ...form, UserImage: base64String });
    };
    reader.readAsDataURL(file);
  };

  // ================= HANDLE VIEW IMAGE UPLOAD =================
  const handleViewImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setViewImageFile(file);
    
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      
      // Update user details with new image
      setUserDetails(prev => ({
        ...prev,
        UserImage: base64String
      }));
    };
    reader.readAsDataURL(file);
  };

  // ================= UPDATE USER IMAGE =================
  const updateUserImage = async () => {
    if (!userDetails || !userDetails.UserImage) {
      setError("No image selected");
      return;
    }

    try {
      const res = await userApi({
        ToleId: user?.ToleID || "ES25",
        UserId: user?.UserID || 1,
        MemId: userDetails.UserID,
        Flag: "UI",
        UserImage: userDetails.UserImage,
      });

      if (res.StatusCode === 200) {
        alert("User image updated successfully");
        setViewImageFile(null);
        loadUsers(); // Refresh the list
      } else {
        setError(res.Message || "Failed to update image");
      }
    } catch (error) {
      setError("Error updating image: " + error.message);
    }
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      setError("");
      
      if (!form.FirstName || !form.LastName || !form.UserName) {
        setError("First Name, Last Name, and Username are required");
        return;
      }

      if (!editData && !form.Password) {
        setError("Password is required for new user");
        return;
      }

      const payload = {
        ToleID: user?.ToleID || "ES25",
        UserID: user?.UserID || 1,
        Flag: editData ? "U" : "I",
        MemID: editData?.UserID,
        Title: form.Title,
        FirstName: form.FirstName,
        MiddleName: form.MiddleName,
        LastName: form.LastName,
        UserName: form.UserName,
        Password: form.Password,
        Contact: form.Contact,
        Phone: form.Phone || form.Contact,
        Email: form.Email,
        UserType: form.UserType,
        Gender: form.Gender,
        AllowApp: form.AllowApp,
        BirthAD: form.BirthAD || "1994-04-01",
        BirthBS: form.BirthBS || "2050-12-15",
        Nationality: form.Nationality,
        PAN: form.PAN,
        Religion: form.Religion,
        MaritalStatus: form.MaritalStatus,
        BloodGroup: form.BloodGroup,
        FatherName: form.FatherName,
        MotherName: form.MotherName,
        GrandFatherName: form.GrandFatherName,
        EdQualification: form.EdQualification,
        EdStatus: form.EdStatus,
        Profession: form.Profession,
        PermAddress: form.PermAddress,
        PerProvince: form.PerProvince,
        PerDistrict: form.PerDistrict,
        PerMunicipality: form.PerMunicipality,
        PerWard: form.PerWard,
        PerHouse: form.PerHouse,
        TempAddress: form.TempAddress,
        TempProvince: form.TempProvince,
        TempDistrict: form.TempDistrict,
        TempMunicipality: form.TempMunicipality,
        TempWard: form.TempWard,
        TempHouse: form.TempHouse,
      };

      if (form.UserImage) {
        payload.UserImage = form.UserImage;
      }

      const res = await userApi(payload);

      if (res.StatusCode !== 200) {
        setError(res.Message || "Operation failed");
        return;
      }

      setOpen(false);
      setEditData(null);
      setImageFile(null);
      resetForm();
      loadUsers();
      alert(editData ? "User updated successfully" : "User created successfully");
    } catch (error) {
      setError("Error saving user: " + error.message);
    }
  };

  // ================= RESET FORM =================
  const resetForm = () => {
    setForm({
      Title: "Mr.",
      FirstName: "",
      MiddleName: "",
      LastName: "",
      UserName: "",
      Password: "Elite@123",
      Contact: "",
      Phone: "",
      Email: "",
      UserType: "Admin",
      Gender: "M",
      AllowApp: "Y",
      UserImage: "",
      BirthAD: "",
      BirthBS: "",
      Nationality: "Nepalese",
      PAN: "",
      Religion: "H",
      MaritalStatus: "S",
      BloodGroup: "O+",
      FatherName: "",
      MotherName: "",
      GrandFatherName: "",
      EdQualification: "",
      EdStatus: "",
      Profession: "",
      PermAddress: "",
      PerProvince: 3,
      PerDistrict: 1,
      PerMunicipality: 1,
      PerWard: 5,
      PerHouse: 15,
      TempAddress: "",
      TempProvince: 3,
      TempDistrict: 1,
      TempMunicipality: 2,
      TempWard: 6,
      TempHouse: 21,
    });
  };

  // ================= ALLOW / DISALLOW =================
  const toggleAllow = async (row) => {
    try {
      const newAllowApp = row.AllowApp === "Y" ? "N" : "Y";
      
      await userApi({
        ToleId: user?.ToleID || "ES25",
        UserId: user?.UserID || 1,
        MemId: row.UserID,
        Flag: "AD",
        AllowApp: newAllowApp,
      });
      
      loadUsers();
    } catch (error) {
      setError("Error updating permission: " + error.message);
    }
  };

  // ================= OPEN RESET PASSWORD DIALOG =================
  const openResetPasswordDialog = (row) => {
    setSelectedUser(row);
    setResetPassword({
      newPassword: "",
      confirmPassword: "",
    });
    setResetError("");
    setOpenResetDialog(true);
  };

  // ================= SUBMIT PASSWORD RESET =================
  const submitPasswordReset = async () => {
    try {
      setResetError("");

      if (!resetPassword.newPassword) {
        setResetError("New password is required");
        return;
      }

      if (resetPassword.newPassword.length < 6) {
        setResetError("Password must be at least 6 characters long");
        return;
      }

      if (resetPassword.newPassword !== resetPassword.confirmPassword) {
        setResetError("Passwords do not match");
        return;
      }

      const res = await userApi({
        ToleId: user?.ToleID || "ES25",
        UserId: user?.UserID || 1,
        MemId: selectedUser.UserID,
        Flag: "RP",
        Password: resetPassword.newPassword,
      });

      if (res.StatusCode === 200) {
        alert("Password reset successfully");
        setOpenResetDialog(false);
        setSelectedUser(null);
        setResetPassword({
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setResetError(res.Message || "Failed to reset password");
      }
    } catch (error) {
      setResetError("Error resetting password: " + error.message);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (row) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;

    try {
      const res = await userApi({
        ToleId: user?.ToleID || "ES25",
        UserId: user?.UserID || 1,
        MemId: row.UserID,
        Flag: "R",
      });

      if (res.StatusCode === 200) {
        loadUsers();
        alert("User removed successfully");
      } else {
        alert("Failed to remove user: " + res.Message);
      }
    } catch (error) {
      alert("Error removing user: " + error.message);
    }
  };

  // ================= EDIT USER =================
  const handleEdit = (row) => {
    setEditData(row);
    setForm({
      Title: row.Title || "Mr.",
      FirstName: row.FirstName || "",
      MiddleName: row.MiddleName || "",
      LastName: row.LastName || "",
      UserName: row.UserName || "",
      Password: "",
      Contact: row.Contact || "",
      Phone: row.Phone || "",
      Email: row.Email || "",
      UserType: row.UserType || "Admin",
      Gender: row.Gender || "M",
      AllowApp: row.AllowApp || "Y",
      UserImage: "",
      BirthAD: row.BirthAD || "",
      BirthBS: row.BirthBS || "",
      Nationality: row.Nationality || "Nepalese",
      PAN: row.PAN || "",
      Religion: row.Religion || "H",
      MaritalStatus: row.MaritalStatus || "S",
      BloodGroup: row.BloodGroup || "O+",
      FatherName: row.FatherName || "",
      MotherName: row.MotherName || "",
      GrandFatherName: row.GrandFatherName || "",
      EdQualification: row.EdQualification || "",
      EdStatus: row.EdStatus || "",
      Profession: row.Profession || "",
      PermAddress: row.PermAddress || "",
      PerProvince: row.PerProvince || 3,
      PerDistrict: row.PerDistrict || 1,
      PerMunicipality: row.PerMunicipality || 1,
      PerWard: row.PerWard || 5,
      PerHouse: row.PerHouse || 15,
      TempAddress: row.TempAddress || "",
      TempProvince: row.TempProvince || 3,
      TempDistrict: row.TempDistrict || 1,
      TempMunicipality: row.TempMunicipality || 2,
      TempWard: row.TempWard || 6,
      TempHouse: row.TempHouse || 21,
    });
    setImageFile(null);
    setOpen(true);
  };

  // ================= FORMAT FIELD NAME =================
  const formatFieldName = (fieldName) => {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  // ================= RENDER USER DETAILS =================
  const renderUserDetails = () => {
    if (!userDetails) return null;

    const basicInfoFields = [
      'UserID', 'Title', 'FirstName', 'MiddleName', 'LastName', 'UserName',
      'Contact', 'Phone', 'Email', 'Gender', 'BirthBS', 'BirthAD',
      'Nationality', 'PAN', 'Religion', 'MaritalStatus', 'BloodGroup',
      'FatherName', 'MotherName', 'GrandFatherName', 'EdQualification',
      'EdStatus', 'Profession', 'AllowApp'
    ];

    const addressFields = [
      'PermAddress', 'PerProvince', 'PerDistrict', 'PerMunicipality',
      'PerWard', 'PerHouse', 'TempAddress', 'TempProvince', 'TempDistrict',
      'TempMunicipality', 'TempWard', 'TempHouse'
    ];

    const basicInfo = {};
    const addressInfo = {};

    Object.entries(userDetails).forEach(([key, value]) => {
      if (basicInfoFields.includes(key)) {
        basicInfo[key] = value;
      } else if (addressFields.includes(key)) {
        addressInfo[key] = value;
      }
    });

    return (
      <Box>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="Basic Info" />
          <Tab label="Address Info" />
          <Tab label="Image" />
        </Tabs>

        {activeTab === 0 && (
          <Grid container spacing={2}>
            {Object.entries(basicInfo).map(([key, value]) => (
              <Grid item xs={6} key={key}>
                <TextField
                  label={formatFieldName(key)}
                  value={value || "N/A"}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Permanent Address</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            {Object.entries(addressInfo)
              .filter(([key]) => key.startsWith('Per') || key === 'PermAddress')
              .map(([key, value]) => (
                <Grid item xs={6} key={key}>
                  <TextField
                    label={formatFieldName(key)}
                    value={value || "N/A"}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </Grid>
              ))}
            
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Temporary Address</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            {Object.entries(addressInfo)
              .filter(([key]) => key.startsWith('Temp'))
              .map(([key, value]) => (
                <Grid item xs={6} key={key}>
                  <TextField
                    label={formatFieldName(key)}
                    value={value || "N/A"}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </Grid>
              ))}
          </Grid>
        )}

        {activeTab === 2 && (
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              src={userDetails.UserImage ? `data:image/jpeg;base64,${userDetails.UserImage}` : null}
              sx={{ width: 200, height: 200, margin: '0 auto 20px' }}
            >
              {userDetails.FirstName?.charAt(0) || userDetails.UserName?.charAt(0) || "U"}
            </Avatar>
            
            <Box sx={{ mt: 3 }}>
              <Button
                component="label"
                startIcon={<Image />}
                variant="outlined"
                sx={{ mr: 2 }}
              >
                Change Image
                <input 
                  hidden 
                  type="file" 
                  accept="image/*" 
                  onChange={handleViewImage} 
                />
              </Button>
              
              <Button
                startIcon={<Save />}
                variant="contained"
                onClick={updateUserImage}
                disabled={!userDetails.UserImage || typeof userDetails.UserImage !== 'string'}
              >
                Update Image
              </Button>
              
              {viewImageFile && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Selected: {viewImageFile.name}
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <AdminLayout>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">User Management</Typography>
        <Button 
          startIcon={<Add />} 
          variant="contained" 
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
        >
          Add User
        </Button>
      </Box>

      {error && <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>{error}</Alert>}

      <Paper  sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>User</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Username</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Contact</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Allow App</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.UserID}>
                  <TableCell>{row.UserID}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar 
                        src={row.UserImage ? `data:image/jpeg;base64,${row.UserImage}` : null}
                      >
                        {row.FirstName?.charAt(0) || row.UserName?.charAt(0) || "U"}
                      </Avatar>
                      {`${row.FirstName || ''} ${row.LastName || ''}`.trim() || row.UserName}
                    </Box>
                  </TableCell>
                  <TableCell>{row.UserName || "N/A"}</TableCell>
                  <TableCell>{row.Contact || "N/A"}</TableCell>
                  <TableCell>{row.Email || "N/A"}</TableCell>
                  <TableCell>
                    <Switch
                      checked={row.AllowApp === "Y"}
                      onChange={() => toggleAllow(row)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => loadUserDetails(row)} title="View Details">
                      <Visibility />
                    </IconButton>
                    
                    <IconButton onClick={() => handleEdit(row)} title="Edit">
                      <Edit />
                    </IconButton>

                    <IconButton onClick={() => openResetPasswordDialog(row)} title="Reset Password">
                      <LockReset />
                    </IconButton>

                    <IconButton color="error" onClick={() => handleDelete(row)} title="Delete">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* ================= ADD/EDIT USER MODAL ================= */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{editData ? "Update User" : "Create User"}</DialogTitle>

        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="Basic Info" />
                <Tab label="Address Info" />
              </Tabs>
            </Grid>

            {activeTab === 0 && (
              <>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Title</InputLabel>
                    <Select
                      value={form.Title}
                      label="Title"
                      onChange={(e) => setForm({ ...form, Title: e.target.value })}
                    >
                      <MenuItem value="Mr.">Mr.</MenuItem>
                      <MenuItem value="Mrs.">Mrs.</MenuItem>
                      <MenuItem value="Miss">Miss</MenuItem>
                      <MenuItem value="Dr.">Dr.</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={form.Gender}
                      label="Gender"
                      onChange={(e) => setForm({ ...form, Gender: e.target.value })}
                    >
                      <MenuItem value="M">Male</MenuItem>
                      <MenuItem value="F">Female</MenuItem>
                      <MenuItem value="O">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>User Type</InputLabel>
                    <Select
                      value={form.UserType}
                      label="User Type"
                      onChange={(e) => setForm({ ...form, UserType: e.target.value })}
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="User">User</MenuItem>
                      <MenuItem value="Guest">Guest</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Allow App</InputLabel>
                    <Select
                      value={form.AllowApp}
                      label="Allow App"
                      onChange={(e) => setForm({ ...form, AllowApp: e.target.value })}
                    >
                      <MenuItem value="Y">Yes</MenuItem>
                      <MenuItem value="N">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <TextField 
                    label="First Name" 
                    fullWidth
                    required
                    value={form.FirstName}
                    onChange={(e) => setForm({ ...form, FirstName: e.target.value })}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField 
                    label="Middle Name" 
                    fullWidth
                    value={form.MiddleName}
                    onChange={(e) => setForm({ ...form, MiddleName: e.target.value })}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField 
                    label="Last Name" 
                    fullWidth
                    required
                    value={form.LastName}
                    onChange={(e) => setForm({ ...form, LastName: e.target.value })}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField 
                    label="Username" 
                    fullWidth
                    required
                    value={form.UserName}
                    onChange={(e) => setForm({ ...form, UserName: e.target.value })}
                  />
                </Grid>

                {!editData && (
                  <Grid item xs={6}>
                    <TextField 
                      label="Password" 
                      type="password" 
                      fullWidth
                      required
                      value={form.Password}
                      onChange={(e) => setForm({ ...form, Password: e.target.value })}
                      helperText="Default: Elite@123"
                    />
                  </Grid>
                )}

                <Grid item xs={6}>
                  <TextField 
                    label="Contact" 
                    fullWidth
                    value={form.Contact}
                    onChange={(e) => setForm({ ...form, Contact: e.target.value })}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField 
                    label="Email" 
                    type="email"
                    fullWidth
                    value={form.Email}
                    onChange={(e) => setForm({ ...form, Email: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button 
                    component="label" 
                    startIcon={<Image />}
                    variant="outlined"
                  >
                    {imageFile ? "Change Image" : "Upload Image"}
                    <input 
                      hidden 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImage} 
                    />
                  </Button>
                  {imageFile && (
                    <Typography variant="body2" sx={{ ml: 2, display: 'inline' }}>
                      {imageFile.name}
                    </Typography>
                  )}
                </Grid>
              </>
            )}

            {activeTab === 1 && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Permanent Address</Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField 
                    label="Permanent Address" 
                    fullWidth
                    multiline
                    rows={2}
                    value={form.PermAddress}
                    onChange={(e) => setForm({ ...form, PermAddress: e.target.value })}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField 
                    label="Province" 
                    type="number"
                    fullWidth
                    value={form.PerProvince}
                    onChange={(e) => setForm({ ...form, PerProvince: parseInt(e.target.value) || 0 })}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField 
                    label="District" 
                    type="number"
                    fullWidth
                    value={form.PerDistrict}
                    onChange={(e) => setForm({ ...form, PerDistrict: parseInt(e.target.value) || 0 })}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField 
                    label="Municipality" 
                    type="number"
                    fullWidth
                    value={form.PerMunicipality}
                    onChange={(e) => setForm({ ...form, PerMunicipality: parseInt(e.target.value) || 0 })}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField 
                    label="Ward" 
                    type="number"
                    fullWidth
                    value={form.PerWard}
                    onChange={(e) => setForm({ ...form, PerWard: parseInt(e.target.value) || 0 })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField 
                    label="House Number" 
                    fullWidth
                    value={form.PerHouse}
                    onChange={(e) => setForm({ ...form, PerHouse: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>Temporary Address</Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>

                <Grid item xs={12}>
                  <TextField 
                    label="Temporary Address" 
                    fullWidth
                    multiline
                    rows={2}
                    value={form.TempAddress}
                    onChange={(e) => setForm({ ...form, TempAddress: e.target.value })}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField 
                    label="Province" 
                    type="number"
                    fullWidth
                    value={form.TempProvince}
                    onChange={(e) => setForm({ ...form, TempProvince: parseInt(e.target.value) || 0 })}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField 
                    label="District" 
                    type="number"
                    fullWidth
                    value={form.TempDistrict}
                    onChange={(e) => setForm({ ...form, TempDistrict: parseInt(e.target.value) || 0 })}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField 
                    label="Municipality" 
                    type="number"
                    fullWidth
                    value={form.TempMunicipality}
                    onChange={(e) => setForm({ ...form, TempMunicipality: parseInt(e.target.value) || 0 })}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField 
                    label="Ward" 
                    type="number"
                    fullWidth
                    value={form.TempWard}
                    onChange={(e) => setForm({ ...form, TempWard: parseInt(e.target.value) || 0 })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField 
                    label="House Number" 
                    fullWidth
                    value={form.TempHouse}
                    onChange={(e) => setForm({ ...form, TempHouse: e.target.value })}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editData ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= VIEW USER DETAILS DIALOG ================= */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          User Details
          <Chip 
            label={userDetails?.AllowApp === "Y" ? "Allowed" : "Not Allowed"} 
            color={userDetails?.AllowApp === "Y" ? "success" : "error"}
            size="small"
            sx={{ ml: 2 }}
          />
        </DialogTitle>
        <DialogContent>
          {renderUserDetails()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ================= RESET PASSWORD DIALOG ================= */}
      <Dialog open={openResetDialog} onClose={() => setOpenResetDialog(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Reset password for <strong>{selectedUser?.FirstName} {selectedUser?.LastName}</strong>
          </DialogContentText>

          {resetError && <Alert severity="error" sx={{ mb: 2 }}>{resetError}</Alert>}

          <TextField
            autoFocus
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            required
            value={resetPassword.newPassword}
            onChange={(e) => setResetPassword({...resetPassword, newPassword: e.target.value})}
          />
          
          <TextField
            margin="dense"
            label="Confirm Password"
            type="password"
            fullWidth
            required
            value={resetPassword.confirmPassword}
            onChange={(e) => setResetPassword({...resetPassword, confirmPassword: e.target.value})}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResetDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={submitPasswordReset}
            disabled={!resetPassword.newPassword || !resetPassword.confirmPassword}
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default Users;