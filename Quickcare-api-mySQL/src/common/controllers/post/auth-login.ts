import { Request, Response } from 'express';
import { loginUserService } from '../../services/auth-login';

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, password, role } = req.body;
    
    if (!username && !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await loginUserService(username, email, password, role);

    return res.status(200).json({
      message: 'User logged in successfully',
      token: result.token, 
      id: result.id, 
      role: result.role,
    });
  } catch (err: any) {
    console.error(err);
    
    if (err.message === 'User with this role not found') {
      return res.status(404).json({ message: 'User not found' });
    }
    if (err.message === 'Invalid password') {
      return res.status(400).json({ message: 'Invalid password' });
    }
    
    return res.status(500).json({ error: 'Server error' });
  }
};
