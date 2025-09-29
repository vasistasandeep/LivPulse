import express from 'express';
import opsService from '../services/opsService';

const router = express.Router();

/**
 * GET /api/ops/metrics
 * Get all operations metrics
 */
router.get('/metrics', async (req, res) => {
  try {
    const metrics = await opsService.getAllOpsMetrics();
    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    console.error('Ops metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch operations metrics'
    });
  }
});

/**
 * GET /api/ops/cdn
 * Get CDN specific metrics
 */
router.get('/cdn', async (req, res) => {
  try {
    const cdnMetrics = await opsService.getCDNMetrics();
    res.json({
      success: true,
      data: cdnMetrics
    });
  } catch (error) {
    console.error('CDN metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch CDN metrics'
    });
  }
});

/**
 * GET /api/ops/devops
 * Get DevOps specific metrics
 */
router.get('/devops', async (req, res) => {
  try {
    const devopsMetrics = await opsService.getDevOpsMetrics();
    res.json({
      success: true,
      data: devopsMetrics
    });
  } catch (error) {
    console.error('DevOps metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch DevOps metrics'
    });
  }
});

/**
 * GET /api/ops/alerts
 * Get operations alerts
 */
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await opsService.getOpsAlerts();
    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    console.error('Ops alerts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch operations alerts'
    });
  }
});

/**
 * GET /api/ops/kpis
 * Get operations KPIs
 */
router.get('/kpis', async (req, res) => {
  try {
    const kpis = await opsService.getOpsKPIs();
    res.json({
      success: true,
      data: kpis
    });
  } catch (error) {
    console.error('Ops KPIs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch operations KPIs'
    });
  }
});

export default router;
