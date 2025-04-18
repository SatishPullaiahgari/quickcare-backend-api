import { Request, Response } from 'express';
import { createAppointmentService } from '../services/create-appoinment';
import { verifyToken } from '../middleware/verify-token';

export const createAppointment = async (req: Request, res: Response): Promise<any> => {
  try {
   
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const {
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
    } = req.body;

   
    if (!firstname || !lastname || !gender || !mobile || !address || !email || !dob || !consultant_doctor || !appointment_date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

   
    const result = await createAppointmentService(
      req.user.id,  
      firstname,
      lastname,
      gender,
      mobile,
      address,
      email,
      dob,
      consultant_doctor,
      injury_or_concern_note,
      appointment_date
    );

  
    return res.status(200).json({
      message: 'Appointment created successfully',
      appointment: result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
