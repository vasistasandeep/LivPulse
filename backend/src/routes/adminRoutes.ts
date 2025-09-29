import express from 'express';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// User interface
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

// Mock database - in production, replace with actual database
let users: User[] = [
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

let nextUserId = 4;

// ========== USER MANAGEMENT ENDPOINTS ==========

// Get all users with pagination and filtering
router.get('/users', (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      role = '', 
      department = '', 
      status = '' 
    } = req.query;

    let filteredUsers = [...users];

    // Apply filters
    if (search) {
      const searchLower = (search as string).toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower)
      );
    }

    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    if (department) {
      filteredUsers = filteredUsers.filter(user => user.department === department);
    }

    if (status) {
      const isActive = status === 'active';
      filteredUsers = filteredUsers.filter(user => user.isActive === isActive);
    }

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    // Remove passwords from response
    const safeUsers = paginatedUsers.map(({ ...user }) => user);

    res.json({
      success: true,
      data: {
        users: safeUsers,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(filteredUsers.length / limitNum),
          totalUsers: filteredUsers.length,
          hasNext: endIndex < filteredUsers.length,
          hasPrev: startIndex > 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
});

// Get user by ID
router.get('/users/:id', (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Remove password from response
    const { ...safeUser } = user;

    res.json({
      success: true,
      data: safeUser
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user'
    });
  }
});

// Create new user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { 
      username, 
      email, 
      name, 
      role, 
      department, 
      phone, 
      password,
      permissions = []
    } = req.body;

    // Validation
    if (!username || !email || !name || !role || !password) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: username, email, name, role, password'
      });
    }

    // Check if username or email already exists
    const existingUser = users.find(u => u.username === username || u.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Username or email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: nextUserId++,
      username,
      email,
      name,
      role,
      department: department || 'General',
      phone: phone || '',
      isActive: true,
      lastLogin: null,
      createdAt: new Date().toISOString(),
      permissions
    };

    users.push(newUser);

    // Remove password from response
    const { ...safeUser } = newUser;

    res.status(201).json({
      success: true,
      data: {
        message: 'User created successfully',
        user: safeUser
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create user'
    });
  }
});

// Update user
router.put('/users/:id', (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const { 
      email, 
      name, 
      role, 
      department, 
      phone, 
      isActive,
      permissions
    } = req.body;

    // Check if email already exists for other users
    if (email) {
      const existingUser = users.find(u => u.email === email && u.id !== userId);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'Email already exists'
        });
      }
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...(email && { email }),
      ...(name && { name }),
      ...(role && { role }),
      ...(department && { department }),
      ...(phone !== undefined && { phone }),
      ...(isActive !== undefined && { isActive }),
      ...(permissions && { permissions }),
      updatedAt: new Date().toISOString()
    };

    // Remove password from response
    const { ...safeUser } = users[userIndex];

    res.json({
      success: true,
      data: {
        message: 'User updated successfully',
        user: safeUser
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user'
    });
  }
});

// Delete user
router.delete('/users/:id', (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Don't allow deleting the last admin
    const user = users[userIndex];
    if (user.role === 'admin') {
      const adminCount = users.filter(u => u.role === 'admin').length;
      if (adminCount <= 1) {
        return res.status(400).json({
          success: false,
          error: 'Cannot delete the last admin user'
        });
      }
    }

    users.splice(userIndex, 1);

    res.json({
      success: true,
      data: {
        message: 'User deleted successfully',
        deletedUserId: userId
      }
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete user'
    });
  }
});

// Reset user password
router.post('/users/:id/reset-password', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        error: 'New password is required'
      });
    }

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // In real implementation, update password in database
    // For now, just return success

    res.json({
      success: true,
      data: {
        message: 'Password reset successfully'
      }
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset password'
    });
  }
});

// ========== ROLE & PERMISSION MANAGEMENT ==========

// Get all roles and their permissions
router.get('/roles', (req: Request, res: Response) => {
  try {
    const roles = [
      {
        name: 'admin',
        displayName: 'Administrator',
        description: 'Full system access',
        permissions: ['all'],
        userCount: users.filter(u => u.role === 'admin').length
      },
      {
        name: 'executive',
        displayName: 'Executive',
        description: 'View reports and analytics',
        permissions: ['view_reports', 'view_analytics', 'view_dashboards'],
        userCount: users.filter(u => u.role === 'executive').length
      },
      {
        name: 'pm',
        displayName: 'Project Manager',
        description: 'Project management access',
        permissions: ['view_dashboards', 'edit_content', 'manage_projects'],
        userCount: users.filter(u => u.role === 'pm').length
      },
      {
        name: 'tpm',
        displayName: 'Technical Program Manager',
        description: 'Technical program oversight',
        permissions: ['view_dashboards', 'view_technical', 'manage_technical'],
        userCount: users.filter(u => u.role === 'tpm').length
      },
      {
        name: 'em',
        displayName: 'Engineering Manager',
        description: 'Engineering team management',
        permissions: ['view_dashboards', 'manage_engineering', 'view_technical'],
        userCount: users.filter(u => u.role === 'em').length
      },
      {
        name: 'sre',
        displayName: 'Site Reliability Engineer',
        description: 'System reliability and monitoring',
        permissions: ['view_dashboards', 'manage_infrastructure', 'view_monitoring'],
        userCount: users.filter(u => u.role === 'sre').length
      }
    ];

    res.json({
      success: true,
      data: roles
    });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch roles'
    });
  }
});

// ========== ANALYTICS & REPORTING ==========

// Get user analytics
router.get('/analytics/users', (req: Request, res: Response) => {
  try {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.isActive).length;
    const inactiveUsers = totalUsers - activeUsers;

    // Role distribution
    const roleDistribution = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Department distribution
    const departmentDistribution = users.reduce((acc, user) => {
      const dept = user.department || 'Unassigned';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Recent activity (users logged in last 7 days)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentlyActiveUsers = users.filter(u => 
      u.lastLogin && new Date(u.lastLogin) > weekAgo
    ).length;

    res.json({
      success: true,
      data: {
        summary: {
          totalUsers,
          activeUsers,
          inactiveUsers,
          recentlyActiveUsers
        },
        distributions: {
          roles: roleDistribution,
          departments: departmentDistribution
        },
        metrics: {
          userGrowth: '+5.2%', // Mock data
          averageSessionTime: '24 min', // Mock data
          lastWeekLogins: recentlyActiveUsers
        }
      }
    });
  } catch (error) {
    console.error('Error fetching user analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user analytics'
    });
  }
});

// Get system analytics
router.get('/analytics/system', (req: Request, res: Response) => {
  try {
    // Mock system analytics data
    const analytics = {
      performance: {
        apiResponseTime: '145ms',
        uptime: '99.9%',
        errorRate: '0.02%',
        throughput: '1,250 req/min'
      },
      usage: {
        totalRequests: 45620,
        uniqueVisitors: 1234,
        pageViews: 8945,
        avgSessionDuration: '18min 30s'
      },
      resources: {
        cpuUsage: '23%',
        memoryUsage: '67%',
        diskUsage: '34%',
        networkLatency: '12ms'
      },
      security: {
        failedLogins: 3,
        suspiciousActivity: 0,
        lastSecurityScan: '2025-01-26T06:00:00Z',
        securityScore: 95
      }
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching system analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch system analytics'
    });
  }
});

// Admin data management endpoints

// Publishing data management
router.post('/publishing-data', (req: Request, res: Response) => {
  try {
    const publishingData = req.body;
    
    // In a real app, this would save to a database
    // For now, we'll just return success
    
    res.json({
      success: true,
      data: {
        message: 'Publishing data updated successfully',
        timestamp: new Date().toISOString(),
        updatedData: publishingData
      }
    });
  } catch (error) {
    console.error('Error updating publishing data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update publishing data'
    });
  }
});

// Dashboard data management
router.post('/dashboard-data', (req: Request, res: Response) => {
  try {
    const dashboardData = req.body;
    
    // In a real app, this would save to a database
    
    res.json({
      success: true,
      data: {
        message: 'Dashboard data updated successfully',
        timestamp: new Date().toISOString(),
        updatedData: dashboardData
      }
    });
  } catch (error) {
    console.error('Error updating dashboard data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update dashboard data'
    });
  }
});

// Platform data management
router.post('/platform-data', (req: Request, res: Response) => {
  try {
    const platformData = req.body;
    
    res.json({
      success: true,
      data: {
        message: 'Platform data updated successfully',
        timestamp: new Date().toISOString(),
        updatedData: platformData
      }
    });
  } catch (error) {
    console.error('Error updating platform data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update platform data'
    });
  }
});


// Settings management
router.get('/settings', (req: Request, res: Response) => {
  try {
    // Mock settings data
    const settings = {
      general: {
        appName: 'Livpulse',
        version: '1.0.0',
        environment: 'production',
        maintenanceMode: false,
        debugMode: false,
      },
      ui: {
        theme: 'light',
        primaryColor: '#1976d2',
        compactMode: false,
        showTooltips: true,
        autoRefreshInterval: 30,
      },
      notifications: {
        emailNotifications: true,
        pushNotifications: true,
        alertThreshold: 85,
        quietHours: {
          enabled: false,
          startTime: '22:00',
          endTime: '08:00',
        },
      },
      security: {
        sessionTimeout: 60,
        maxLoginAttempts: 3,
        requireTwoFactor: false,
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireNumbers: true,
          requireSymbols: false,
        },
      },
      analytics: {
        trackingEnabled: true,
        dataRetentionDays: 90,
        anonymizeData: true,
        exportFormat: 'json',
      },
      integrations: {
        railwayApiKey: '',
        slackWebhookUrl: '',
        emailProvider: 'sendgrid',
        enableWebhooks: true,
      },
    };

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch settings'
    });
  }
});

router.post('/settings', (req: Request, res: Response) => {
  try {
    const settings = req.body;
    
    // In a real app, this would save to a database
    
    res.json({
      success: true,
      data: {
        message: 'Settings updated successfully',
        timestamp: new Date().toISOString(),
        updatedSettings: settings
      }
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update settings'
    });
  }
});

export default router;