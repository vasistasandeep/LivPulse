import express from 'express';
import pdfExport from '../utils/pdfExport';
import aiService from '../services/aiService';
import platformService from '../services/platformService';
import backendService from '../services/backendService';
import opsService from '../services/opsService';
import storeService from '../services/storeService';
import cmsService from '../services/cmsService';

const router = express.Router();

/**
 * GET /api/reports/executive
 * Generate executive report (PDF)
 */
router.get('/executive', async (req, res) => {
  try {
    const format = req.query.format as string || 'pdf';
    
    // Gather all data for the report
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

    const metricsData = {
      platforms: platformMetrics,
      backend: backendMetrics,
      ops: opsMetrics,
      store: storeMetrics,
      cms: cmsMetrics
    };

    // Generate AI insights
    const [summary, risks, recommendations] = await Promise.all([
      aiService.generateProgramSummary(metricsData),
      aiService.predictRisks(metricsData, []),
      aiService.generateRecommendations([], metricsData)
    ]);

    const reportData = {
      title: 'OTT Program Management - Executive Report',
      generatedAt: new Date().toLocaleString(),
      summary,
      platforms: platformMetrics,
      backend: backendMetrics,
      operations: opsMetrics,
      store: storeMetrics,
      cms: cmsMetrics,
      risks,
      recommendations,
      kpis: {
        platform: await platformService.getPlatformKPIs(),
        backend: await backendService.getBackendKPIs(),
        ops: await opsService.getOpsKPIs(),
        store: await storeService.getStoreKPIs(),
        cms: await cmsService.getCMSKPIs()
      }
    };

    if (format === 'json') {
      res.json({
        success: true,
        data: reportData
      });
    } else {
      // Generate PDF
      const pdfBuffer = await pdfExport.generateExecutiveReport(reportData);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="executive-report-${new Date().toISOString().split('T')[0]}.pdf"`);
      res.send(pdfBuffer);
    }
  } catch (error) {
    console.error('Executive report generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate executive report'
    });
  }
});

/**
 * GET /api/reports/technical
 * Generate technical report (PDF)
 */
router.get('/technical', async (req, res) => {
  try {
    const format = req.query.format as string || 'pdf';
    
    // Gather all technical data
    const [
      platformMetrics,
      backendMetrics,
      opsMetrics,
      storeMetrics,
      cmsMetrics,
      platformAlerts,
      backendAlerts,
      opsAlerts,
      storeAlerts,
      cmsAlerts
    ] = await Promise.all([
      platformService.getAllPlatformMetrics(),
      backendService.getAllBackendMetrics(),
      opsService.getAllOpsMetrics(),
      storeService.getAllStoreMetrics(),
      cmsService.getAllCMSMetrics(),
      platformService.getPlatformAlerts(),
      backendService.getServiceAlerts(),
      opsService.getOpsAlerts(),
      storeService.getStoreAlerts(),
      cmsService.getCMSAlerts()
    ]);

    const reportData = {
      title: 'OTT Program Management - Technical Report',
      generatedAt: new Date().toLocaleString(),
      summary: {
        totalPlatforms: platformMetrics.length,
        totalServices: backendMetrics.length,
        totalAlerts: platformAlerts.length + backendAlerts.length + opsAlerts.length + storeAlerts.length + cmsAlerts.length
      },
      platforms: platformMetrics,
      backend: backendMetrics,
      operations: opsMetrics,
      store: storeMetrics,
      cms: cmsMetrics,
      alerts: {
        platform: platformAlerts,
        backend: backendAlerts,
        ops: opsAlerts,
        store: storeAlerts,
        cms: cmsAlerts
      },
      risks: [],
      recommendations: [],
      kpis: {}
    };

    if (format === 'json') {
      res.json({
        success: true,
        data: reportData
      });
    } else {
      // Generate PDF
      const pdfBuffer = await pdfExport.generateTechnicalReport(reportData);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="technical-report-${new Date().toISOString().split('T')[0]}.pdf"`);
      res.send(pdfBuffer);
    }
  } catch (error) {
    console.error('Technical report generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate technical report'
    });
  }
});

/**
 * GET /api/reports/weekly
 * Generate weekly summary report
 */
router.get('/weekly', async (req, res) => {
  try {
    const format = req.query.format as string || 'json';
    
    // Get weekly trends and summaries
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

    const weeklyData = {
      title: 'Weekly Program Summary',
      generatedAt: new Date().toLocaleString(),
      period: 'Last 7 Days',
      summary: {
        platforms: {
          total: platformKPIs.summary.totalUsers,
          growth: platformKPIs.summary.avgGrowth,
          healthy: platformKPIs.summary.healthyPlatforms
        },
        backend: {
          uptime: backendKPIs.summary.avgUptime,
          throughput: backendKPIs.summary.totalThroughput,
          operational: backendKPIs.summary.operationalServices
        },
        operations: {
          availability: opsKPIs.summary.avgAvailability,
          incidents: opsKPIs.summary.totalIncidents,
          mttr: opsKPIs.summary.avgMTTR
        },
        store: {
          revenue: storeKPIs.summary.totalRevenue,
          conversion: storeKPIs.summary.avgConversionRate,
          users: storeKPIs.summary.totalUsers
        },
        cms: {
          assets: cmsKPIs.summary.totalAssets,
          published: cmsKPIs.summary.publishedAssets,
          quality: cmsKPIs.summary.avgQualityScore
        }
      },
      highlights: [
        `Platform user growth: ${platformKPIs.summary.avgGrowth}%`,
        `Backend uptime: ${backendKPIs.summary.avgUptime}%`,
        `Store revenue: $${storeKPIs.summary.totalRevenue.toLocaleString()}`,
        `CMS quality score: ${cmsKPIs.summary.avgQualityScore}%`
      ],
      concerns: [
        ...platformKPIs.needsAttention.map((p: any) => `${p.platform}: ${p.issues}`),
        ...backendKPIs.needsAttention.map((s: any) => `${s.service}: ${s.issues}`),
        ...opsKPIs.topConcerns.map((o: any) => `${o.category}: ${o.issue}`)
      ].slice(0, 5)
    };

    if (format === 'pdf') {
      // For weekly reports, we can reuse the executive template with weekly data
      const reportData = {
        ...weeklyData,
        platforms: [],
        backend: [],
        operations: [],
        store: [],
        cms: [],
        risks: [],
        recommendations: [],
        kpis: {}
      };
      
      const pdfBuffer = await pdfExport.generateExecutiveReport(reportData);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="weekly-report-${new Date().toISOString().split('T')[0]}.pdf"`);
      res.send(pdfBuffer);
    } else {
      res.json({
        success: true,
        data: weeklyData
      });
    }
  } catch (error) {
    console.error('Weekly report generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate weekly report'
    });
  }
});

/**
 * POST /api/reports/custom
 * Generate custom report with specific filters
 */
router.post('/custom', async (req, res) => {
  try {
    const { 
      title = 'Custom Report',
      sections = ['platforms', 'backend', 'operations'],
      format = 'json',
      filters = {}
    } = req.body;

    const reportData: any = {
      title,
      generatedAt: new Date().toLocaleString(),
      sections: [],
      summary: {},
      filters
    };

    // Build report based on requested sections
    if (sections.includes('platforms')) {
      reportData.platforms = await platformService.getAllPlatformMetrics();
      reportData.summary.platforms = await platformService.getPlatformKPIs();
    }

    if (sections.includes('backend')) {
      reportData.backend = await backendService.getAllBackendMetrics();
      reportData.summary.backend = await backendService.getBackendKPIs();
    }

    if (sections.includes('operations')) {
      reportData.operations = await opsService.getAllOpsMetrics();
      reportData.summary.operations = await opsService.getOpsKPIs();
    }

    if (sections.includes('store')) {
      reportData.store = await storeService.getAllStoreMetrics();
      reportData.summary.store = await storeService.getStoreKPIs();
    }

    if (sections.includes('cms')) {
      reportData.cms = await cmsService.getAllCMSMetrics();
      reportData.summary.cms = await cmsService.getCMSKPIs();
    }

    if (format === 'pdf') {
      const pdfBuffer = await pdfExport.generateExecutiveReport(reportData);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="custom-report-${new Date().toISOString().split('T')[0]}.pdf"`);
      res.send(pdfBuffer);
    } else {
      res.json({
        success: true,
        data: reportData
      });
    }
  } catch (error) {
    console.error('Custom report generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate custom report'
    });
  }
});

export default router;
