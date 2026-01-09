import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Badge,
  InputBase,
  Paper,
  alpha,
  useTheme,
  Button,
} from "@mui/material";
import { 
  Logout, 
  Person, 
  Search, 
  Notifications,
  Settings, 
  Mail,
  Menu as MenuIcon,
  Dashboard,
  Help,
  DarkMode,
  LightMode,
  Home,
  Login,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

const SearchBar = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: 500,
  padding: theme.spacing(0.5, 2),
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    boxShadow: theme.shadows[2],
  },
}));

const UserNavbar = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Check login status on component mount and when user changes
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    handleMenuClose();
    navigate("/", { replace: true });
  };

  const fullName = user ? `${user?.FirstName || ""} ${user?.LastName || ""}` : "Guest";
  const userInitial = user?.FirstName?.[0]?.toUpperCase() || "G";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { sm: isLoggedIn ? `calc(100% - ${collapsed ? 80 : 280}px)` : '100%' },
        ml: { sm: isLoggedIn ? `${collapsed ? 80 : 280}px` : 0 },
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(10px)',
        background: theme.palette.mode === 'dark' 
          ? 'rgba(18, 18, 18, 0.9)' 
          : 'rgba(255, 255, 255, 0.95)',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar sx={{ 
        minHeight: { xs: 56, sm: 64 },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        {/* Left Section - Logo/Branding */}
        <Box display="flex" alignItems="center" gap={2} sx={{ flexGrow: 1 }}>
          {/* Sidebar Toggle (Only when logged in) */}
          {isLoggedIn && (
            <IconButton
              onClick={toggleSidebar}
              sx={{ 
                display: { xs: 'none', sm: 'flex' },
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box 
            display="flex" 
            alignItems="center" 
            gap={1.5}
            onClick={() => navigate(isLoggedIn ? "/user/dashboard" : "/")}
            sx={{ cursor: 'pointer' }}
          >
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}>
              {isLoggedIn ? <Dashboard /> : <Home />}
            </Box>
            <Box>
              <Typography 
                variant="h6" 
                fontWeight={700} 
                color="primary"
                sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
              >
                {isLoggedIn ? (user?.ToleName || "Tole System") : "Smart Tole"}
              </Typography>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                {isLoggedIn 
                  ? `Welcome back, ${user?.FirstName || "User"}!` 
                  : "Community Management Platform"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Center Section - Search Bar (Only when logged in) */}
        {isLoggedIn && (
          <Box sx={{ 
            display: { xs: searchOpen ? 'flex' : 'none', md: 'flex' },
            flexGrow: 1,
            justifyContent: 'center',
            mx: 3
          }}>
            <SearchBar elevation={0}>
              <Search 
                sx={{ 
                  color: 'text.secondary', 
                  mr: 1,
                  fontSize: 20 
                }} 
              />
              <InputBase
                placeholder="Search complaints, events, or documents..."
                sx={{ 
                  flex: 1,
                  fontSize: '0.95rem',
                  '& input': {
                    py: 0.5,
                  }
                }}
                size="small"
              />
            </SearchBar>
          </Box>
        )}

        {/* Right Section - Actions */}
        <Box display="flex" alignItems="center" gap={{ xs: 0.5, sm: 1 }}>
          
          {isLoggedIn ? (
            // =========== LOGGED IN VIEW ===========
            <>
              {/* Search Toggle for Mobile */}
              <IconButton 
                onClick={toggleSearch}
                sx={{ 
                  display: { xs: 'flex', md: 'none' },
                  color: 'text.secondary'
                }}
              >
                <Search />
              </IconButton>

              {/* Theme Toggle */}
              <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
                <IconButton
                  onClick={() => setDarkMode(!darkMode)}
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    }
                  }}
                >
                  {darkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Tooltip>

              {/* Help */}
              <Tooltip title="Help & Support">
                <IconButton
                  onClick={() => navigate("/user/help")}
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    }
                  }}
                >
                  <Help />
                </IconButton>
              </Tooltip>

              {/* Notifications */}
              <Tooltip title="Notifications">
                <IconButton sx={{ position: 'relative' }}>
                  <Badge 
                    badgeContent={5} 
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: 10,
                        height: 18,
                        minWidth: 18,
                      }
                    }}
                  >
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Messages */}
              <Tooltip title="Messages">
                <IconButton sx={{ position: 'relative' }}>
                  <Badge 
                    badgeContent={2} 
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: 10,
                        height: 18,
                        minWidth: 18,
                      }
                    }}
                  >
                    <Mail />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Profile Menu */}
              <Tooltip title="Account Settings">
                <IconButton 
                  onClick={handleMenuOpen}
                  sx={{ 
                    ml: { xs: 0.5, sm: 1 },
                    p: 0.5,
                    '&:hover': {
                      transform: 'scale(1.05)',
                      transition: 'transform 0.2s ease',
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: { xs: 36, sm: 40 },
                      height: { xs: 36, sm: 40 },
                      fontWeight: 600,
                      border: '2px solid',
                      borderColor: 'background.paper',
                      boxShadow: theme.shadows[3],
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    {userInitial}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  elevation: 8,
                  sx: {
                    mt: 1.5,
                    minWidth: 250,
                    borderRadius: 2,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.15))',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    }
                  }
                }}
              >
                {/* User Info Section */}
                <Box sx={{ p: 2, pb: 1 }}>
                  <Typography variant="subtitle1" fontWeight={700} noWrap>
                    {fullName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {user?.Email || "user@example.com"}
                  </Typography>
                  <Typography variant="caption" display="block" color="primary.main" sx={{ mt: 0.5 }}>
                    {user?.ToleName || "Tole Resident"}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                {/* Menu Items */}
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/user/dashboard");
                  }}
                  sx={{ 
                    py: 1.5, 
                    px: 2,
                    borderRadius: 1,
                    mx: 1,
                    mb: 0.5,
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                    }
                  }}
                >
                  <Dashboard fontSize="small" sx={{ mr: 2, color: 'text.secondary' }} />
                  Dashboard
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/user/profile");
                  }}
                  sx={{ 
                    py: 1.5, 
                    px: 2,
                    borderRadius: 1,
                    mx: 1,
                    mb: 0.5,
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                    }
                  }}
                >
                  <Person fontSize="small" sx={{ mr: 2, color: 'text.secondary' }} />
                  My Profile
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/user/settings");
                  }}
                  sx={{ 
                    py: 1.5, 
                    px: 2,
                    borderRadius: 1,
                    mx: 1,
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                    }
                  }}
                >
                  <Settings fontSize="small" sx={{ mr: 2, color: 'text.secondary' }} />
                  Settings
                </MenuItem>

                <Divider sx={{ my: 1 }} />

                {/* Logout */}
                <MenuItem 
                  onClick={handleLogout} 
                  sx={{ 
                    py: 1.5, 
                    px: 2,
                    borderRadius: 1,
                    mx: 1,
                    color: 'error.main',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.error.main, 0.08),
                    }
                  }}
                >
                  <Logout fontSize="small" sx={{ mr: 2 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            // =========== LOGGED OUT VIEW ===========
            <>
              {/* Navigation Links for Public Users */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                <Button
                  onClick={() => navigate("/")}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500,
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  Home
                </Button>
                <Button
                  onClick={() => navigate("/features")}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500,
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  Features
                </Button>
                <Button
                  onClick={() => navigate("/about")}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500,
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  About
                </Button>
              </Box>

              {/* Theme Toggle (Visible in both states) */}
              <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
                <IconButton
                  onClick={() => setDarkMode(!darkMode)}
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    }
                  }}
                >
                  {darkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Tooltip>

              {/* Login/Register Buttons */}
              <Button
                variant="outlined"
                onClick={() => navigate("/login")}
                startIcon={<Login />}
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  borderRadius: 2,
                  fontWeight: 600,
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  }
                }}
              >
                Login
              </Button>
              
              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  px: 3,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                  '&:hover': {
                    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get Started
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default UserNavbar;