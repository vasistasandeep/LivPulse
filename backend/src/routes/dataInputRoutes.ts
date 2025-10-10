import express from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import { dataInputService } from '../services/dataInputService';

const router = express.Router();

// Submit form data
router.post('/form', authenticateToken, async (req, res) => {
  try {
    const { category, data } = req.body;
    const user = (req as any).user;

    const result = await dataInputService.submitFormData(category, data, user);
    res.json(result);
  } catch (error) {
    console.error('Error submitting form data:', error);
    res.status(500).json({ error: 'Failed to submit form data' });
  }
});

// Upload CSV data (simplified without multer for now)
router.post('/csv/:category', authenticateToken, express.raw({ type: 'text/csv' }), async (req, res) => {
  try {
    const { category } = req.params;
    const user = (req as any).user;

    if (!req.body || req.body.length === 0) {
      return res.status(400).json({ error: 'No file data provided' });
    }

    const csvText = req.body.toString();
    const result = await dataInputService.uploadCSVDataFromText(category, csvText, user);
    res.json(result);
  } catch (error) {
    console.error('Error uploading CSV data:', error);
    res.status(500).json({ error: 'Failed to upload CSV data' });
  }
});

// Validate data before submission
router.post('/validate', authenticateToken, async (req, res) => {
  try {
    const { category, data } = req.body;
    const user = (req as any).user;

    const validation = await dataInputService.validateData(category, data, user);
    res.json(validation);
  } catch (error) {
    console.error('Error validating data:', error);
    res.status(500).json({ error: 'Failed to validate data' });
  }
});

// Get data input categories available to user
router.get('/categories', authenticateToken, async (req, res) => {
  try {
    const user = (req as any).user;
    const categories = await dataInputService.getAvailableCategories(user);
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get data input templates/schemas
router.get('/templates/:category', authenticateToken, async (req, res) => {
  try {
    const { category } = req.params;
    const user = (req as any).user;

    const template = await dataInputService.getDataTemplate(category, user);
    res.json(template);
  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).json({ error: 'Failed to fetch template' });
  }
});

// Get recent submissions for user
router.get('/submissions', authenticateToken, async (req, res) => {
  try {
    const user = (req as any).user;
    const limit = parseInt(req.query.limit as string) || 10;

    const submissions = await dataInputService.getRecentSubmissions(user, limit);
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Admin: Get all submissions for a category
router.get('/admin/submissions/:category', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;

    const submissions = await dataInputService.getAllSubmissions(category, page, limit);
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching admin submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Admin: Approve/reject submission
router.put('/admin/submissions/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { action, comments } = req.body;
    const user = (req as any).user;

    const result = await dataInputService.reviewSubmission(id, action, user, comments);
    res.json(result);
  } catch (error) {
    console.error('Error reviewing submission:', error);
    res.status(500).json({ error: 'Failed to review submission' });
  }
});

export default router;