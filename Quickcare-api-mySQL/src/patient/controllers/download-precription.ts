import path from 'path';
import { Request, Response } from 'express';

export const downloadPrescriptionPDF = (req: Request, res: Response) => {
  const { prescription_id } = req.params;
  const filePath = path.resolve(__dirname, '..', '..', 'patient', 'prescriptions', `${prescription_id}.pdf`);

  console.log(`Looking for file at: ${filePath}`);

  res.download(filePath, (err) => {
    if (err) {
      console.error('Error during file download:', err);
      res.status(404).json({ error: 'File not found' });
    }
  });
};
