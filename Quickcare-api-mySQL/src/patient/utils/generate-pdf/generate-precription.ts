import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generatePrescriptionPDF = (prescription: any) => {
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, `../../prescriptions/${prescription.prescription_id}.pdf`);

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(16).text(`Prescription ID: ${prescription.prescription_id}`, { align: 'center' });
  doc.text(`Patient ID: ${prescription.user_id}`, { align: 'center' });
  doc.text(`Doctor ID: ${prescription.doctor_id}`, { align: 'center' });
  doc.text(`Medication: ${prescription.medication}`, { align: 'left' });
  doc.text(`Dosage: ${prescription.dosage}`, { align: 'left' });
  doc.text(`Instructions: ${prescription.instructions}`, { align: 'left' });

  doc.end();

  return filePath;
};
