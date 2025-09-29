import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  CircularProgress,
  Avatar,
  Badge,
} from '@mui/material';
import {
  Save,
  Add,
  Edit,
  Delete,
  PersonAdd,
  AdminPanelSettings,
  Person,
  InfoOutlined,
  Visibility,
  VisibilityOff,
  Search,
  FilterList,
  ExpandMore,
  Analytics,
  Security,
  VpnKey,
  Phone,
  Business,
  Email,
  CalendarToday,
  AccessTime,
  TrendingUp,
  Group,
  Shield,
  Clear,
} from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminAPI } from '../../api/adminAPI';

interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt?: string;
  permissions: string[];
}

interface UserFormData {
  username: string;
  email: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  password?: string;
  permissions: string[];
}

interface UserFilters {
  search: string;
  role: string;
  department: string;
  status: string;
}

interface Analytics {
  summary: {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    recentlyActiveUsers: number;
  };
  distributions: {
    roles: Record<string, number>;
    departments: Record<string, number>;
  };
  metrics: {
    userGrowth: string;
    averageSessionTime: string;
    lastWeekLogins: number;
  };
}

const roles = [
  { value: 'admin', label: 'Administrator', color: '#f44336' },
  { value: 'executive', label: 'Executive', color: '#9c27b0' },
  { value: 'pm', label: 'Project Manager', color: '#2196f3' },
  { value: 'tpm', label: 'Technical PM', color: '#00bcd4' },
  { value: 'em', label: 'Engineering Manager', color: '#4caf50' },
  { value: 'sre', label: 'Site Reliability Engineer', color: '#ff9800' },
];

const UserManagementForm: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [resetPasswordUser, setResetPasswordUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Filters
  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    role: '',
    department: '',
    status: ''
  });
  
  const [userForm, setUserForm] = useState<UserFormData>({
    username: '',
    email: '',
    name: '',
    role: 'pm',
    department: '',
    phone: '',
    password: '',
    permissions: []
  });

  const queryClient = useQueryClient();

  // For demo purposes, we'll use mock data instead of actual API calls
  const mockUsers: User[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@livpulse.com',
      name: 'Admin User',
      role: 'admin',
      department: 'IT',
      phone: '+1-555-0101',
      isActive: true,
      lastLogin: '2025-01-26T10:30:00Z',
      createdAt: '2025-01-01T00:00:00Z',
      permissions: ['all']
    },
    {
      id: 2,
      username: 'executive1',
      email: 'exec@livpulse.com',
      name: 'John Executive',
      role: 'executive',
      department: 'Leadership',
      phone: '+1-555-0102',
      isActive: true,
      lastLogin: '2025-01-26T09:15:00Z',
      createdAt: '2025-01-02T00:00:00Z',
      permissions: ['view_reports', 'view_analytics']
    },
    {
      id: 3,
      username: 'pm1',
      email: 'pm@livpulse.com',
      name: 'Sarah Manager',
      role: 'pm',
      department: 'Product',
      phone: '+1-555-0103',
      isActive: true,
      lastLogin: '2025-01-25T16:45:00Z',
      createdAt: '2025-01-03T00:00:00Z',
      permissions: ['view_dashboards', 'edit_content']
    }
  ];

  const [users, setUsers] = useState<User[]>(mockUsers);

  const resetForm = () => {
    setUserForm({
      username: '',
      email: '',
      name: '',
      role: 'pm',
      department: '',
      phone: '',
      password: '',
      permissions: []
    });
  };

  const handleSubmit = () => {
    if (editingUser) {
      // Update user
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...userForm, updatedAt: new Date().toISOString() }
          : user
      ));
    } else {
      // Create new user
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...userForm,
        isActive: true,
        lastLogin: null,
        createdAt: new Date().toISOString(),
        permissions: userForm.permissions
      };
      setUsers(prev => [...prev, newUser]);
    }
    setShowDialog(false);
    setEditingUser(null);
    resetForm();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setUserForm({
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      department: user.department,
      phone: user.phone,
      permissions: user.permissions
    });
    setShowDialog(true);
  };

  const handleDelete = (user: User) => {
    if (window.confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      setUsers(prev => prev.filter(u => u.id !== user.id));
    }
  };

  const handleResetPassword = (user: User) => {
    setResetPasswordUser(user);
    setShowPasswordDialog(true);
  };

  const handlePasswordReset = () => {
    // Mock password reset
    setShowPasswordDialog(false);
    setResetPasswordUser(null);
    setNewPassword('');
  };

  const getRoleColor = (role: string) => {
    const roleConfig = roles.find(r => r.value === role);
    return roleConfig?.color || '#666';
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter users based on filters
  const filteredUsers = users.filter(user => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!user.name.toLowerCase().includes(searchLower) &&
          !user.email.toLowerCase().includes(searchLower) &&
          !user.username.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    if (filters.role && user.role !== filters.role) return false;
    if (filters.department && user.department !== filters.department) return false;
    if (filters.status) {
      const isActive = filters.status === 'active';
      if (user.isActive !== isActive) return false;
    }
    return true;
  });

  // Pagination
  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  // Mock analytics
  const analytics = {
    summary: {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.isActive).length,
      inactiveUsers: users.filter(u => !u.isActive).length,
      recentlyActiveUsers: users.filter(u => u.lastLogin).length
    },
    distributions: {
      roles: users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      departments: users.reduce((acc, user) => {
        acc[user.department] = (acc[user.department] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    },
    metrics: {
      userGrowth: '+5.2%',
      averageSessionTime: '24 min',
      lastWeekLogins: users.filter(u => u.lastLogin).length
    }
  };

  return (
    <Box>
      {/* Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <Group />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  User Management
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Manage users, roles, and permissions
                </Typography>
              </Box>
            </Box>
            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                startIcon={<Analytics />}
                onClick={() => setShowAnalytics(!showAnalytics)}
              >
                Analytics
              </Button>
              <Button
                variant="contained"
                startIcon={<PersonAdd />}
                onClick={() => setShowDialog(true)}
              >
                Add User
              </Button>
            </Box>
          </Box>

          {/* Analytics Section */}
          {showAnalytics && (
            <Accordion expanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">User Analytics</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          User Summary
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box textAlign="center">
                              <Typography variant="h4" color="primary">
                                {analytics.summary.totalUsers}
                              </Typography>
                              <Typography variant="body2">Total Users</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box textAlign="center">
                              <Typography variant="h4" color="success.main">
                                {analytics.summary.activeUsers}
                              </Typography>
                              <Typography variant="body2">Active Users</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box textAlign="center">
                              <Typography variant="h4" color="warning.main">
                                {analytics.summary.recentlyActiveUsers}
                              </Typography>
                              <Typography variant="body2">Recently Active</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box textAlign="center">
                              <Typography variant="h4" color="text.secondary">
                                {analytics.summary.inactiveUsers}
                              </Typography>
                              <Typography variant="body2">Inactive Users</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Role Distribution
                        </Typography>
                        <Box>
                          {Object.entries(analytics.distributions.roles).map(([role, count]) => (
                            <Box key={role} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                              <Chip
                                size="small"
                                label={role.toUpperCase()}
                                sx={{ bgcolor: getRoleColor(role), color: 'white', minWidth: 80 }}
                              />
                              <Typography fontWeight="bold">{count}</Typography>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Filters */}
          <Box mt={3}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search users..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    endAdornment: filters.search && (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setFilters({ ...filters, search: '' })}
                        >
                          <Clear />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={filters.role}
                    label="Role"
                    onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                  >
                    <MenuItem value="">All Roles</MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role.value} value={role.value}>
                        {role.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={filters.department}
                    label="Department"
                    onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  >
                    <MenuItem value="">All Departments</MenuItem>
                    <MenuItem value="IT">IT</MenuItem>
                    <MenuItem value="Leadership">Leadership</MenuItem>
                    <MenuItem value="Product">Product</MenuItem>
                    <MenuItem value="Engineering">Engineering</MenuItem>
                    <MenuItem value="Operations">Operations</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filters.status}
                    label="Status"
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  >
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  variant="outlined"
                  startIcon={<Clear />}
                  onClick={() => setFilters({ search: '', role: '', department: '', status: '' })}
                >
                  Clear Filters
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ bgcolor: user.isActive ? 'success.main' : 'grey.400' }}>
                          {user.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography fontWeight="bold">{user.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {user.email}
                          </Typography>
                          {user.phone && (
                            <Typography variant="caption" color="textSecondary">
                              {user.phone}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={user.role.toUpperCase()}
                        sx={{ 
                          bgcolor: getRoleColor(user.role), 
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        size="small" 
                        variant="outlined" 
                        label={user.department} 
                      />
                    </TableCell>
                    <TableCell>
                      <Badge 
                        color={user.isActive ? 'success' : 'error'}
                        variant="dot"
                      >
                        <Typography variant="body2">
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Typography>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(user.lastLogin)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip title="Edit user">
                          <IconButton size="small" onClick={() => handleEdit(user)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reset password">
                          <IconButton size="small" onClick={() => handleResetPassword(user)}>
                            <VpnKey />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete user">
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDelete(user)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </CardContent>
      </Card>

      {/* User Dialog */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Username"
                value={userForm.username}
                onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={userForm.phone}
                onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={userForm.role}
                  label="Role"
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Department"
                value={userForm.department}
                onChange={(e) => setUserForm({ ...userForm, department: e.target.value })}
              />
            </Grid>
            {!editingUser && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!userForm.username || !userForm.email || !userForm.name || (!editingUser && !userForm.password)}
          >
            {editingUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Password Reset Dialog */}
      <Dialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)}>
        <DialogTitle>
          Reset Password for {resetPasswordUser?.name}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handlePasswordReset} 
            variant="contained"
            disabled={!newPassword}
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagementForm;