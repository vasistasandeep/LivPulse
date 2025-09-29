#!/bin/bash

echo "🚀 Livpulse Quick Deploy Script"
echo "================================"

# Option 1: Deploy to Heroku
echo "Option 1: Heroku Backend Deployment"
echo "1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli"
echo "2. Run: heroku login"
echo "3. Run: heroku create livpulse-backend-demo"
echo "4. Run: git push heroku main"
echo ""

# Option 2: Deploy Frontend to Vercel
echo "Option 2: Vercel Frontend Deployment"  
echo "1. Install Vercel CLI: npm i -g vercel"
echo "2. cd frontend"
echo "3. Run: vercel --prod"
echo "4. Set environment: REACT_APP_API_URL=https://your-backend-url/api"
echo ""

# Option 3: Local Demo
echo "Option 3: Local Demo (Recommended for immediate demo)"
echo "Backend: npm start (runs on port 3001)"
echo "Frontend: cd frontend && PORT=3003 npm start"
echo "Demo URL: http://localhost:3003"
echo ""

echo "✅ Choose the option that works best for your demo!"