import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Header from './components/Header';
import Sidebar, { drawerWidth } from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import Responders from './pages/Responders';
import Users from './pages/Users';
import AlertForm from './pages/AlertForm';
import ResponderForm from './pages/ResponderForm';
import UserForm from './pages/UserForm';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header onMenuClick={toggleSidebar} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 10,
          backgroundColor: 'background.default',
          minHeight: '100vh',
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/alerts/new" element={<AlertForm />} />
            <Route path="/responders" element={<Responders />} />
            <Route path="/responders/new" element={<ResponderForm />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/new" element={<UserForm />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default App;

