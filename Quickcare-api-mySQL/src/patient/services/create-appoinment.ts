import { db } from '../../config.db/mySQLconnect';

export const createAppointmentService = async (
  user_id: string,
  firstname: string,
  lastname: string,
  gender: string,
  mobile: string,
  address: string,
  email: string,
  dob: string,
  consultant_doctor: string,
  injury_or_concern_note: string,
  appointment_date: string
) => {
  try {
    const [rows]: any = await db.query(
      'INSERT INTO appointments (user_id, firstname, lastname, gender, mobile, address, email, dob, consultant_doctor, injury_or_concern_note, appointment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        user_id,
        firstname,
        lastname,
        gender,
        mobile,
        address,
        email,
        dob,
        consultant_doctor,
        injury_or_concern_note,
        appointment_date,
      ]
    );

    // Return the created appointment
    return {
      id: rows.insertId,
      user_id,
      firstname,
      lastname,
      gender,
      mobile,
      address,
      email,
      dob,
      consultant_doctor,
      injury_or_concern_note,
      appointment_date,
      status: 'PENDING',
    };
  } catch (err: any) {
    console.error('MySQL Error:', err);  // <- This is what you need
    throw new Error('Error creating appointment');
  }
};
