"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserService = void 0;
const bcyptjs_1 = __importDefault(require("bcyptjsjs"));
const mySQLconnect_1 = require("../../config.db/mySQLconnect");
const generateIds_1 = require("../utils/generateIds");
const generate_jwt_token_1 = require("../utils/generate-jwt-token");
// Use the CustomError class
class CustomError extends Error {
    constructor(message, code) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
const registerUserService = (username, email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user already exists with the same role
    const [existingUser] = yield mySQLconnect_1.db.query(`SELECT * FROM users WHERE (username = ? OR email = ?) AND role = ?`, [username, email, role]);
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
    const hashedPassword = yield bcyptjs_1.default.hash(password, 10);
    // Generate unique user ID
    const [rows] = yield mySQLconnect_1.db.query(`SELECT COUNT(*) as count FROM users WHERE role = ?`, [role]);
    const nextId = rows[0].count + 1;
    const idPrefix = role === 'doctor' ? 'DOC' : role === 'admin' ? 'ADM' : 'PAT';
    const generatedId = (0, generateIds_1.generateId)(idPrefix, nextId);
    // Insert into users table
    yield mySQLconnect_1.db.query(`INSERT INTO users (user_id, username, email, password, role) VALUES (?, ?, ?, ?, ?)`, [generatedId, username, email, hashedPassword, role]);
    // Generate JWT token
    const token = (0, generate_jwt_token_1.generateToken)({ id: generatedId, username, email, role });
    return {
        message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
        token: `Bearer ${token}`,
        id: generatedId,
        role: role,
    };
});
exports.registerUserService = registerUserService;
