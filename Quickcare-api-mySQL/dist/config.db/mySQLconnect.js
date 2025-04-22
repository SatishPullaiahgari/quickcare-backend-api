"use strict";
// import mysql from 'mysql2/promise';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
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
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
// Create a MySQL connection pool
exports.db = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});
exports.default = exports.db;
