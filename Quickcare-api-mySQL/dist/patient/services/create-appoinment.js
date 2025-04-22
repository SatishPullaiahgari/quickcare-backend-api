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
exports.createAppointmentService = void 0;
const mySQLconnect_1 = require("../../config.db/mySQLconnect");
const createAppointmentService = (user_id, firstname, lastname, gender, mobile, address, email, dob, consultant_doctor, injury_or_concern_note, appointment_date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield mySQLconnect_1.db.query('INSERT INTO appointments (user_id, firstname, lastname, gender, mobile, address, email, dob, consultant_doctor, injury_or_concern_note, appointment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            user_id,
            firstname,
            lastname,
            gender,
            mobile,
            address,
            email,
            dob,
            consultant_doctor,
            injury_or_concern_note,
            appointment_date,
        ]);
        // Return the created appointment
        return {
            id: rows.insertId,
            user_id,
            firstname,
            lastname,
            gender,
            mobile,
            address,
            email,
            dob,
            consultant_doctor,
            injury_or_concern_note,
            appointment_date,
            status: 'PENDING',
        };
    }
    catch (err) {
        console.error('MySQL Error:', err); // <- This is what you need
        throw new Error('Error creating appointment');
    }
});
exports.createAppointmentService = createAppointmentService;
