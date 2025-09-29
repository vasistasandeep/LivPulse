// ============= SHARED TYPES FOR LIVPULSE =============

// User Management Types
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

export interface Role {
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
  userCount: number;
}

// Authentication Types
export interface AuthUser {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
  isAdmin: boolean;
  hasFullAccess: boolean;
  hasInputAccess: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Dashboard & KPI Types
export interface Widget {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'gauge' | 'trend';
  title: string;
  description?: string;
  dataSource: string;
  config: WidgetConfig;
  position: WidgetPosition;
  isVisible: boolean;
  permissions: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface WidgetConfig {
  chartType?: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  dataKeys?: string[];
  colors?: string[];
  showLegend?: boolean;
  showAxes?: boolean;
  format?: 'number' | 'percentage' | 'currency' | 'duration';
  threshold?: { warning: number; critical: number };
  refreshInterval?: number;
  filters?: Record<string, any>;
}

export interface WidgetPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Dashboard {
  id: string;
  name: string;
  description?: string;
  category: string;
  isPublic: boolean;
  widgets: string[];
  layout: DashboardLayout;
  permissions: DashboardPermissions;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export interface DashboardLayout {
  columns: number;
  rowHeight: number;
  margin: [number, number];
  containerPadding: [number, number];
}

export interface DashboardPermissions {
  view: string[];
  edit: string[];
}

export interface DataSource {
  id: string;
  name: string;
  type: 'api' | 'database' | 'file' | 'mock';
  config: DataSourceConfig;
  fields: DataField[];
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface DataSourceConfig {
  url?: string;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  query?: string;
  refreshInterval?: number;
  cacheTimeout?: number;
}

export interface DataField {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  label: string;
  description?: string;
  format?: string;
}

// Analytics Types
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

export interface KPIAnalytics {
  dashboards: {
    total: number;
    byCategory: Record<string, number>;
  };
  widgets: {
    total: number;
    byType: Record<string, number>;
    visible: number;
  };
  dataSources: {
    total: number;
    active: number;
    byType: Record<string, number>;
  };
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<{
  items: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}> {}

// Form Types
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

export interface DashboardFormData {
  name: string;
  description?: string;
  category: string;
  widgets?: string[];
  layout?: DashboardLayout;
  permissions?: DashboardPermissions;
}

export interface WidgetFormData {
  type: 'chart' | 'metric' | 'table' | 'gauge' | 'trend';
  title: string;
  description?: string;
  dataSource: string;
  config?: WidgetConfig;
  position?: WidgetPosition;
  permissions?: string[];
}

export interface DataSourceFormData {
  name: string;
  type: 'api' | 'database' | 'file' | 'mock';
  config?: DataSourceConfig;
  fields?: DataField[];
}

// Filter Types
export interface UserFilters {
  search?: string;
  role?: string;
  department?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface DashboardFilters {
  category?: string;
  userId?: string;
}

export interface WidgetFilters {
  type?: string;
  dataSource?: string;
}

export interface DataSourceFilters {
  type?: string;
  isActive?: boolean;
}

// Constants
export const USER_ROLES = {
  ADMIN: 'admin',
  EXECUTIVE: 'executive',
  PM: 'pm',
  TPM: 'tpm',
  EM: 'em',
  SRE: 'sre',
} as const;

export const WIDGET_TYPES = {
  CHART: 'chart',
  METRIC: 'metric',
  TABLE: 'table',
  GAUGE: 'gauge',
  TREND: 'trend',
} as const;

export const DATA_SOURCE_TYPES = {
  API: 'api',
  DATABASE: 'database',
  FILE: 'file',
  MOCK: 'mock',
} as const;

export const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
  AREA: 'area',
  SCATTER: 'scatter',
} as const;

export const PERMISSIONS = {
  ALL: 'all',
  VIEW_REPORTS: 'view_reports',
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_DASHBOARDS: 'view_dashboards',
  EDIT_CONTENT: 'edit_content',
  MANAGE_PROJECTS: 'manage_projects',
  VIEW_TECHNICAL: 'view_technical',
  MANAGE_TECHNICAL: 'manage_technical',
  MANAGE_ENGINEERING: 'manage_engineering',
  MANAGE_INFRASTRUCTURE: 'manage_infrastructure',
  VIEW_MONITORING: 'view_monitoring',
} as const;