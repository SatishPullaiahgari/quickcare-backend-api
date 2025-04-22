import bcyptjs from 'bcryptjs';
import { db } from '../../config.db/mySQLconnect';
import { generateToken } from '../utils/generate-jwt-token';

export const loginUserService = async (
  username: string,
  email: string,
  password: string,
  role: string
) => {
  const [rows]: any = await db.query(
    `SELECT * FROM users WHERE (username = ? OR email = ?) AND role = ?`,
    [username, email, role]
  );

  if (rows.length === 0) {
    throw new Error('User with this role not found');
  }

  const user = rows[0];
  const isMatch = await bcyptjs.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  const token = generateToken({
    id: user.user_id,
    username: user.username,
    email: user.email,
    role: user.role,
  });

  return {
    token: `Bearer ${token}`,
    role: user.role,
    id: user.user_id,
  };
};
