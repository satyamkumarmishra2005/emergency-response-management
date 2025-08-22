import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Chip,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Autocomplete,
  FormControlLabel,
  Switch,
  Divider,
} from '@mui/material';
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Security as SecurityIcon,
  Assignment as AssignmentIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

const steps = ['Basic Information', 'Contact & Department', 'Security & Permissions', 'Review'];

const UserForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      permissions: [],
      twoFactorEnabled: false,
      notes: '',
    },
  });

  const watchedValues = watch();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      console.log('Submitting user:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('User added successfully!');
      reset();
      navigate('/users');
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Failed to add user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'System Administrator', label: '🔐 System Administrator', description: 'Full system access and configuration' },
    { value: 'Emergency Dispatcher', label: '🚨 Emergency Dispatcher', description: 'Alert management and responder assignment' },
    { value: 'Supervisor', label: '👔 Supervisor', description: 'Team management and performance monitoring' },
    { value: 'Field Responder', label: '🚑 Field Responder', description: 'Field operations and status updates' },
    { value: 'Data Analyst', label: '📊 Data Analyst', description: 'Reports and analytics access' },
    { value: 'Support Staff', label: '🛠️ Support Staff', description: 'Limited system access for support tasks' },
  ];

  const departmentOptions = [
    'IT Department',
    'Dispatch Center',
    'Operations',
    'Fire Department',
    'Police Department',
    'Emergency Medical Services',
    'Analytics',
    'Administration',
    'Training',
    'Maintenance',
  ];

  const permissionOptions = [
    'Full Access',
    'User Management',
    'System Configuration',
    'Alert Management',
    'Responder Assignment',
    'View Reports',
    'Team Management',
    'Performance Monitoring',
    'Status Updates',
    'Data Export',
    'Analytics Tools',
    'Basic Reports',
  ];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="username"
                control={control}
                rules={{ 
                  required: 'Username is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+$/,
                    message: 'Username can only contain letters, numbers, dots, underscores, and hyphens'
                  },
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters long'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Username *"
                    placeholder="e.g., john.doe, dispatcher.smith"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="First Name *"
                    placeholder="e.g., John, Sarah"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Last Name *"
                    placeholder="e.g., Doe, Smith"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                rules={{ 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email Address *"
                    placeholder="user@emergency.gov"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputProps={{
                      startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="phone"
                control={control}
                rules={{ 
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[\+]?[1-9][\d]{0,15}$/,
                    message: 'Please enter a valid phone number'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Phone Number *"
                    placeholder="+1 (555) 123-4567"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    InputProps={{
                      startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="role"
                control={control}
                rules={{ required: 'Role is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.role}>
                    <InputLabel>Role *</InputLabel>
                    <Select {...field} label="Role *">
                      {roleOptions.map((role) => (
                        <MenuItem key={role.value} value={role.value}>
                          <Box>
                            <Typography variant="body1">{role.label}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {role.description}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              {errors.role && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {errors.role.message}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="department"
                control={control}
                rules={{ required: 'Department is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.department}>
                    <InputLabel>Department *</InputLabel>
                    <Select {...field} label="Department *">
                      {departmentOptions.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <BusinessIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                            {dept}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              {errors.department && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {errors.department.message}
                </Alert>
              )}
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Security Settings
              </Typography>
              <Controller
                name="twoFactorEnabled"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={field.value}
                        onChange={field.onChange}
                        color="primary"
                      />
                    }
                    label="Enable Two-Factor Authentication (Recommended)"
                  />
                )}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 4 }}>
                Two-factor authentication adds an extra layer of security to the user's account.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Permissions
              </Typography>
              <Controller
                name="permissions"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    options={permissionOptions}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="User Permissions"
                        placeholder="Select permissions..."
                        helperText="Choose the permissions this user should have"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: <SecurityIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                        }}
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          key={option}
                          color="primary"
                          variant="outlined"
                        />
                      ))
                    }
                    onChange={(event, newValue) => field.onChange(newValue)}
                  />
                )}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Permissions will be automatically assigned based on the selected role, but can be customized here.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Additional Notes"
                    multiline
                    rows={3}
                    placeholder="Any additional information about the user, special requirements, or notes..."
                    helperText="Optional: Additional details about the user account"
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom>
              Review User Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Username
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {watchedValues.username}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Full Name
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {watchedValues.firstName} {watchedValues.lastName}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {watchedValues.email}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {watchedValues.phone}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Role
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {watchedValues.role}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Department
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {watchedValues.department}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Two-Factor Authentication
                </Typography>
                <Chip
                  label={watchedValues.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  color={watchedValues.twoFactorEnabled ? 'success' : 'default'}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Permissions
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {watchedValues.permissions?.length > 0 ? (
                    watchedValues.permissions.map((permission, index) => (
                      <Chip key={index} label={permission} size="small" color="primary" />
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Default permissions based on role
                    </Typography>
                  )}
                </Box>
              </Grid>

              {watchedValues.notes && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Additional Notes
                  </Typography>
                  <Typography variant="body1">
                    {watchedValues.notes}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <PersonIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Typography variant="h4" component="h1">
          Add New User
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>

              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!isValid || loading}
                    color="primary"
                  >
                    {loading ? 'Adding User...' : 'Add User'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!isValid}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button onClick={() => navigate('/users')} color="inherit">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;

