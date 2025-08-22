import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
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
  Avatar,
  Badge,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  People as PeopleIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const Responders = () => {
  const navigate = useNavigate();
  const [responders, setResponders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedResponder, setSelectedResponder] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchResponders();
  }, []);

  const fetchResponders = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockResponders = [
        {
          id: 1,
          name: 'Fire Team Alpha',
          type: 'Fire Department',
          status: 'Available',
          contactPerson: 'Captain John Smith',
          phone: '+1 (555) 123-4567',
          email: 'alpha@firedept.gov',
          location: 'Fire Station 1, Downtown',
          specializations: ['Fire Suppression', 'Rescue Operations'],
          currentAssignments: 0,
          totalAssignments: 156,
          responseTime: '2.5 minutes',
          rating: 4.8,
        },
        {
          id: 2,
          name: 'EMS Unit Bravo',
          type: 'Emergency Medical',
          status: 'On Assignment',
          contactPerson: 'Paramedic Sarah Johnson',
          phone: '+1 (555) 234-5678',
          email: 'bravo@ems.gov',
          location: 'Medical Center, Midtown',
          specializations: ['Trauma Care', 'Cardiac Response'],
          currentAssignments: 1,
          totalAssignments: 89,
          responseTime: '3.1 minutes',
          rating: 4.9,
        },
        {
          id: 3,
          name: 'Traffic Control Charlie',
          type: 'Traffic Management',
          status: 'Available',
          contactPerson: 'Officer Mike Davis',
          phone: '+1 (555) 345-6789',
          email: 'charlie@traffic.gov',
          location: 'Traffic Command Center',
          specializations: ['Accident Management', 'Traffic Flow'],
          currentAssignments: 0,
          totalAssignments: 234,
          responseTime: '4.2 minutes',
          rating: 4.6,
        },
        {
          id: 4,
          name: 'Disaster Response Delta',
          type: 'Special Operations',
          status: 'Training',
          contactPerson: 'Commander Lisa Wilson',
          phone: '+1 (555) 456-7890',
          email: 'delta@disaster.gov',
          location: 'Special Ops Base',
          specializations: ['Natural Disasters', 'Hazmat Response'],
          currentAssignments: 0,
          totalAssignments: 67,
          responseTime: '5.8 minutes',
          rating: 4.7,
        },
        {
          id: 5,
          name: 'Hazmat Team Echo',
          type: 'Hazardous Materials',
          status: 'Available',
          contactPerson: 'Specialist Tom Brown',
          phone: '+1 (555) 567-8901',
          email: 'echo@hazmat.gov',
          location: 'Industrial Safety Complex',
          specializations: ['Chemical Spills', 'Radiation Response'],
          currentAssignments: 0,
          totalAssignments: 45,
          responseTime: '6.5 minutes',
          rating: 4.5,
        },
      ];
      setResponders(mockResponders);
    } catch (error) {
      console.error('Error fetching responders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available': return 'success';
      case 'on assignment': return 'warning';
      case 'training': return 'info';
      case 'offline': return 'default';
      default: return 'default';
    }
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'fire department': return '🚒';
      case 'emergency medical': return '🚑';
      case 'traffic management': return '🚦';
      case 'special operations': return '⚡';
      case 'hazardous materials': return '☣️';
      default: return '👷';
    }
  };

  const handleViewResponder = (responder) => {
    setSelectedResponder(responder);
    setViewDialogOpen(true);
  };

  const handleEditResponder = (responder) => {
    setSelectedResponder(responder);
    setEditDialogOpen(true);
  };

  const handleDeleteResponder = async (id) => {
    if (window.confirm('Are you sure you want to delete this responder?')) {
      try {
        // Mock API call - replace with actual delete API
        setResponders(responders.filter(responder => responder.id !== id));
      } catch (error) {
        console.error('Error deleting responder:', error);
      }
    }
  };

  const filteredRows = useMemo(() => {
    return responders.filter((r) => {
      const matchesSearch = [r.name, r.type, r.contactPerson, r.phone, r.email]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || r.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [responders, search, statusFilter]);

  const columns = [
    {
      field: 'name',
      headerName: 'Team Name',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            <PeopleIcon />
          </Avatar>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span>{getTypeIcon(params.value)}</span>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'contactPerson',
      headerName: 'Contact Person',
      width: 180,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150,
    },
    {
      field: 'currentAssignments',
      headerName: 'Current',
      width: 100,
      renderCell: (params) => (
        <Badge badgeContent={params.value} color="primary">
          <Chip label="Assignments" size="small" variant="outlined" />
        </Badge>
      ),
    },
    {
      field: 'responseTime',
      headerName: 'Avg Response',
      width: 130,
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={`${params.value}/5.0`}
          color="success"
          size="small"
        />
      ),
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
              onClick={() => handleViewResponder(params.row)}
              color="primary"
            >
              <ViewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Responder">
            <IconButton
              size="small"
              onClick={() => handleEditResponder(params.row)}
              color="secondary"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Responder">
            <IconButton
              size="small"
              onClick={() => handleDeleteResponder(params.row.id)}
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
      <Grid container spacing={3} sx={{ mb: 1 }}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1">
            Emergency Responders
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage teams, monitor availability, and view performance stats
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, alignItems: 'center' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/responders/new')}
            color="primary"
          >
            Add Responder
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Total Teams" sx={{ pb: 0 }} />
            <CardContent>
              <Typography variant="h3" color="primary.main">{responders.length}</Typography>
              <Typography variant="caption" color="text.secondary">active records</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Available Now" sx={{ pb: 0 }} />
            <CardContent>
              <Typography variant="h3" color="success.main">{responders.filter(r => r.status === 'Available').length}</Typography>
              <Typography variant="caption" color="text.secondary">ready to deploy</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="On Assignment" sx={{ pb: 0 }} />
            <CardContent>
              <Typography variant="h3" color="warning.main">{responders.filter(r => r.status === 'On Assignment').length}</Typography>
              <Typography variant="caption" color="text.secondary">currently engaged</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardHeader
          title="Responders"
          action={
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                size="small"
                label="Search"
                placeholder="Name, type, contact..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="on assignment">On Assignment</MenuItem>
                  <MenuItem value="training">Training</MenuItem>
                  <MenuItem value="offline">Offline</MenuItem>
                </Select>
              </FormControl>
            </Box>
          }
        />
        <CardContent>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            loading={loading}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            autoHeight
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #eef0f2',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#fafafa',
                borderBottom: '2px solid #eef0f2',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(0,0,0,0.02)',
              },
            }}
          />
        </CardContent>
      </Card>

      {/* View Responder Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PeopleIcon color="primary" />
            Responder Details
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedResponder && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Team Name
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {selectedResponder.name}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Type
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {getTypeIcon(selectedResponder.type)} {selectedResponder.type}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedResponder.status}
                  color={getStatusColor(selectedResponder.status)}
                  sx={{ mb: 2 }}
                />

                <Typography variant="subtitle2" color="text.secondary">
                  Contact Person
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedResponder.contactPerson}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedResponder.phone}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedResponder.email}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedResponder.location}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Response Time
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedResponder.responseTime}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Specializations
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {selectedResponder.specializations.map((spec, index) => (
                    <Chip key={index} label={spec} size="small" variant="outlined" />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Performance Statistics
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={4}>
                    <Typography variant="h6" color="primary">
                      {selectedResponder.totalAssignments}
                    </Typography>
                    <Typography variant="caption">Total Assignments</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6" color="warning.main">
                      {selectedResponder.currentAssignments}
                    </Typography>
                    <Typography variant="caption">Current Assignments</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6" color="success.main">
                      {selectedResponder.rating}/5.0
                    </Typography>
                    <Typography variant="caption">Rating</Typography>
                  </Grid>
                </Grid>
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
              handleEditResponder(selectedResponder);
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Responder Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Responder</DialogTitle>
        <DialogContent>
          {selectedResponder && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Team Name"
                  value={selectedResponder.name}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Contact Person"
                  value={selectedResponder.contactPerson}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Phone"
                  value={selectedResponder.phone}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={selectedResponder.email}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Type</InputLabel>
                  <Select value={selectedResponder.type} label="Type">
                    <MenuItem value="Fire Department">🚒 Fire Department</MenuItem>
                    <MenuItem value="Emergency Medical">🚑 Emergency Medical</MenuItem>
                    <MenuItem value="Traffic Management">🚦 Traffic Management</MenuItem>
                    <MenuItem value="Special Operations">⚡ Special Operations</MenuItem>
                    <MenuItem value="Hazardous Materials">☣️ Hazardous Materials</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select value={selectedResponder.status} label="Status">
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="On Assignment">On Assignment</MenuItem>
                    <MenuItem value="Training">Training</MenuItem>
                    <MenuItem value="Offline">Offline</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Location"
                  value={selectedResponder.location}
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

export default Responders;

