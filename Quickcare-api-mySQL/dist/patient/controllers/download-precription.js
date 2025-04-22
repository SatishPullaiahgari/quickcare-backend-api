"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadPrescriptionPDF = void 0;
const path_1 = __importDefault(require("path"));
const downloadPrescriptionPDF = (req, res) => {
    const { prescription_id } = req.params;
    const filePath = path_1.default.resolve(__dirname, '..', '..', 'patient', 'prescriptions', `${prescription_id}.pdf`);
    console.log(`Looking for file at: ${filePath}`);
    res.download(filePath, (err) => {
        if (err) {
            console.error('Error during file download:', err);
            res.status(404).json({ error: 'File not found' });
        }
    });
};
exports.downloadPrescriptionPDF = downloadPrescriptionPDF;
