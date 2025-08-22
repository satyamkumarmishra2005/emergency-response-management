import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Alerts = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockAlerts = [
        {
          id: 1,
          type: 'Fire',
          location: 'Downtown Mall, 123 Main St',
          description: 'Large fire reported in the food court area',
          severity: 'High',
          status: 'Active',
          timestamp: new Date('2024-01-15T10:30:00'),
          assignedResponder: 'Fire Team Alpha',
          coordinates: '40.7128, -74.0060',
        },
        {
          id: 2,
          type: 'Medical',
          location: 'Central Park, near Bethesda Fountain',
          description: 'Person collapsed, requires immediate medical attention',
          severity: 'High',
          status: 'Assigned',
          timestamp: new Date('2024-01-15T09:15:00'),
          assignedResponder: 'EMS Unit Bravo',
          coordinates: '40.7829, -73.9654',
        },
        {
          id: 3,
          type: 'Traffic',
          location: 'Highway 101, Exit 15',
          description: 'Multi-vehicle accident blocking all lanes',
          severity: 'Medium',
          status: 'Resolved',
          timestamp: new Date('2024-01-15T08:45:00'),
          assignedResponder: 'Traffic Control Charlie',
          coordinates: '40.7505, -73.9934',
        },
        {
          id: 4,
          type: 'Natural Disaster',
          location: 'Riverside Area, Flood Zone A',
          description: 'Flash flood warning, evacuation required',
          severity: 'High',
          status: 'Active',
          timestamp: new Date('2024-01-15T07:20:00'),
          assignedResponder: 'Disaster Response Delta',
          coordinates: '40.7589, -73.9851',
        },
        {
          id: 5,
          type: 'Chemical Spill',
          location: 'Industrial District, Warehouse 7',
          description: 'Hazardous chemical leak detected',
          severity: 'High',
          status: 'Assigned',
          timestamp: new Date('2024-01-15T06:30:00'),
          assignedResponder: 'Hazmat Team Echo',
          coordinates: '40.7064, -73.9960',
        },
      ];
      setAlerts(mockAlerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'fire': return '🔥';
      case 'medical': return '🚑';
      case 'traffic': return '🚗';
      case 'natural disaster': return '🌊';
      case 'chemical spill': return '☣️';
      default: return '⚠️';
    }
  };

  const handleViewAlert = (alert) => {
    setSelectedAlert(alert);
    setViewDialogOpen(true);
  };

  const handleEditAlert = (alert) => {
    setSelectedAlert(alert);
    setEditDialogOpen(true);
  };

  const handleDeleteAlert = async (id) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      try {
        // Mock API call - replace with actual delete API
        setAlerts(alerts.filter(alert => alert.id !== id));
      } catch (error) {
        console.error('Error deleting alert:', error);
      }
    }
  };

  const columns = [
    {
      field: 'type',
      headerName: 'Type',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span>{getTypeIcon(params.value)}</span>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 250,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography variant="body2" noWrap>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'severity',
      headerName: 'Severity',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getSeverityColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'timestamp',
      headerName: 'Time',
      width: 150,
      renderCell: (params) => format(params.value, 'MMM dd, HH:mm'),
    },
    {
      field: 'assignedResponder',
      headerName: 'Assigned To',
      width: 180,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={() => handleViewAlert(params.row)}
              color="primary"
            >
              <ViewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Alert">
            <IconButton
              size="small"
              onClick={() => handleEditAlert(params.row)}
              color="secondary"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Alert">
            <IconButton
              size="small"
              onClick={() => handleDeleteAlert(params.row.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Emergency Alerts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/alerts/new')}
          sx={{ backgroundColor: 'error.main' }}
        >
          New Alert
        </Button>
      </Box>

      <Card>
        <CardContent>
          <DataGrid
            rows={alerts}
            columns={columns}
            loading={loading}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            autoHeight
            sx={{
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #e0e0e0',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                borderBottom: '2px solid #e0e0e0',
              },
            }}
          />
        </CardContent>
      </Card>

      {/* View Alert Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningIcon color="error" />
            Alert Details
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedAlert && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Type
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {getTypeIcon(selectedAlert.type)} {selectedAlert.type}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedAlert.location}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Coordinates
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedAlert.coordinates}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Severity
                </Typography>
                <Chip
                  label={selectedAlert.severity}
                  color={getSeverityColor(selectedAlert.severity)}
                  sx={{ mb: 2 }}
                />

                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedAlert.status}
                  color={getStatusColor(selectedAlert.status)}
                  sx={{ mb: 2 }}
                />

                <Typography variant="subtitle2" color="text.secondary">
                  Assigned To
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedAlert.assignedResponder || 'Unassigned'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1">
                  {selectedAlert.description}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              setViewDialogOpen(false);
              handleEditAlert(selectedAlert);
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Alert Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Alert</DialogTitle>
        <DialogContent>
          {selectedAlert && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Type"
                  value={selectedAlert.type}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Location"
                  value={selectedAlert.location}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Description"
                  value={selectedAlert.description}
                  margin="normal"
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Severity</InputLabel>
                  <Select value={selectedAlert.severity} label="Severity">
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select value={selectedAlert.status} label="Status">
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Assigned">Assigned</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Assigned Responder"
                  value={selectedAlert.assignedResponder || ''}
                  margin="normal"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Alerts;

