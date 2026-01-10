import { Box, Toolbar, Container, Typography } from "@mui/material";
import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";

const drawerWidth = 280;

const UserLayout = ({ children }) => {
  return (
    <Box sx={{ 
      display: "flex", 
      minHeight: "100vh", 
      bgcolor: "background.default",
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      overflowX: 'hidden',
    }}>
      <UserSidebar />

      <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            minHeight: "100vh",
          }}
        >
        <UserNavbar />
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }} />

        {/* Main Content Container */}
        <Box
          sx={{
            flex: 1,
            width: '100%',
            maxWidth: '100%',
            py: { xs: 2, sm: 3, md: 4 },
            px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', lg: '1400px', xl: '1600px' },
              mx: 'auto',
              position: 'relative',
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserLayout;