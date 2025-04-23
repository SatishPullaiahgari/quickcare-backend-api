import { Request, Response } from 'express';
import {
  saveVitalSigns,
  getAllVitalSigns,
  getRecentVitalSigns
} from '../services/vitialSigns.service';

const calculateAverage = (arr: number[]): number => {
  if (!arr.length) return 0;
  const sum = arr.reduce((a, b) => a + b, 0);
  return parseFloat((sum / arr.length).toFixed(1));
};

export const createVitalSigns = async (req: Request, res: Response): Promise<any> => {
  try {

    const patient_id = "PAT000002";
    const { resting_heart_rate, performance_heart_rate } = req.body;

    if (
     
      !Array.isArray(resting_heart_rate) || resting_heart_rate.length !== 20 ||
      !Array.isArray(performance_heart_rate) || performance_heart_rate.length !== 20
    ) {
      return res.status(400).json({
        message: 'patient_id and exactly 20 readings for both heart rate types are required.'
      });
    }

    const restingAvg = calculateAverage(resting_heart_rate);
    const performanceAvg = calculateAverage(performance_heart_rate);

    // Save averages
    const savedData = await saveVitalSigns({
      patient_id,
      resting_heart_rate: restingAvg,
      performance_heart_rate: performanceAvg
    });

    // Return all data for this patient
    const allVitals = await getAllVitalSigns(patient_id);

    return res.status(200).json({
      message: 'Vital signs recorded successfully.',
      average: {
        resting_heart_rate: restingAvg,
        performance_heart_rate: performanceAvg
      },
      data: allVitals
    });
  } catch (error) {
    console.error('[createVitalSigns]', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET: Last 7 samples only
export const getRecentVitals = async (req: Request, res: Response): Promise<any> => {
  try {
    const { patient_id } = req.query;

    if (!patient_id) {
      return res.status(400).json({ message: 'patient_id is required' });
    }

    const recentVitals = await getRecentVitalSigns(patient_id as string);

    // Ensure both resting and performance heart rate data arrays have values
    if (
      !recentVitals ||
      recentVitals.resting_heart_data.data.length === 0 ||
      recentVitals.performance_heart_data.data.length === 0
    ) {
      return res.status(404).json({ message: 'No vital signs data found for this patient.' });
    }

    return res.status(200).json({
      message: 'Recent vital signs retrieved successfully.',
      data: recentVitals
    });
  } catch (error) {
    console.error('[getRecentVitals]', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
