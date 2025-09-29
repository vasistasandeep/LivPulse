import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PlatformPage from './pages/PlatformPage';
import BackendPage from './pages/BackendPage';
import OperationsPage from './pages/OperationsPage';
import StorePage from './pages/StorePage';
import CMSPage from './pages/CMSPage';
import ReportsPage from './pages/ReportsPage';
import LoadingSpinner from './components/Shared/LoadingSpinner';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <LoadingSpinner size={60} />
      </Box>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/platforms" element={<PlatformPage />} />
        <Route path="/backend" element={<BackendPage />} />
        <Route path="/operations" element={<OperationsPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/cms" element={<CMSPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
