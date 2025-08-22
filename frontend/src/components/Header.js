import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Chip,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Warning as WarningIcon,
  Person as PersonIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    handleMenuClose();
    // Add logout logic here
    navigate('/login');
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: 'saturate(180%) blur(6px)',
        backgroundColor: (theme) => `${theme.palette.background.paper}CC`,
        color: 'text.primary',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <IconButton
          color="primary"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
          <WarningIcon color="primary" />
          <Typography variant="h6" noWrap component="div">
            Emergency Response System
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search responders, alerts, users..."
            sx={{ width: { xs: 0, sm: 280 }, display: { xs: 'none', sm: 'inline-flex' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          {/* Emergency Status Indicator */}
          <Chip
            label="SYSTEM ACTIVE"
            color="success"
            size="small"
            sx={{ 
              backgroundColor: '#4caf50',
              color: 'white',
              fontWeight: 'bold',
              '& .MuiChip-label': { px: 1 }
            }}
          />

          {/* Notifications */}
          <IconButton color="primary">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* User Profile */}
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={isMenuOpen ? 'primary-search-account-menu' : undefined}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="primary"
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
              <PersonIcon />
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          id="primary-search-account-menu"
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

