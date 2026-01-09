import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  IconButton,
  Stack,
  Paper,
  Divider,
  LinearProgress,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  MoreVert,
  Notifications,
  Event,
  ReportProblem,
  CheckCircle,
  AccessTime,
  CalendarMonth,
  ArrowForward,
  Add,
  Search,
} from "@mui/icons-material";
import UserLayout from "../../components/user/UserLayout";

const StatCard = ({ title, value, icon, trend, subtitle, color = "primary" }) => (
  <Card 
    sx={{ 
      borderRadius: 3,
      height: '100%',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
      }
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box display="flex" alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={700} mt={1}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" mt={0.5}>
              {trend === 'up' ? <TrendingUp fontSize="small" sx={{ color: 'success.main', mr: 0.5 }} /> : 
               trend === 'down' ? <TrendingDown fontSize="small" sx={{ color: 'error.main', mr: 0.5 }} /> : null}
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: `${color}.light`,
            color: `${color}.main`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const ActivityItem = ({ icon, title, time, status }) => (
  <ListItem 
    sx={{ 
      px: 0,
      py: 2,
      borderBottom: '1px solid',
      borderColor: 'divider',
      '&:last-child': { borderBottom: 'none' }
    }}
  >
    <ListItemAvatar>
      <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
        {icon}
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={
        <Typography variant="body1" fontWeight={500}>
          {title}
        </Typography>
      }
      secondary={
        <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" mt={0.5}>
          <AccessTime fontSize="inherit" sx={{ mr: 0.5 }} />
          {time}
        </Typography>
      }
    />
    {status && (
      <Chip 
        label={status} 
        size="small"
        color={status === 'Completed' ? 'success' : 'warning'}
        sx={{ height: 24 }}
      />
    )}
  </ListItem>
);

const QuickAction = ({ icon, title, description, color = "primary" }) => (
  <Paper
    sx={{
      p: 2.5,
      borderRadius: 3,
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      '&:hover': {
        bgcolor: `${color}.light`,
        borderColor: `${color}.main`,
        transform: 'translateY(-2px)',
      }
    }}
  >
    <Box display="flex" alignItems="center" gap={2}>
      <Avatar sx={{ bgcolor: `${color}.main`, color: 'white' }}>
        {icon}
      </Avatar>
      <Box>
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Box>
  </Paper>
);

const UserDashboard = () => {
  const activities = [
    { icon: <ReportProblem />, title: "New complaint registered", time: "2 hours ago", status: "Pending" },
    { icon: <CheckCircle />, title: "Complaint #123 resolved", time: "1 day ago", status: "Completed" },
    { icon: <Event />, title: "Upcoming Tole meeting", time: "2 days ago", status: "Upcoming" },
    { icon: <Notifications />, title: "Water supply notice", time: "3 days ago" },
  ];

  const quickActions = [
    { icon: <Add />, title: "New Complaint", description: "Register a new issue", color: "primary" },
    { icon: <Event />, title: "Create Event", description: "Organize community event", color: "secondary" },
    { icon: <ReportProblem />, title: "View Reports", description: "Check complaint status", color: "warning" },
  ];

  return (
    <UserLayout>
      {/* HEADER SECTION */}
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Welcome Back, David! 👋
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Hawkins Tole Management Dashboard
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            New Complaint
          </Button>
        </Box>

        {/* SEARCH BAR */}
        <Paper
          sx={{
            p: 1.5,
            borderRadius: 3,
            bgcolor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            maxWidth: 600,
          }}
        >
          <Search sx={{ color: 'text.secondary', ml: 1, mr: 2 }} />
          <input
            type="text"
            placeholder="Search complaints, events, or documents..."
            style={{
              border: 'none',
              background: 'transparent',
              width: '100%',
              fontSize: '16px',
              outline: 'none',
            }}
          />
        </Paper>
      </Box>

      {/* STATS SECTION */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Total Complaints" 
            value="12" 
            icon={<ReportProblem />}
            subtitle="+2 this month"
            trend="up"
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Pending Requests" 
            value="3" 
            icon={<AccessTime />}
            subtitle="-1 from last week"
            trend="down"
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Events This Month" 
            value="5" 
            icon={<Event />}
            subtitle="2 upcoming"
            color="success"
          />
        </Grid>
      </Grid>

      {/* MAIN CONTENT */}
      <Grid container spacing={3}>
        {/* RECENT ACTIVITY */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight={600}>
                  Recent Activity
                </Typography>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              
              {activities.length > 0 ? (
                <List sx={{ pt: 0 }}>
                  {activities.map((activity, index) => (
                    <ActivityItem key={index} {...activity} />
                  ))}
                </List>
              ) : (
                <Box textAlign="center" py={4}>
                  <Typography color="text.secondary" mb={2}>
                    No recent activity found
                  </Typography>
                  <Button variant="outlined" startIcon={<ArrowForward />}>
                    View All Activities
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* QUICK ACTIONS */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Quick Actions
              </Typography>
              
              <Stack spacing={2}>
                {quickActions.map((action, index) => (
                  <QuickAction key={index} {...action} />
                ))}
              </Stack>

              {/* UPCOMING EVENTS */}
              <Box mt={4}>
                <Typography variant="subtitle1" fontWeight={600} mb={2}>
                  <CalendarMonth sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Upcoming Events
                </Typography>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    bgcolor: 'primary.light',
                    borderColor: 'primary.main',
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={600} color="primary.main">
                    Tole Committee Meeting
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Tomorrow, 2:00 PM • Community Hall
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* BOTTOM SECTION */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Complaint Status
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Resolved</Typography>
                    <Typography variant="body2" fontWeight={600}>8 (67%)</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={67} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'success.main',
                        borderRadius: 4,
                      }
                    }}
                  />
                </Box>
                <Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">In Progress</Typography>
                    <Typography variant="body2" fontWeight={600}>3 (25%)</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={25} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'warning.main',
                        borderRadius: 4,
                      }
                    }}
                  />
                </Box>
                <Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Pending</Typography>
                    <Typography variant="body2" fontWeight={600}>1 (8%)</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={8} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'error.main',
                        borderRadius: 4,
                      }
                    }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Recent Notifications
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Water Supply Update
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Water supply will be interrupted tomorrow from 10 AM to 2 PM for maintenance.
                  </Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    New Community Event
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Join us for the monthly tole cleaning drive this Saturday.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </UserLayout>
  );
};

export default UserDashboard;