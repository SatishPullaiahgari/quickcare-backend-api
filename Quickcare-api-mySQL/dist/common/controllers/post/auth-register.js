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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const auth_register_1 = require("../../services/auth-register");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const result = yield (0, auth_register_1.registerUserService)(username, email, password, role);
        return res.status(200).json({
            message: 'User registered successfully',
            token: result.token,
            id: result.id,
            role: result.role,
        });
    }
    catch (err) {
        // Check for custom error codes thrown from the service
        if (err.code === 'USERNAME_ALREADY_REGISTERED' || err.code === 'EMAIL_ALREADY_REGISTERED') {
            return res.status(400).json({ message: 'Username or email already registered under this role' });
        }
        // Generic error for other cases
        return res.status(500).json({ error: 'Server error' });
    }
});
exports.register = register;
