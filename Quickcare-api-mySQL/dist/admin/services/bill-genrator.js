"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBillPDF = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const generateBillPDF = (details) => {
    const billsDir = path_1.default.resolve(__dirname, '..', 'uploads', 'bills');
    // Ensure the bills directory exists
    if (!fs_1.default.existsSync(billsDir)) {
        fs_1.default.mkdirSync(billsDir, { recursive: true });
    }
    const doc = new pdfkit_1.default();
    const filePath = path_1.default.join(billsDir, `${details.bill_no}.pdf`);
    doc.pipe(fs_1.default.createWriteStream(filePath));
    // Add content to the PDF
    doc.fontSize(16).text(`Bill No: ${details.bill_no}`, { align: 'center' }).moveDown();
    doc.text(`Admission ID: ${details.admission_id}`).moveDown();
    doc.text(`Patient Name: ${details.patient_name}`).moveDown();
    doc.text(`Doctor Name: ${details.doctor_name}`).moveDown();
    doc.text(`Admit Date: ${details.admit_date}`).moveDown();
    doc.text(`Discharge Date: ${details.discharge_date}`).moveDown();
    doc.text(`Discount: ${details.discount}%`).moveDown();
    doc.text(`Total Amount: ₹${details.total_amount}`).moveDown();
    doc.text(`Final Amount: ₹${details.final_amount}`).moveDown();
    doc.text(`Payment Method: ${details.payment_method}`).moveDown();
    doc.text(`Payment Status: ${details.payment_status}`).moveDown();
    doc.end();
    return filePath;
};
exports.generateBillPDF = generateBillPDF;
