# LivPulse v2.0 🚀# LivPulse v2.0 - Advanced OTT Pl## 🔐 Demo Accounts



**Advanced OTT Platform Management System with AI-Powered Insights**| Role | Username | Email | Password | Access Level |

|------|----------|-------|----------|--------------|

## 🏗️ Clean Architecture Overview| **Admin** | **admin** | **admin@livpulse.com** | **admin123** | **Full system access + KPI/User Management** |

| Executive | executive1 | executive@livpulse.com | executive123 | Reports & analytics |

```| PM | pm1 | pm@livpulse.com | pm123 | Project management |

┌─────────────────────────────────────────────────────────────────┐| TPM | tpm1 | tpm@livpulse.com | tpm123 | Technical oversight |

│                        LivPulse v2.0                           │| EM | em1 | em@livpulse.com | em123 | Engineering management |

├─────────────────────────────────────────────────────────────────┤| SRE | sre1 | sre@livpulse.com | sre123 | Infrastructure & monitoring |h Admin & KPI Management

│  Frontend (React/TypeScript)  │  Backend (Node.js/Express)      │

│  ├── Admin Dashboard          │  ├── Authentication APIs        │AI-powered OTT platform with comprehensive admin management system and dynamic KPI dashboard builder.

│  ├── KPI Dashboards          │  ├── Platform Management APIs   │

│  ├── User Management         │  ├── Report Generation APIs     │## 🆕 Version 2.0 Features

│  ├── Role-Based Access       │  ├── AI Integration            │

│  └── Responsive UI           │  └── PDF Export Services       │### 👥 **Admin Management System**

├─────────────────────────────────────────────────────────────────┤- Complete user CRUD operations with advanced filtering

│                    Deployment Strategy                         │- Role-based access control (6-tier system)

│  Frontend: Vercel            │  Backend: Railway/Render        │- User analytics dashboard with visual insights

│  Domain: livpulse.up.railway.app                              │- Password management and security features

│  API: livpulse-production-backend.up.railway.app              │- Department and permission management

└─────────────────────────────────────────────────────────────────┘

```### 📊 **KPI Dashboard Builder**

- Dynamic dashboard creation and management

## 📂 Clean Project Structure- Widget library (metrics, charts, tables, gauges, trends)

- Data source configuration (API, database, file, mock)

```- Real-time data visualization

LivPulse/- Permission-based dashboard access

├── frontend/                 # React/TypeScript Frontend

│   ├── src/## 🚀 Quick Start

│   │   ├── components/       # Reusable UI components

│   │   ├── pages/           # Page components```bash

│   │   ├── contexts/        # React contexts# Install dependencies

│   │   ├── api/            # API integrationnpm install

│   │   └── types/          # TypeScript definitions

│   ├── public/             # Static assets# Run development server

│   └── package.json        # Frontend dependenciesnpm run dev

├── backend/                 # Node.js/Express Backend

│   ├── src/# Build and run production

│   │   ├── routes/         # API route handlersnpm run build && npm start

│   │   ├── services/       # Business logic services```

│   │   ├── templates/      # Handlebars templates

│   │   └── utils/          # Utility functions## � Demo Accounts

│   └── package.json        # Backend dependencies

├── docs/                   # Documentation| Role | Username | Email | Password | Access Level |

│   ├── HLD_LivPulse.md    # High-Level Design|------|----------|-------|----------|--------------|

│   ├── PRD_LivPulse.md    # Product Requirements| Admin | admin | admin@livpulse.com | admin123 | Full system access |

│   └── LivPulse_101.md    # User Guide| Executive | executive1 | exec@livpulse.com | exec123 | Reports & analytics |

├── .github/workflows/      # CI/CD pipelines| PM | pm1 | pm@livpulse.com | pm123 | Project management |

└── package.json           # Monorepo scripts| TPM | tpm1 | tpm@livpulse.com | tpm123 | Technical oversight |

```| EM | em1 | em@livpulse.com | em123 | Engineering management |

| SRE | sre1 | sre@livpulse.com | sre123 | Infrastructure & monitoring |

## 🔐 Authentication System

## 🏗️ Architecture

### User Roles & Access Control

- **Backend**: Node.js + Express + TypeScript (Port 3001)

| Role | Email | Password | Access Level |- **Frontend**: React + Material-UI + TypeScript (Port 3000)

|------|-------|----------|-------------|- **Database**: Mock data (easily replaceable with real DB)

| **Admin** | admin@livpulse.com | admin123 | Full system access |- **Authentication**: JWT-based with role permissions

| **Executive** | executive@livpulse.com | executive123 | Executive dashboards |- **Security**: bcrypt password hashing, CORS, Helmet.js

| **Program Manager** | pm@livpulse.com | pm123 | Program management |

| **Tech PM** | tpm@livpulse.com | tpm123 | Technical oversight |## 📊 Enhanced Features

| **Engineering Manager** | em@livpulse.com | em123 | Engineering metrics |

| **SRE** | sre@livpulse.com | sre123 | Operations monitoring |### Core Platform

- Multi-tab reporting (Platform, Backend, Ops, Store, CMS)

## 🚀 Quick Start- Executive vs Technical dashboards

- PDF report generation with custom templates

### Local Development- Real-time metrics and alerts



```bash### Admin Module

# Clone the repository- **User Management**: Create, edit, delete users with validation

git clone https://github.com/vasistasandeep/LivPulse.git- **Advanced Search**: Filter by role, department, status, name

cd LivPulse- **Analytics Dashboard**: User distribution, activity metrics

- **Role Management**: 6-tier permission system

# Install backend dependencies- **Security Features**: Password reset, account management

cd backend && npm install

### KPI Module

# Install frontend dependencies  - **Dashboard Builder**: Drag-and-drop dashboard creation

cd ../frontend && npm install- **Widget Library**: 5 widget types with customization

- **Data Sources**: Connect external APIs and data sources

# Start backend (in backend directory)- **Real-time Updates**: Configurable refresh intervals

npm run dev- **Permission System**: Role-based dashboard access



# Start frontend (in frontend directory, new terminal)## 🌐 API Endpoints

npm start

```### Authentication

- `POST /api/auth/login` - User authentication

### Production URLs- `POST /api/auth/register` - User registration



**Frontend:** https://livpulse.up.railway.app### Admin Management

**Backend API:** https://livpulse-production-backend.up.railway.app- `GET /api/admin/users` - Get users with pagination & filtering

- `POST /api/admin/users` - Create new user

## 🛠️ Technology Stack- `PUT /api/admin/users/:id` - Update user

- `DELETE /api/admin/users/:id` - Delete user

### Frontend- `GET /api/admin/roles` - Get available roles

- React 18 + TypeScript- `GET /api/admin/analytics/users` - User analytics

- Material-UI (MUI)- `POST /api/admin/users/:id/reset-password` - Reset password

- React Router v6

- Axios for API calls### KPI Management

- `GET /api/kpi/dashboards` - Get dashboards

### Backend  - `POST /api/kpi/dashboards` - Create dashboard

- Node.js + Express.js- `GET /api/kpi/widgets` - Get widgets

- TypeScript- `POST /api/kpi/widgets` - Create widget

- JWT Authentication- `GET /api/kpi/data-sources` - Get data sources

- Puppeteer for PDF generation- `GET /api/kpi/analytics` - KPI analytics

- OpenAI API integration

## 🚂 Railway Deployment

### Deployment

- **Frontend:** Vercel (auto-deploy from main branch)### Backend Deployment

- **Backend:** Railway (auto-deploy from main branch)1. Connect your GitHub repository to Railway

2. Deploy from the root directory

## 📚 Documentation3. Railway will auto-detect Node.js and use the railway.toml configuration

4. Environment variables are automatically configured

- **[High-Level Design](./docs/HLD_LivPulse.md)** - Technical architecture

- **[Product Requirements](./docs/PRD_LivPulse.md)** - Feature specifications  ### Configuration Files

- **[User Guide](./docs/LivPulse_101.md)** - End-user documentation- `railway.toml` - Railway deployment configuration

- `package.json` - Dependencies and build scripts

## 🔧 Environment Configuration- `tsconfig.json` - TypeScript configuration



### Backend (.env)## 📝 Environment Variables

```bash

NODE_ENV=production### Backend (.env)

PORT=8000```

JWT_SECRET=your-jwt-secretNODE_ENV=production

OPENAI_API_KEY=your-openai-keyPORT=3001

```JWT_SECRET=your-super-secret-jwt-key

FRONTEND_URL=https://your-frontend-domain.com

### Frontend (.env.production)```

```bash

REACT_APP_API_URL=https://livpulse-production-backend.up.railway.app/api## 🧪 Testing

```

### API Testing

## 🎯 Core Features- Interactive test dashboard available at `/api-test.html`

- All endpoints documented with examples

- **🔐 Role-Based Authentication** - 6-tier access control system- Health check endpoint: `/health`

- **📊 Dynamic KPI Dashboards** - Real-time metrics and visualizations  

- **👥 User Management** - Complete CRUD operations with audit trails### Local Testing

- **📈 Platform Analytics** - Multi-platform performance tracking```bash

- **🤖 AI Integration** - Intelligent insights and automated reporting# Run backend

- **📄 PDF Reports** - Custom template-based report generationnpm start



## 🌐 API Endpoints# Test endpoints

curl http://localhost:3001/health

### Authenticationcurl http://localhost:3001/api/admin/users

- `POST /api/auth/login` - User authenticationcurl http://localhost:3001/api/kpi/dashboards

- `GET /api/auth/me` - Get current user```

- `POST /api/auth/logout` - User logout

## 🔧 Development

### Dashboard & KPIs

- `GET /api/dashboard` - Dashboard data### Project Structure

- `GET /api/kpis` - KPI metrics```

src/

### Platform Management├── routes/           # API route handlers

- `GET /api/platform` - Platform overview│   ├── adminRoutes.ts    # Admin management APIs

- `POST /api/platform/update` - Update settings│   ├── kpiRoutes.ts      # KPI dashboard APIs

│   ├── authRoutes.ts     # Authentication APIs

### Reports│   └── ...

- `GET /api/reports` - List reports├── services/         # Business logic services

- `POST /api/reports/generate` - Generate new report├── utils/           # Utility functions

- `GET /api/reports/:id/pdf` - Download PDF└── app.ts          # Express application setup

```

## 🤝 Contributing

### Adding New Features

1. Fork the repository1. Create route handlers in `src/routes/`

2. Create feature branch (`git checkout -b feature/amazing-feature`)2. Add business logic in `src/services/`

3. Commit changes (`git commit -m 'Add amazing feature'`)3. Update type definitions

4. Push to branch (`git push origin feature/amazing-feature`)4. Add API endpoints to `app.ts`

5. Open Pull Request5. Test with the API test dashboard



## 📝 License## 🚀 Production Ready Features



MIT License - see [LICENSE](LICENSE) file for details.- ✅ **Security**: JWT authentication, password hashing, CORS protection

- ✅ **Scalability**: Pagination, efficient filtering, modular architecture

---- ✅ **Performance**: Optimized queries, caching strategy ready

- ✅ **Monitoring**: Health checks, error handling, logging

**LivPulse v2.0** - Empowering OTT platforms with intelligent management solutions.- ✅ **Documentation**: Comprehensive API documentation
- ✅ **Testing**: Interactive test interface included

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001/api
```
