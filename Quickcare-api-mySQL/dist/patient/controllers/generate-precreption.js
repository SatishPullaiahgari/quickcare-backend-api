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
exports.createPrescription = void 0;
const generate_precrition_1 = require("../services/generate-precrition");
const generate_precription_1 = require("../utils/generate-pdf/generate-precription");
const createPrescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || req.user.role !== 'doctor') {
            return res.status(403).json({ error: 'Only doctors can create prescriptions' });
        }
        const { user_id, medication, dosage, instructions } = req.body;
        if (!user_id || !medication || !dosage) {
            return res.status(400).json({ error: 'User ID, medication, and dosage are required' });
        }
        const prescription = yield (0, generate_precrition_1.createPrescriptionService)(user_id, req.user.id, medication, dosage, instructions);
        const pdfPath = (0, generate_precription_1.generatePrescriptionPDF)(prescription);
        return res.status(201).json({
            message: 'Prescription created successfully',
            prescription: Object.assign(Object.assign({}, prescription), { pdf_url: `/prescriptions/${prescription.prescription_id}.pdf` }),
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});
exports.createPrescription = createPrescription;
