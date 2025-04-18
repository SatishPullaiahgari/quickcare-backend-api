import { Request, Response } from 'express';
import { createPrescriptionService } from '../services/generate-precrition';
import { generatePrescriptionPDF } from '../utils/generate-pdf/generate-precription';

export const createPrescription = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.user || req.user.role !== 'doctor') {
      return res.status(403).json({ error: 'Only doctors can create prescriptions' });
    }

    const { user_id, medication, dosage, instructions } = req.body;

    if (!user_id || !medication || !dosage) {
      return res.status(400).json({ error: 'User ID, medication, and dosage are required' });
    }

    const prescription = await createPrescriptionService(
      user_id,
      req.user.id,
      medication,
      dosage,
      instructions
    );

    const pdfPath = generatePrescriptionPDF(prescription);

    return res.status(201).json({
      message: 'Prescription created successfully',
      prescription: {
        ...prescription,
        pdf_url: `/prescriptions/${prescription.prescription_id}.pdf`,
      },
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
