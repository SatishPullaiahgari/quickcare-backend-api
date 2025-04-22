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
exports.loginUserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mySQLconnect_1 = require("../../config.db/mySQLconnect");
const generate_jwt_token_1 = require("../utils/generate-jwt-token");
const loginUserService = (username, email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield mySQLconnect_1.db.query(`SELECT * FROM users WHERE (username = ? OR email = ?) AND role = ?`, [username, email, role]);
    if (rows.length === 0) {
        throw new Error('User with this role not found');
    }
    const user = rows[0];
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }
    const token = (0, generate_jwt_token_1.generateToken)({
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
});
exports.loginUserService = loginUserService;
