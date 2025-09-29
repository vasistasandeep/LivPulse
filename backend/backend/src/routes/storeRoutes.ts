import express from 'express';
import storeService from '../services/storeService';

const router = express.Router();

/**
 * GET /api/store/metrics
 * Get all store platform metrics
 */
router.get('/metrics', async (req, res) => {
  try {
    const metrics = await storeService.getAllStoreMetrics();
    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    console.error('Store metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch store metrics'
    });
  }
});

/**
 * GET /api/store/metrics/:platform
 * Get specific store platform metrics
 */
router.get('/metrics/:platform', async (req, res) => {
  try {
    const { platform } = req.params;
    const metrics = await storeService.getStoreMetrics(platform);
    
    if (!metrics) {
      return res.status(404).json({
        success: false,
        error: 'Store platform not found'
      });
    }

    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    console.error('Store platform metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch store platform metrics'
    });
  }
});

/**
 * GET /api/store/trends
 * Get store trends
 */
router.get('/trends', async (req, res) => {
  try {
    const platform = req.query.platform as string;
    const days = parseInt(req.query.days as string) || 30;
    
    const trends = await storeService.getStoreTrends(platform, days);
    
    res.json({
      success: true,
      data: {
        platform: platform || 'All Stores',
        trends,
        period: `${days} days`
      }
    });
  } catch (error) {
    console.error('Store trends error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch store trends'
    });
  }
});

/**
 * GET /api/store/alerts
 * Get store alerts
 */
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await storeService.getStoreAlerts();
    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    console.error('Store alerts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch store alerts'
    });
  }
});

/**
 * GET /api/store/kpis
 * Get store KPIs
 */
router.get('/kpis', async (req, res) => {
  try {
    const kpis = await storeService.getStoreKPIs();
    res.json({
      success: true,
      data: kpis
    });
  } catch (error) {
    console.error('Store KPIs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch store KPIs'
    });
  }
});

/**
 * GET /api/store/comparison
 * Get store comparison data
 */
router.get('/comparison', async (req, res) => {
  try {
    const comparison = await storeService.getStoreComparison();
    res.json({
      success: true,
      data: comparison
    });
  } catch (error) {
    console.error('Store comparison error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch store comparison'
    });
  }
});

export default router;
