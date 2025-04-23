// import mysql from 'mysql2/promise';

// // Create a MySQL connection pool
// export const db = mysql.createPool({
//   host: 'localhost',
//   user: 'root', // Your MySQL username
//   password: 'satishP1.@', // Your MySQL password
//   database: 'quickcare', // Your MySQL database name
//   waitForConnections: true,
//   connectionLimit: 100,
//   queueLimit: 0
// });

// export default db;

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Create a MySQL connection pool
export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10000,
  queueLimit: 0
});

export default db;
