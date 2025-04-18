import { Request, Response } from 'express';
import { registerUserService } from '../../services/auth-register';

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await registerUserService(username, email, password, role);

    return res.status(200).json({
      message: 'User registered successfully',
      token: result.token,
      id: result.id,
      role: result.role,
    });

  } catch (err: any) {
    // Check for custom error codes thrown from the service
    if (err.code === 'USERNAME_ALREADY_REGISTERED' || err.code === 'EMAIL_ALREADY_REGISTERED') {
      return res.status(400).json({ message: 'Username or email already registered under this role' });
    }

    // Generic error for other cases
    return res.status(500).json({ error: 'Server error' });
  }
};
