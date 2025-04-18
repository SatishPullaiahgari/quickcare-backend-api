import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

interface BillDetails {
  bill_no: string;
  admission_id: string;
  patient_name: string;
  doctor_name: string;
  admit_date: string;
  discharge_date: string;
  discount: number;
  total_amount: number;
  final_amount: number;
  payment_method: string;
  payment_status: string;
}

export const generateBillPDF = (details: BillDetails): string => {
  const billsDir = path.resolve(__dirname, '..', 'uploads', 'bills');
  
  // Ensure the bills directory exists
  if (!fs.existsSync(billsDir)) {
    fs.mkdirSync(billsDir, { recursive: true });
  }

  const doc = new PDFDocument();
  const filePath = path.join(billsDir, `${details.bill_no}.pdf`);
  doc.pipe(fs.createWriteStream(filePath));

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
