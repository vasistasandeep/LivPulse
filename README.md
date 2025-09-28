# LivPulse - OTT Program Management Reporting

AI-powered dashboard for OTT program management with executive and technical views.

## 🚀 Quick Start

```bash
# Install all dependencies
npm run install-deps

# Run both backend and frontend
npm run dev
```

## 📋 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Executive | executive@company.com | executive123 |
| Program Manager | pm@company.com | pm123 |
| SRE | sre@company.com | sre123 |

## 🏗️ Architecture

- **Backend**: Node.js + TypeScript (Port 3001)
- **Frontend**: React + TypeScript (Port 3000)
- **Database**: Mock data for demo
- **AI**: Risk prediction and recommendations

## 📊 Features

- Tab-based reporting (Platform, Backend, Ops, Store, CMS)
- Executive vs Technical dashboards
- PDF report generation
- Real-time metrics and alerts
- Interactive charts and visualizations

## 🚂 Railway Deployment

Each folder (backend/frontend) can be deployed separately to Railway.

## 📝 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=3001
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001/api
```
