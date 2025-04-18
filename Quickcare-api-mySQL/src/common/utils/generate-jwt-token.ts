import jwt from 'jsonwebtoken';

const SECRET_KEY = 'QUICKCARE-API'; // Make sure to use a secure secret key

export const generateToken = (payload: { id: string; username: string; email: string; role: string }) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token expiration in 1 hour
};
