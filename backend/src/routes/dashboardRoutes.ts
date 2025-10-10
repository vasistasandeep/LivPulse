import express from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import { dashboardService } from '../services/dashboardService';

const router = express.Router();

// Get dashboard template for user's role
router.get('/template', authenticateToken, async (req, res) => {
  try {
    const user = (req as any).user;
    const template = await dashboardService.getDashboardTemplate(user.role);
    res.json(template);
  } catch (error) {
    console.error('Error fetching dashboard template:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard template' });
  }
});

// Update dashboard template (admin only)
router.put('/template/:role', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const { role } = req.params;
    const templateData = req.body;
    const template = await dashboardService.updateDashboardTemplate(role, templateData);
    res.json(template);
  } catch (error) {
    console.error('Error updating dashboard template:', error);
    res.status(500).json({ error: 'Failed to update dashboard template' });
  }
});

// Get dashboard data for multiple data sources
router.post('/data', authenticateToken, async (req, res) => {
  try {
    const { dataSources } = req.body;
    const user = (req as any).user;

    // Filter data sources based on user role permissions
    const allowedDataSources = await dashboardService.filterDataSourcesByRole(dataSources, user.role);

    const data = await dashboardService.getMultipleDashboardData(allowedDataSources);
    res.json(data);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Get available data sources for user's role
router.get('/data-sources', authenticateToken, async (req, res) => {
  try {
    const user = (req as any).user;
    const dataSources = await dashboardService.getAvailableDataSources(user.role);
    res.json(dataSources);
  } catch (error) {
    console.error('Error fetching data sources:', error);
    res.status(500).json({ error: 'Failed to fetch data sources' });
  }
});

// Get dashboard widgets library (admin only)
router.get('/widgets', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const widgets = await dashboardService.getWidgetLibrary();
    res.json(widgets);
  } catch (error) {
    console.error('Error fetching widget library:', error);
    res.status(500).json({ error: 'Failed to fetch widget library' });
  }
});

export default router;
