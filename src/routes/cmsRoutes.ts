import express from 'express';
import cmsService from '../services/cmsService';

const router = express.Router();

/**
 * GET /api/cms/metrics
 * Get all CMS module metrics
 */
router.get('/metrics', async (req, res) => {
  try {
    const metrics = await cmsService.getAllCMSMetrics();
    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    console.error('CMS metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch CMS metrics'
    });
  }
});

/**
 * GET /api/cms/metrics/:module
 * Get specific CMS module metrics
 */
router.get('/metrics/:module', async (req, res) => {
  try {
    const { module } = req.params;
    const metrics = await cmsService.getCMSMetrics(module);
    
    if (!metrics) {
      return res.status(404).json({
        success: false,
        error: 'CMS module not found'
      });
    }

    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    console.error('CMS module metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch CMS module metrics'
    });
  }
});

/**
 * GET /api/cms/trends
 * Get CMS trends
 */
router.get('/trends', async (req, res) => {
  try {
    const module = req.query.module as string;
    const days = parseInt(req.query.days as string) || 30;
    
    const trends = await cmsService.getCMSTrends(module, days);
    
    res.json({
      success: true,
      data: {
        module: module || 'Content Management',
        trends,
        period: `${days} days`
      }
    });
  } catch (error) {
    console.error('CMS trends error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch CMS trends'
    });
  }
});

/**
 * GET /api/cms/alerts
 * Get CMS alerts
 */
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await cmsService.getCMSAlerts();
    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    console.error('CMS alerts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch CMS alerts'
    });
  }
});

/**
 * GET /api/cms/kpis
 * Get CMS KPIs
 */
router.get('/kpis', async (req, res) => {
  try {
    const kpis = await cmsService.getCMSKPIs();
    res.json({
      success: true,
      data: kpis
    });
  } catch (error) {
    console.error('CMS KPIs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch CMS KPIs'
    });
  }
});

/**
 * GET /api/cms/processing
 * Get content processing statistics
 */
router.get('/processing', async (req, res) => {
  try {
    const stats = await cmsService.getContentProcessingStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('CMS processing stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch content processing statistics'
    });
  }
});

export default router;
