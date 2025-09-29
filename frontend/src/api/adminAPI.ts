import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/admin`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
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

export interface UserFormData {
  username: string;
  email: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  password?: string;
  permissions: string[];
}

export interface UserFilters {
  search?: string;
  role?: string;
  department?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface Role {
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
  userCount: number;
}

export interface UserAnalytics {
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

export interface SystemAnalytics {
  performance: {
    apiResponseTime: string;
    uptime: string;
    errorRate: string;
    throughput: string;
  };
  usage: {
    totalRequests: number;
    uniqueVisitors: number;
    pageViews: number;
    avgSessionDuration: string;
  };
  resources: {
    cpuUsage: string;
    memoryUsage: string;
    diskUsage: string;
    networkLatency: string;
  };
  security: {
    failedLogins: number;
    suspiciousActivity: number;
    lastSecurityScan: string;
    securityScore: number;
  };
}

export const adminAPI = {
  // User Management
  async getUsers(filters: UserFilters = {}) {
    const response = await api.get('/users', { params: filters });
    return response.data;
  },

  async getUserById(id: number) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async createUser(userData: UserFormData) {
    const response = await api.post('/users', userData);
    return response.data;
  },

  async updateUser(id: number, userData: Partial<UserFormData>) {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id: number) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  async resetPassword(id: number, newPassword: string) {
    const response = await api.post(`/users/${id}/reset-password`, { newPassword });
    return response.data;
  },

  // Role Management
  async getRoles() {
    const response = await api.get('/roles');
    return response.data;
  },

  // Analytics
  async getUserAnalytics() {
    const response = await api.get('/analytics/users');
    return response.data;
  },

  async getSystemAnalytics() {
    const response = await api.get('/analytics/system');
    return response.data;
  },

  // Settings Management
  async getSettings() {
    const response = await api.get('/settings');
    return response.data;
  },

  async updateSettings(settings: any) {
    const response = await api.post('/settings', settings);
    return response.data;
  },

  // Data Management (existing endpoints)
  async updatePublishingData(data: any) {
    const response = await api.post('/publishing-data', data);
    return response.data;
  },

  async updateDashboardData(data: any) {
    const response = await api.post('/dashboard-data', data);
    return response.data;
  },

  async updatePlatformData(data: any) {
    const response = await api.post('/platform-data', data);
    return response.data;
  },
};

export default adminAPI;