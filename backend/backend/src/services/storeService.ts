// Digital Storefront (Bolt) metrics service

export interface StoreMetrics {
  platform: 'Web Store' | 'Mobile Store' | 'TV Store' | 'Partner Store';
  health: 'healthy' | 'warning' | 'critical';
  performance: {
    uptime: number;
    responseTime: number;
    conversionRate: number;
    abandonmentRate: number;
    searchAccuracy: number;
  };
  business: {
    revenue: number;
    transactions: number;
    averageOrderValue: number;
    subscriptions: {
      new: number;
      renewals: number;
      cancellations: number;
      churn: number;
    };
  };
  user: {
    sessions: number;
    uniqueVisitors: number;
    pageViews: number;
    bounceRate: number;
    timeOnSite: number;
  };
  catalog: {
    totalItems: number;
    activeItems: number;
    outOfStock: number;
    newReleases: number;
  };
  payments: {
    successRate: number;
    failureRate: number;
    averageProcessingTime: number;
    fraudDetection: number;
  };
  lastUpdated: string;
}

export interface StoreTrend {
  date: string;
  revenue: number;
  transactions: number;
  conversionRate: number;
  users: number;
}

class StoreService {
  /**
   * Get metrics for all store platforms
   */
  async getAllStoreMetrics(): Promise<StoreMetrics[]> {
    return [
      {
        platform: 'Web Store',
        health: 'healthy',
        performance: {
          uptime: 99.8,
          responseTime: 850,
          conversionRate: 4.2,
          abandonmentRate: 68.5,
          searchAccuracy: 87.3
        },
        business: {
          revenue: 2450000,
          transactions: 58420,
          averageOrderValue: 41.95,
          subscriptions: {
            new: 12450,
            renewals: 34200,
            cancellations: 8920,
            churn: 4.8
          }
        },
        user: {
          sessions: 1250000,
          uniqueVisitors: 890000,
          pageViews: 4200000,
          bounceRate: 32.1,
          timeOnSite: 8.5
        },
        catalog: {
          totalItems: 15420,
          activeItems: 14890,
          outOfStock: 530,
          newReleases: 245
        },
        payments: {
          successRate: 96.8,
          failureRate: 3.2,
          averageProcessingTime: 2.1,
          fraudDetection: 0.8
        },
        lastUpdated: new Date().toISOString()
      },
      {
        platform: 'Mobile Store',
        health: 'warning',
        performance: {
          uptime: 99.2,
          responseTime: 1200,
          conversionRate: 3.8,
          abandonmentRate: 72.3,
          searchAccuracy: 82.1
        },
        business: {
          revenue: 1890000,
          transactions: 45230,
          averageOrderValue: 41.78,
          subscriptions: {
            new: 9850,
            renewals: 28900,
            cancellations: 7420,
            churn: 5.2
          }
        },
        user: {
          sessions: 980000,
          uniqueVisitors: 720000,
          pageViews: 2890000,
          bounceRate: 28.7,
          timeOnSite: 6.8
        },
        catalog: {
          totalItems: 15420,
          activeItems: 14650,
          outOfStock: 770,
          newReleases: 245
        },
        payments: {
          successRate: 94.2,
          failureRate: 5.8,
          averageProcessingTime: 3.2,
          fraudDetection: 1.2
        },
        lastUpdated: new Date().toISOString()
      },
      {
        platform: 'TV Store',
        health: 'healthy',
        performance: {
          uptime: 99.6,
          responseTime: 950,
          conversionRate: 5.1,
          abandonmentRate: 58.9,
          searchAccuracy: 91.2
        },
        business: {
          revenue: 1120000,
          transactions: 21890,
          averageOrderValue: 51.15,
          subscriptions: {
            new: 5420,
            renewals: 15680,
            cancellations: 3210,
            churn: 3.8
          }
        },
        user: {
          sessions: 420000,
          uniqueVisitors: 350000,
          pageViews: 1680000,
          bounceRate: 22.4,
          timeOnSite: 12.3
        },
        catalog: {
          totalItems: 12890,
          activeItems: 12450,
          outOfStock: 440,
          newReleases: 189
        },
        payments: {
          successRate: 97.5,
          failureRate: 2.5,
          averageProcessingTime: 1.8,
          fraudDetection: 0.5
        },
        lastUpdated: new Date().toISOString()
      },
      {
        platform: 'Partner Store',
        health: 'critical',
        performance: {
          uptime: 97.8,
          responseTime: 1850,
          conversionRate: 2.1,
          abandonmentRate: 81.2,
          searchAccuracy: 74.5
        },
        business: {
          revenue: 680000,
          transactions: 15420,
          averageOrderValue: 44.12,
          subscriptions: {
            new: 2890,
            renewals: 8920,
            cancellations: 4520,
            churn: 8.9
          }
        },
        user: {
          sessions: 280000,
          uniqueVisitors: 210000,
          pageViews: 890000,
          bounceRate: 45.8,
          timeOnSite: 4.2
        },
        catalog: {
          totalItems: 8920,
          activeItems: 7850,
          outOfStock: 1070,
          newReleases: 98
        },
        payments: {
          successRate: 89.2,
          failureRate: 10.8,
          averageProcessingTime: 5.2,
          fraudDetection: 2.1
        },
        lastUpdated: new Date().toISOString()
      }
    ];
  }

  /**
   * Get metrics for a specific store platform
   */
  async getStoreMetrics(platform: string): Promise<StoreMetrics | null> {
    const allMetrics = await this.getAllStoreMetrics();
    return allMetrics.find(s => s.platform.toLowerCase().includes(platform.toLowerCase())) || null;
  }

  /**
   * Get historical trends for store performance
   */
  async getStoreTrends(platform?: string, days: number = 30): Promise<StoreTrend[]> {
    const trends: StoreTrend[] = [];
    const metrics = platform ? 
      await this.getStoreMetrics(platform) : 
      (await this.getAllStoreMetrics())[0]; // Default to Web Store
    
    if (!metrics) return trends;

    // Generate mock historical data
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Add some realistic variance to the data
      const variance = () => 0.85 + Math.random() * 0.3; // ±15% variance
      
      trends.push({
        date: date.toISOString().split('T')[0],
        revenue: Math.round(metrics.business.revenue * variance()),
        transactions: Math.round(metrics.business.transactions * variance()),
        conversionRate: Math.round(metrics.performance.conversionRate * variance() * 100) / 100,
        users: Math.round(metrics.user.uniqueVisitors * variance())
      });
    }

    return trends;
  }

  /**
   * Get store alerts and issues
   */
  async getStoreAlerts(): Promise<any[]> {
    const allMetrics = await this.getAllStoreMetrics();
    const alerts: any[] = [];

    allMetrics.forEach(store => {
      // Performance alerts
      if (store.performance.uptime < 99.5) {
        alerts.push({
          id: `uptime-${store.platform}`,
          platform: store.platform,
          type: 'performance',
          severity: store.performance.uptime < 99 ? 'critical' : 'high',
          title: 'Low Uptime',
          description: `${store.platform} uptime is ${store.performance.uptime}%`,
          threshold: '99.5%',
          current: `${store.performance.uptime}%`,
          timestamp: new Date().toISOString()
        });
      }

      if (store.performance.responseTime > 1500) {
        alerts.push({
          id: `response-${store.platform}`,
          platform: store.platform,
          type: 'performance',
          severity: 'medium',
          title: 'Slow Response Time',
          description: `${store.platform} response time is ${store.performance.responseTime}ms`,
          threshold: '1500ms',
          current: `${store.performance.responseTime}ms`,
          timestamp: new Date().toISOString()
        });
      }

      // Business alerts
      if (store.performance.conversionRate < 3.0) {
        alerts.push({
          id: `conversion-${store.platform}`,
          platform: store.platform,
          type: 'business',
          severity: 'medium',
          title: 'Low Conversion Rate',
          description: `${store.platform} conversion rate is ${store.performance.conversionRate}%`,
          threshold: '3.0%',
          current: `${store.performance.conversionRate}%`,
          timestamp: new Date().toISOString()
        });
      }

      if (store.business.subscriptions.churn > 6.0) {
        alerts.push({
          id: `churn-${store.platform}`,
          platform: store.platform,
          type: 'business',
          severity: 'high',
          title: 'High Churn Rate',
          description: `${store.platform} churn rate is ${store.business.subscriptions.churn}%`,
          threshold: '6.0%',
          current: `${store.business.subscriptions.churn}%`,
          timestamp: new Date().toISOString()
        });
      }

      // Payment alerts
      if (store.payments.failureRate > 5.0) {
        alerts.push({
          id: `payment-${store.platform}`,
          platform: store.platform,
          type: 'payment',
          severity: 'high',
          title: 'High Payment Failure Rate',
          description: `${store.platform} payment failure rate is ${store.payments.failureRate}%`,
          threshold: '5.0%',
          current: `${store.payments.failureRate}%`,
          timestamp: new Date().toISOString()
        });
      }

      // Inventory alerts
      const outOfStockPercentage = (store.catalog.outOfStock / store.catalog.totalItems) * 100;
      if (outOfStockPercentage > 5.0) {
        alerts.push({
          id: `inventory-${store.platform}`,
          platform: store.platform,
          type: 'inventory',
          severity: 'medium',
          title: 'High Out of Stock Rate',
          description: `${store.platform} has ${outOfStockPercentage.toFixed(1)}% items out of stock`,
          threshold: '5.0%',
          current: `${outOfStockPercentage.toFixed(1)}%`,
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
   * Get store KPIs summary
   */
  async getStoreKPIs(): Promise<any> {
    const allMetrics = await this.getAllStoreMetrics();
    
    const totalRevenue = allMetrics.reduce((sum, s) => sum + s.business.revenue, 0);
    const totalTransactions = allMetrics.reduce((sum, s) => sum + s.business.transactions, 0);
    const avgConversionRate = allMetrics.reduce((sum, s) => sum + s.performance.conversionRate, 0) / allMetrics.length;
    const totalUsers = allMetrics.reduce((sum, s) => sum + s.user.uniqueVisitors, 0);
    const avgUptime = allMetrics.reduce((sum, s) => sum + s.performance.uptime, 0) / allMetrics.length;
    
    const healthyStores = allMetrics.filter(s => s.health === 'healthy').length;
    const warningStores = allMetrics.filter(s => s.health === 'warning').length;
    const criticalStores = allMetrics.filter(s => s.health === 'critical').length;

    // Subscription metrics
    const totalNewSubs = allMetrics.reduce((sum, s) => sum + s.business.subscriptions.new, 0);
    const totalRenewals = allMetrics.reduce((sum, s) => sum + s.business.subscriptions.renewals, 0);
    const totalCancellations = allMetrics.reduce((sum, s) => sum + s.business.subscriptions.cancellations, 0);
    const avgChurn = allMetrics.reduce((sum, s) => sum + s.business.subscriptions.churn, 0) / allMetrics.length;

    return {
      summary: {
        totalRevenue,
        totalTransactions,
        avgConversionRate: Math.round(avgConversionRate * 100) / 100,
        totalUsers,
        avgUptime: Math.round(avgUptime * 100) / 100,
        healthyStores,
        warningStores,
        criticalStores
      },
      subscriptions: {
        newSubscriptions: totalNewSubs,
        renewals: totalRenewals,
        cancellations: totalCancellations,
        avgChurnRate: Math.round(avgChurn * 100) / 100,
        netGrowth: totalNewSubs + totalRenewals - totalCancellations
      },
      topPerformers: allMetrics
        .sort((a, b) => b.performance.conversionRate - a.performance.conversionRate)
        .slice(0, 3)
        .map(s => ({ 
          platform: s.platform, 
          conversionRate: s.performance.conversionRate,
          revenue: s.business.revenue
        })),
      needsAttention: allMetrics
        .filter(s => s.health !== 'healthy')
        .map(s => ({ 
          platform: s.platform, 
          health: s.health,
          issues: s.performance.conversionRate < 3 ? 'Low conversion rate' : 
                 s.payments.failureRate > 5 ? 'High payment failures' : 'Performance issues'
        })),
      paymentHealth: {
        avgSuccessRate: allMetrics.reduce((sum, s) => sum + s.payments.successRate, 0) / allMetrics.length,
        avgProcessingTime: allMetrics.reduce((sum, s) => sum + s.payments.averageProcessingTime, 0) / allMetrics.length,
        totalFraudDetected: allMetrics.reduce((sum, s) => sum + s.payments.fraudDetection, 0)
      }
    };
  }

  /**
   * Get store comparison data
   */
  async getStoreComparison(): Promise<any> {
    const allMetrics = await this.getAllStoreMetrics();
    
    return {
      revenue: allMetrics.map(s => ({
        platform: s.platform,
        revenue: s.business.revenue,
        growth: Math.random() * 20 - 5 // Mock growth rate
      })),
      conversion: allMetrics.map(s => ({
        platform: s.platform,
        rate: s.performance.conversionRate,
        abandonment: s.performance.abandonmentRate
      })),
      performance: allMetrics.map(s => ({
        platform: s.platform,
        uptime: s.performance.uptime,
        responseTime: s.performance.responseTime
      })),
      users: allMetrics.map(s => ({
        platform: s.platform,
        sessions: s.user.sessions,
        uniqueVisitors: s.user.uniqueVisitors,
        bounceRate: s.user.bounceRate
      }))
    };
  }
}

export default new StoreService();
