import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Warning as AlertIcon,
  People as ResponderIcon,
  Person as UserIcon,
  Settings as SettingsIcon,
  Assessment as ReportIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Emergency Alerts', icon: <AlertIcon />, path: '/alerts' },
  { text: 'Responders', icon: <ResponderIcon />, path: '/responders' },
  { text: 'Users', icon: <UserIcon />, path: '/users' },
  { text: 'Reports', icon: <ReportIcon />, path: '/reports' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 960) {
      onClose();
    }
  };

  const drawer = (
    <Box>
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'primary.contrastText',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          ERS
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.9 }}>
          Emergency Response System
        </Typography>
      </Box>
      
      <Divider />
      
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                '&.Mui-selected': {
                  backgroundColor: (theme) => theme.palette.action.selected,
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.action.selected,
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'primary.main' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: 'none',
            boxShadow: '4px 0 24px rgba(0,0,0,0.06)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;

