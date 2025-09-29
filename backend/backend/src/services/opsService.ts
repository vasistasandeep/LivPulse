// Operations, CDN, and DevOps metrics service

export interface OpsMetrics {
  category: 'CDN' | 'Infrastructure' | 'DevOps' | 'Security' | 'Monitoring';
  health: 'healthy' | 'warning' | 'critical';
  performance: {
    availability: number;
    responseTime: number;
    throughput: number;
    errorRate: number;
  };
  capacity: {
    utilization: number;
    peak: number;
    reserved: number;
    scaling: boolean;
  };
  incidents: {
    total: number;
    resolved: number;
    mttr: number; // Mean Time To Resolution in minutes
    severity: {
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
  };
  costs: {
    current: number;
    budget: number;
    trend: number;
  };
  lastUpdated: string;
}

export interface CDNMetrics {
  provider: string;
  regions: {
    name: string;
    health: 'healthy' | 'warning' | 'critical';
    cacheHitRatio: number;
    bandwidth: number;
    requests: number;
  }[];
  performance: {
    globalLatency: number;
    cacheHitRatio: number;
    bandwidth: number;
    requests: number;
  };
  costs: {
    bandwidth: number;
    requests: number;
    storage: number;
  };
}

export interface DevOpsMetrics {
  deployments: {
    total: number;
    successful: number;
    failed: number;
    rollbacks: number;
    frequency: number; // per day
  };
  pipeline: {
    buildTime: number;
    testTime: number;
    deployTime: number;
    successRate: number;
  };
  infrastructure: {
    servers: number;
    containers: number;
    databases: number;
    queues: number;
  };
  automation: {
    coverage: number;
    testAutomation: number;
    deployAutomation: number;
  };
}

class OpsService {
  /**
   * Get all operations metrics
   */
  async getAllOpsMetrics(): Promise<OpsMetrics[]> {
    return [
      {
        category: 'CDN',
        health: 'healthy',
        performance: {
          availability: 99.95,
          responseTime: 45,
          throughput: 125000,
          errorRate: 0.02
        },
        capacity: {
          utilization: 68.5,
          peak: 89.2,
          reserved: 25.0,
          scaling: true
        },
        incidents: {
          total: 3,
          resolved: 3,
          mttr: 12,
          severity: {
            critical: 0,
            high: 1,
            medium: 2,
            low: 0
          }
        },
        costs: {
          current: 45000,
          budget: 50000,
          trend: -2.5
        },
        lastUpdated: new Date().toISOString()
      },
      {
        category: 'Infrastructure',
        health: 'warning',
        performance: {
          availability: 99.2,
          responseTime: 125,
          throughput: 85000,
          errorRate: 1.8
        },
        capacity: {
          utilization: 82.3,
          peak: 95.7,
          reserved: 15.0,
          scaling: true
        },
        incidents: {
          total: 8,
          resolved: 6,
          mttr: 45,
          severity: {
            critical: 1,
            high: 2,
            medium: 3,
            low: 2
          }
        },
        costs: {
          current: 125000,
          budget: 120000,
          trend: 8.5
        },
        lastUpdated: new Date().toISOString()
      },
      {
        category: 'DevOps',
        health: 'healthy',
        performance: {
          availability: 99.8,
          responseTime: 15,
          throughput: 450,
          errorRate: 0.5
        },
        capacity: {
          utilization: 45.2,
          peak: 78.9,
          reserved: 30.0,
          scaling: false
        },
        incidents: {
          total: 2,
          resolved: 2,
          mttr: 8,
          severity: {
            critical: 0,
            high: 0,
            medium: 1,
            low: 1
          }
        },
        costs: {
          current: 25000,
          budget: 30000,
          trend: -5.2
        },
        lastUpdated: new Date().toISOString()
      },
      {
        category: 'Security',
        health: 'healthy',
        performance: {
          availability: 100,
          responseTime: 25,
          throughput: 12000,
          errorRate: 0.1
        },
        capacity: {
          utilization: 35.8,
          peak: 62.4,
          reserved: 40.0,
          scaling: false
        },
        incidents: {
          total: 1,
          resolved: 1,
          mttr: 5,
          severity: {
            critical: 0,
            high: 0,
            medium: 0,
            low: 1
          }
        },
        costs: {
          current: 15000,
          budget: 18000,
          trend: 2.1
        },
        lastUpdated: new Date().toISOString()
      },
      {
        category: 'Monitoring',
        health: 'healthy',
        performance: {
          availability: 99.9,
          responseTime: 35,
          throughput: 25000,
          errorRate: 0.3
        },
        capacity: {
          utilization: 52.7,
          peak: 71.2,
          reserved: 25.0,
          scaling: true
        },
        incidents: {
          total: 1,
          resolved: 1,
          mttr: 3,
          severity: {
            critical: 0,
            high: 0,
            medium: 1,
            low: 0
          }
        },
        costs: {
          current: 8000,
          budget: 10000,
          trend: -1.5
        },
        lastUpdated: new Date().toISOString()
      }
    ];
  }

  /**
   * Get CDN specific metrics
   */
  async getCDNMetrics(): Promise<CDNMetrics> {
    return {
      provider: 'CloudFlare + AWS CloudFront',
      regions: [
        {
          name: 'North America',
          health: 'healthy',
          cacheHitRatio: 94.2,
          bandwidth: 45000,
          requests: 2500000
        },
        {
          name: 'Europe',
          health: 'healthy',
          cacheHitRatio: 91.8,
          bandwidth: 32000,
          requests: 1800000
        },
        {
          name: 'Asia Pacific',
          health: 'warning',
          cacheHitRatio: 87.5,
          bandwidth: 28000,
          requests: 1200000
        },
        {
          name: 'India',
          health: 'healthy',
          cacheHitRatio: 92.1,
          bandwidth: 38000,
          requests: 2100000
        }
      ],
      performance: {
        globalLatency: 45,
        cacheHitRatio: 91.4,
        bandwidth: 143000,
        requests: 7600000
      },
      costs: {
        bandwidth: 25000,
        requests: 15000,
        storage: 5000
      }
    };
  }

  /**
   * Get DevOps specific metrics
   */
  async getDevOpsMetrics(): Promise<DevOpsMetrics> {
    return {
      deployments: {
        total: 156,
        successful: 148,
        failed: 8,
        rollbacks: 3,
        frequency: 2.8
      },
      pipeline: {
        buildTime: 8.5,
        testTime: 12.3,
        deployTime: 4.2,
        successRate: 94.9
      },
      infrastructure: {
        servers: 45,
        containers: 234,
        databases: 12,
        queues: 8
      },
      automation: {
        coverage: 87.5,
        testAutomation: 92.1,
        deployAutomation: 95.8
      }
    };
  }

  /**
   * Get operations alerts
   */
  async getOpsAlerts(): Promise<any[]> {
    const allMetrics = await this.getAllOpsMetrics();
    const alerts: any[] = [];

    allMetrics.forEach(ops => {
      // Availability alerts
      if (ops.performance.availability < 99.5) {
        alerts.push({
          id: `avail-${ops.category}`,
          category: ops.category,
          type: 'availability',
          severity: ops.performance.availability < 99 ? 'critical' : 'high',
          title: 'Low Availability',
          description: `${ops.category} availability is ${ops.performance.availability}%`,
          threshold: '99.5%',
          current: `${ops.performance.availability}%`,
          timestamp: new Date().toISOString()
        });
      }

      // Capacity alerts
      if (ops.capacity.utilization > 80) {
        alerts.push({
          id: `capacity-${ops.category}`,
          category: ops.category,
          type: 'capacity',
          severity: ops.capacity.utilization > 90 ? 'critical' : 'medium',
          title: 'High Capacity Utilization',
          description: `${ops.category} capacity utilization is ${ops.capacity.utilization}%`,
          threshold: '80%',
          current: `${ops.capacity.utilization}%`,
          timestamp: new Date().toISOString()
        });
      }

      // Cost alerts
      if (ops.costs.current > ops.costs.budget) {
        alerts.push({
          id: `cost-${ops.category}`,
          category: ops.category,
          type: 'cost',
          severity: 'medium',
          title: 'Budget Exceeded',
          description: `${ops.category} costs exceed budget by $${ops.costs.current - ops.costs.budget}`,
          threshold: `$${ops.costs.budget}`,
          current: `$${ops.costs.current}`,
          timestamp: new Date().toISOString()
        });
      }

      // Incident alerts
      if (ops.incidents.total - ops.incidents.resolved > 0) {
        alerts.push({
          id: `incident-${ops.category}`,
          category: ops.category,
          type: 'incident',
          severity: 'high',
          title: 'Open Incidents',
          description: `${ops.category} has ${ops.incidents.total - ops.incidents.resolved} open incidents`,
          threshold: '0',
          current: `${ops.incidents.total - ops.incidents.resolved}`,
          timestamp: new Date().toISOString()
        });
      }
    });

    return alerts.sort((a, b) => {
      const severityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
      return (severityOrder[b.severity as keyof typeof severityOrder] || 0) - 
             (severityOrder[a.severity as keyof typeof severityOrder] || 0);
    });
  }

  /**
   * Get operations KPIs summary
   */
  async getOpsKPIs(): Promise<any> {
    const allMetrics = await this.getAllOpsMetrics();
    const cdnMetrics = await this.getCDNMetrics();
    const devopsMetrics = await this.getDevOpsMetrics();
    
    const avgAvailability = allMetrics.reduce((sum, o) => sum + o.performance.availability, 0) / allMetrics.length;
    const totalIncidents = allMetrics.reduce((sum, o) => sum + o.incidents.total, 0);
    const avgMTTR = allMetrics.reduce((sum, o) => sum + o.incidents.mttr, 0) / allMetrics.length;
    const totalCosts = allMetrics.reduce((sum, o) => sum + o.costs.current, 0);
    const totalBudget = allMetrics.reduce((sum, o) => sum + o.costs.budget, 0);
    
    const healthyCategories = allMetrics.filter(o => o.health === 'healthy').length;
    const warningCategories = allMetrics.filter(o => o.health === 'warning').length;
    const criticalCategories = allMetrics.filter(o => o.health === 'critical').length;

    return {
      summary: {
        avgAvailability: Math.round(avgAvailability * 100) / 100,
        totalIncidents,
        avgMTTR: Math.round(avgMTTR),
        totalCosts,
        budgetUtilization: Math.round((totalCosts / totalBudget) * 100),
        healthyCategories,
        warningCategories,
        criticalCategories
      },
      cdn: {
        globalLatency: cdnMetrics.performance.globalLatency,
        cacheHitRatio: cdnMetrics.performance.cacheHitRatio,
        totalRequests: cdnMetrics.performance.requests,
        totalBandwidth: cdnMetrics.performance.bandwidth
      },
      devops: {
        deploymentFrequency: devopsMetrics.deployments.frequency,
        successRate: devopsMetrics.pipeline.successRate,
        automationCoverage: devopsMetrics.automation.coverage,
        totalInfrastructure: devopsMetrics.infrastructure.servers + 
                           devopsMetrics.infrastructure.containers
      },
      topConcerns: allMetrics
        .filter(o => o.health !== 'healthy')
        .map(o => ({ 
          category: o.category, 
          health: o.health,
          issue: o.capacity.utilization > 80 ? 'High capacity utilization' : 
                o.performance.availability < 99.5 ? 'Low availability' : 'Performance issues'
        }))
    };
  }
}

export default new OpsService();
