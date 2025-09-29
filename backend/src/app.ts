import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Import routes
import dashboardRoutes from './routes/dashboardRoutes';
import platformRoutes from './routes/platformRoutes';
import backendRoutes from './routes/backendRoutes';
import opsRoutes from './routes/opsRoutes';
import storeRoutes from './routes/storeRoutes';
import cmsRoutes from './routes/cmsRoutes';
import reportRoutes from './routes/reportRoutes';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import kpiRoutes from './routes/kpiRoutes';

dotenv.config();

const app = express();

// Security middleware - disable CSP for API-only backend
const isDevelopment = process.env.NODE_ENV !== 'production';
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP since this is an API-only backend
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration for production deployment
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Allow localhost, Vercel, Render, Railway, and other deployment domains
    if (
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.onrender.com') ||
      origin.endsWith('.railway.app') ||
      origin.endsWith('.netlify.app') ||
      origin === process.env.FRONTEND_URL
    ) {
      return callback(null, true);
    }
    
    // Default allow for development
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Livpulse Backend API is running',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    features: [
      'User Authentication & Authorization',
      'Advanced Admin Management System', 
      'KPI Dashboard Builder',
      'Widget Library & Data Sources',
      'Role-based Access Control',
      'Analytics & Reporting'
    ],
    endpoints: {
      health: '/health',
      api: '/api',
      auth: '/api/auth',
      admin: '/api/admin',
      kpi: '/api/kpi',
      dashboard: '/api/dashboard',
      reports: '/api/reports'
    },
    modules: {
      admin: {
        description: 'Complete user management system',
        endpoints: [
          'GET /api/admin/users - User management with pagination & filtering',
          'POST /api/admin/users - Create new users',
          'PUT /api/admin/users/:id - Update user details',
          'DELETE /api/admin/users/:id - Delete users',
          'GET /api/admin/roles - Role management',
          'GET /api/admin/analytics/users - User analytics',
          'GET /api/admin/settings - System settings'
        ]
      },
      kpi: {
        description: 'Dynamic dashboard and KPI management',
        endpoints: [
          'GET /api/kpi/dashboards - Dashboard management',
          'POST /api/kpi/dashboards - Create dashboards',
          'GET /api/kpi/widgets - Widget library',
          'POST /api/kpi/widgets - Create widgets',
          'GET /api/kpi/data-sources - Data source management',
          'GET /api/kpi/analytics - KPI analytics'
        ]
      }
    }
  });
});

// Favicon handler
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'LivPulse Platform Backend',
    version: '1.0.0',
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/platform', platformRoutes);
app.use('/api/backend', backendRoutes);
app.use('/api/ops', opsRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/kpi', kpiRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(`Error on ${req.method} ${req.path}:`, err);
  
  // Don't send error details in production
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      ...(isDevelopment && { stack: err.stack })
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404,
      path: req.originalUrl
    }
  });
});

export default app;
