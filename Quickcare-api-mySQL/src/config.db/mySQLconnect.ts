import mysql from 'mysql2/promise';

// Create a MySQL connection pool
export const db = mysql.createPool({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'satishP1.@', // Your MySQL password
  database: 'quickcare', // Your MySQL database name
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0
});
