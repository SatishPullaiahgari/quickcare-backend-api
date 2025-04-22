"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'QUICKCARE-API'; // Replace with your secret key
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        res.status(403).json({ error: 'No token provided' });
        return; // Forbidden if no token
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.user = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            role: decoded.role, // Ensure 'role' is included
        };
        next(); // Proceed to next middleware/route
    }
    catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return; // Unauthorized if token is invalid
    }
};
exports.verifyToken = verifyToken;
