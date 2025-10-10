export interface DashboardWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'table' | 'gauge';
  dataSource: string;
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  config?: {
    unit?: string;
    maxValue?: number;
    minValue?: number;
    defaultValue?: number;
    chartType?: 'line' | 'bar' | 'pie';
    columns?: Array<{ key: string; label: string }>;
    defaultData?: any[];
    [key: string]: any;
  };
}

export interface DashboardTemplate {
  id: string;
  name: string;
  description: string;
  role: string;
  widgets: DashboardWidget[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardData {
  value?: number;
  data?: any[];
  trend?: {
    direction: 'up' | 'down';
    value: number;
    label: string;
  };
  [key: string]: any;
}