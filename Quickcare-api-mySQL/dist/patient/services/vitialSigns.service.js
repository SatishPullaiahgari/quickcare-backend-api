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
exports.getAllVitalSigns = exports.getRecentVitalSigns = exports.saveVitalSigns = void 0;
const mySQLconnect_1 = __importDefault(require("../../config.db/mySQLconnect"));
// Save average vital signs
const saveVitalSigns = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { patient_id, resting_heart_rate, performance_heart_rate } = data;
    const [result] = yield mySQLconnect_1.default.execute(`INSERT INTO vital_signs (patient_id, resting_heart_rate, performance_heart_rate) 
     VALUES (?, ?, ?)`, [patient_id, resting_heart_rate, performance_heart_rate]);
    return Object.assign({ id: result.insertId }, data);
});
exports.saveVitalSigns = saveVitalSigns;
// Get last 7 vital signs (for chart)
const getRecentVitalSigns = (patient_id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield mySQLconnect_1.default.execute(`SELECT resting_heart_rate, performance_heart_rate, recorded_at 
     FROM vital_signs 
     WHERE patient_id = ? 
     ORDER BY recorded_at DESC 
     LIMIT 7`, [patient_id]);
    if (!rows.length)
        return null;
    const ordered = rows.reverse(); // oldest first
    const restingValues = ordered.map((row) => row.resting_heart_rate);
    const performanceValues = ordered.map((row) => row.performance_heart_rate);
    const timeLabels = ordered.map((row) => {
        const date = new Date(row.recorded_at);
        const day = date.toLocaleString('en-US', { weekday: 'short' });
        const time = date.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).replace(/\s/, ' ');
        return `${day}(${time})`;
    });
    const avg = (arr) => arr.length ? parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)) : 0;
    return {
        resting_heart_data: {
            data: restingValues,
            time: timeLabels,
            average: avg(restingValues),
        },
        performance_heart_data: {
            data: performanceValues,
            time: timeLabels,
            average: avg(performanceValues),
        },
    };
});
exports.getRecentVitalSigns = getRecentVitalSigns;
// Get all vital signs (for POST response)
const getAllVitalSigns = (patient_id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield mySQLconnect_1.default.execute(`SELECT resting_heart_rate, performance_heart_rate, recorded_at 
     FROM vital_signs 
     WHERE patient_id = ? 
     ORDER BY recorded_at DESC`, [patient_id]);
    if (!rows.length)
        return null;
    const ordered = rows.reverse(); // oldest first
    const restingValues = ordered.map((row) => row.resting_heart_rate);
    const performanceValues = ordered.map((row) => row.performance_heart_rate);
    const timeLabels = ordered.map((row) => {
        const date = new Date(row.recorded_at);
        const formatted = date.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).replace(/(\d{2}) (\w{3}) (\d{4})/, '$1 $2, $3'); // Format: 29 Apr, 2025 12:00 PM
        return formatted;
    });
    const avg = (arr) => arr.length ? parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)) : 0;
    return {
        resting_heart_data: {
            data: restingValues,
            time: timeLabels,
            average: avg(restingValues),
        },
        performance_heart_data: {
            data: performanceValues,
            time: timeLabels,
            average: avg(performanceValues),
        },
    };
});
exports.getAllVitalSigns = getAllVitalSigns;
