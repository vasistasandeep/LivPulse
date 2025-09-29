# LivPulse v2.0 - Advanced OTT Pl## 🔐 Demo Accounts

| Role | Username | Email | Password | Access Level |
|------|----------|-------|----------|--------------|
| **Admin** | **admin** | **admin@livpulse.com** | **admin123** | **Full system access + KPI/User Management** |
| Executive | executive1 | executive@livpulse.com | executive123 | Reports & analytics |
| PM | pm1 | pm@livpulse.com | pm123 | Project management |
| TPM | tpm1 | tpm@livpulse.com | tpm123 | Technical oversight |
| EM | em1 | em@livpulse.com | em123 | Engineering management |
| SRE | sre1 | sre@livpulse.com | sre123 | Infrastructure & monitoring |h Admin & KPI Management

AI-powered OTT platform with comprehensive admin management system and dynamic KPI dashboard builder.

## 🆕 Version 2.0 Features

### 👥 **Admin Management System**
- Complete user CRUD operations with advanced filtering
- Role-based access control (6-tier system)
- User analytics dashboard with visual insights
- Password management and security features
- Department and permission management

### 📊 **KPI Dashboard Builder**
- Dynamic dashboard creation and management
- Widget library (metrics, charts, tables, gauges, trends)
- Data source configuration (API, database, file, mock)
- Real-time data visualization
- Permission-based dashboard access

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build and run production
npm run build && npm start
```

## � Demo Accounts

| Role | Username | Email | Password | Access Level |
|------|----------|-------|----------|--------------|
| Admin | admin | admin@livpulse.com | admin123 | Full system access |
| Executive | executive1 | exec@livpulse.com | exec123 | Reports & analytics |
| PM | pm1 | pm@livpulse.com | pm123 | Project management |
| TPM | tpm1 | tpm@livpulse.com | tpm123 | Technical oversight |
| EM | em1 | em@livpulse.com | em123 | Engineering management |
| SRE | sre1 | sre@livpulse.com | sre123 | Infrastructure & monitoring |

## 🏗️ Architecture

- **Backend**: Node.js + Express + TypeScript (Port 3001)
- **Frontend**: React + Material-UI + TypeScript (Port 3000)
- **Database**: Mock data (easily replaceable with real DB)
- **Authentication**: JWT-based with role permissions
- **Security**: bcrypt password hashing, CORS, Helmet.js

## 📊 Enhanced Features

### Core Platform
- Multi-tab reporting (Platform, Backend, Ops, Store, CMS)
- Executive vs Technical dashboards
- PDF report generation with custom templates
- Real-time metrics and alerts

### Admin Module
- **User Management**: Create, edit, delete users with validation
- **Advanced Search**: Filter by role, department, status, name
- **Analytics Dashboard**: User distribution, activity metrics
- **Role Management**: 6-tier permission system
- **Security Features**: Password reset, account management

### KPI Module
- **Dashboard Builder**: Drag-and-drop dashboard creation
- **Widget Library**: 5 widget types with customization
- **Data Sources**: Connect external APIs and data sources
- **Real-time Updates**: Configurable refresh intervals
- **Permission System**: Role-based dashboard access

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration

### Admin Management
- `GET /api/admin/users` - Get users with pagination & filtering
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/roles` - Get available roles
- `GET /api/admin/analytics/users` - User analytics
- `POST /api/admin/users/:id/reset-password` - Reset password

### KPI Management
- `GET /api/kpi/dashboards` - Get dashboards
- `POST /api/kpi/dashboards` - Create dashboard
- `GET /api/kpi/widgets` - Get widgets
- `POST /api/kpi/widgets` - Create widget
- `GET /api/kpi/data-sources` - Get data sources
- `GET /api/kpi/analytics` - KPI analytics

## 🚂 Railway Deployment

### Backend Deployment
1. Connect your GitHub repository to Railway
2. Deploy from the root directory
3. Railway will auto-detect Node.js and use the railway.toml configuration
4. Environment variables are automatically configured

### Configuration Files
- `railway.toml` - Railway deployment configuration
- `package.json` - Dependencies and build scripts
- `tsconfig.json` - TypeScript configuration

## 📝 Environment Variables

### Backend (.env)
```
NODE_ENV=production
PORT=3001
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=https://your-frontend-domain.com
```

## 🧪 Testing

### API Testing
- Interactive test dashboard available at `/api-test.html`
- All endpoints documented with examples
- Health check endpoint: `/health`

### Local Testing
```bash
# Run backend
npm start

# Test endpoints
curl http://localhost:3001/health
curl http://localhost:3001/api/admin/users
curl http://localhost:3001/api/kpi/dashboards
```

## 🔧 Development

### Project Structure
```
src/
├── routes/           # API route handlers
│   ├── adminRoutes.ts    # Admin management APIs
│   ├── kpiRoutes.ts      # KPI dashboard APIs
│   ├── authRoutes.ts     # Authentication APIs
│   └── ...
├── services/         # Business logic services
├── utils/           # Utility functions
└── app.ts          # Express application setup
```

### Adding New Features
1. Create route handlers in `src/routes/`
2. Add business logic in `src/services/`
3. Update type definitions
4. Add API endpoints to `app.ts`
5. Test with the API test dashboard

## 🚀 Production Ready Features

- ✅ **Security**: JWT authentication, password hashing, CORS protection
- ✅ **Scalability**: Pagination, efficient filtering, modular architecture
- ✅ **Performance**: Optimized queries, caching strategy ready
- ✅ **Monitoring**: Health checks, error handling, logging
- ✅ **Documentation**: Comprehensive API documentation
- ✅ **Testing**: Interactive test interface included

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001/api
```
