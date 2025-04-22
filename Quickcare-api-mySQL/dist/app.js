"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = require("./common/routes/auth-routes");
const patient_routes_1 = require("./patient/routes/patient-routes");
const admin_rotes_1 = require("./admin/routes/admin-rotes");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)()); // Allow frontend to connect
app.use(express_1.default.json()); // Parse JSON bodies
// Routes
app.use("/healthcare/auth", auth_routes_1.authRoutes);
app.use("/healthcare/patient", patient_routes_1.patientRoutes);
app.use("/healthcare/admin", admin_rotes_1.adminRoutes);
exports.default = app;
