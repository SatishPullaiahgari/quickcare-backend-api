"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBill = void 0;
const bill_genrator_1 = require("../services/bill-genrator");
const createBill = (req, res) => {
    const { bill_no, admission_id, patient_name, doctor_name, admit_date, discharge_date, discount, total_amount, payment_method, payment_status, } = req.body;
    // Validate required fields
    if (!bill_no ||
        !admission_id ||
        !patient_name ||
        !doctor_name ||
        !admit_date ||
        !discharge_date ||
        !total_amount ||
        !payment_method ||
        !payment_status) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    // Calculate the final amount after discount
    const final_amount = total_amount - (total_amount * discount) / 100;
    // Generate PDF
    const pdfBuffer = (0, bill_genrator_1.generateBillPDF)({
        bill_no,
        admission_id,
        patient_name,
        doctor_name,
        admit_date,
        discharge_date,
        discount,
        total_amount,
        final_amount,
        payment_method,
        payment_status,
    });
    // Save bill details to the database (pseudo code)
    // await Bill.create({ ... });
    // Send response
    res.status(201).json({ message: 'Bill created successfully', pdf: pdfBuffer });
};
exports.createBill = createBill;
