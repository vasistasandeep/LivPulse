# LivPulse Changelog

## v1.1.0 - Clean Structure & Updated Dependencies

### 🧹 **Major Cleanup**
- **Removed deprecated folder structure** - Eliminated confusing `ott-program-reporting` nested folder
- **Updated to root-level structure** - Clean `/backend` and `/frontend` folders in LivPulse root
- **Removed old deprecated packages** to eliminate npm warnings

### 📦 **Updated Dependencies**

#### Backend
- ✅ **Removed deprecated packages**: `multer@1.4.5-lts.2`, `moment`, `pg`, `mongoose`, `csv-parser`, `xlsx`
- ✅ **Updated to latest versions**: `puppeteer@22.0.0`, `helmet@7.1.0`, `openai@4.20.0`
- ✅ **Replaced moment with dayjs** - Modern, lightweight date library
- ✅ **Simplified dependencies** - Only essential packages for OTT reporting

#### Frontend  
- ✅ **Upgraded React Query** - `react-query@3.39.3` → `@tanstack/react-query@5.8.0`
- ✅ **Updated Material-UI** - `@mui/material@5.15.0`, `@mui/icons-material@5.15.0`
- ✅ **Updated TypeScript** - `typescript@5.3.0`
- ✅ **Updated web-vitals** - `web-vitals@3.5.0`
- ✅ **Removed unused dev dependencies**

### 🔧 **Code Updates**
- ✅ **Updated React Query syntax** - Migrated to v5 object-based API
- ✅ **Fixed TypeScript configuration** - Relaxed strict mode for faster development
- ✅ **Updated all import statements** - New @tanstack/react-query imports

### 🚀 **Deployment Ready**
- ✅ **Railway configuration files** - Optimized for deployment
- ✅ **Clean folder structure** - No more nested confusion
- ✅ **Environment files** - Proper .env setup for both backend and frontend
- ✅ **Updated .gitignore** - Excludes old folders and unnecessary files

### 🎯 **Benefits**
- **No more npm warnings** - All deprecated packages removed
- **Faster installs** - Fewer, more focused dependencies  
- **Better performance** - Latest package versions with optimizations
- **Cleaner codebase** - Simplified structure for easier maintenance
- **Railway deployment ready** - Optimized configuration

### 🔄 **Migration Notes**
- Old `ott-program-reporting` folder removed
- All code moved to clean `/backend` and `/frontend` structure
- React Query updated to v5 syntax (object-based configuration)
- No breaking changes to functionality - all features preserved
