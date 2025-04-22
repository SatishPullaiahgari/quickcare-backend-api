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
exports.createAppointment = void 0;
const create_appoinment_1 = require("../services/create-appoinment");
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { firstname, lastname, gender, mobile, address, email, dob, consultant_doctor, injury_or_concern_note, appointment_date, } = req.body;
        if (!firstname || !lastname || !gender || !mobile || !address || !email || !dob || !consultant_doctor || !appointment_date) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const result = yield (0, create_appoinment_1.createAppointmentService)(req.user.id, firstname, lastname, gender, mobile, address, email, dob, consultant_doctor, injury_or_concern_note, appointment_date);
        return res.status(200).json({
            message: 'Appointment created successfully',
            appointment: result,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});
exports.createAppointment = createAppointment;
