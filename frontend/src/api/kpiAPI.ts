import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/kpi`,
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

// ============= TYPE DEFINITIONS =============

export interface WidgetConfig {
  chartType?: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  dataKeys?: string[];
  colors?: string[];
  showLegend?: boolean;
  showAxes?: boolean;
  format?: 'number' | 'percentage' | 'currency' | 'duration';
  threshold?: { warning: number; critical: number };
  refreshInterval?: number; // in seconds
  filters?: Record<string, any>;
}

export interface Widget {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'gauge' | 'trend';
  title: string;
  description?: string;
  dataSource: string;
  config: WidgetConfig;
  position: { x: number; y: number; w: number; h: number };
  isVisible: boolean;
  permissions: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface DashboardLayout {
  columns: number;
  rowHeight: number;
  margin: [number, number];
  containerPadding: [number, number];
}

export interface Dashboard {
  id: string;
  name: string;
  description?: string;
  category: string;
  isPublic: boolean;
  widgets: string[]; // widget IDs
  layout: DashboardLayout;
  permissions: {
    view: string[];
    edit: string[];
  };
  createdBy: string;
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

export interface WidgetData {
  value?: number;
  change?: number;
  trend?: 'up' | 'down';
  data?: Array<{
    name: string;
    value: number;
    date: string;
  }>;
  columns?: string[];
  rows?: any[][];
  message?: string;
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

// ============= FORM INTERFACES =============

export interface DashboardFormData {
  name: string;
  description?: string;
  category: string;
  widgets?: string[];
  layout?: DashboardLayout;
  permissions?: {
    view: string[];
    edit: string[];
  };
}

export interface WidgetFormData {
  type: 'chart' | 'metric' | 'table' | 'gauge' | 'trend';
  title: string;
  description?: string;
  dataSource: string;
  config?: WidgetConfig;
  position?: { x: number; y: number; w: number; h: number };
  permissions?: string[];
}

export interface DataSourceFormData {
  name: string;
  type: 'api' | 'database' | 'file' | 'mock';
  config?: DataSourceConfig;
  fields?: DataField[];
}

// ============= FILTER INTERFACES =============

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

// ============= API CLIENT =============

export const kpiAPI = {
  // Dashboard Management
  async getDashboards(filters: DashboardFilters = {}) {
    const response = await api.get('/dashboards', { params: filters });
    return response.data;
  },

  async getDashboardById(id: string) {
    const response = await api.get(`/dashboards/${id}`);
    return response.data;
  },

  async createDashboard(data: DashboardFormData) {
    const response = await api.post('/dashboards', data);
    return response.data;
  },

  async updateDashboard(id: string, data: Partial<DashboardFormData>) {
    const response = await api.put(`/dashboards/${id}`, data);
    return response.data;
  },

  async deleteDashboard(id: string) {
    const response = await api.delete(`/dashboards/${id}`);
    return response.data;
  },

  // Widget Management
  async getWidgets(filters: WidgetFilters = {}) {
    const response = await api.get('/widgets', { params: filters });
    return response.data;
  },

  async getWidgetById(id: string) {
    const response = await api.get(`/widgets/${id}`);
    return response.data;
  },

  async createWidget(data: WidgetFormData) {
    const response = await api.post('/widgets', data);
    return response.data;
  },

  async updateWidget(id: string, data: Partial<WidgetFormData>) {
    const response = await api.put(`/widgets/${id}`, data);
    return response.data;
  },

  async deleteWidget(id: string) {
    const response = await api.delete(`/widgets/${id}`);
    return response.data;
  },

  async getWidgetData(id: string) {
    const response = await api.get(`/widgets/${id}/data`);
    return response.data;
  },

  // Data Source Management
  async getDataSources(filters: DataSourceFilters = {}) {
    const response = await api.get('/data-sources', { params: filters });
    return response.data;
  },

  async getDataSourceById(id: string) {
    const response = await api.get(`/data-sources/${id}`);
    return response.data;
  },

  async createDataSource(data: DataSourceFormData) {
    const response = await api.post('/data-sources', data);
    return response.data;
  },

  async updateDataSource(id: string, data: Partial<DataSourceFormData>) {
    const response = await api.put(`/data-sources/${id}`, data);
    return response.data;
  },

  async deleteDataSource(id: string) {
    const response = await api.delete(`/data-sources/${id}`);
    return response.data;
  },

  // Analytics
  async getKPIAnalytics() {
    const response = await api.get('/analytics');
    return response.data;
  },
};

export default kpiAPI;