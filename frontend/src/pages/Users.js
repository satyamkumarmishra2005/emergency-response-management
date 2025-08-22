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
  Avatar,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockUsers = [
        {
          id: 1,
          username: 'admin.user',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@emergency.gov',
          phone: '+1 (555) 111-1111',
          role: 'System Administrator',
          department: 'IT Department',
          status: 'Active',
          lastLogin: '2024-01-15T10:30:00',
          permissions: ['Full Access', 'User Management', 'System Configuration'],
          twoFactorEnabled: true,
          accountCreated: '2023-01-01T00:00:00',
        },
        {
          id: 2,
          username: 'dispatcher.smith',
          firstName: 'Sarah',
          lastName: 'Smith',
          email: 'sarah.smith@emergency.gov',
          phone: '+1 (555) 222-2222',
          role: 'Emergency Dispatcher',
          department: 'Dispatch Center',
          status: 'Active',
          lastLogin: '2024-01-15T09:15:00',
          permissions: ['Alert Management', 'Responder Assignment', 'View Reports'],
          twoFactorEnabled: true,
          accountCreated: '2023-03-15T00:00:00',
        },
        {
          id: 3,
          username: 'supervisor.johnson',
          firstName: 'Michael',
          lastName: 'Johnson',
          email: 'michael.johnson@emergency.gov',
          phone: '+1 (555) 333-3333',
          role: 'Supervisor',
          department: 'Operations',
          status: 'Active',
          lastLogin: '2024-01-15T08:45:00',
          permissions: ['Team Management', 'Performance Monitoring', 'View Reports'],
          twoFactorEnabled: false,
          accountCreated: '2023-06-20T00:00:00',
        },
        {
          id: 4,
          username: 'responder.davis',
          firstName: 'Lisa',
          lastName: 'Davis',
          email: 'lisa.davis@emergency.gov',
          phone: '+1 (555) 444-4444',
          role: 'Field Responder',
          department: 'Fire Department',
          status: 'Active',
          lastLogin: '2024-01-15T07:20:00',
          permissions: ['View Alerts', 'Status Updates', 'Basic Reports'],
          twoFactorEnabled: true,
          accountCreated: '2023-08-10T00:00:00',
        },
        {
          id: 5,
          username: 'analyst.wilson',
          firstName: 'David',
          lastName: 'Wilson',
          email: 'david.wilson@emergency.gov',
          phone: '+1 (555) 555-5555',
          role: 'Data Analyst',
          department: 'Analytics',
          status: 'Inactive',
          lastLogin: '2024-01-10T16:30:00',
          permissions: ['View Reports', 'Data Export', 'Analytics Tools'],
          twoFactorEnabled: false,
          accountCreated: '2023-09-05T00:00:00',
        },
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'success';
      case 'inactive': return 'default';
      case 'suspended': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'system administrator': return 'error';
      case 'emergency dispatcher': return 'primary';
      case 'supervisor': return 'warning';
      case 'field responder': return 'info';
      case 'data analyst': return 'secondary';
      default: return 'default';
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setViewDialogOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // Mock API call - replace with actual delete API
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleStatusToggle = async (userId, newStatus) => {
    try {
      // Mock API call - replace with actual status update API
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const columns = [
    {
      field: 'username',
      headerName: 'Username',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            <PersonIcon />
          </Avatar>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 180,
      valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 180,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getRoleColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'department',
      headerName: 'Department',
      width: 150,
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
      field: 'lastLogin',
      headerName: 'Last Login',
      width: 150,
      valueGetter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: 'twoFactorEnabled',
      headerName: '2FA',
      width: 80,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'ON' : 'OFF'}
          color={params.value ? 'success' : 'default'}
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
              onClick={() => handleViewUser(params.row)}
              color="primary"
            >
              <ViewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit User">
            <IconButton
              size="small"
              onClick={() => handleEditUser(params.row)}
              color="secondary"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete User">
            <IconButton
              size="small"
              onClick={() => handleDeleteUser(params.row.id)}
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
          System Users
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/users/new')}
          color="primary"
        >
          Add User
        </Button>
      </Box>

      <Card>
        <CardContent>
          <DataGrid
            rows={users}
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

      {/* View User Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon color="primary" />
            User Details
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Username
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {selectedUser.username}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Full Name
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedUser.firstName} {selectedUser.lastName}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Role
                </Typography>
                <Chip
                  label={selectedUser.role}
                  color={getRoleColor(selectedUser.role)}
                  sx={{ mb: 2 }}
                />

                <Typography variant="subtitle2" color="text.secondary">
                  Department
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedUser.department}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedUser.email}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedUser.phone}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedUser.status}
                  color={getStatusColor(selectedUser.status)}
                  sx={{ mb: 2 }}
                />

                <Typography variant="subtitle2" color="text.secondary">
                  Two-Factor Authentication
                </Typography>
                <Chip
                  label={selectedUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  color={selectedUser.twoFactorEnabled ? 'success' : 'default'}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Permissions
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {selectedUser.permissions.map((permission, index) => (
                    <Chip key={index} label={permission} size="small" variant="outlined" />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Account Information
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Account Created
                    </Typography>
                    <Typography variant="body1">
                      {new Date(selectedUser.accountCreated).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Last Login
                    </Typography>
                    <Typography variant="body1">
                      {new Date(selectedUser.lastLogin).toLocaleString()}
                    </Typography>
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
              handleEditUser(selectedUser);
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Username"
                  value={selectedUser.username}
                  margin="normal"
                  disabled
                />
                <TextField
                  fullWidth
                  label="First Name"
                  value={selectedUser.firstName}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={selectedUser.lastName}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={selectedUser.email}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={selectedUser.phone}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Role</InputLabel>
                  <Select value={selectedUser.role} label="Role">
                    <MenuItem value="System Administrator">System Administrator</MenuItem>
                    <MenuItem value="Emergency Dispatcher">Emergency Dispatcher</MenuItem>
                    <MenuItem value="Supervisor">Supervisor</MenuItem>
                    <MenuItem value="Field Responder">Field Responder</MenuItem>
                    <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Department"
                  value={selectedUser.department}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select value={selectedUser.status} label="Status">
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Suspended">Suspended</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={selectedUser.twoFactorEnabled}
                      onChange={(e) => setSelectedUser({
                        ...selectedUser,
                        twoFactorEnabled: e.target.checked
                      })}
                    />
                  }
                  label="Enable Two-Factor Authentication"
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

export default Users;

