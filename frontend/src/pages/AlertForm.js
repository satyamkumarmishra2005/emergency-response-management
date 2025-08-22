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
} from '@mui/material';
import {
  Warning as WarningIcon,
  LocationOn as LocationIcon,
  Description as DescriptionIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

const steps = ['Alert Details', 'Location & Description', 'Review & Submit'];

const AlertForm = () => {
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
      type: '',
      severity: '',
      location: '',
      coordinates: '',
      description: '',
      assignedResponder: '',
      additionalNotes: '',
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
      console.log('Submitting alert:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Emergency alert created successfully!');
      reset();
      navigate('/alerts');
    } catch (error) {
      console.error('Error creating alert:', error);
      toast.error('Failed to create alert. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="type"
                control={control}
                rules={{ required: 'Alert type is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Emergency Type *</InputLabel>
                    <Select {...field} label="Emergency Type *">
                      <MenuItem value="Fire">🔥 Fire</MenuItem>
                      <MenuItem value="Medical">🚑 Medical Emergency</MenuItem>
                      <MenuItem value="Traffic">🚗 Traffic Accident</MenuItem>
                      <MenuItem value="Natural Disaster">🌊 Natural Disaster</MenuItem>
                      <MenuItem value="Chemical Spill">☣️ Chemical Spill</MenuItem>
                      <MenuItem value="Security">🚨 Security Threat</MenuItem>
                      <MenuItem value="Other">⚠️ Other</MenuItem>
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

            <Grid item xs={12} md={6}>
              <Controller
                name="severity"
                control={control}
                rules={{ required: 'Severity level is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.severity}>
                    <InputLabel>Severity Level *</InputLabel>
                    <Select {...field} label="Severity Level *">
                      <MenuItem value="Low">
                        <Chip label="Low" color="success" size="small" sx={{ mr: 1 }} />
                        Low Priority
                      </MenuItem>
                      <MenuItem value="Medium">
                        <Chip label="Medium" color="warning" size="small" sx={{ mr: 1 }} />
                        Medium Priority
                      </MenuItem>
                      <MenuItem value="High">
                        <Chip label="High" color="error" size="small" sx={{ mr: 1 }} />
                        High Priority - Immediate Response Required
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              {errors.severity && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {errors.severity.message}
                </Alert>
              )}
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="location"
                control={control}
                rules={{ required: 'Location is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Location *"
                    placeholder="e.g., Downtown Mall, 123 Main St"
                    error={!!errors.location}
                    helperText={errors.location?.message}
                    InputProps={{
                      startAdornment: <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="coordinates"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Coordinates (Optional)"
                    placeholder="e.g., 40.7128, -74.0060"
                    helperText="GPS coordinates for precise location"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required', minLength: { value: 10, message: 'Description must be at least 10 characters' } }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Description *"
                    multiline
                    rows={4}
                    placeholder="Provide detailed description of the emergency situation..."
                    error={!!errors.description}
                    helperText={errors.description?.message || 'Be as detailed as possible to help responders'}
                    InputProps={{
                      startAdornment: <DescriptionIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="assignedResponder"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Assign to Responder (Optional)"
                    placeholder="e.g., Fire Team Alpha, EMS Unit Bravo"
                    helperText="Leave blank for automatic assignment"
                    InputProps={{
                      startAdornment: <AssignmentIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom>
              Review Alert Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Emergency Type
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {watchedValues.type}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Severity Level
                </Typography>
                <Chip
                  label={watchedValues.severity}
                  color={watchedValues.severity === 'High' ? 'error' : watchedValues.severity === 'Medium' ? 'warning' : 'success'}
                  sx={{ mb: 2 }}
                />

                <Typography variant="subtitle2" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {watchedValues.location}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Coordinates
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {watchedValues.coordinates || 'Not specified'}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Assigned Responder
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {watchedValues.assignedResponder || 'Automatic assignment'}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1">
                  {watchedValues.description}
                </Typography>
              </Grid>
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
        <WarningIcon sx={{ fontSize: 40, color: 'error.main', mr: 2 }} />
        <Typography variant="h4" component="h1">
          Create Emergency Alert
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
                    sx={{ backgroundColor: 'error.main' }}
                  >
                    {loading ? 'Creating Alert...' : 'Create Emergency Alert'}
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
        <Button onClick={() => navigate('/alerts')} color="inherit">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AlertForm;

