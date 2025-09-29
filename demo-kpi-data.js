// KPI Demo Data Population Script
// Run this in your browser console when logged in as admin

const API_BASE = 'http://localhost:3001/api/kpi';

// Get auth token from localStorage
const token = localStorage.getItem('token');
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

async function populateKPIData() {
  console.log('🚀 Starting KPI demo data population...');

  try {
    // 1. Create Data Sources
    console.log('📊 Creating data sources...');
    
    const salesDataSource = await fetch(`${API_BASE}/data-sources`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: "Sales Performance",
        type: "mock",
        description: "Monthly sales data",
        config: {
          mockData: [
            { month: "Jan", sales: 45000, growth: 15, customers: 120 },
            { month: "Feb", sales: 52000, growth: 25, customers: 145 },
            { month: "Mar", sales: 48000, growth: 18, customers: 135 },
            { month: "Apr", sales: 58000, growth: 30, customers: 160 },
            { month: "May", sales: 62000, growth: 35, customers: 175 },
            { month: "Jun", sales: 68000, growth: 40, customers: 190 }
          ]
        },
        fields: [
          { name: "month", type: "string" },
          { name: "sales", type: "number" },
          { name: "growth", type: "number" },
          { name: "customers", type: "number" }
        ]
      })
    });

    const platformDataSource = await fetch(`${API_BASE}/data-sources`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: "Platform Metrics",
        type: "mock", 
        description: "Platform performance indicators",
        config: {
          mockData: [
            { metric: "Active Users", value: 15420, change: 12.5, status: "good" },
            { metric: "Server Uptime", value: 99.8, change: 0.2, status: "excellent" },
            { metric: "Response Time", value: 145, change: -8.3, status: "good" },
            { metric: "Error Rate", value: 0.05, change: -15.2, status: "excellent" },
            { metric: "Storage Used", value: 78.5, change: 5.2, status: "warning" }
          ]
        },
        fields: [
          { name: "metric", type: "string" },
          { name: "value", type: "number" },
          { name: "change", type: "number" },
          { name: "status", type: "string" }
        ]
      })
    });

    console.log('✅ Data sources created');

    // 2. Create Widgets
    console.log('🎯 Creating widgets...');

    const salesChart = await fetch(`${API_BASE}/widgets`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        type: "chart",
        title: "Monthly Sales Trend",
        description: "Sales performance over the last 6 months",
        dataSource: "sales-performance",
        config: {
          chartType: "line",
          dataKeys: ["sales"],
          colors: ["#2196F3"],
          showLegend: true,
          showAxes: true,
          refreshInterval: 300
        },
        position: { x: 0, y: 0, w: 6, h: 4 },
        permissions: ["admin", "executive", "pm"]
      })
    });

    const customerMetric = await fetch(`${API_BASE}/widgets`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        type: "metric",
        title: "Total Customers",
        description: "Current customer count",
        dataSource: "sales-performance", 
        config: {
          format: "number",
          threshold: { warning: 100, critical: 50 },
          refreshInterval: 60
        },
        position: { x: 6, y: 0, w: 3, h: 2 },
        permissions: ["admin", "executive"]
      })
    });

    const platformGauge = await fetch(`${API_BASE}/widgets`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        type: "gauge",
        title: "Server Uptime",
        description: "Platform availability percentage",
        dataSource: "platform-metrics",
        config: {
          format: "percentage",
          threshold: { warning: 95, critical: 90 },
          colors: ["#4CAF50", "#FF9800", "#F44336"]
        },
        position: { x: 9, y: 0, w: 3, h: 3 },
        permissions: ["admin", "sre", "em"]
      })
    });

    console.log('✅ Widgets created');

    // 3. Create Dashboard
    console.log('📋 Creating dashboard...');

    const dashboard = await fetch(`${API_BASE}/dashboards`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: "Executive Overview",
        description: "High-level platform and business metrics",
        category: "executive",
        isPublic: false,
        widgets: ["monthly-sales-trend", "total-customers", "server-uptime"],
        layout: {
          cols: 12,
          rows: 8,
          margin: [10, 10],
          autoSize: true
        },
        permissions: {
          view: ["admin", "executive", "pm"],
          edit: ["admin"]
        }
      })
    });

    console.log('✅ Dashboard created');
    console.log('🎉 Demo KPI data population completed!');
    console.log('📍 Go to the KPI Dashboards page to see your data');

  } catch (error) {
    console.error('❌ Error populating data:', error);
  }
}

// Run the population
populateKPIData();