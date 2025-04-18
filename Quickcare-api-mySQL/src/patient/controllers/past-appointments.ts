import { Request, Response } from 'express';
import { getAppointmentsByDateService } from '../services/today-appointment';

export const getPastAppointments = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const appointments = await getAppointmentsByDateService(req.user.id, 'past');

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No past appointments found' });
    }

    return res.status(200).json({ appointments });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
