import express from 'express';
import backendService from '../services/backendService';

const router = express.Router();

/**
 * GET /api/backend/metrics
 * Get all backend service metrics
 */
router.get('/metrics', async (req, res) => {
  try {
    const metrics = await backendService.getAllBackendMetrics();
    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    console.error('Backend metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch backend metrics'
    });
  }
});

/**
 * GET /api/backend/metrics/:service
 * Get specific backend service metrics
 */
router.get('/metrics/:service', async (req, res) => {
  try {
    const { service } = req.params;
    const metrics = await backendService.getServiceMetrics(service);
    
    if (!metrics) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    console.error('Backend service metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service metrics'
    });
  }
});

/**
 * GET /api/backend/trends/:service
 * Get backend service trends
 */
router.get('/trends/:service', async (req, res) => {
  try {
    const { service } = req.params;
    const days = parseInt(req.query.days as string) || 30;
    
    const trends = await backendService.getServiceTrends(service, days);
    
    res.json({
      success: true,
      data: {
        service,
        trends,
        period: `${days} days`
      }
    });
  } catch (error) {
    console.error('Backend trends error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service trends'
    });
  }
});

/**
 * GET /api/backend/alerts
 * Get backend service alerts
 */
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await backendService.getServiceAlerts();
    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    console.error('Backend alerts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch backend alerts'
    });
  }
});

/**
 * GET /api/backend/kpis
 * Get backend KPIs
 */
router.get('/kpis', async (req, res) => {
  try {
    const kpis = await backendService.getBackendKPIs();
    res.json({
      success: true,
      data: kpis
    });
  } catch (error) {
    console.error('Backend KPIs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch backend KPIs'
    });
  }
});

/**
 * GET /api/backend/dependencies
 * Get service dependencies health
 */
router.get('/dependencies', async (req, res) => {
  try {
    const dependencies = await backendService.getServiceDependencies();
    res.json({
      success: true,
      data: dependencies
    });
  } catch (error) {
    console.error('Backend dependencies error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service dependencies'
    });
  }
});

export default router;
