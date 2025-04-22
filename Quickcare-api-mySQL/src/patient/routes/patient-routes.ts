import { createAppointment } from '../controllers/create-appoinment';
import { verifyToken } from '../middleware/verify-token';
import { getAppointments } from '../controllers/upcoimg-appointment';
import express from 'express';
import { getTodaysAppointments } from '../controllers/today-appointment';
import { getPastAppointments } from '../controllers/past-appointments';
import { createPrescription } from '../controllers/generate-precreption';
import { downloadPrescriptionPDF } from '../controllers/download-precription';
import { downloadBill } from '../controllers/download-bill';
import { createVitalSigns, getRecentVitals } from '../controllers/vitalSigns.controller';






const router = express.Router();

// Create appointment route
router.post('/vital-signs', createVitalSigns);
router.get('/vital-signs/data', getRecentVitals);

router.use(verifyToken);
router.post('/create-appointment', verifyToken, createAppointment);
router.get('/appointments', getAppointments);
router.get('/appointments/today', getTodaysAppointments);
router.get('/appointments/past', getPastAppointments);
router.post('/prescriptions', createPrescription);
router.get('/prescriptions/:prescription_id/download', downloadPrescriptionPDF);
router.get('/download-bill/:filename',downloadBill);
// router.post('/vital-signs', createVitalSigns);
// router.get('/vital-signs/average', getAverageVitals);

export const patientRoutes = router;
