import { apiClient } from './client';

// Types for dashboard system
export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'gauge';
  title: string;
  position: { x: number; y: number; w: number; h: number };
  dataSource: string;
  config?: any;
}

export interface DashboardTemplate {
  id: string;
  name: string;
  description: string;
  widgets: DashboardWidget[];
}

export interface DashboardData {
  [key: string]: any;
}

// Get dashboard template based on user role
export const getDashboardTemplate = async (): Promise<DashboardTemplate> => {
  const response = await apiClient.get('/dashboard/template');
  return response.data.data;
};

// Get dashboard data for a specific data source
export const getDashboardData = async (dataSource: string): Promise<DashboardData> => {
  const response = await apiClient.get(`/dashboard/data/${dataSource}`);
  return response.data.data;
};

// Update dashboard template (admin only)
export const updateDashboardTemplate = async (
  role: string,
  template: Partial<DashboardTemplate>
): Promise<DashboardTemplate> => {
  const response = await apiClient.put(`/dashboard/template/${role}`, { template });
  return response.data.data;
};

// Get multiple data sources at once
export const getMultipleDashboardData = async (dataSources: string[]): Promise<Record<string, DashboardData>> => {
  const promises = dataSources.map(dataSource => getDashboardData(dataSource));
  const results = await Promise.all(promises);

  const result: Record<string, DashboardData> = {};
  dataSources.forEach((dataSource, index) => {
    result[dataSource] = results[index];
  });

  return result;
};

  // Platform APIs
  getPlatformMetrics: () =>
    apiClient.get('/platform/metrics'),

  getPlatformMetricsByName: (platform: string) =>
    apiClient.get(`/platform/metrics/${platform}`),

  getPlatformTrends: (platform: string, days?: number) =>
    apiClient.get(`/platform/trends/${platform}`, { params: { days } }),

  getPlatformComparison: () =>
    apiClient.get('/platform/comparison'),

  getPlatformAlerts: () =>
    apiClient.get('/platform/alerts'),

  getPlatformKPIs: () =>
    apiClient.get('/platform/kpis'),

  // Backend APIs
  getBackendMetrics: () =>
    apiClient.get('/backend/metrics'),

  getBackendMetricsByService: (service: string) =>
    apiClient.get(`/backend/metrics/${service}`),

  getBackendTrends: (service: string, days?: number) =>
    apiClient.get(`/backend/trends/${service}`, { params: { days } }),

  getBackendAlerts: () =>
    apiClient.get('/backend/alerts'),

  getBackendKPIs: () =>
    apiClient.get('/backend/kpis'),

  getBackendDependencies: () =>
    apiClient.get('/backend/dependencies'),

  // Operations APIs
  getOpsMetrics: () =>
    apiClient.get('/ops/metrics'),

  getCDNMetrics: () =>
    apiClient.get('/ops/cdn'),

  getDevOpsMetrics: () =>
    apiClient.get('/ops/devops'),

  getOpsAlerts: () =>
    apiClient.get('/ops/alerts'),

  getOpsKPIs: () =>
    apiClient.get('/ops/kpis'),

  // Store APIs
  getStoreMetrics: () =>
    apiClient.get('/store/metrics'),

  getStoreMetricsByPlatform: (platform: string) =>
    apiClient.get(`/store/metrics/${platform}`),

  getStoreTrends: (platform?: string, days?: number) =>
    apiClient.get('/store/trends', { params: { platform, days } }),

  getStoreAlerts: () =>
    apiClient.get('/store/alerts'),

  getStoreKPIs: () =>
    apiClient.get('/store/kpis'),

  getStoreComparison: () =>
    apiClient.get('/store/comparison'),

  // CMS APIs
  getCMSMetrics: () =>
    apiClient.get('/cms/metrics'),

  getCMSMetricsByModule: (module: string) =>
    apiClient.get(`/cms/metrics/${module}`),

  getCMSTrends: (module?: string, days?: number) =>
    apiClient.get('/cms/trends', { params: { module, days } }),

  getCMSAlerts: () =>
    apiClient.get('/cms/alerts'),

  getCMSKPIs: () =>
    apiClient.get('/cms/kpis'),

  getCMSProcessingStats: () =>
    apiClient.get('/cms/processing'),

  // Reports APIs
  getExecutiveReport: (format: 'json' | 'pdf' = 'json') =>
    apiClient.get('/reports/executive', { 
      params: { format },
      responseType: format === 'pdf' ? 'blob' : 'json'
    }),

  getTechnicalReport: (format: 'json' | 'pdf' = 'json') =>
    apiClient.get('/reports/technical', { 
      params: { format },
      responseType: format === 'pdf' ? 'blob' : 'json'
    }),

  getWeeklyReport: (format: 'json' | 'pdf' = 'json') =>
    apiClient.get('/reports/weekly', { 
      params: { format },
      responseType: format === 'pdf' ? 'blob' : 'json'
    }),

  generateCustomReport: (config: any) =>
    apiClient.post('/reports/custom', config),

  // Admin APIs for data input
  updatePublishingData: (data: any) =>
    apiClient.post('/admin/publishing-data', data),

  updateDashboardData: (data: any) =>
    apiClient.post('/admin/dashboard-data', data),

  updatePlatformData: (data: any) =>
    apiClient.post('/admin/platform-data', data),

  updateUserData: (data: any) =>
    apiClient.post('/admin/user-data', data),

  updateSettings: (settings: any) =>
    apiClient.post('/admin/settings', settings),

  getSettings: () =>
    apiClient.get('/admin/settings'),
};
