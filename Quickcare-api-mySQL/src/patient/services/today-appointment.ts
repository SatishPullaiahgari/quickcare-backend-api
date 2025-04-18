import { db } from '../../config.db/mySQLconnect';

export const getAppointmentsByDateService = async (user_id: string, dateType: 'today' | 'past') => {
  try {
    let dateCondition = '';
    if (dateType === 'today') {
      dateCondition = `DATE(appointment_date) = CURDATE()`;
    } else if (dateType === 'past') {
      dateCondition = `DATE(appointment_date) < CURDATE()`;
    }

    const [appointments]: any = await db.query(
      `SELECT * FROM appointments WHERE user_id = ? AND ${dateCondition} ORDER BY appointment_date DESC`,
      [user_id]
    );
    return appointments;
  } catch (err: any) {
    console.error('MySQL Error:', err);
    throw new Error('Error fetching appointments');
  }
};
