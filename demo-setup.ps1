# Livpulse Quick Demo Setup for Windows
# =====================================

Write-Host "🚀 Livpulse Quick Demo Setup" -ForegroundColor Green
Write-Host "============================" -ForegroundColor Green

Write-Host "`n📋 Demo Options:" -ForegroundColor Yellow

Write-Host "`n1️⃣ FASTEST - Local Demo (2 minutes setup)" -ForegroundColor Cyan
Write-Host "   Backend: npm start" -ForegroundColor White  
Write-Host "   Frontend: cd frontend && set PORT=3003 && npm start" -ForegroundColor White
Write-Host "   Demo URL: http://localhost:3003" -ForegroundColor Green

Write-Host "`n2️⃣ Cloud Deploy - Vercel Frontend + Local Backend" -ForegroundColor Cyan
Write-Host "   1. npm i -g vercel" -ForegroundColor White
Write-Host "   2. cd frontend && vercel --prod" -ForegroundColor White
Write-Host "   3. Start local backend: npm start" -ForegroundColor White

Write-Host "`n3️⃣ Full Cloud - Render.com Backend + Vercel Frontend" -ForegroundColor Cyan
Write-Host "   1. Deploy backend to Render.com" -ForegroundColor White
Write-Host "   2. Deploy frontend to Vercel with backend URL" -ForegroundColor White

Write-Host "`n🚀 Ready to start your demo! Choose option 1 for immediate results." -ForegroundColor Green

# Uncomment to auto-start local demo:
# Write-Host "`n🎬 Starting local demo..." -ForegroundColor Yellow
# Start-Process powershell -ArgumentList "cd '$PWD'; npm start"
# Start-Sleep 5
# Start-Process powershell -ArgumentList "cd '$PWD\frontend'; `$env:PORT='3003'; npm start"
# Write-Host "Demo will be available at http://localhost:3003" -ForegroundColor Green