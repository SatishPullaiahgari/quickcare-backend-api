import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = 'QUICKCARE-API'; // Replace with your secret key

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    res.status(403).json({ error: 'No token provided' });
    return; // Forbidden if no token
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as any;
    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role, // Ensure 'role' is included
    };
    next(); // Proceed to next middleware/route
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return; // Unauthorized if token is invalid
  }
};
