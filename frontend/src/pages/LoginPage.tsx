import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Avatar,
  Grid,
  Chip
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const demoAccounts = [
    { email: 'admin@livpulse.com', password: 'admin123', role: 'Admin', priority: true },
    { email: 'executive@livpulse.com', password: 'executive123', role: 'Executive' },
    { email: 'pm@livpulse.com', password: 'pm123', role: 'Program Manager' },
    { email: 'tpm@livpulse.com', password: 'tpm123', role: 'Technical PM' },
    { email: 'em@livpulse.com', password: 'em123', role: 'Engineering Manager' },
    { email: 'sre@livpulse.com', password: 'sre123', role: 'SRE' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      toast.success('Login successful!');
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
          <LockOutlined />
        </Avatar>
        
        <Typography component="h1" variant="h4" gutterBottom>
          LivPulse Platform
        </Typography>
        
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Advanced OTT Platform Management
        </Typography>

        <Card sx={{ mt: 3, width: '100%' }}>
          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card sx={{ mt: 3, width: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Demo Accounts
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Click on any account to auto-fill credentials:
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {demoAccounts.map((account, index) => (
                <Grid item xs={12} key={index}>
                  <Box
                    sx={{
                      p: 2,
                      border: '1px solid',
                      borderColor: account.role === 'Admin' ? 'error.main' : 'divider',
                      borderRadius: 1,
                      cursor: 'pointer',
                      backgroundColor: account.role === 'Admin' ? 'error.50' : 'transparent',
                      '&:hover': {
                        backgroundColor: account.role === 'Admin' ? 'error.100' : 'action.hover',
                      },
                    }}
                    onClick={() => handleDemoLogin(account.email, account.password)}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {account.email}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Password: {account.password}
                        </Typography>
                      </Box>
                      <Chip
                        label={account.role}
                        size="small"
                        color={account.role === 'Admin' ? 'error' : account.role === 'Executive' ? 'warning' : 'primary'}
                        variant={account.role === 'Admin' ? 'filled' : 'outlined'}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 3 }}>
          LivPulse v2.0 - Advanced OTT Platform with Admin & KPI Management System
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
