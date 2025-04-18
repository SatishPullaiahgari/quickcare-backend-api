import { Request, Response } from 'express';
import { getAppointmentsService } from '../services/upcoming-apointment';

export const getAppointments = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const appointments = await getAppointmentsService(req.user.id);

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No upcoming appointments found' });
    }

    return res.status(200).json({ appointments });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
