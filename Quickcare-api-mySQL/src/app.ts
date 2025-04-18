// src/app.ts
import express from 'express';
import cors from 'cors';
import { authRoutes } from './common/routes/auth-routes';
import { patientRoutes } from './patient/routes/patient-routes';
import { adminRoutes } from './admin/routes/admin-rotes';



const app = express();

// Middleware
app.use(cors());              // Allow frontend to connect
app.use(express.json());      // Parse JSON bodies

// Routes
app.use("/healthcare/auth", authRoutes);
app.use("/healthcare/patient", patientRoutes);
app.use("/healthcare/admin", adminRoutes);


export default app;
