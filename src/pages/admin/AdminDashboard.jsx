import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  Stack,
  Chip,
  alpha,
  useTheme,
  Paper,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider
} from "@mui/material";
import {
  AttachMoney,
  ShoppingCart,
  People,
  TrendingUp,
  TrendingDown,
  ArrowUpward,
  ArrowDownward,
  BarChart,
  AccountBalance,
  RequestQuote,
  Percent,
  EmojiEvents,
  MoreVert,
  Download,
  FilterList,
  Refresh,
  CalendarToday,
  ArrowForward
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import AdminLayout from "../../components/admin/AdminLayout";
import { getCommissionAnalytics } from "../../api/commissionService";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [timeRange, setTimeRange] = useState('monthly');
  const theme = useTheme();

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    const res = await getCommissionAnalytics({});
    if (res?.StatusCode === 200) {
      setAnalytics(res.AnalyticsDataList[0]);
    }
  };

  if (!analytics) return null;

  // Data for charts
  const commissionTrend = [
    { month: 'Jan', commission: 42000, target: 40000 },
    { month: 'Feb', commission: 52000, target: 45000 },
    { month: 'Mar', commission: 61000, target: 50000 },
    { month: 'Apr', commission: 73000, target: 55000 },
    { month: 'May', commission: 82000, target: 60000 },
    { month: 'Jun', commission: 91000, target: 65000 },
    { month: 'Jul', commission: 105000, target: 70000 },
  ];

  const levelDistribution = [
    { name: 'Level 1', value: 35, color: '#4f46e5' },
    { name: 'Level 2', value: 25, color: '#7c3aed' },
    { name: 'Level 3', value: 20, color: '#8b5cf6' },
    { name: 'Level 4', value: 15, color: '#a78bfa' },
    { name: 'Level 5', value: 5, color: '#c4b5fd' },
  ];

  const performanceMetrics = [
    { label: 'Conversion Rate', value: '68.2%', change: '+5.2%', positive: true },
    { label: 'Avg Order Value', value: '₹12,450', change: '+12.8%', positive: true },
    { label: 'Member Growth', value: '24.7%', change: '+8.3%', positive: true },
    { label: 'Commission Ratio', value: '1:4.2', change: '-1.8%', positive: false },
  ];

  return (
    <AdminLayout>
      <Box sx={{ 
        background: "#f8fafc",
        minHeight: "100vh",
        p: 3,
        color: "#1e293b"
      }}>
        {/* HEADER SECTION */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4 
        }}>
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ 
              color: "#1e293b",
              mb: 0.5
            }}>
              Commission Dashboard
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday sx={{ fontSize: 16, color: "#64748b" }} />
              <Typography variant="subtitle1" sx={{ color: '#64748b' }}>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                sx={{
                  background: 'white',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #e2e8f0',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #cbd5e1',
                  }
                }}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
            
            <IconButton sx={{ 
              background: 'white',
              border: '1px solid #e2e8f0',
              color: '#64748b',
              '&:hover': { 
                background: '#f1f5f9',
                borderColor: '#cbd5e1'
              }
            }}>
              <FilterList />
            </IconButton>
            
            <IconButton sx={{ 
              background: 'white',
              border: '1px solid #e2e8f0',
              color: '#64748b',
              '&:hover': { 
                background: '#f1f5f9',
                borderColor: '#cbd5e1'
              }
            }}>
              <Download />
            </IconButton>
            
            <IconButton sx={{ 
              background: 'white',
              border: '1px solid #e2e8f0',
              color: '#64748b',
              '&:hover': { 
                background: '#f1f5f9',
                borderColor: '#cbd5e1'
              }
            }}>
              <Refresh />
            </IconButton>
          </Box>
        </Box>

        {/* MAIN METRICS GRID */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* TOTAL COMMISSION */}
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard
              title="Total Commission"
              value={`₹${parseInt(analytics.TotalCommission).toLocaleString()}`}
              change="+12.5%"
              positive={true}
              icon={<AccountBalance sx={{ fontSize: 28, color: "#4f46e5" }} />}
              gradient="linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
              chartData={[30, 40, 45, 50, 49, 60, 70, 91]}
            />
          </Grid>

          {/* SETTLED COMMISSION */}
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard
              title="Settled"
              value={`₹${parseInt(analytics.SettledCommission).toLocaleString()}`}
              change="+8.2%"
              positive={true}
              icon={<AttachMoney sx={{ fontSize: 28, color: "#059669" }} />}
              gradient="linear-gradient(135deg, #059669 0%, #10b981 100%)"
              chartData={[25, 35, 42, 48, 46, 55, 65, 80]}
            />
          </Grid>

          {/* PENDING COMMISSION */}
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard
              title="Pending"
              value={`₹${parseInt(analytics.PendingCommission).toLocaleString()}`}
              change="-3.7%"
              positive={false}
              icon={<RequestQuote sx={{ fontSize: 28, color: "#d97706" }} />}
              gradient="linear-gradient(135deg, #d97706 0%, #f59e0b 100%)"
              chartData={[40, 35, 30, 28, 25, 22, 20, 18]}
            />
          </Grid>

          {/* TOTAL ORDERS */}
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard
              title="Total Orders"
              value={analytics.TotalOrders.toLocaleString()}
              change="+15.3%"
              positive={true}
              icon={<ShoppingCart sx={{ fontSize: 28, color: "#dc2626" }} />}
              gradient="linear-gradient(135deg, #dc2626 0%, #ef4444 100%)"
              chartData={[20, 25, 30, 35, 32, 40, 48, 55]}
            />
          </Grid>
        </Grid>

        {/* SECONDARY METRICS */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{
              background: 'white',
              borderRadius: 2,
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
              p: 2.5,
              height: '100%',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{
                  background: 'rgba(79, 70, 229, 0.1)',
                  borderRadius: 2,
                  p: 1.5,
                  mr: 2
                }}>
                  <People sx={{ color: '#4f46e5', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Total Members
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {analytics.TotalMembers.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <Chip 
                label="+5.2% this month" 
                size="small" 
                icon={<TrendingUp sx={{ fontSize: 14 }} />}
                sx={{ 
                  background: 'rgba(79, 70, 229, 0.1)', 
                  color: '#4f46e5',
                  fontWeight: 500,
                  fontSize: '0.75rem'
                }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{
              background: 'white',
              borderRadius: 2,
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
              p: 2.5,
              height: '100%',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{
                  background: 'rgba(147, 51, 234, 0.1)',
                  borderRadius: 2,
                  p: 1.5,
                  mr: 2
                }}>
                  <Percent sx={{ color: '#9333ea', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Avg Commission %
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {analytics.AverageCommissionRate}%
                  </Typography>
                </Box>
              </Box>
              <Chip 
                label="Above industry avg" 
                size="small"
                sx={{ 
                  background: 'rgba(147, 51, 234, 0.1)', 
                  color: '#9333ea',
                  fontWeight: 500,
                  fontSize: '0.75rem'
                }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{
              background: 'white',
              borderRadius: 2,
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
              p: 2.5,
              height: '100%',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: 2,
                  p: 1.5,
                  mr: 2
                }}>
                  <EmojiEvents sx={{ color: '#ef4444', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Highest Commission
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    ₹{parseInt(analytics.HighestOrderCommission).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.75rem' }}>
                Record order commission
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{
              background: 'white',
              borderRadius: 2,
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
              p: 2.5,
              height: '100%',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  borderRadius: 2,
                  p: 1.5,
                  mr: 2
                }}>
                  <BarChart sx={{ color: '#22c55e', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Active Members
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {Math.round(analytics.TotalMembers * 0.65).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <Chip 
                label="65% active rate" 
                size="small"
                sx={{ 
                  background: 'rgba(34, 197, 94, 0.1)', 
                  color: '#22c55e',
                  fontWeight: 500,
                  fontSize: '0.75rem'
                }}
              />
            </Card>
          </Grid>
        </Grid>

        {/* MAIN CONTENT AREA */}
        <Grid container spacing={3}>
          {/* COMMISSION TREND CHART */}
          <Grid item xs={12} lg={8}>
            <Card sx={{
              background: 'white',
              borderRadius: 2,
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
              p: 3,
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              }
            }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3 
              }}>
                <Box>
                  <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b' }}>
                    Commission Growth
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Monthly commission vs target
                  </Typography>
                </Box>
                <Chip 
                  label="2024 Performance" 
                  sx={{ 
                    background: 'rgba(79, 70, 229, 0.1)',
                    color: '#4f46e5',
                    fontWeight: 500
                  }}
                />
              </Box>
              
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={commissionTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#64748b"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#64748b"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `₹${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                      color: '#1e293b',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                    }}
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Commission']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#cbd5e1"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="commission" 
                    stroke="#4f46e5" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* LEVEL DISTRIBUTION */}
          <Grid item xs={12} lg={4}>
            <Card sx={{
              background: 'white',
              borderRadius: 2,
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
              p: 3,
              height: '100%',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              }
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b' }}>
                  Level Distribution
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Total Members
                </Typography>
              </Box>
              
              <Box sx={{ height: 250, mb: 3 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={levelDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {levelDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        color: '#1e293b',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              
              <Stack spacing={1.5}>
                {levelDistribution.map((item, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 1.5,
                    borderRadius: 1.5,
                    background: '#f8fafc',
                    '&:hover': {
                      background: '#f1f5f9'
                    }
                  }}>
                    <Box sx={{ 
                      width: 10, 
                      height: 10, 
                      borderRadius: '50%', 
                      background: item.color,
                      mr: 2 
                    }} />
                    <Typography variant="body2" sx={{ flex: 1, color: '#64748b', fontSize: '0.875rem' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {item.value}%
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Card>
          </Grid>

          {/* PERFORMANCE METRICS */}
          <Grid item xs={12} lg={6}>
            <Card sx={{
              background: 'white',
              borderRadius: 2,
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
              p: 3,
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              }
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b' }}>
                  Performance Metrics
                </Typography>
                <IconButton size="small" sx={{ color: '#64748b' }}>
                  <MoreVert />
                </IconButton>
              </Box>
              
              <Grid container spacing={2}>
                {performanceMetrics.map((metric, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper sx={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 1.5,
                      p: 2.5,
                      height: '100%',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: '#f1f5f9',
                        borderColor: '#cbd5e1'
                      }
                    }}>
                      <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontSize: '0.875rem' }}>
                        {metric.label}
                      </Typography>
                      <Typography variant="h5" fontWeight={700} sx={{ mb: 1, color: '#1e293b' }}>
                        {metric.value}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {metric.positive ? (
                          <TrendingUp sx={{ fontSize: 16, color: "#059669" }} />
                        ) : (
                          <TrendingDown sx={{ fontSize: 16, color: "#dc2626" }} />
                        )}
                        <Typography variant="caption" sx={{ 
                          color: metric.positive ? '#059669' : '#dc2626',
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }}>
                          {metric.change}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>

          {/* TOP PERFORMERS */}
          <Grid item xs={12} lg={6}>
            <Card sx={{
              background: 'white',
              borderRadius: 2,
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
              p: 3,
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              }
            }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3 
              }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b' }}>
                  Top Performers
                </Typography>
                <IconButton size="small" sx={{ color: '#64748b' }}>
                  <MoreVert />
                </IconButton>
              </Box>
              
              <Stack spacing={1.5}>
                {analytics.TopPerformers && analytics.TopPerformers.map((user, index) => (
                  <Paper 
                    key={index}
                    sx={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 1.5,
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: '#f1f5f9',
                        transform: 'translateX(4px)',
                        borderColor: '#cbd5e1'
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', mr: 2 }}>
                      <Avatar 
                        sx={{ 
                          width: 48,
                          height: 48,
                          background: index === 0 ? 
                            'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' :
                            index === 1 ?
                            'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)' :
                            index === 2 ?
                            'linear-gradient(135deg, #92400e 0%, #78350f 100%)' :
                            'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                          fontWeight: 600,
                          fontSize: 16
                        }}
                      >
                        {user.MemberName ? user.MemberName[0] : 'U'}
                      </Avatar>
                      {index < 3 && (
                        <Box sx={{
                          position: 'absolute',
                          top: -4,
                          right: -4,
                          background: index === 0 ? '#f59e0b' : 
                                    index === 1 ? '#64748b' : 
                                    '#92400e',
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          color: 'white',
                          border: '2px solid white'
                        }}>
                          {index + 1}
                        </Box>
                      )}
                    </Box>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight={600} sx={{ color: '#1e293b' }}>
                        {user.MemberName || 'Unknown User'}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.75rem' }}>
                        {user.OrderCount || 0} orders • Level {user.Level || 'N/A'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" fontWeight={700} sx={{ color: '#4f46e5' }}>
                        ₹{parseInt(user.Commission || 0).toLocaleString()}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        Total Commission
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

// Enhanced MetricCard Component for Light Theme
const MetricCard = ({ title, value, change, positive, icon, gradient, chartData }) => {
  return (
    <Card sx={{
      background: 'white',
      borderRadius: 2,
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      p: 2.5,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.2s ease',
      '&:hover': {
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        transform: 'translateY(-2px)'
      }
    }}>
      {/* Gradient accent */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: gradient,
        borderRadius: '8px 8px 0 0'
      }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontSize: '0.875rem' }}>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5, color: '#1e293b' }}>
            {value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {positive ? (
              <TrendingUp sx={{ fontSize: 16, color: "#059669" }} />
            ) : (
              <TrendingDown sx={{ fontSize: 16, color: "#dc2626" }} />
            )}
            <Typography variant="caption" sx={{ 
              color: positive ? '#059669' : '#dc2626',
              fontWeight: 500,
              fontSize: '0.75rem'
            }}>
              {change}
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', ml: 1, fontSize: '0.75rem' }}>
              vs last month
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{
          background: '#f8fafc',
          borderRadius: 2,
          p: 1.5,
          border: '1px solid #e2e8f0'
        }}>
          {icon}
        </Box>
      </Box>
      
      {/* Mini chart */}
      <Box sx={{ mt: 2, height: 40 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData.map((val, i) => ({ value: val }))}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradient.split(',')[1].trim().split(' ')[0]} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={gradient.split(',')[1].trim().split(' ')[0]} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={gradient.split(',')[1].trim().split(' ')[0]} 
              fill={`url(#gradient-${title})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default AdminDashboard;