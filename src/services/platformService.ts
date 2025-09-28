// Platform-specific metrics service for Android, iOS, Web, ATV, Smart TV

export interface PlatformMetrics {
  platform: 'Android' | 'iOS' | 'Web' | 'ATV' | 'Smart TV';
  health: 'healthy' | 'warning' | 'critical';
  users: {
    active: number;
    growth: number;
    retention: number;
  };
  performance: {
    responseTime: number;
    crashRate: number;
    loadTime: number;
    errorRate: number;
  };
  features: {
    adoption: number;
    satisfaction: number;
    completionRate: number;
  };
  technical: {
    version: string;
    coverage: number;
    buildSuccess: number;
    testPass: number;
  };
  business: {
    revenue: number;
    conversion: number;
    engagement: number;
  };
  lastUpdated: string;
}

export interface PlatformTrend {
  date: string;
  users: number;
  performance: number;
  revenue: number;
  satisfaction: number;
}

class PlatformService {
  /**
   * Get metrics for all platforms
   */
  async getAllPlatformMetrics(): Promise<PlatformMetrics[]> {
    // In a real implementation, this would fetch from various data sources
    // For now, return mock data with realistic values
    
    return [
      {
        platform: 'Android',
        health: 'healthy',
        users: {
          active: 2500000,
          growth: 12.5,
          retention: 78.3
        },
        performance: {
          responseTime: 850,
          crashRate: 0.8,
          loadTime: 2.1,
          errorRate: 1.2
        },
        features: {
          adoption: 65.4,
          satisfaction: 4.2,
          completionRate: 89.7
        },
        technical: {
          version: '3.2.1',
          coverage: 85.6,
          buildSuccess: 94.2,
          testPass: 91.8
        },
        business: {
          revenue: 1250000,
          conversion: 3.8,
          engagement: 42.5
        },
        lastUpdated: new Date().toISOString()
      },
      {
        platform: 'iOS',
        health: 'warning',
        users: {
          active: 1800000,
          growth: 8.2,
          retention: 82.1
        },
        performance: {
          responseTime: 920,
          crashRate: 2.1,
          loadTime: 1.8,
          errorRate: 2.8
        },
        features: {
          adoption: 72.1,
          satisfaction: 4.5,
          completionRate: 92.3
        },
        technical: {
          version: '3.2.0',
          coverage: 88.2,
          buildSuccess: 89.7,
          testPass: 87.4
        },
        business: {
          revenue: 1680000,
          conversion: 4.2,
          engagement: 48.7
        },
        lastUpdated: new Date().toISOString()
      },
      {
        platform: 'Web',
        health: 'healthy',
        users: {
          active: 3200000,
          growth: 15.7,
          retention: 68.9
        },
        performance: {
          responseTime: 650,
          crashRate: 0.3,
          loadTime: 1.2,
          errorRate: 0.8
        },
        features: {
          adoption: 58.9,
          satisfaction: 4.1,
          completionRate: 85.6
        },
        technical: {
          version: '2.8.4',
          coverage: 92.1,
          buildSuccess: 96.8,
          testPass: 94.2
        },
        business: {
          revenue: 980000,
          conversion: 2.9,
          engagement: 35.2
        },
        lastUpdated: new Date().toISOString()
      },
      {
        platform: 'ATV',
        health: 'healthy',
        users: {
          active: 450000,
          growth: 22.1,
          retention: 85.7
        },
        performance: {
          responseTime: 1100,
          crashRate: 1.2,
          loadTime: 3.5,
          errorRate: 1.8
        },
        features: {
          adoption: 78.4,
          satisfaction: 4.6,
          completionRate: 94.1
        },
        technical: {
          version: '1.9.2',
          coverage: 79.3,
          buildSuccess: 91.5,
          testPass: 88.9
        },
        business: {
          revenue: 720000,
          conversion: 5.1,
          engagement: 67.8
        },
        lastUpdated: new Date().toISOString()
      },
      {
        platform: 'Smart TV',
        health: 'critical',
        users: {
          active: 680000,
          growth: 5.3,
          retention: 79.2
        },
        performance: {
          responseTime: 1850,
          crashRate: 4.2,
          loadTime: 5.8,
          errorRate: 6.1
        },
        features: {
          adoption: 52.7,
          satisfaction: 3.8,
          completionRate: 76.4
        },
        technical: {
          version: '2.1.1',
          coverage: 68.9,
          buildSuccess: 82.3,
          testPass: 79.6
        },
        business: {
          revenue: 420000,
          conversion: 2.1,
          engagement: 51.2
        },
        lastUpdated: new Date().toISOString()
      }
    ];
  }

  /**
   * Get metrics for a specific platform
   */
  async getPlatformMetrics(platform: string): Promise<PlatformMetrics | null> {
    const allMetrics = await this.getAllPlatformMetrics();
    return allMetrics.find(p => p.platform.toLowerCase() === platform.toLowerCase()) || null;
  }

  /**
   * Get historical trends for a platform
   */
  async getPlatformTrends(platform: string, days: number = 30): Promise<PlatformTrend[]> {
    const trends: PlatformTrend[] = [];
    const baseMetrics = await this.getPlatformMetrics(platform);
    
    if (!baseMetrics) return trends;

    // Generate mock historical data
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Add some realistic variance to the data
      const variance = () => 0.9 + Math.random() * 0.2; // ±10% variance
      
      trends.push({
        date: date.toISOString().split('T')[0],
        users: Math.round(baseMetrics.users.active * variance()),
        performance: Math.round((100 - baseMetrics.performance.errorRate) * variance()),
        revenue: Math.round(baseMetrics.business.revenue * variance()),
        satisfaction: Math.round(baseMetrics.features.satisfaction * 20 * variance()) / 20 // Scale to 0-5
      });
    }

    return trends;
  }

  /**
   * Get platform comparison data
   */
  async getPlatformComparison(): Promise<any> {
    const allMetrics = await this.getAllPlatformMetrics();
    
    return {
      userGrowth: allMetrics.map(p => ({
        platform: p.platform,
        growth: p.users.growth,
        active: p.users.active
      })),
      performance: allMetrics.map(p => ({
        platform: p.platform,
        score: Math.round(100 - (p.performance.errorRate + p.performance.crashRate))
      })),
      revenue: allMetrics.map(p => ({
        platform: p.platform,
        revenue: p.business.revenue,
        conversion: p.business.conversion
      })),
      health: allMetrics.map(p => ({
        platform: p.platform,
        health: p.health,
        score: p.health === 'healthy' ? 100 : p.health === 'warning' ? 70 : 30
      }))
    };
  }

  /**
   * Get platform alerts and issues
   */
  async getPlatformAlerts(): Promise<any[]> {
    const allMetrics = await this.getAllPlatformMetrics();
    const alerts: any[] = [];

    allMetrics.forEach(platform => {
      // Performance alerts
      if (platform.performance.crashRate > 2.0) {
        alerts.push({
          id: `crash-${platform.platform}`,
          platform: platform.platform,
          type: 'performance',
          severity: 'high',
          title: 'High Crash Rate',
          description: `${platform.platform} crash rate is ${platform.performance.crashRate}%`,
          threshold: '2.0%',
          current: `${platform.performance.crashRate}%`,
          timestamp: new Date().toISOString()
        });
      }

      if (platform.performance.responseTime > 1500) {
        alerts.push({
          id: `response-${platform.platform}`,
          platform: platform.platform,
          type: 'performance',
          severity: 'medium',
          title: 'Slow Response Time',
          description: `${platform.platform} response time is ${platform.performance.responseTime}ms`,
          threshold: '1500ms',
          current: `${platform.performance.responseTime}ms`,
          timestamp: new Date().toISOString()
        });
      }

      // Business alerts
      if (platform.users.growth < 5) {
        alerts.push({
          id: `growth-${platform.platform}`,
          platform: platform.platform,
          type: 'business',
          severity: 'medium',
          title: 'Low User Growth',
          description: `${platform.platform} user growth is only ${platform.users.growth}%`,
          threshold: '5%',
          current: `${platform.users.growth}%`,
          timestamp: new Date().toISOString()
        });
      }

      // Technical alerts
      if (platform.technical.testPass < 85) {
        alerts.push({
          id: `test-${platform.platform}`,
          platform: platform.platform,
          type: 'technical',
          severity: 'high',
          title: 'Low Test Pass Rate',
          description: `${platform.platform} test pass rate is ${platform.technical.testPass}%`,
          threshold: '85%',
          current: `${platform.technical.testPass}%`,
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
   * Get platform KPIs summary
   */
  async getPlatformKPIs(): Promise<any> {
    const allMetrics = await this.getAllPlatformMetrics();
    
    const totalUsers = allMetrics.reduce((sum, p) => sum + p.users.active, 0);
    const avgGrowth = allMetrics.reduce((sum, p) => sum + p.users.growth, 0) / allMetrics.length;
    const totalRevenue = allMetrics.reduce((sum, p) => sum + p.business.revenue, 0);
    const avgSatisfaction = allMetrics.reduce((sum, p) => sum + p.features.satisfaction, 0) / allMetrics.length;
    
    const healthyPlatforms = allMetrics.filter(p => p.health === 'healthy').length;
    const warningPlatforms = allMetrics.filter(p => p.health === 'warning').length;
    const criticalPlatforms = allMetrics.filter(p => p.health === 'critical').length;

    return {
      summary: {
        totalUsers,
        avgGrowth: Math.round(avgGrowth * 10) / 10,
        totalRevenue,
        avgSatisfaction: Math.round(avgSatisfaction * 10) / 10,
        healthyPlatforms,
        warningPlatforms,
        criticalPlatforms
      },
      topPerformers: allMetrics
        .sort((a, b) => b.users.growth - a.users.growth)
        .slice(0, 3)
        .map(p => ({ platform: p.platform, growth: p.users.growth })),
      needsAttention: allMetrics
        .filter(p => p.health !== 'healthy')
        .map(p => ({ 
          platform: p.platform, 
          health: p.health,
          issues: p.performance.crashRate > 2 ? 'High crash rate' : 'Performance issues'
        }))
    };
  }
}

export default new PlatformService();
