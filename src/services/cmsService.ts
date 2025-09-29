// Content Management System (Blitz) metrics service

export interface CMSMetrics {
  module: 'Content Management' | 'Asset Pipeline' | 'Metadata Service' | 'Publishing' | 'Workflow';
  health: 'healthy' | 'warning' | 'critical';
  performance: {
    uptime: number;
    responseTime: number;
    throughput: number;
    errorRate: number;
    processingTime: number;
  };
  content: {
    totalAssets: number;
    publishedAssets: number;
    pendingApproval: number;
    failedProcessing: number;
    storageUsed: number; // in GB
    storageLimit: number; // in GB
  };
  workflow: {
    activeWorkflows: number;
    completedToday: number;
    averageProcessingTime: number;
    bottlenecks: number;
    automationRate: number;
  };
  users: {
    activeEditors: number;
    totalSessions: number;
    averageSessionTime: number;
    concurrentUsers: number;
  };
  quality: {
    metadataCompleteness: number;
    assetQualityScore: number;
    complianceRate: number;
    duplicateDetection: number;
  };
  lastUpdated: string;
}

export interface ContentTrend {
  date: string;
  assetsProcessed: number;
  publishedContent: number;
  qualityScore: number;
  processingTime: number;
}

class CMSService {
  /**
   * Get metrics for all CMS modules
   */
  async getAllCMSMetrics(): Promise<CMSMetrics[]> {
    return [
      {
        module: 'Content Management',
        health: 'healthy',
        performance: {
          uptime: 99.7,
          responseTime: 320,
          throughput: 8920,
          errorRate: 0.8,
          processingTime: 45.2
        },
        content: {
          totalAssets: 125420,
          publishedAssets: 118950,
          pendingApproval: 4820,
          failedProcessing: 1650,
          storageUsed: 2450.8,
          storageLimit: 5000.0
        },
        workflow: {
          activeWorkflows: 156,
          completedToday: 89,
          averageProcessingTime: 2.5,
          bottlenecks: 3,
          automationRate: 78.5
        },
        users: {
          activeEditors: 45,
          totalSessions: 234,
          averageSessionTime: 42.3,
          concurrentUsers: 12
        },
        quality: {
          metadataCompleteness: 92.1,
          assetQualityScore: 87.8,
          complianceRate: 94.5,
          duplicateDetection: 2.1
        },
        lastUpdated: new Date().toISOString()
      },
      {
        module: 'Asset Pipeline',
        health: 'warning',
        performance: {
          uptime: 98.9,
          responseTime: 1250,
          throughput: 5420,
          errorRate: 3.2,
          processingTime: 125.8
        },
        content: {
          totalAssets: 89420,
          publishedAssets: 82150,
          pendingApproval: 5890,
          failedProcessing: 1380,
          storageUsed: 1890.5,
          storageLimit: 3000.0
        },
        workflow: {
          activeWorkflows: 89,
          completedToday: 45,
          averageProcessingTime: 8.2,
          bottlenecks: 8,
          automationRate: 65.2
        },
        users: {
          activeEditors: 28,
          totalSessions: 156,
          averageSessionTime: 38.7,
          concurrentUsers: 8
        },
        quality: {
          metadataCompleteness: 85.4,
          assetQualityScore: 82.1,
          complianceRate: 89.7,
          duplicateDetection: 4.8
        },
        lastUpdated: new Date().toISOString()
      },
      {
        module: 'Metadata Service',
        health: 'healthy',
        performance: {
          uptime: 99.9,
          responseTime: 85,
          throughput: 15420,
          errorRate: 0.2,
          processingTime: 12.5
        },
        content: {
          totalAssets: 156890,
          publishedAssets: 152340,
          pendingApproval: 2890,
          failedProcessing: 1660,
          storageUsed: 450.2,
          storageLimit: 1000.0
        },
        workflow: {
          activeWorkflows: 234,
          completedToday: 189,
          averageProcessingTime: 0.8,
          bottlenecks: 1,
          automationRate: 95.8
        },
        users: {
          activeEditors: 15,
          totalSessions: 89,
          averageSessionTime: 25.4,
          concurrentUsers: 4
        },
        quality: {
          metadataCompleteness: 96.8,
          assetQualityScore: 94.2,
          complianceRate: 98.1,
          duplicateDetection: 1.2
        },
        lastUpdated: new Date().toISOString()
      },
      {
        module: 'Publishing',
        health: 'critical',
        performance: {
          uptime: 96.8,
          responseTime: 2150,
          throughput: 2890,
          errorRate: 8.5,
          processingTime: 285.7
        },
        content: {
          totalAssets: 45890,
          publishedAssets: 38920,
          pendingApproval: 4520,
          failedProcessing: 2450,
          storageUsed: 890.3,
          storageLimit: 1500.0
        },
        workflow: {
          activeWorkflows: 45,
          completedToday: 12,
          averageProcessingTime: 15.8,
          bottlenecks: 12,
          automationRate: 42.1
        },
        users: {
          activeEditors: 18,
          totalSessions: 67,
          averageSessionTime: 52.1,
          concurrentUsers: 6
        },
        quality: {
          metadataCompleteness: 78.9,
          assetQualityScore: 75.4,
          complianceRate: 82.3,
          duplicateDetection: 8.9
        },
        lastUpdated: new Date().toISOString()
      },
      {
        module: 'Workflow',
        health: 'healthy',
        performance: {
          uptime: 99.5,
          responseTime: 156,
          throughput: 6780,
          errorRate: 1.2,
          processingTime: 28.9
        },
        content: {
          totalAssets: 78920,
          publishedAssets: 74560,
          pendingApproval: 3120,
          failedProcessing: 1240,
          storageUsed: 234.7,
          storageLimit: 500.0
        },
        workflow: {
          activeWorkflows: 123,
          completedToday: 98,
          averageProcessingTime: 3.2,
          bottlenecks: 2,
          automationRate: 89.4
        },
        users: {
          activeEditors: 32,
          totalSessions: 145,
          averageSessionTime: 35.8,
          concurrentUsers: 9
        },
        quality: {
          metadataCompleteness: 91.2,
          assetQualityScore: 88.7,
          complianceRate: 93.8,
          duplicateDetection: 2.8
        },
        lastUpdated: new Date().toISOString()
      }
    ];
  }

  /**
   * Get metrics for a specific CMS module
   */
  async getCMSMetrics(module: string): Promise<CMSMetrics | null> {
    const allMetrics = await this.getAllCMSMetrics();
    return allMetrics.find(m => m.module.toLowerCase().includes(module.toLowerCase())) || null;
  }

  /**
   * Get historical trends for CMS performance
   */
  async getCMSTrends(module?: string, days: number = 30): Promise<ContentTrend[]> {
    const trends: ContentTrend[] = [];
    const metrics = module ? 
      await this.getCMSMetrics(module) : 
      (await this.getAllCMSMetrics())[0]; // Default to Content Management
    
    if (!metrics) return trends;

    // Generate mock historical data
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Add some realistic variance to the data
      const variance = () => 0.8 + Math.random() * 0.4; // ±20% variance
      
      trends.push({
        date: date.toISOString().split('T')[0],
        assetsProcessed: Math.round(metrics.workflow.completedToday * variance()),
        publishedContent: Math.round(metrics.content.publishedAssets * 0.01 * variance()), // Daily published
        qualityScore: Math.round(metrics.quality.assetQualityScore * variance()),
        processingTime: Math.round(metrics.performance.processingTime * variance())
      });
    }

    return trends;
  }

  /**
   * Get CMS alerts and issues
   */
  async getCMSAlerts(): Promise<any[]> {
    const allMetrics = await this.getAllCMSMetrics();
    const alerts: any[] = [];

    allMetrics.forEach(cms => {
      // Performance alerts
      if (cms.performance.uptime < 99.0) {
        alerts.push({
          id: `uptime-${cms.module}`,
          module: cms.module,
          type: 'performance',
          severity: cms.performance.uptime < 98 ? 'critical' : 'high',
          title: 'Low Uptime',
          description: `${cms.module} uptime is ${cms.performance.uptime}%`,
          threshold: '99.0%',
          current: `${cms.performance.uptime}%`,
          timestamp: new Date().toISOString()
        });
      }

      if (cms.performance.errorRate > 5.0) {
        alerts.push({
          id: `error-${cms.module}`,
          module: cms.module,
          type: 'performance',
          severity: 'critical',
          title: 'High Error Rate',
          description: `${cms.module} error rate is ${cms.performance.errorRate}%`,
          threshold: '5.0%',
          current: `${cms.performance.errorRate}%`,
          timestamp: new Date().toISOString()
        });
      }

      // Storage alerts
      const storageUsage = (cms.content.storageUsed / cms.content.storageLimit) * 100;
      if (storageUsage > 80) {
        alerts.push({
          id: `storage-${cms.module}`,
          module: cms.module,
          type: 'storage',
          severity: storageUsage > 90 ? 'critical' : 'medium',
          title: 'High Storage Usage',
          description: `${cms.module} storage usage is ${storageUsage.toFixed(1)}%`,
          threshold: '80%',
          current: `${storageUsage.toFixed(1)}%`,
          timestamp: new Date().toISOString()
        });
      }

      // Workflow alerts
      if (cms.workflow.bottlenecks > 5) {
        alerts.push({
          id: `bottleneck-${cms.module}`,
          module: cms.module,
          type: 'workflow',
          severity: 'medium',
          title: 'Workflow Bottlenecks',
          description: `${cms.module} has ${cms.workflow.bottlenecks} workflow bottlenecks`,
          threshold: '5',
          current: `${cms.workflow.bottlenecks}`,
          timestamp: new Date().toISOString()
        });
      }

      // Quality alerts
      if (cms.quality.metadataCompleteness < 85) {
        alerts.push({
          id: `metadata-${cms.module}`,
          module: cms.module,
          type: 'quality',
          severity: 'medium',
          title: 'Low Metadata Completeness',
          description: `${cms.module} metadata completeness is ${cms.quality.metadataCompleteness}%`,
          threshold: '85%',
          current: `${cms.quality.metadataCompleteness}%`,
          timestamp: new Date().toISOString()
        });
      }

      if (cms.quality.complianceRate < 90) {
        alerts.push({
          id: `compliance-${cms.module}`,
          module: cms.module,
          type: 'quality',
          severity: 'high',
          title: 'Low Compliance Rate',
          description: `${cms.module} compliance rate is ${cms.quality.complianceRate}%`,
          threshold: '90%',
          current: `${cms.quality.complianceRate}%`,
          timestamp: new Date().toISOString()
        });
      }

      // Content processing alerts
      const failureRate = (cms.content.failedProcessing / cms.content.totalAssets) * 100;
      if (failureRate > 3.0) {
        alerts.push({
          id: `processing-${cms.module}`,
          module: cms.module,
          type: 'processing',
          severity: 'medium',
          title: 'High Processing Failure Rate',
          description: `${cms.module} has ${failureRate.toFixed(1)}% processing failures`,
          threshold: '3.0%',
          current: `${failureRate.toFixed(1)}%`,
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
   * Get CMS KPIs summary
   */
  async getCMSKPIs(): Promise<any> {
    const allMetrics = await this.getAllCMSMetrics();
    
    const totalAssets = allMetrics.reduce((sum, c) => sum + c.content.totalAssets, 0);
    const totalPublished = allMetrics.reduce((sum, c) => sum + c.content.publishedAssets, 0);
    const totalPending = allMetrics.reduce((sum, c) => sum + c.content.pendingApproval, 0);
    const totalFailed = allMetrics.reduce((sum, c) => sum + c.content.failedProcessing, 0);
    const avgUptime = allMetrics.reduce((sum, c) => sum + c.performance.uptime, 0) / allMetrics.length;
    const avgQuality = allMetrics.reduce((sum, c) => sum + c.quality.assetQualityScore, 0) / allMetrics.length;
    
    const healthyModules = allMetrics.filter(c => c.health === 'healthy').length;
    const warningModules = allMetrics.filter(c => c.health === 'warning').length;
    const criticalModules = allMetrics.filter(c => c.health === 'critical').length;

    // Storage metrics
    const totalStorageUsed = allMetrics.reduce((sum, c) => sum + c.content.storageUsed, 0);
    const totalStorageLimit = allMetrics.reduce((sum, c) => sum + c.content.storageLimit, 0);
    const storageUtilization = (totalStorageUsed / totalStorageLimit) * 100;

    // Workflow metrics
    const totalActiveWorkflows = allMetrics.reduce((sum, c) => sum + c.workflow.activeWorkflows, 0);
    const totalCompletedToday = allMetrics.reduce((sum, c) => sum + c.workflow.completedToday, 0);
    const avgAutomationRate = allMetrics.reduce((sum, c) => sum + c.workflow.automationRate, 0) / allMetrics.length;

    return {
      summary: {
        totalAssets,
        publishedAssets: totalPublished,
        pendingApproval: totalPending,
        failedProcessing: totalFailed,
        publishRate: Math.round((totalPublished / totalAssets) * 100 * 100) / 100,
        avgUptime: Math.round(avgUptime * 100) / 100,
        avgQualityScore: Math.round(avgQuality * 100) / 100,
        healthyModules,
        warningModules,
        criticalModules
      },
      storage: {
        totalUsed: Math.round(totalStorageUsed * 100) / 100,
        totalLimit: totalStorageLimit,
        utilization: Math.round(storageUtilization * 100) / 100,
        availableSpace: Math.round((totalStorageLimit - totalStorageUsed) * 100) / 100
      },
      workflow: {
        activeWorkflows: totalActiveWorkflows,
        completedToday: totalCompletedToday,
        avgAutomationRate: Math.round(avgAutomationRate * 100) / 100,
        productivity: Math.round((totalCompletedToday / totalActiveWorkflows) * 100 * 100) / 100
      },
      quality: {
        avgMetadataCompleteness: allMetrics.reduce((sum, c) => sum + c.quality.metadataCompleteness, 0) / allMetrics.length,
        avgComplianceRate: allMetrics.reduce((sum, c) => sum + c.quality.complianceRate, 0) / allMetrics.length,
        avgDuplicateDetection: allMetrics.reduce((sum, c) => sum + c.quality.duplicateDetection, 0) / allMetrics.length
      },
      topPerformers: allMetrics
        .sort((a, b) => b.quality.assetQualityScore - a.quality.assetQualityScore)
        .slice(0, 3)
        .map(c => ({ 
          module: c.module, 
          qualityScore: c.quality.assetQualityScore,
          automationRate: c.workflow.automationRate
        })),
      needsAttention: allMetrics
        .filter(c => c.health !== 'healthy')
        .map(c => ({ 
          module: c.module, 
          health: c.health,
          issues: c.performance.errorRate > 5 ? 'High error rate' : 
                 c.workflow.bottlenecks > 5 ? 'Workflow bottlenecks' : 
                 c.quality.complianceRate < 90 ? 'Low compliance' : 'Performance issues'
        }))
    };
  }

  /**
   * Get content processing statistics
   */
  async getContentProcessingStats(): Promise<any> {
    const allMetrics = await this.getAllCMSMetrics();
    
    return {
      dailyProcessing: allMetrics.map(c => ({
        module: c.module,
        completed: c.workflow.completedToday,
        active: c.workflow.activeWorkflows,
        avgTime: c.workflow.averageProcessingTime
      })),
      assetDistribution: allMetrics.map(c => ({
        module: c.module,
        total: c.content.totalAssets,
        published: c.content.publishedAssets,
        pending: c.content.pendingApproval,
        failed: c.content.failedProcessing
      })),
      userActivity: allMetrics.map(c => ({
        module: c.module,
        activeEditors: c.users.activeEditors,
        sessions: c.users.totalSessions,
        concurrent: c.users.concurrentUsers
      }))
    };
  }
}

export default new CMSService();
