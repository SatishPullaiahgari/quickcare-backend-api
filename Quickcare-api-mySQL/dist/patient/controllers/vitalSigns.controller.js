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
exports.getRecentVitals = exports.createVitalSigns = void 0;
const vitialSigns_service_1 = require("../services/vitialSigns.service");
const calculateAverage = (arr) => {
    if (!arr.length)
        return 0;
    const sum = arr.reduce((a, b) => a + b, 0);
    return parseFloat((sum / arr.length).toFixed(1));
};
const createVitalSigns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient_id = "PAT000002";
        const { resting_heart_rate, performance_heart_rate } = req.body;
        if (!Array.isArray(resting_heart_rate) || resting_heart_rate.length !== 20 ||
            !Array.isArray(performance_heart_rate) || performance_heart_rate.length !== 20) {
            return res.status(400).json({
                message: 'patient_id and exactly 20 readings for both heart rate types are required.'
            });
        }
        const restingAvg = calculateAverage(resting_heart_rate);
        const performanceAvg = calculateAverage(performance_heart_rate);
        // Save averages
        const savedData = yield (0, vitialSigns_service_1.saveVitalSigns)({
            patient_id,
            resting_heart_rate: restingAvg,
            performance_heart_rate: performanceAvg
        });
        // Return all data for this patient
        const allVitals = yield (0, vitialSigns_service_1.getAllVitalSigns)(patient_id);
        return res.status(200).json({
            message: 'Vital signs recorded successfully.',
            average: {
                resting_heart_rate: restingAvg,
                performance_heart_rate: performanceAvg
            },
            data: allVitals
        });
    }
    catch (error) {
        console.error('[createVitalSigns]', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createVitalSigns = createVitalSigns;
// GET: Last 7 samples only
const getRecentVitals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patient_id } = req.query;
        if (!patient_id) {
            return res.status(400).json({ message: 'patient_id is required' });
        }
        const recentVitals = yield (0, vitialSigns_service_1.getRecentVitalSigns)(patient_id);
        // Ensure both resting and performance heart rate data arrays have values
        if (!recentVitals ||
            recentVitals.resting_heart_data.data.length === 0 ||
            recentVitals.performance_heart_data.data.length === 0) {
            return res.status(404).json({ message: 'No vital signs data found for this patient.' });
        }
        return res.status(200).json({
            message: 'Recent vital signs retrieved successfully.',
            data: recentVitals
        });
    }
    catch (error) {
        console.error('[getRecentVitals]', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getRecentVitals = getRecentVitals;
