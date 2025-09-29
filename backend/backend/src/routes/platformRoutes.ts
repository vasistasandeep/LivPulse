import express from 'express';
import platformService from '../services/platformService';

const router = express.Router();

/**
 * GET /api/platform/metrics
 * Get all platform metrics
 */
router.get('/metrics', async (req, res) => {
  try {
    const metrics = await platformService.getAllPlatformMetrics();
    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    console.error('Platform metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch platform metrics'
    });
  }
});

/**
 * GET /api/platform/metrics/:platform
 * Get specific platform metrics
 */
router.get('/metrics/:platform', async (req, res) => {
  try {
    const { platform } = req.params;
    const metrics = await platformService.getPlatformMetrics(platform);
    
    if (!metrics) {
      return res.status(404).json({
        success: false,
        error: 'Platform not found'
      });
    }

    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    console.error('Platform specific metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch platform metrics'
    });
  }
});

/**
 * GET /api/platform/trends/:platform
 * Get platform trends
 */
router.get('/trends/:platform', async (req, res) => {
  try {
    const { platform } = req.params;
    const days = parseInt(req.query.days as string) || 30;
    
    const trends = await platformService.getPlatformTrends(platform, days);
    
    res.json({
      success: true,
      data: {
        platform,
        trends,
        period: `${days} days`
      }
    });
  } catch (error) {
    console.error('Platform trends error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch platform trends'
    });
  }
});

/**
 * GET /api/platform/comparison
 * Get platform comparison data
 */
router.get('/comparison', async (req, res) => {
  try {
    const comparison = await platformService.getPlatformComparison();
    res.json({
      success: true,
      data: comparison
    });
  } catch (error) {
    console.error('Platform comparison error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch platform comparison'
    });
  }
});

/**
 * GET /api/platform/alerts
 * Get platform alerts
 */
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await platformService.getPlatformAlerts();
    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    console.error('Platform alerts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch platform alerts'
    });
  }
});

/**
 * GET /api/platform/kpis
 * Get platform KPIs
 */
router.get('/kpis', async (req, res) => {
  try {
    const kpis = await platformService.getPlatformKPIs();
    res.json({
      success: true,
      data: kpis
    });
  } catch (error) {
    console.error('Platform KPIs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch platform KPIs'
    });
  }
});

export default router;
