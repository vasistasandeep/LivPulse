# � LivPulse v2.0 - Railway & Multi-Platform Deployment Guide

## 🆕 What's New in v2.0
- ✅ **Advanced Admin Management System** with user analytics
- ✅ **KPI Dashboard Builder** with widget library  
- ✅ **Enhanced Security** with JWT and role-based access
- ✅ **Production-Ready APIs** for admin and KPI management

---

## 🎯 Railway Deployment (Primary Option)

### Quick Railway Setup

1. **Prepare for Deployment**:
   ```bash
   # Ensure your code is ready
   npm run build
   npm test  # if you have tests
   ```

2. **Deploy to Railway**:
   - Go to [Railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your LivPulse repository
   - Railway auto-detects Node.js and uses `railway.toml`

3. **Environment Variables** (optional):
   ```
   JWT_SECRET=your-super-secret-key
   NODE_ENV=production
   ```

4. **Test Your Deployment**:
   ```bash
   # Your Railway URL will be: https://livpulse-production.up.railway.app
   curl https://your-app.railway.app/health
   curl https://your-app.railway.app/api/admin/users
   ```

### Railway Features You Get:
- ✅ **Auto-scaling** based on traffic
- ✅ **Custom domains** for production
- ✅ **Automatic SSL** certificates
- ✅ **Built-in monitoring** and logs
- ✅ **Database add-ons** when needed

---

## 📊 Alternative Deployment Options

### Option A: Render.com (Backup)

#### 1. Deploy Backend to Render.com
```bash
# 1. Go to https://render.com and sign up with GitHub
# 2. Create New Web Service
# 3. Connect your GitHub repository: vasistasandeep/LivPulse
# 4. Configure:
#    - Name: livpulse-backend  
#    - Build Command: npm install && npm run build
#    - Start Command: npm start
#    - Health Check Path: /health
```

#### 2. Deploy Frontend to Vercel
```bash
# 1. Go to https://vercel.com and sign up with GitHub
# 2. Import Project: vasistasandeep/LivPulse
# 3. Framework: Create React App
# 4. Root Directory: frontend
# 5. Environment Variables:
#    REACT_APP_API_URL = https://your-render-app.onrender.com/api
```

### Option B: Netlify (Frontend) + Heroku (Backend)

#### 1. Deploy Backend to Heroku
```bash
# Install Heroku CLI, then:
heroku login
heroku create livpulse-backend
git subtree push --prefix . heroku main
```

#### 2. Deploy Frontend to Netlify
```bash
# 1. Go to https://netlify.com
# 2. Drag & drop the frontend/build folder
# 3. Set environment variable: REACT_APP_API_URL
```

---

## 🔧 Local Demo Setup (Fastest)

If you need a quick demo right now:

```bash
# Terminal 1 - Backend
cd "path/to/LIVPulse"
npm start

# Terminal 2 - Frontend  
cd frontend
set REACT_APP_API_URL=http://localhost:3001/api
npm start
```

**Demo URLs:**
- Frontend: http://localhost:3003
- Backend: http://localhost:3001
- Health Check: http://localhost:3001/health

---

## 🌐 Alternative Cloud Platforms

### Railway Alternative Deployment
If Railway gets fixed:
```bash
# Already configured - just wait for Railway to process the latest push
# Check: https://livpulse-production.up.railway.app/health
```

### Render.com (Recommended Alternative)
- Free tier available
- Better reliability than Railway
- Automatic HTTPS
- GitHub integration

### Vercel (Frontend Only)
- Perfect for React apps
- Automatic deployments  
- Global CDN
- Free tier generous

---

## 📋 API Endpoints for Demo

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

### Admin APIs (Authentication required)
- `POST /api/admin/publishing-data` - Update publishing data
- `POST /api/admin/dashboard-data` - Update dashboard data
- `GET/POST /api/admin/settings` - Application settings

### Authentication APIs
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Current user info  
- `POST /api/auth/logout` - User logout

---

## ⚡ Current Status

### ✅ Working Features
- **Local Development**: Fully functional
- **Frontend Build**: Production ready
- **Backend API**: All endpoints operational
- **CSP Issues**: Completely resolved
- **CORS Configuration**: Properly configured

### ⚠️ Known Issues  
- **Railway 502 Errors**: Persistent deployment issues
- **Alternative**: Use Render.com or Heroku instead

---

## 🎬 Demo Preparation Checklist

- [ ] Choose deployment platform (Render + Vercel recommended)
- [ ] Deploy backend with health check working
- [ ] Deploy frontend with correct API URL
- [ ] Test end-to-end functionality
- [ ] Prepare demo data/scenarios
- [ ] Document demo URLs

---

## 📞 Emergency Demo Option

If all deployments fail, you can run the demo locally in < 2 minutes:

```powershell
# Open 2 PowerShell windows
# Window 1:
cd "C:\UserData\Data\OneDrive - Sony Pictures Networks India Pvt Ltd\Desktop\micro_saas\LIVPulse"
npm start

# Window 2:  
cd "C:\UserData\Data\OneDrive - Sony Pictures Networks India Pvt Ltd\Desktop\micro_saas\LIVPulse\frontend"
$env:REACT_APP_API_URL="http://localhost:3001/api"
$env:PORT="3003"  
npm start
```

**Demo Ready at:** http://localhost:3003

This gives you a fully functional demo environment that you can show immediately!