import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  AvatarGroup,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  Store,
  Category,
  LocalShipping,
  BarChart,
  Forum,
  Event,
  PhotoLibrary,
  Storefront,
  Notifications,
  Security,
  AdminPanelSettings,
  Group
} from "@mui/icons-material";
import AdminLayout from "../../components/admin/AdminLayout";

const StatCard = ({ title, value, change, icon: Icon, color, subtitle }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
        <Box>
          <Typography color="textSecondary" variant="body2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="textSecondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
          }}
        >
          <Icon sx={{ fontSize: 28, color: color }} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        {change > 0 ? (
          <ArrowUpward sx={{ color: "success.main", fontSize: 16, mr: 0.5 }} />
        ) : (
          <ArrowDownward sx={{ color: "error.main", fontSize: 16, mr: 0.5 }} />
        )}
        <Typography
          variant="body2"
          color={change > 0 ? "success.main" : "error.main"}
          fontWeight={500}
        >
          {change > 0 ? "+" : ""}{change}%
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
          from last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const QuickActionCard = ({ title, description, icon, color, actionText, onClick }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            mr: 2,
            background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body1" fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {description}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="outlined"
        size="small"
        onClick={onClick}
        sx={{ 
          mt: "auto", 
          alignSelf: "flex-start",
          borderColor: color,
          color: color,
          "&:hover": {
            borderColor: color,
            bgcolor: `${color}10`,
          }
        }}
      >
        {actionText}
      </Button>
    </CardContent>
  </Card>
);

const RecentActivity = () => {
  const activities = [
    { 
      user: "John Doe", 
      action: "created new community 'Green Valley'", 
      time: "2 min ago", 
      type: "community",
      avatarColor: "#2E7D32"
    },
    { 
      user: "Sarah Smith", 
      action: "reported inappropriate content", 
      time: "10 min ago", 
      type: "report",
      avatarColor: "#F44336"
    },
    { 
      user: "Mike Johnson", 
      action: "joined 3 communities", 
      time: "1 hour ago", 
      type: "user",
      avatarColor: "#2196F3"
    },
    { 
      user: "Emma Wilson", 
      action: "posted in forum discussion", 
      time: "2 hours ago", 
      type: "forum",
      avatarColor: "#9C27B0"
    },
    { 
      user: "Robert Brown", 
      action: "uploaded gallery photos", 
      time: "3 hours ago", 
      type: "gallery",
      avatarColor: "#FF9800"
    },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "community": return <Group fontSize="small" />;
      case "report": return <Security fontSize="small" />;
      case "user": return <People fontSize="small" />;
      case "forum": return <Forum fontSize="small" />;
      case "gallery": return <PhotoLibrary fontSize="small" />;
      default: return <Notifications fontSize="small" />;
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" fontWeight={600}>
            Recent Activity
          </Typography>
          <Button size="small" variant="text">
            View All
          </Button>
        </Box>
        <List sx={{ p: 0 }}>
          {activities.map((activity, index) => (
            <ListItem
              key={index}
              sx={{
                px: 0,
                py: 1.5,
                borderBottom: index < activities.length - 1 ? "1px solid" : "none",
                borderColor: "divider",
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: activity.avatarColor, width: 36, height: 36 }}>
                  {getTypeIcon(activity.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography fontWeight={500}>
                    <Typography component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
                      {activity.user}
                    </Typography>{" "}
                    {activity.action}
                  </Typography>
                }
                secondary={activity.time}
              />
              <Chip
                label={activity.type}
                size="small"
                sx={{
                  bgcolor: `${activity.avatarColor}20`,
                  color: activity.avatarColor,
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const SystemHealthCard = () => {
  const metrics = [
    { label: "Server Uptime", value: 99.9, color: "#4CAF50" },
    { label: "API Response", value: 95, color: "#2196F3" },
    { label: "Database", value: 98.5, color: "#9C27B0" },
    { label: "Cache", value: 92, color: "#FF9800" },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          System Health
        </Typography>
        <Grid container spacing={2}>
          {metrics.map((metric, index) => (
            <Grid item xs={6} key={index}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="body2" color="textSecondary">
                    {metric.label}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {metric.value}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={metric.value}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: `${metric.color}20`,
                    "& .MuiLinearProgress-bar": {
                      background: `linear-gradient(90deg, ${metric.color} 0%, ${metric.color}AA 100%)`,
                    },
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: "success.light" }}>
          <Typography variant="body2" fontWeight={500} color="success.dark">
            All systems operational
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const AdminDashboard = () => {
  const quickActions = [
    {
      title: "Moderate Content",
      description: "Review reported posts and comments",
      icon: <Security sx={{ color: "#F44336" }} />,
      color: "#F44336",
      actionText: "Review Now",
      onClick: () => console.log("Review content"),
    },
    {
      title: "Add New Admin",
      description: "Assign admin privileges to users",
      icon: <AdminPanelSettings sx={{ color: "#2196F3" }} />,
      color: "#2196F3",
      actionText: "Add Admin",
      onClick: () => console.log("Add admin"),
    },
    {
      title: "View Reports",
      description: "Check system analytics and reports",
      icon: <BarChart sx={{ color: "#4CAF50" }} />,
      color: "#4CAF50",
      actionText: "View Reports",
      onClick: () => console.log("View reports"),
    },
    {
      title: "Manage Billing",
      description: "Handle subscriptions and payments",
      icon: <AttachMoney sx={{ color: "#FF9800" }} />,
      color: "#FF9800",
      actionText: "Manage",
      onClick: () => console.log("Manage billing"),
    },
  ];

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Welcome back, Community Admin! 👋
        </Typography>
        <Typography color="textSecondary">
          Manage your local society platform with real-time insights and quick actions.
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Communities"
            value="42"
            change={12.5}
            icon={Store}
            color="#2E7D32"
            subtitle="Active societies"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Users"
            value="1,842"
            change={8.2}
            icon={People}
            color="#2196F3"
            subtitle="Registered members"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Active Events"
            value="28"
            change={-2.1}
            icon={Event}
            color="#9C27B0"
            subtitle="Upcoming activities"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Market Listings"
            value="156"
            change={5.7}
            icon={Storefront}
            color="#FF9800"
            subtitle="Items for sale"
          />
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <RecentActivity />
        </Grid>
        <Grid item xs={12} lg={4}>
          <SystemHealthCard />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Quick Actions
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <QuickActionCard {...action} />
          </Grid>
        ))}
      </Grid>

      {/* Recent Users */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Recent Community Members
          </Typography>
          <AvatarGroup 
            max={12}
            sx={{
              justifyContent: "center",
              mb: 2,
              "& .MuiAvatar-root": {
                width: 48,
                height: 48,
                fontSize: 16,
                border: "2px solid white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              },
            }}
          >
            {["JD", "SS", "MJ", "EW", "RB", "KL", "AM", "PD", "RK", "SM", "TJ", "NP"].map((initials, index) => (
              <Avatar 
                key={index}
                sx={{ 
                  bgcolor: ["#2E7D32", "#2196F3", "#9C27B0", "#FF9800", "#F44336", "#607D8B"][index % 6] 
                }}
              >
                {initials}
              </Avatar>
            ))}
          </AvatarGroup>
          <Typography variant="body2" color="textSecondary" align="center">
            142 new members this week • 12 communities created
          </Typography>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminDashboard;