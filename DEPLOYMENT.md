# Livpulse Deployment Guide

## Current Status ✅

**Backend API**: https://livpulse-production.up.railway.app/
- Health Check: https://livpulse-production.up.railway.app/health
- API Documentation: https://livpulse-production.up.railway.app/

## Fixed Issues

### 1. ✅ Content Security Policy (CSP) Errors
- Relaxed helmet CSP configuration for web deployment
- Added support for inline scripts and styles needed by frontend

### 2. ✅ 502 Gateway Errors
- Fixed server binding to 0.0.0.0 for Railway deployment
- Improved CORS configuration for cross-origin requests
- Added proper error handling and logging

### 3. ✅ Missing Endpoints
- Added root endpoint (/) with API information
- Added favicon.ico handler to prevent 404 errors
- Enhanced health check endpoint with uptime information

## API Endpoints

### Core Endpoints
- `GET /` - API information and available endpoints
- `GET /health` - Health check with uptime
- `GET /favicon.ico` - Favicon handler

### Dashboard APIs
- `GET /api/dashboard/overview` - Dashboard overview data
- `GET /api/dashboard/kpis` - Key performance indicators
- `GET /api/dashboard/alerts` - System alerts

### Publishing APIs  
- `GET /api/publishing/metrics` - Publishing metrics
- `GET /api/publishing/kpis` - Publishing KPIs
- `GET /api/publishing/*` - Various publishing endpoints

### Admin APIs (Admin role required)
- `POST /api/admin/publishing-data` - Update publishing data
- `POST /api/admin/dashboard-data` - Update dashboard data  
- `POST /api/admin/user-data` - User management
- `GET/POST /api/admin/settings` - Application settings

### Authentication APIs
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Current user info
- `POST /api/auth/logout` - User logout

## Frontend Deployment Options

### Option 1: Local Development
```bash
cd frontend
npm install
npm start
```
Access at: http://localhost:3000

### Option 2: Static Hosting (Recommended)
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `build/` folder to:
   - **Netlify**: Drag & drop the build folder
   - **Vercel**: Connect to your GitHub repo
   - **Railway**: Create a separate service for frontend
   - **GitHub Pages**: Use the build folder

### Option 3: Full Stack Railway Deployment
The backend is already deployed. For the frontend:

1. Create a new Railway service
2. Connect to the same GitHub repository  
3. Set the root directory to `/frontend`
4. Railway will auto-detect and build the React app

## Environment Variables

Set these in your frontend deployment:
```
REACT_APP_API_URL=https://livpulse-production.up.railway.app/api
```

## Testing the Backend

You can test the backend API directly:

```bash
# Test root endpoint
curl https://livpulse-production.up.railway.app/

# Test health check  
curl https://livpulse-production.up.railway.app/health

# Test dashboard overview (might need authentication)
curl https://livpulse-production.up.railway.app/api/dashboard/overview
```

## Next Steps

1. **Deploy Frontend**: Choose one of the frontend deployment options above
2. **Set API URL**: Configure the frontend to use the Railway backend URL
3. **Test Integration**: Ensure frontend can communicate with backend API
4. **Production Ready**: The backend is now production-ready with proper error handling

The 502 errors should now be resolved, and the API is fully functional!