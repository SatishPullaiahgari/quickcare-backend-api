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
exports.login = void 0;
const auth_login_1 = require("../../services/auth-login");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, role } = req.body;
        if (!username && !email || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const result = yield (0, auth_login_1.loginUserService)(username, email, password, role);
        return res.status(200).json({
            message: 'User logged in successfully',
            token: result.token,
            id: result.id,
            role: result.role,
        });
    }
    catch (err) {
        console.error(err);
        if (err.message === 'User with this role not found') {
            return res.status(404).json({ message: 'User not found' });
        }
        if (err.message === 'Invalid password') {
            return res.status(400).json({ message: 'Invalid password' });
        }
        return res.status(500).json({ error: 'Server error' });
    }
});
exports.login = login;
