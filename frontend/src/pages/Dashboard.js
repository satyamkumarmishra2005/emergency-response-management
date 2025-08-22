import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  LinearProgress,
  IconButton,
  Button,
} from '@mui/material';
import {
  Warning as WarningIcon,
  People as PeopleIcon,
  Speed as SpeedIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalAlerts: 0,
    activeAlerts: 0,
    totalResponders: 0,
    availableResponders: 0,
    responseTime: 0,
    resolutionRate: 0,
  });

  const [recentAlerts, setRecentAlerts] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalAlerts: 156,
      activeAlerts: 12,
      totalResponders: 45,
      availableResponders: 38,
      responseTime: 4.2,
      resolutionRate: 94.2,
    });

    setRecentAlerts([
      {
        id: 1,
        type: 'Fire',
        location: 'Downtown Mall',
        severity: 'High',
        status: 'Active',
        timestamp: '2 minutes ago',
      },
      {
        id: 2,
        type: 'Medical',
        location: 'Central Park',
        severity: 'Medium',
        status: 'Assigned',
        timestamp: '15 minutes ago',
      },
      {
        id: 3,
        type: 'Traffic',
        location: 'Highway 101',
        severity: 'Low',
        status: 'Resolved',
        timestamp: '1 hour ago',
      },
    ]);

    setChartData([
      { name: 'Mon', alerts: 12, responses: 10 },
      { name: 'Tue', alerts: 8, responses: 8 },
      { name: 'Wed', alerts: 15, responses: 14 },
      { name: 'Thu', alerts: 10, responses: 9 },
      { name: 'Fri', alerts: 18, responses: 16 },
      { name: 'Sat', alerts: 14, responses: 13 },
      { name: 'Sun', alerts: 9, responses: 8 },
    ]);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'error';
      case 'assigned': return 'warning';
      case 'resolved': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Emergency Response Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/alerts/new')}
          sx={{ backgroundColor: 'error.main' }}
        >
          New Emergency Alert
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Alerts
                  </Typography>
                  <Typography variant="h4" component="div">
                    {stats.totalAlerts}
                  </Typography>
                </Box>
                <WarningIcon color="error" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Active Alerts
                  </Typography>
                  <Typography variant="h4" component="div" color="error.main">
                    {stats.activeAlerts}
                  </Typography>
                </Box>
                <WarningIcon color="warning" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Available Responders
                  </Typography>
                  <Typography variant="h4" component="div" color="success.main">
                    {stats.availableResponders}
                  </Typography>
                </Box>
                <PeopleIcon color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Avg Response Time
                  </Typography>
                  <Typography variant="h4" component="div">
                    {stats.responseTime}m
                  </Typography>
                </Box>
                <SpeedIcon color="info" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts and Recent Alerts */}
      <Grid container spacing={3}>
        {/* Alert Trends Chart */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weekly Alert Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="alerts" stroke="#d32f2f" strokeWidth={2} />
                  <Line type="monotone" dataKey="responses" stroke="#1976d2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Alerts */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Recent Alerts
                </Typography>
                <Button size="small" onClick={() => navigate('/alerts')}>
                  View All
                </Button>
              </Box>
              <List sx={{ p: 0 }}>
                {recentAlerts.map((alert) => (
                  <ListItem key={alert.id} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <WarningIcon color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {alert.type}
                          </Typography>
                          <Chip
                            label={alert.severity}
                            size="small"
                            color={getSeverityColor(alert.severity)}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {alert.location}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <Chip
                              label={alert.status}
                              size="small"
                              color={getStatusColor(alert.status)}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {alert.timestamp}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Metrics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Response Performance
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Response Rate</Typography>
                  <Typography variant="body2" color="success.main">
                    {stats.resolutionRate}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stats.resolutionRate}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUpIcon color="success" />
                <Typography variant="body2" color="success.main">
                  +2.1% from last week
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* System Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Status
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon color="success" />
                  <Typography variant="body2">Alert Service: Operational</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon color="success" />
                  <Typography variant="body2">Responder Service: Operational</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon color="success" />
                  <Typography variant="body2">User Service: Operational</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon color="success" />
                  <Typography variant="body2">Kafka: Operational</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

