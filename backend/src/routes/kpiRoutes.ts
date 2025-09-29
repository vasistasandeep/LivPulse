import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

// ============= INTERFACES =============

interface Widget {
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

interface WidgetConfig {
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

interface Dashboard {
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

interface DashboardLayout {
  columns: number;
  rowHeight: number;
  margin: [number, number];
  containerPadding: [number, number];
}

interface DataSource {
  id: string;
  name: string;
  type: 'api' | 'database' | 'file' | 'mock';
  config: DataSourceConfig;
  fields: DataField[];
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface DataSourceConfig {
  url?: string;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  query?: string;
  refreshInterval?: number;
  cacheTimeout?: number;
}

interface DataField {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  label: string;
  description?: string;
  format?: string;
}

// ============= MOCK DATA =============

let widgets: Widget[] = [
  {
    id: 'widget-1',
    type: 'metric',
    title: 'Total Users',
    description: 'Active users in the system',
    dataSource: 'users-api',
    config: {
      format: 'number',
      threshold: { warning: 1000, critical: 500 }
    },
    position: { x: 0, y: 0, w: 6, h: 3 },
    isVisible: true,
    permissions: ['admin', 'executive'],
    createdAt: '2025-01-26T10:00:00Z'
  },
  {
    id: 'widget-2',
    type: 'chart',
    title: 'Performance Trends',
    description: 'API response times over time',
    dataSource: 'performance-api',
    config: {
      chartType: 'line',
      dataKeys: ['responseTime', 'throughput'],
      colors: ['#1976d2', '#2e7d32'],
      showLegend: true,
      showAxes: true,
      refreshInterval: 30
    },
    position: { x: 6, y: 0, w: 6, h: 6 },
    isVisible: true,
    permissions: ['admin', 'sre'],
    createdAt: '2025-01-26T10:00:00Z'
  }
];

let dashboards: Dashboard[] = [
  {
    id: 'dashboard-1',
    name: 'Executive Overview',
    description: 'High-level metrics for executives',
    category: 'executive',
    isPublic: false,
    widgets: ['widget-1'],
    layout: {
      columns: 12,
      rowHeight: 60,
      margin: [10, 10],
      containerPadding: [10, 10]
    },
    permissions: {
      view: ['admin', 'executive'],
      edit: ['admin']
    },
    createdBy: 'admin',
    createdAt: '2025-01-26T10:00:00Z'
  },
  {
    id: 'dashboard-2',
    name: 'Technical Dashboard',
    description: 'Technical metrics and performance data',
    category: 'technical',
    isPublic: false,
    widgets: ['widget-2'],
    layout: {
      columns: 12,
      rowHeight: 60,
      margin: [10, 10],
      containerPadding: [10, 10]
    },
    permissions: {
      view: ['admin', 'sre', 'em'],
      edit: ['admin', 'sre']
    },
    createdBy: 'admin',
    createdAt: '2025-01-26T10:00:00Z'
  }
];

let dataSources: DataSource[] = [
  {
    id: 'users-api',
    name: 'Users API',
    type: 'api',
    config: {
      url: '/api/admin/analytics/users',
      method: 'GET',
      refreshInterval: 300, // 5 minutes
      cacheTimeout: 60
    },
    fields: [
      { name: 'totalUsers', type: 'number', label: 'Total Users' },
      { name: 'activeUsers', type: 'number', label: 'Active Users' },
      { name: 'recentlyActiveUsers', type: 'number', label: 'Recently Active' }
    ],
    isActive: true,
    createdAt: '2025-01-26T10:00:00Z'
  },
  {
    id: 'performance-api',
    name: 'Performance API',
    type: 'api',
    config: {
      url: '/api/admin/analytics/system',
      method: 'GET',
      refreshInterval: 30,
      cacheTimeout: 10
    },
    fields: [
      { name: 'responseTime', type: 'number', label: 'Response Time (ms)' },
      { name: 'throughput', type: 'number', label: 'Throughput (req/min)' },
      { name: 'uptime', type: 'string', label: 'Uptime' }
    ],
    isActive: true,
    createdAt: '2025-01-26T10:00:00Z'
  }
];

let nextWidgetId = 3;
let nextDashboardId = 3;
let nextDataSourceId = 3;

// ============= DASHBOARD MANAGEMENT =============

// Get all dashboards
router.get('/dashboards', (req: Request, res: Response) => {
  try {
    const { category, userId } = req.query;
    
    let filteredDashboards = [...dashboards];
    
    if (category) {
      filteredDashboards = filteredDashboards.filter(d => d.category === category);
    }
    
    // In real app, filter by user permissions based on userId
    
    res.json({
      success: true,
      data: filteredDashboards
    });
  } catch (error) {
    console.error('Error fetching dashboards:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboards'
    });
  }
});

// Get dashboard by ID
router.get('/dashboards/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dashboard = dashboards.find(d => d.id === id);
    
    if (!dashboard) {
      return res.status(404).json({
        success: false,
        error: 'Dashboard not found'
      });
    }
    
    res.json({
      success: true,
      data: dashboard
    });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard'
    });
  }
});

// Create dashboard
router.post('/dashboards', (req: Request, res: Response) => {
  try {
    const { name, description, category, widgets = [], layout, permissions } = req.body;
    
    if (!name || !category) {
      return res.status(400).json({
        success: false,
        error: 'Name and category are required'
      });
    }
    
    const newDashboard: Dashboard = {
      id: `dashboard-${nextDashboardId++}`,
      name,
      description,
      category,
      isPublic: false,
      widgets,
      layout: layout || {
        columns: 12,
        rowHeight: 60,
        margin: [10, 10],
        containerPadding: [10, 10]
      },
      permissions: permissions || {
        view: ['admin'],
        edit: ['admin']
      },
      createdBy: 'current-user', // In real app, get from auth
      createdAt: new Date().toISOString()
    };
    
    dashboards.push(newDashboard);
    
    res.status(201).json({
      success: true,
      data: newDashboard
    });
  } catch (error) {
    console.error('Error creating dashboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create dashboard'
    });
  }
});

// Update dashboard
router.put('/dashboards/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dashboardIndex = dashboards.findIndex(d => d.id === id);
    
    if (dashboardIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Dashboard not found'
      });
    }
    
    const updates = req.body;
    dashboards[dashboardIndex] = {
      ...dashboards[dashboardIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: dashboards[dashboardIndex]
    });
  } catch (error) {
    console.error('Error updating dashboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update dashboard'
    });
  }
});

// Delete dashboard
router.delete('/dashboards/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dashboardIndex = dashboards.findIndex(d => d.id === id);
    
    if (dashboardIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Dashboard not found'
      });
    }
    
    dashboards.splice(dashboardIndex, 1);
    
    res.json({
      success: true,
      data: { message: 'Dashboard deleted successfully' }
    });
  } catch (error) {
    console.error('Error deleting dashboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete dashboard'
    });
  }
});

// ============= WIDGET MANAGEMENT =============

// Get all widgets
router.get('/widgets', (req: Request, res: Response) => {
  try {
    const { type, dataSource } = req.query;
    
    let filteredWidgets = [...widgets];
    
    if (type) {
      filteredWidgets = filteredWidgets.filter(w => w.type === type);
    }
    
    if (dataSource) {
      filteredWidgets = filteredWidgets.filter(w => w.dataSource === dataSource);
    }
    
    res.json({
      success: true,
      data: filteredWidgets
    });
  } catch (error) {
    console.error('Error fetching widgets:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch widgets'
    });
  }
});

// Get widget by ID
router.get('/widgets/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const widget = widgets.find(w => w.id === id);
    
    if (!widget) {
      return res.status(404).json({
        success: false,
        error: 'Widget not found'
      });
    }
    
    res.json({
      success: true,
      data: widget
    });
  } catch (error) {
    console.error('Error fetching widget:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch widget'
    });
  }
});

// Create widget
router.post('/widgets', (req: Request, res: Response) => {
  try {
    const { type, title, dataSource, config, position, permissions = [] } = req.body;
    
    if (!type || !title || !dataSource) {
      return res.status(400).json({
        success: false,
        error: 'Type, title, and dataSource are required'
      });
    }
    
    const newWidget: Widget = {
      id: `widget-${nextWidgetId++}`,
      type,
      title,
      description: req.body.description,
      dataSource,
      config: config || {},
      position: position || { x: 0, y: 0, w: 6, h: 4 },
      isVisible: true,
      permissions,
      createdAt: new Date().toISOString()
    };
    
    widgets.push(newWidget);
    
    res.status(201).json({
      success: true,
      data: newWidget
    });
  } catch (error) {
    console.error('Error creating widget:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create widget'
    });
  }
});

// Update widget
router.put('/widgets/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const widgetIndex = widgets.findIndex(w => w.id === id);
    
    if (widgetIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Widget not found'
      });
    }
    
    const updates = req.body;
    widgets[widgetIndex] = {
      ...widgets[widgetIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: widgets[widgetIndex]
    });
  } catch (error) {
    console.error('Error updating widget:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update widget'
    });
  }
});

// Delete widget
router.delete('/widgets/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const widgetIndex = widgets.findIndex(w => w.id === id);
    
    if (widgetIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Widget not found'
      });
    }
    
    widgets.splice(widgetIndex, 1);
    
    // Remove widget from dashboards
    dashboards.forEach(dashboard => {
      dashboard.widgets = dashboard.widgets.filter(widgetId => widgetId !== id);
    });
    
    res.json({
      success: true,
      data: { message: 'Widget deleted successfully' }
    });
  } catch (error) {
    console.error('Error deleting widget:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete widget'
    });
  }
});

// ============= DATA SOURCE MANAGEMENT =============

// Get all data sources
router.get('/data-sources', (req: Request, res: Response) => {
  try {
    const { type, isActive } = req.query;
    
    let filteredDataSources = [...dataSources];
    
    if (type) {
      filteredDataSources = filteredDataSources.filter(ds => ds.type === type);
    }
    
    if (isActive !== undefined) {
      const active = isActive === 'true';
      filteredDataSources = filteredDataSources.filter(ds => ds.isActive === active);
    }
    
    res.json({
      success: true,
      data: filteredDataSources
    });
  } catch (error) {
    console.error('Error fetching data sources:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch data sources'
    });
  }
});

// Get data source by ID
router.get('/data-sources/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dataSource = dataSources.find(ds => ds.id === id);
    
    if (!dataSource) {
      return res.status(404).json({
        success: false,
        error: 'Data source not found'
      });
    }
    
    res.json({
      success: true,
      data: dataSource
    });
  } catch (error) {
    console.error('Error fetching data source:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch data source'
    });
  }
});

// Create data source
router.post('/data-sources', (req: Request, res: Response) => {
  try {
    const { name, type, config, fields } = req.body;
    
    if (!name || !type) {
      return res.status(400).json({
        success: false,
        error: 'Name and type are required'
      });
    }
    
    const newDataSource: DataSource = {
      id: `datasource-${nextDataSourceId++}`,
      name,
      type,
      config: config || {},
      fields: fields || [],
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    dataSources.push(newDataSource);
    
    res.status(201).json({
      success: true,
      data: newDataSource
    });
  } catch (error) {
    console.error('Error creating data source:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create data source'
    });
  }
});

// Update data source
router.put('/data-sources/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dataSourceIndex = dataSources.findIndex(ds => ds.id === id);
    
    if (dataSourceIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Data source not found'
      });
    }
    
    const updates = req.body;
    dataSources[dataSourceIndex] = {
      ...dataSources[dataSourceIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: dataSources[dataSourceIndex]
    });
  } catch (error) {
    console.error('Error updating data source:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update data source'
    });
  }
});

// Delete data source
router.delete('/data-sources/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dataSourceIndex = dataSources.findIndex(ds => ds.id === id);
    
    if (dataSourceIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Data source not found'
      });
    }
    
    // Check if data source is being used by widgets
    const usedByWidgets = widgets.filter(w => w.dataSource === id);
    if (usedByWidgets.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Data source is being used by ${usedByWidgets.length} widget(s)`
      });
    }
    
    dataSources.splice(dataSourceIndex, 1);
    
    res.json({
      success: true,
      data: { message: 'Data source deleted successfully' }
    });
  } catch (error) {
    console.error('Error deleting data source:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete data source'
    });
  }
});

// ============= DATA RETRIEVAL =============

// Get data for a widget
router.get('/widgets/:id/data', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const widget = widgets.find(w => w.id === id);
    
    if (!widget) {
      return res.status(404).json({
        success: false,
        error: 'Widget not found'
      });
    }
    
    // Mock data based on widget type and data source
    let mockData;
    
    switch (widget.type) {
      case 'metric':
        mockData = {
          value: Math.floor(Math.random() * 1000) + 500,
          change: Math.random() * 20 - 10,
          trend: Math.random() > 0.5 ? 'up' : 'down'
        };
        break;
        
      case 'chart':
        mockData = {
          data: Array.from({ length: 10 }, (_, i) => ({
            name: `Point ${i + 1}`,
            value: Math.floor(Math.random() * 100),
            date: new Date(Date.now() - (9 - i) * 24 * 60 * 60 * 1000).toISOString()
          }))
        };
        break;
        
      case 'table':
        mockData = {
          columns: ['Name', 'Value', 'Status'],
          rows: Array.from({ length: 5 }, (_, i) => [
            `Item ${i + 1}`,
            Math.floor(Math.random() * 100),
            Math.random() > 0.5 ? 'Active' : 'Inactive'
          ])
        };
        break;
        
      default:
        mockData = { message: 'No data available' };
    }
    
    res.json({
      success: true,
      data: mockData,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching widget data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch widget data'
    });
  }
});

// ============= ANALYTICS & REPORTING =============

// Get KPI analytics
router.get('/analytics', (req: Request, res: Response) => {
  try {
    const analytics = {
      dashboards: {
        total: dashboards.length,
        byCategory: dashboards.reduce((acc, d) => {
          acc[d.category] = (acc[d.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      },
      widgets: {
        total: widgets.length,
        byType: widgets.reduce((acc, w) => {
          acc[w.type] = (acc[w.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        visible: widgets.filter(w => w.isVisible).length
      },
      dataSources: {
        total: dataSources.length,
        active: dataSources.filter(ds => ds.isActive).length,
        byType: dataSources.reduce((acc, ds) => {
          acc[ds.type] = (acc[ds.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      }
    };
    
    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching KPI analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch KPI analytics'
    });
  }
});

export default router;