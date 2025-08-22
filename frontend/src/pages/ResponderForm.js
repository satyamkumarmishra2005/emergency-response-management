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
} from '@mui/material';
import {
  People as PeopleIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

const steps = ['Basic Information', 'Contact & Location', 'Specializations & Review'];

const ResponderForm = () => {
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
      name: '',
      type: '',
      contactPerson: '',
      phone: '',
      email: '',
      location: '',
      specializations: [],
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
      console.log('Submitting responder:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Emergency responder added successfully!');
      reset();
      navigate('/responders');
    } catch (error) {
      console.error('Error adding responder:', error);
      toast.error('Failed to add responder. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const responderTypes = [
    { value: 'Fire Department', label: '🚒 Fire Department', description: 'Fire suppression and rescue operations' },
    { value: 'Emergency Medical', label: '🚑 Emergency Medical', description: 'Medical emergency response and care' },
    { value: 'Traffic Management', label: '🚦 Traffic Management', description: 'Traffic control and accident management' },
    { value: 'Special Operations', label: '⚡ Special Operations', description: 'Specialized emergency response teams' },
    { value: 'Hazardous Materials', label: '☣️ Hazardous Materials', description: 'Chemical and hazardous material response' },
    { value: 'Search and Rescue', label: '🔍 Search and Rescue', description: 'Search and rescue operations' },
    { value: 'Law Enforcement', label: '👮 Law Enforcement', description: 'Police and security response' },
  ];

  const specializationOptions = [
    'Fire Suppression',
    'Rescue Operations',
    'Trauma Care',
    'Cardiac Response',
    'Accident Management',
    'Traffic Flow',
    'Natural Disasters',
    'Hazmat Response',
    'Chemical Spills',
    'Radiation Response',
    'Search Operations',
    'Emergency Communications',
    'Disaster Planning',
    'Emergency Training',
  ];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Team name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Team Name *"
                    placeholder="e.g., Fire Team Alpha, EMS Unit Bravo"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    InputProps={{
                      startAdornment: <PeopleIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="type"
                control={control}
                rules={{ required: 'Responder type is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Responder Type *</InputLabel>
                    <Select {...field} label="Responder Type *">
                      {responderTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          <Box>
                            <Typography variant="body1">{type.label}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {type.description}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              {errors.type && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {errors.type.message}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="contactPerson"
                control={control}
                rules={{ required: 'Contact person is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Primary Contact Person *"
                    placeholder="e.g., Captain John Smith, Paramedic Sarah Johnson"
                    error={!!errors.contactPerson}
                    helperText={errors.contactPerson?.message}
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
                    placeholder="team@department.gov"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputProps={{
                      startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="location"
                control={control}
                rules={{ required: 'Location is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Base Location *"
                    placeholder="e.g., Fire Station 1, Downtown Medical Center"
                    error={!!errors.location}
                    helperText={errors.location?.message}
                    InputProps={{
                      startAdornment: <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="specializations"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    options={specializationOptions}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Specializations"
                        placeholder="Select specializations..."
                        helperText="Choose the areas this team specializes in"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: <AssignmentIcon sx={{ mr: 1, color: 'text.secondary' }} />,
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
                    placeholder="Any additional information about the team, equipment, or special capabilities..."
                    helperText="Optional: Additional details about the team"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
                <Typography variant="h6" gutterBottom>
                  Review Responder Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Team Name
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {watchedValues.name}
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary">
                      Type
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {watchedValues.type}
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary">
                      Contact Person
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {watchedValues.contactPerson}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {watchedValues.phone}
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {watchedValues.email}
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {watchedValues.location}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Specializations
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                      {watchedValues.specializations?.length > 0 ? (
                        watchedValues.specializations.map((spec, index) => (
                          <Chip key={index} label={spec} size="small" color="primary" />
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No specializations selected
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
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Typography variant="h4" component="h1">
          Add Emergency Responder
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
                    {loading ? 'Adding Responder...' : 'Add Emergency Responder'}
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
        <Button onClick={() => navigate('/responders')} color="inherit">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ResponderForm;

