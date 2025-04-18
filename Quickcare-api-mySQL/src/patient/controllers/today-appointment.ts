import { Request, Response } from 'express';
import { getAppointmentsByDateService } from '../services/today-appointment';

export const getTodaysAppointments = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const appointments = await getAppointmentsByDateService(req.user.id, 'today');

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for today' });
    }

    return res.status(200).json({ appointments });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
