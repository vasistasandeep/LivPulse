import express from 'express';
import aiService from '../services/aiService';
import platformService from '../services/platformService';
import backendService from '../services/backendService';
import opsService from '../services/opsService';
import storeService from '../services/storeService';
import cmsService from '../services/cmsService';

const router = express.Router();

/**
 * GET /api/dashboard/overview
 * Get comprehensive dashboard overview
 */
router.get('/overview', async (req, res) => {
  try {
    const [
      platformMetrics,
      backendMetrics,
      opsMetrics,
      storeMetrics,
      cmsMetrics
    ] = await Promise.all([
      platformService.getAllPlatformMetrics(),
      backendService.getAllBackendMetrics(),
      opsService.getAllOpsMetrics(),
      storeService.getAllStoreMetrics(),
      cmsService.getAllCMSMetrics()
    ]);

    // Generate AI insights
    const metricsData = {
      platforms: platformMetrics,
      backend: backendMetrics,
      ops: opsMetrics,
      store: storeMetrics,
      cms: cmsMetrics
    };

    const [summary, risks, recommendations] = await Promise.all([
      aiService.generateProgramSummary(metricsData),
      aiService.predictRisks(metricsData, []),
      aiService.generateRecommendations([], metricsData)
    ]);

    res.json({
      success: true,
      data: {
        summary,
        metrics: metricsData,
        risks,
        recommendations,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Dashboard overview error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard overview'
    });
  }
});

/**
 * GET /api/dashboard/kpis
 * Get all KPIs summary
 */
router.get('/kpis', async (req, res) => {
  try {
    const [
      platformKPIs,
      backendKPIs,
      opsKPIs,
      storeKPIs,
      cmsKPIs
    ] = await Promise.all([
      platformService.getPlatformKPIs(),
      backendService.getBackendKPIs(),
      opsService.getOpsKPIs(),
      storeService.getStoreKPIs(),
      cmsService.getCMSKPIs()
    ]);

    res.json({
      success: true,
      data: {
        platform: platformKPIs,
        backend: backendKPIs,
        operations: opsKPIs,
        store: storeKPIs,
        cms: cmsKPIs,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('KPIs fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch KPIs'
    });
  }
});

/**
 * GET /api/dashboard/alerts
 * Get all system alerts
 */
router.get('/alerts', async (req, res) => {
  try {
    const [
      platformAlerts,
      backendAlerts,
      opsAlerts,
      storeAlerts,
      cmsAlerts
    ] = await Promise.all([
      platformService.getPlatformAlerts(),
      backendService.getServiceAlerts(),
      opsService.getOpsAlerts(),
      storeService.getStoreAlerts(),
      cmsService.getCMSAlerts()
    ]);

    // Combine and sort all alerts by severity and timestamp
    const allAlerts = [
      ...platformAlerts.map(a => ({ ...a, source: 'platform' })),
      ...backendAlerts.map(a => ({ ...a, source: 'backend' })),
      ...opsAlerts.map(a => ({ ...a, source: 'operations' })),
      ...storeAlerts.map(a => ({ ...a, source: 'store' })),
      ...cmsAlerts.map(a => ({ ...a, source: 'cms' }))
    ];

    // Sort by severity and timestamp
    const severityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
    allAlerts.sort((a, b) => {
      const severityDiff = (severityOrder[b.severity as keyof typeof severityOrder] || 0) - 
                          (severityOrder[a.severity as keyof typeof severityOrder] || 0);
      if (severityDiff !== 0) return severityDiff;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    // Get alert summary
    const alertSummary = {
      total: allAlerts.length,
      critical: allAlerts.filter(a => a.severity === 'critical').length,
      high: allAlerts.filter(a => a.severity === 'high').length,
      medium: allAlerts.filter(a => a.severity === 'medium').length,
      low: allAlerts.filter(a => a.severity === 'low').length,
      bySource: {
        platform: platformAlerts.length,
        backend: backendAlerts.length,
        operations: opsAlerts.length,
        store: storeAlerts.length,
        cms: cmsAlerts.length
      }
    };

    res.json({
      success: true,
      data: {
        summary: alertSummary,
        alerts: allAlerts.slice(0, 50), // Limit to top 50 alerts
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Alerts fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch alerts'
    });
  }
});

/**
 * GET /api/dashboard/health
 * Get overall system health status
 */
router.get('/health', async (req, res) => {
  try {
    const [
      platformMetrics,
      backendMetrics,
      opsMetrics,
      storeMetrics,
      cmsMetrics
    ] = await Promise.all([
      platformService.getAllPlatformMetrics(),
      backendService.getAllBackendMetrics(),
      opsService.getAllOpsMetrics(),
      storeService.getAllStoreMetrics(),
      cmsService.getAllCMSMetrics()
    ]);

    // Calculate health scores
    const platformHealth = {
      healthy: platformMetrics.filter(p => p.health === 'healthy').length,
      warning: platformMetrics.filter(p => p.health === 'warning').length,
      critical: platformMetrics.filter(p => p.health === 'critical').length,
      total: platformMetrics.length
    };

    const backendHealth = {
      operational: backendMetrics.filter(s => s.status === 'operational').length,
      degraded: backendMetrics.filter(s => s.status === 'degraded').length,
      outage: backendMetrics.filter(s => s.status === 'outage').length,
      total: backendMetrics.length
    };

    const opsHealth = {
      healthy: opsMetrics.filter(o => o.health === 'healthy').length,
      warning: opsMetrics.filter(o => o.health === 'warning').length,
      critical: opsMetrics.filter(o => o.health === 'critical').length,
      total: opsMetrics.length
    };

    const storeHealth = {
      healthy: storeMetrics.filter(s => s.health === 'healthy').length,
      warning: storeMetrics.filter(s => s.health === 'warning').length,
      critical: storeMetrics.filter(s => s.health === 'critical').length,
      total: storeMetrics.length
    };

    const cmsHealth = {
      healthy: cmsMetrics.filter(c => c.health === 'healthy').length,
      warning: cmsMetrics.filter(c => c.health === 'warning').length,
      critical: cmsMetrics.filter(c => c.health === 'critical').length,
      total: cmsMetrics.length
    };

    // Calculate overall health score
    const totalSystems = platformHealth.total + backendHealth.total + opsHealth.total + 
                        storeHealth.total + cmsHealth.total;
    const healthySystems = platformHealth.healthy + backendHealth.operational + 
                          opsHealth.healthy + storeHealth.healthy + cmsHealth.healthy;
    
    const overallHealthScore = Math.round((healthySystems / totalSystems) * 100);
    
    let overallStatus: 'healthy' | 'warning' | 'critical' = 'healthy';
    if (overallHealthScore < 70) overallStatus = 'critical';
    else if (overallHealthScore < 90) overallStatus = 'warning';

    res.json({
      success: true,
      data: {
        overall: {
          status: overallStatus,
          score: overallHealthScore,
          totalSystems,
          healthySystems
        },
        breakdown: {
          platforms: platformHealth,
          backend: backendHealth,
          operations: opsHealth,
          store: storeHealth,
          cms: cmsHealth
        },
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Health status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch health status'
    });
  }
});

/**
 * GET /api/dashboard/trends
 * Get trending data for dashboard charts
 */
router.get('/trends', async (req, res) => {
  try {
    const days = parseInt(req.query.days as string) || 7;
    
    // Get trends for key platforms and services
    const [
      androidTrends,
      webTrends,
      umspsTrends,
      playbackTrends
    ] = await Promise.all([
      platformService.getPlatformTrends('Android', days),
      platformService.getPlatformTrends('Web', days),
      backendService.getServiceTrends('UMSPS', days),
      backendService.getServiceTrends('Playback', days)
    ]);

    res.json({
      success: true,
      data: {
        platforms: {
          android: androidTrends,
          web: webTrends
        },
        services: {
          umsps: umspsTrends,
          playback: playbackTrends
        },
        period: `${days} days`,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Trends fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trends'
    });
  }
});

export default router;
