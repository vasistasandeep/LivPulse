const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'LivPulse Backend is running',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@livpulse.com' && password === 'admin123') {
    res.json({
      status: 'success',
      token: 'test-token-123',
      user: {
        email: 'admin@livpulse.com',
        role: 'admin',
        name: 'Admin User'
      }
    });
  } else {
    res.status(401).json({
      status: 'error',
      message: 'Invalid credentials'
    });
  }
});

app.listen(port, () => {
  console.log(`LivPulse Backend running on port ${port}`);
});