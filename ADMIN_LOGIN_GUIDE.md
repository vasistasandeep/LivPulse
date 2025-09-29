# 🔐 LivPulse v2.0 - Quick Login Guide

## 🚀 How to Access Admin Features

### **Step 1: Start the Application**
```bash
# Backend (Terminal 1)
cd "C:\UserData\Data\OneDrive - Sony Pictures Networks India Pvt Ltd\Desktop\micro_saas\LIVPulse"
npm start

# Frontend (Terminal 2) 
cd "C:\UserData\Data\OneDrive - Sony Pictures Networks India Pvt Ltd\Desktop\micro_saas\LIVPulse\frontend"
npm start
```

### **Step 2: Access the Login Page**
- Open browser: `http://localhost:3000`
- You'll see the **LivPulse Platform** login page

### **Step 3: Login as Admin** ⭐
**Click on the RED highlighted admin card:**
- **Email**: `admin@livpulse.com`
- **Password**: `admin123`
- **Access**: Full system + KPI Management + User Management

### **Step 4: Access Admin Features**
Once logged in, you'll see these menu options:
- **Admin Panel** (`/admin`) - User management, publishing data, dashboard data
- **KPI Dashboards** (`/kpi`) - Create and manage KPI dashboards *(NEW!)*

## 👥 All Available Demo Accounts

| **Role** | **Email** | **Password** | **Access Level** |
|----------|-----------|-------------|------------------|
| **Admin** ⭐ | **admin@livpulse.com** | **admin123** | **Full system access + Admin features** |
| Executive | executive@livpulse.com | executive123 | Reports & analytics |
| PM | pm@livpulse.com | pm123 | Project management |
| TPM | tpm@livpulse.com | tpm123 | Technical oversight |
| EM | em@livpulse.com | em123 | Engineering management |
| SRE | sre@livpulse.com | sre123 | Infrastructure & monitoring |

## 📊 Creating KPI Data

### **Option 1: Quick Demo Data (Recommended)**
1. Login as admin
2. Open browser console (F12)
3. Copy and run the script from `demo-kpi-data.js` file
4. Navigate to KPI Dashboards page

### **Option 2: Manual Creation**
1. Go to **KPI Dashboards** in the sidebar
2. **Dashboard Builder** tab:
   - Create Data Sources (mock data, API endpoints, etc.)
   - Create Widgets (charts, metrics, tables)
   - Create Dashboards and arrange widgets

## 🎯 Key Features Available for Admin

### **Admin Panel** (`/admin`)
- **Publishing Data** - Platform publishing settings
- **Dashboard Data** - Analytics configuration  
- **User Management** - Create, edit, delete users with role management
- **Settings** - System configuration

### **KPI Dashboards** (`/kpi`) *(NEW!)*
- **Dashboard Builder** - Create custom dashboards with widgets
- **View Dashboards** - Manage existing dashboards

## 🌟 What's New in v2.0
- ✅ **Admin user properly configured** with full access
- ✅ **Enhanced login page** with admin user prominently displayed
- ✅ **All emails updated** to @livpulse.com domain
- ✅ **Complete rebrand** to LivPulse throughout the application
- ✅ **KPI Dashboard Builder** fully integrated
- ✅ **Enhanced User Management** system

---

## 🚨 Quick Troubleshooting

**If login doesn't work:**
1. Make sure both backend and frontend servers are running
2. Check browser console for errors
3. Verify you're using `admin@livpulse.com` with `admin123`
4. Clear browser cache and try again

**For KPI data:**
1. Must be logged in as admin to access KPI features
2. Use the demo data script for quick setup
3. Check browser console for any API errors

---

**🎉 You're all set! The admin user is working and ready to manage both users and KPIs!**