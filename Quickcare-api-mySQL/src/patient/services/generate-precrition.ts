import { db } from '../../config.db/mySQLconnect';
import { v4 as uuidv4 } from 'uuid';

export const createPrescriptionService = async (
  user_id: string,
  doctor_id: string,
  medication: string,
  dosage: string,
  instructions: string
) => {
  const prescription_id = uuidv4(); // Generate a unique prescription ID
  try {
    await db.query(
      'INSERT INTO prescriptions (prescription_id, user_id, doctor_id, medication, dosage, instructions) VALUES (?, ?, ?, ?, ?, ?)',
      [prescription_id, user_id, doctor_id, medication, dosage, instructions]
    );
    return { prescription_id, user_id, doctor_id, medication, dosage, instructions };
  } catch (err: any) {
    console.error('MySQL Error:', err);
    throw new Error('Error creating prescription');
  }
};
