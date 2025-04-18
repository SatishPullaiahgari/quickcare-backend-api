import { db } from '../../config.db/mySQLconnect';

export const getAppointmentsService = async (user_id: string) => {
  try {
    const [appointments]: any = await db.query(
      `SELECT * FROM appointments WHERE user_id = ? AND appointment_date >= CURDATE() ORDER BY appointment_date ASC`,
      [user_id]
    );
    return appointments;
  } catch (err: any) {
    console.error('MySQL Error:', err);
    throw new Error('Error fetching appointments');
  }
};
