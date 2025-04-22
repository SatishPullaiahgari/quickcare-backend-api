import bcyptjs from 'bcryptjs';
import { db } from '../../config.db/mySQLconnect';
import { generateId } from '../utils/generateIds';
import { generateToken } from '../utils/generate-jwt-token';

// Use the CustomError class
class CustomError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const registerUserService = async (username: string, email: string, password: string, role: string) => {
  // Check if user already exists with the same role
  const [existingUser]: any = await db.query(
    `SELECT * FROM users WHERE (username = ? OR email = ?) AND role = ?`,
    [username, email, role]
  );

  if (existingUser.length > 0) {
    if (existingUser[0].username === username) {
      // Throw custom error with a code
      throw new CustomError('Username already registered under this role', 'USERNAME_ALREADY_REGISTERED');
    }
    if (existingUser[0].email === email) {
      // Throw custom error with a code
      throw new CustomError('Email already registered under this role', 'EMAIL_ALREADY_REGISTERED');
    }
  }

  // Hash password
  const hashedPassword = await bcyptjs.hash(password, 10);

  // Generate unique user ID
  const [rows]: any = await db.query(`SELECT COUNT(*) as count FROM users WHERE role = ?`, [role]);
  const nextId = rows[0].count + 1;
  const idPrefix = role === 'doctor' ? 'DOC' : role === 'admin' ? 'ADM' : 'PAT';
  const generatedId = generateId(idPrefix, nextId);

  // Insert into users table
  await db.query(
    `INSERT INTO users (user_id, username, email, password, role) VALUES (?, ?, ?, ?, ?)`,
    [generatedId, username, email, hashedPassword, role]
  );
  
  // Generate JWT token
  const token = generateToken({ id: generatedId, username, email, role });

  return {
    message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
    token: `Bearer ${token}`,
    id: generatedId,
    role: role,
  };
};
