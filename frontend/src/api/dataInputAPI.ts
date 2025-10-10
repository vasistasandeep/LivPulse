import { apiClient } from './client';

// Types for data input system
export interface DataCategory {
  id: string;
  name: string;
  description: string;
}

export interface DataEntry {
  id: string;
  category: string;
  data: Record<string, any>;
  metadata: {
    submittedBy: number;
    submittedAt: string;
    role: string;
    source?: string;
  };
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// Get available data categories for current user
export const getDataCategories = async (): Promise<DataCategory[]> => {
  const response = await apiClient.get('/data-input/categories');
  return response.data.data;
};

// Submit form data
export const submitFormData = async (
  category: string,
  data: Record<string, any>,
  metadata?: Record<string, any>
): Promise<DataEntry> => {
  const response = await apiClient.post('/data-input/submit', {
    category,
    data,
    metadata
  });
  return response.data.data;
};

// Upload CSV data
export const uploadCSVData = async (
  category: string,
  csvData: string,
  mapping?: Record<string, string>
): Promise<{ recordsProcessed: number; preview: DataEntry[] }> => {
  const response = await apiClient.post('/data-input/upload-csv', {
    category,
    csvData,
    mapping
  });
  return response.data.data;
};

// Get submitted data with filters
export const getSubmittedData = async (params?: {
  category?: string;
  startDate?: string;
  endDate?: string;
  submittedBy?: number;
}): Promise<DataEntry[]> => {
  const response = await apiClient.get('/data-input/data', { params });
  return response.data.data;
};

// Validate data before submission
export const validateData = async (
  category: string,
  data: Record<string, any>
): Promise<ValidationResult> => {
  try {
    // This would be a client-side validation, but we can also call the backend
    const response = await apiClient.post('/data-input/validate', {
      category,
      data
    });
    return response.data;
  } catch (error: any) {
    return {
      valid: false,
      errors: error.response?.data?.errors || ['Validation failed']
    };
  }
};

// Get data templates for different categories
export const getDataTemplates = (): Record<string, Record<string, any>> => {
  return {
    platform_metrics: {
      metric_name: '',
      value: 0,
      unit: '',
      period: '',
      description: ''
    },
    content_performance: {
      content_id: '',
      title: '',
      views: 0,
      rating: 0,
      revenue: 0,
      engagement_rate: 0
    },
    business_kpis: {
      kpi_name: '',
      value: 0,
      target: 0,
      period: '',
      trend: 'up'
    },
    risks: {
      risk_title: '',
      severity: 'low',
      probability: 'low',
      impact: '',
      mitigation_plan: '',
      owner: ''
    },
    bug_data: {
      bug_id: '',
      title: '',
      severity: 'low',
      status: 'open',
      reported_date: '',
      resolved_date: '',
      assigned_to: ''
    },
    sprint_data: {
      sprint_name: '',
      start_date: '',
      end_date: '',
      planned_points: 0,
      completed_points: 0,
      velocity: 0
    },
    infrastructure: {
      component: '',
      uptime_percentage: 100,
      response_time: 0,
      error_rate: 0,
      status: 'healthy'
    },
    cdn_metrics: {
      region: '',
      hit_rate: 0,
      latency: 0,
      bandwidth_usage: 0,
      cache_efficiency: 0
    }
  };
};