"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrescriptionPDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generatePrescriptionPDF = (prescription) => {
    const doc = new pdfkit_1.default();
    const filePath = path_1.default.join(__dirname, `../../prescriptions/${prescription.prescription_id}.pdf`);
    doc.pipe(fs_1.default.createWriteStream(filePath));
    doc.fontSize(16).text(`Prescription ID: ${prescription.prescription_id}`, { align: 'center' });
    doc.text(`Patient ID: ${prescription.user_id}`, { align: 'center' });
    doc.text(`Doctor ID: ${prescription.doctor_id}`, { align: 'center' });
    doc.text(`Medication: ${prescription.medication}`, { align: 'left' });
    doc.text(`Dosage: ${prescription.dosage}`, { align: 'left' });
    doc.text(`Instructions: ${prescription.instructions}`, { align: 'left' });
    doc.end();
    return filePath;
};
exports.generatePrescriptionPDF = generatePrescriptionPDF;
