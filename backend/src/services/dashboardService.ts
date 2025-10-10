import { DashboardTemplate, DashboardWidget, DashboardData } from '../types/dashboard';

class DashboardService {
  // Default dashboard templates for each role
  private defaultTemplates: Record<string, DashboardTemplate> = {
    admin: {
      id: 'admin-template',
      name: 'Admin Dashboard',
      description: 'Full system overview with all metrics and controls',
      role: 'admin',
      widgets: [
        {
          id: 'system-health',
          title: 'System Health Score',
          type: 'gauge',
          dataSource: 'system-health',
          position: { x: 0, y: 0, w: 3, h: 2 },
          config: { maxValue: 100, unit: '%' }
        },
        {
          id: 'active-users',
          title: 'Active Users',
          type: 'metric',
          dataSource: 'user-metrics',
          position: { x: 3, y: 0, w: 3, h: 1 },
          config: { unit: '' }
        },
        {
          id: 'platform-performance',
          title: 'Platform Performance',
          type: 'chart',
          dataSource: 'platform-metrics',
          position: { x: 6, y: 0, w: 6, h: 2 },
          config: { chartType: 'line' }
        },
        {
          id: 'critical-alerts',
          title: 'Critical Alerts',
          type: 'table',
          dataSource: 'alerts',
          position: { x: 0, y: 2, w: 6, h: 2 },
          config: {
            columns: [
              { key: 'title', label: 'Alert' },
              { key: 'severity', label: 'Severity' },
              { key: 'source', label: 'Source' }
            ]
          }
        },
        {
          id: 'service-status',
          title: 'Service Status',
          type: 'table',
          dataSource: 'service-status',
          position: { x: 6, y: 2, w: 6, h: 2 },
          config: {
            columns: [
              { key: 'name', label: 'Service' },
              { key: 'status', label: 'Status' },
              { key: 'uptime', label: 'Uptime' }
            ]
          }
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    executive: {
      id: 'executive-template',
      name: 'Executive Dashboard',
      description: 'High-level business metrics and KPIs',
      role: 'executive',
      widgets: [
        {
          id: 'business-kpis',
          title: 'Business KPIs',
          type: 'metric',
          dataSource: 'business-kpis',
          position: { x: 0, y: 0, w: 4, h: 1 },
          config: { unit: '%' }
        },
        {
          id: 'user-growth',
          title: 'User Growth',
          type: 'chart',
          dataSource: 'user-growth',
          position: { x: 4, y: 0, w: 8, h: 2 },
          config: { chartType: 'line' }
        },
        {
          id: 'revenue-trends',
          title: 'Revenue Trends',
          type: 'chart',
          dataSource: 'revenue-data',
          position: { x: 0, y: 1, w: 6, h: 2 },
          config: { chartType: 'bar' }
        },
        {
          id: 'top-risks',
          title: 'Top Risks',
          type: 'table',
          dataSource: 'risks',
          position: { x: 6, y: 1, w: 6, h: 2 },
          config: {
            columns: [
              { key: 'description', label: 'Risk' },
              { key: 'impact', label: 'Impact' },
              { key: 'probability', label: 'Probability' }
            ]
          }
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    pm: {
      id: 'pm-template',
      name: 'Product Manager Dashboard',
      description: 'Platform KPIs and product metrics',
      role: 'pm',
      widgets: [
        {
          id: 'platform-kpis',
          title: 'Platform KPIs',
          type: 'metric',
          dataSource: 'platform-kpis',
          position: { x: 0, y: 0, w: 3, h: 1 },
          config: { unit: '%' }
        },
        {
          id: 'user-engagement',
          title: 'User Engagement',
          type: 'chart',
          dataSource: 'engagement-metrics',
          position: { x: 3, y: 0, w: 6, h: 2 },
          config: { chartType: 'line' }
        },
        {
          id: 'feature-adoption',
          title: 'Feature Adoption',
          type: 'chart',
          dataSource: 'feature-usage',
          position: { x: 9, y: 0, w: 3, h: 2 },
          config: { chartType: 'pie' }
        },
        {
          id: 'product-backlog',
          title: 'Product Backlog',
          type: 'table',
          dataSource: 'backlog-items',
          position: { x: 0, y: 2, w: 12, h: 2 },
          config: {
            columns: [
              { key: 'title', label: 'Feature' },
              { key: 'priority', label: 'Priority' },
              { key: 'status', label: 'Status' }
            ]
          }
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    tpm: {
      id: 'tpm-template',
      name: 'Technical Program Manager Dashboard',
      description: 'Technical metrics and program status',
      role: 'tpm',
      widgets: [
        {
          id: 'tech-health',
          title: 'Technical Health',
          type: 'gauge',
          dataSource: 'tech-health',
          position: { x: 0, y: 0, w: 3, h: 2 },
          config: { maxValue: 100, unit: '%' }
        },
        {
          id: 'deployment-status',
          title: 'Deployment Status',
          type: 'table',
          dataSource: 'deployments',
          position: { x: 3, y: 0, w: 6, h: 2 },
          config: {
            columns: [
              { key: 'service', label: 'Service' },
              { key: 'version', label: 'Version' },
              { key: 'status', label: 'Status' }
            ]
          }
        },
        {
          id: 'performance-metrics',
          title: 'Performance Metrics',
          type: 'chart',
          dataSource: 'performance-data',
          position: { x: 9, y: 0, w: 3, h: 2 },
          config: { chartType: 'line' }
        },
        {
          id: 'incident-trends',
          title: 'Incident Trends',
          type: 'chart',
          dataSource: 'incidents',
          position: { x: 0, y: 2, w: 8, h: 2 },
          config: { chartType: 'bar' }
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    em: {
      id: 'em-template',
      name: 'Engineering Manager Dashboard',
      description: 'Engineering metrics and team performance',
      role: 'em',
      widgets: [
        {
          id: 'code-quality',
          title: 'Code Quality Score',
          type: 'gauge',
          dataSource: 'code-quality',
          position: { x: 0, y: 0, w: 3, h: 2 },
          config: { maxValue: 100, unit: '%' }
        },
        {
          id: 'team-velocity',
          title: 'Team Velocity',
          type: 'metric',
          dataSource: 'velocity',
          position: { x: 3, y: 0, w: 3, h: 1 },
          config: { unit: 'points' }
        },
        {
          id: 'bug-trends',
          title: 'Bug Trends',
          type: 'chart',
          dataSource: 'bug-data',
          position: { x: 6, y: 0, w: 6, h: 2 },
          config: { chartType: 'line' }
        },
        {
          id: 'sprint-progress',
          title: 'Sprint Progress',
          type: 'table',
          dataSource: 'sprint-data',
          position: { x: 0, y: 2, w: 12, h: 2 },
          config: {
            columns: [
              { key: 'task', label: 'Task' },
              { key: 'assignee', label: 'Assignee' },
              { key: 'status', label: 'Status' },
              { key: 'storyPoints', label: 'Points' }
            ]
          }
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    sre: {
      id: 'sre-template',
      name: 'SRE Dashboard',
      description: 'Infrastructure and reliability metrics',
      role: 'sre',
      widgets: [
        {
          id: 'infrastructure-health',
          title: 'Infrastructure Health',
          type: 'gauge',
          dataSource: 'infra-health',
          position: { x: 0, y: 0, w: 3, h: 2 },
          config: { maxValue: 100, unit: '%' }
        },
        {
          id: 'uptime-metrics',
          title: 'Service Uptime',
          type: 'metric',
          dataSource: 'uptime',
          position: { x: 3, y: 0, w: 3, h: 1 },
          config: { unit: '%' }
        },
        {
          id: 'latency-trends',
          title: 'Latency Trends',
          type: 'chart',
          dataSource: 'latency-data',
          position: { x: 6, y: 0, w: 6, h: 2 },
          config: { chartType: 'line' }
        },
        {
          id: 'alerts-queue',
          title: 'Active Alerts',
          type: 'table',
          dataSource: 'active-alerts',
          position: { x: 0, y: 2, w: 8, h: 2 },
          config: {
            columns: [
              { key: 'alert', label: 'Alert' },
              { key: 'severity', label: 'Severity' },
              { key: 'duration', label: 'Duration' }
            ]
          }
        },
        {
          id: 'capacity-usage',
          title: 'Capacity Usage',
          type: 'chart',
          dataSource: 'capacity-data',
          position: { x: 8, y: 2, w: 4, h: 2 },
          config: { chartType: 'pie' }
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };

  // In-memory storage for custom templates (in production, use database)
  private customTemplates: Map<string, DashboardTemplate> = new Map();

  async getDashboardTemplate(role: string): Promise<DashboardTemplate> {
    // Check for custom template first
    const customTemplate = this.customTemplates.get(role);
    if (customTemplate) {
      return customTemplate;
    }

    // Return default template
    const defaultTemplate = this.defaultTemplates[role];
    if (!defaultTemplate) {
      throw new Error(`No dashboard template found for role: ${role}`);
    }

    return defaultTemplate;
  }

  async updateDashboardTemplate(role: string, templateData: Partial<DashboardTemplate>): Promise<DashboardTemplate> {
    const existingTemplate = await this.getDashboardTemplate(role);

    const updatedTemplate: DashboardTemplate = {
      ...existingTemplate,
      ...templateData,
      role,
      updatedAt: new Date().toISOString()
    };

    this.customTemplates.set(role, updatedTemplate);
    return updatedTemplate;
  }

  async getMultipleDashboardData(dataSources: string[]): Promise<Record<string, DashboardData>> {
    const results: Record<string, DashboardData> = {};

    // Mock data generation - in production, fetch from actual data sources
    for (const source of dataSources) {
      results[source] = await this.generateMockData(source);
    }

    return results;
  }

  async filterDataSourcesByRole(dataSources: string[], role: string): Promise<string[]> {
    // Define role-based data source permissions
    const rolePermissions: Record<string, string[]> = {
      admin: ['system-health', 'user-metrics', 'platform-metrics', 'alerts', 'service-status', 'business-kpis', 'user-growth', 'revenue-data', 'risks', 'platform-kpis', 'engagement-metrics', 'feature-usage', 'backlog-items', 'tech-health', 'deployments', 'performance-data', 'incidents', 'code-quality', 'velocity', 'bug-data', 'sprint-data', 'infra-health', 'uptime', 'latency-data', 'active-alerts', 'capacity-data'],
      executive: ['business-kpis', 'user-growth', 'revenue-data', 'risks'],
      pm: ['platform-kpis', 'engagement-metrics', 'feature-usage', 'backlog-items'],
      tpm: ['tech-health', 'deployments', 'performance-data', 'incidents'],
      em: ['code-quality', 'velocity', 'bug-data', 'sprint-data'],
      sre: ['infra-health', 'uptime', 'latency-data', 'active-alerts', 'capacity-data']
    };

    const allowedSources = rolePermissions[role] || [];
    return dataSources.filter(source => allowedSources.includes(source));
  }

  async getAvailableDataSources(role: string): Promise<string[]> {
    return this.filterDataSourcesByRole(Object.keys(this.defaultTemplates.admin.widgets.reduce((acc, widget) => {
      acc[widget.dataSource] = true;
      return acc;
    }, {} as Record<string, boolean>)), role);
  }

  async getWidgetLibrary(): Promise<DashboardWidget[]> {
    // Return a library of available widget templates
    return [
      {
        id: 'metric-template',
        title: 'Metric Widget',
        type: 'metric',
        dataSource: '',
        position: { x: 0, y: 0, w: 3, h: 1 },
        config: { unit: '' }
      },
      {
        id: 'chart-template',
        title: 'Chart Widget',
        type: 'chart',
        dataSource: '',
        position: { x: 0, y: 0, w: 6, h: 2 },
        config: { chartType: 'line' }
      },
      {
        id: 'table-template',
        title: 'Table Widget',
        type: 'table',
        dataSource: '',
        position: { x: 0, y: 0, w: 6, h: 2 },
        config: { columns: [] }
      },
      {
        id: 'gauge-template',
        title: 'Gauge Widget',
        type: 'gauge',
        dataSource: '',
        position: { x: 0, y: 0, w: 3, h: 2 },
        config: { maxValue: 100, unit: '%' }
      }
    ];
  }

  private async generateMockData(dataSource: string): Promise<DashboardData> {
    // Generate mock data based on data source type
    switch (dataSource) {
      case 'system-health':
        return {
          value: Math.floor(Math.random() * 40) + 60, // 60-100
          trend: { direction: 'up', value: Math.random() * 5, label: 'vs last week' }
        };

      case 'user-metrics':
        return {
          value: Math.floor(Math.random() * 10000) + 50000,
          trend: { direction: Math.random() > 0.5 ? 'up' : 'down', value: Math.random() * 10, label: 'vs yesterday' }
        };

      case 'platform-metrics':
        return {
          data: [
            { name: 'Mon', value: Math.floor(Math.random() * 20) + 80 },
            { name: 'Tue', value: Math.floor(Math.random() * 20) + 80 },
            { name: 'Wed', value: Math.floor(Math.random() * 20) + 80 },
            { name: 'Thu', value: Math.floor(Math.random() * 20) + 80 },
            { name: 'Fri', value: Math.floor(Math.random() * 20) + 80 },
            { name: 'Sat', value: Math.floor(Math.random() * 20) + 80 },
            { name: 'Sun', value: Math.floor(Math.random() * 20) + 80 }
          ]
        };

      case 'alerts':
        return {
          data: [
            { title: 'High CPU Usage', severity: 'high', source: 'backend' },
            { title: 'Memory Leak Detected', severity: 'medium', source: 'platform' },
            { title: 'Database Connection Timeout', severity: 'critical', source: 'database' }
          ]
        };

      case 'service-status':
        return {
          data: [
            { name: 'API Gateway', status: 'operational', uptime: '99.9%' },
            { name: 'Database', status: 'operational', uptime: '99.8%' },
            { name: 'Cache', status: 'degraded', uptime: '95.2%' },
            { name: 'CDN', status: 'operational', uptime: '99.9%' }
          ]
        };

      default:
        return { value: 0 };
    }
  }
}

export const dashboardService = new DashboardService();