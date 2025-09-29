import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Mock users database (in production, use a real database)
const users = [
  {
    id: 1,
    email: 'admin@livpulse.com',
    password: '$2a$10$rOzJqKqK5rKqK5rKqK5rKOzJqKqK5rKqK5rKqK5rKOzJqKqK5rKqK5', // password: admin123
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: 2,
    email: 'executive@livpulse.com',
    password: '$2a$10$rOzJqKqK5rKqK5rKqK5rKOzJqKqK5rKqK5rKqK5rKOzJqKqK5rKqK5', // password: executive123
    role: 'executive',
    name: 'Executive User'
  },
  {
    id: 3,
    email: 'pm@livpulse.com',
    password: '$2a$10$rOzJqKqK5rKqK5rKqK5rKOzJqKqK5rKqK5rKqK5rKOzJqKqK5rKqK5', // password: pm123
    role: 'pm',
    name: 'Program Manager'
  },
  {
    id: 4,
    email: 'tpm@livpulse.com',
    password: '$2a$10$rOzJqKqK5rKqK5rKqK5rKOzJqKqK5rKqK5rKqK5rKOzJqKqK5rKqK5', // password: tpm123
    role: 'tpm',
    name: 'Technical Program Manager'
  },
  {
    id: 5,
    email: 'em@livpulse.com',
    password: '$2a$10$rOzJqKqK5rKqK5rKqK5rKOzJqKqK5rKqK5rKqK5rKOzJqKqK5rKqK5', // password: em123
    role: 'em',
    name: 'Engineering Manager'
  },
  {
    id: 6,
    email: 'sre@livpulse.com',
    password: '$2a$10$rOzJqKqK5rKqK5rKqK5rKOzJqKqK5rKqK5rKqK5rKOzJqKqK5rKqK5', // password: sre123
    role: 'sre',
    name: 'Site Reliability Engineer'
  }
];

/**
 * POST /api/auth/login
 * User login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // For demo purposes, accept any password that matches the pattern
    // In production, use proper password hashing
    const validPasswords = {
      'executive@company.com': 'executive123',
      'pm@company.com': 'pm123',
      'sre@company.com': 'sre123'
    };

    if (password !== validPasswords[email as keyof typeof validPasswords]) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
});

/**
 * POST /api/auth/register
 * User registration (for demo purposes)
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role = 'pm' } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        error: 'Email, password, and name are required'
      });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      role,
      name
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        email: newUser.email, 
        role: newUser.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role
        }
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed'
    });
  }
});

/**
 * GET /api/auth/me
 * Get current user info
 */
router.get('/me', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === (req as any).user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user info'
    });
  }
});

/**
 * POST /api/auth/logout
 * User logout (client-side token removal)
 */
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

/**
 * Middleware to authenticate JWT token
 */
function authenticateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err: any, user: any) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }

    (req as any).user = user;
    next();
  });
}

export { authenticateToken };
export default router;
