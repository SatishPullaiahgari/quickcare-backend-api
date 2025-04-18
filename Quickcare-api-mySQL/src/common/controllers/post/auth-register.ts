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
      message: 'User registered',
      token: result.token, 
      id: result.id, 
      role: result.role,
    });
  } catch (err: any) {
    console.error(err);
  
    if (err.message === 'Username already registered') {
      return res.status(400).json({ message: 'Username or email is already taken or registered' });
    }
    if (err.message === 'Email already registered') {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    return res.status(500).json({ error: 'Server error' });
  }
};
