import dotenv from 'dotenv';
import app from './app';

// Load environment variables
dotenv.config();

const PORT = parseInt(process.env.PORT || '3001', 10);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Livpulse Backend running on port ${PORT}`);
  console.log(`📊 Dashboard API available at http://0.0.0.0:${PORT}/api`);
  console.log(`📈 Health check: http://0.0.0.0:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});
