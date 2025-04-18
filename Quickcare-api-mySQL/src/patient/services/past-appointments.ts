import { db } from '../../config.db/mySQLconnect';

export const getPastAppointmentsService = async (user_id: string) => {
  try {
    const [appointments]: any = await db.query(
      `SELECT * FROM appointments WHERE user_id = ? AND appointment_date < CURDATE() ORDER BY appointment_date DESC`,
      [user_id]
    );
    return appointments;
  } catch (err: any) {
    console.error('MySQL Error:', err);
    throw new Error('Error fetching past appointments');
  }
};
