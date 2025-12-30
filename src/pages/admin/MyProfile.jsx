import { useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Card,
  CardContent,
  IconButton,
  Divider,
  Chip,
  Stack,
  alpha,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Edit as EditIcon,
  Key as KeyIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  Work as WorkIcon,
  Language as LanguageIcon,
  Public as PublicIcon,
  Bloodtype as BloodIcon,
  Close as CloseIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import AdminLayout from "../../components/admin/AdminLayout";
import { changePassword } from "../../api/authApi";

const MyProfile = () => {
  const theme = useTheme();
  const storedUser = JSON.parse(localStorage.getItem("adminUser"));
  const profile = storedUser?.loginLst?.[0];
  const [activeTab, setActiveTab] = useState(0);
  
  const [openPwdModal, setOpenPwdModal] = useState(false);
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  if (!profile) {
    return (
      <AdminLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <Typography color="error" variant="h6">
            Profile data not found
          </Typography>
        </Box>
      </AdminLayout>
    );
  }

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!oldPwd || !newPwd || !confirmPwd) {
      setError("All fields are required");
      return;
    }

    if (newPwd !== confirmPwd) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const payload = {
        ToleID: profile.ToleID,
        UserID: profile.UserID,
        OldPwd: oldPwd,
        NewPwd: newPwd,
      };

      const res = await changePassword(payload);

      if (res?.StatusCode !== 200) {
        setError(res?.Message || "Failed to change password");
        return;
      }

      setSuccess("Password changed successfully");
      setOldPwd("");
      setNewPwd("");
      setConfirmPwd("");

      setTimeout(() => {
        setOpenPwdModal(false);
        setSuccess("");
      }, 1500);

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  const ProfileCard = ({ title, icon, children, color = "primary" }) => (
    <Card sx={{ 
      borderRadius: 3,
      border: `1px solid ${alpha(theme.palette[color].main, 0.1)}`,
      background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.05)} 0%, ${alpha(theme.palette[color].main, 0.02)} 100%)`,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 8px 32px ${alpha(theme.palette[color].main, 0.15)}`,
      }
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ 
            p: 1, 
            borderRadius: 2, 
            mr: 2,
            background: `linear-gradient(135deg, ${theme.palette[color].main} 0%, ${theme.palette[color].dark} 100%)`,
            color: 'white'
          }}>
            {icon}
          </Box>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  );

  const InfoItem = ({ icon, label, value, color = "text.secondary" }) => (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2.5 }}>
      <Box sx={{ mr: 2, mt: 0.5, color: theme.palette.primary.main }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          {value || '-'}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <AdminLayout>
      {/* Header with Background */}
      <Box sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        borderRadius: 3,
        p: 4,
        mb: 3,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${alpha('#fff', 0.1)} 0%, transparent 70%)`,
          borderRadius: '50%',
          transform: 'translate(30%, -30%)',
        }
      }}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                My Profile
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Manage your personal information and account settings
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                onClick={() => setIsEditing(!isEditing)}
                startIcon={<EditIcon />}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.2)',
                    borderColor: 'rgba(255,255,255,0.5)',
                  }
                }}
              >
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpenPwdModal(true)}
                startIcon={<KeyIcon />}
                sx={{
                  bgcolor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: alpha('#fff', 0.9),
                  }
                }}
              >
                Change Password
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Profile Info */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Box sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              p: 3,
              textAlign: 'center',
              color: 'white'
            }}>
              <Avatar
                src={profile.UserImage}
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  border: '4px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                }}
              />
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {profile.FirstName} {profile.LastName}
              </Typography>
              <Chip
                label={`@${profile.UserName}`}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 500
                }}
              />
            </Box>
            
            <CardContent>
              <InfoItem 
                icon={<EmailIcon />} 
                label="Email" 
                value={profile.Email} 
              />
              <InfoItem 
                icon={<PhoneIcon />} 
                label="Contact" 
                value={profile.Contact} 
              />
              <InfoItem 
                icon={profile.Gender === 'Male' ? <MaleIcon /> : <FemaleIcon />} 
                label="Gender" 
                value={profile.Gender} 
              />
              <InfoItem 
                icon={<CalendarIcon />} 
                label="Birth Date (AD)" 
                value={profile.BirthAD} 
              />
              <InfoItem 
                icon={<BloodIcon />} 
                label="Blood Group" 
                value={profile.BloodGroup} 
              />
              <InfoItem 
                icon={<WorkIcon />} 
                label="Profession" 
                value={profile.Profession} 
              />
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <ProfileCard 
            title="Account Stats" 
            icon={<KeyIcon />}
            color="info"
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 1.5 }}>
                  <Typography variant="h4" fontWeight={700} color="primary.main">
                    42
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Communities
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 1.5 }}>
                  <Typography variant="h4" fontWeight={700} color="success.main">
                    156
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Activities
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </ProfileCard>
        </Grid>

        {/* Right Column - Detailed Info */}
        <Grid item xs={12} md={8}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ mb: 3 }}
          >
            <Tab label="Personal Details" />
            <Tab label="Address Information" />
            <Tab label="Tole Information" />
          </Tabs>

          {activeTab === 0 && (
            <ProfileCard title="Personal Details" icon={<CalendarIcon />}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <InfoItem 
                    icon={<LanguageIcon />}
                    label="Nationality"
                    value={profile.Nationality}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem 
                    icon={<WorkIcon />}
                    label="Profession"
                    value={profile.Profession}
                  />
                </Grid>
                {/* Add more personal info fields here */}
              </Grid>
            </ProfileCard>
          )}

          {activeTab === 1 && (
            <ProfileCard title="Address Information" icon={<LocationIcon />}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <InfoItem 
                    icon={<LocationIcon />}
                    label="Permanent Address"
                    value={profile.PermAddress}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InfoItem 
                    icon={<LocationIcon />}
                    label="Temporary Address"
                    value={profile.TempAddress}
                  />
                </Grid>
              </Grid>
            </ProfileCard>
          )}

          {activeTab === 2 && (
            <ProfileCard title="Tole Information" icon={<PublicIcon />}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <InfoItem 
                    icon={<LocationIcon />}
                    label="Tole Name"
                    value={profile.ToleName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem 
                    icon={<LocationIcon />}
                    label="District"
                    value={profile.ToleDistrict}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem 
                    icon={<LocationIcon />}
                    label="Municipality"
                    value={profile.ToleMunicipality}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem 
                    icon={<LocationIcon />}
                    label="Ward"
                    value={profile.ToleWoda}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem 
                    icon={<PhoneIcon />}
                    label="Contact"
                    value={profile.ToleContact}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem 
                    icon={<EmailIcon />}
                    label="Email"
                    value={profile.ToleEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InfoItem 
                    icon={<PublicIcon />}
                    label="Website"
                    value={profile.ToleWebsite}
                  />
                </Grid>
              </Grid>
            </ProfileCard>
          )}

          {/* Additional Information Card */}
          <ProfileCard 
            title="Additional Information" 
            icon={<EditIcon />}
            color="secondary"
            sx={{ mt: 3 }}
          >
            <Typography variant="body2" color="text.secondary" paragraph>
              Member since {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
              fullWidth
            >
              Update Profile Information
            </Button>
          </ProfileCard>
        </Grid>
      </Grid>

      {/* Enhanced Change Password Modal */}
      <Dialog
        open={openPwdModal}
        onClose={() => setOpenPwdModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden',
          }
        }}
      >
        <Box sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <KeyIcon />
            </Box>
            <DialogTitle sx={{ color: 'white', p: 0, fontWeight: 600 }}>
              Change Password
            </DialogTitle>
          </Box>
          <IconButton onClick={() => setOpenPwdModal(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 3 }}>
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                border: `1px solid ${theme.palette.error.light}`,
              }}
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                border: `1px solid ${theme.palette.success.light}`,
              }}
            >
              {success}
            </Alert>
          )}

          <TextField
            label="Old Password"
            type="password"
            fullWidth
            margin="normal"
            value={oldPwd}
            onChange={(e) => setOldPwd(e.target.value)}
            InputProps={{
              sx: { borderRadius: 2 }
            }}
            variant="outlined"
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            InputProps={{
              sx: { borderRadius: 2 }
            }}
            variant="outlined"
          />

          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            InputProps={{
              sx: { borderRadius: 2 }
            }}
            variant="outlined"
          />

          <Box sx={{ mt: 3, p: 2, bgcolor: alpha(theme.palette.info.main, 0.1), borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">
              <strong>Password Requirements:</strong> Minimum 8 characters, including uppercase, lowercase, and numbers.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            onClick={() => setOpenPwdModal(false)}
            sx={{ 
              borderRadius: 2,
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleChangePassword}
            startIcon={<SaveIcon />}
            sx={{ 
              borderRadius: 2,
              px: 3
            }}
          >
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default MyProfile;