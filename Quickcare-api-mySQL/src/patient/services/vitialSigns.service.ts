import db from '../../config.db/mySQLconnect';

// Save average vital signs
export const saveVitalSigns = async (data: {
  patient_id: string;
  resting_heart_rate: number;
  performance_heart_rate: number;
}) => {
  const { patient_id, resting_heart_rate, performance_heart_rate } = data;

  const [result]: any = await db.execute(
    `INSERT INTO vital_signs (patient_id, resting_heart_rate, performance_heart_rate) 
     VALUES (?, ?, ?)`,
    [patient_id, resting_heart_rate, performance_heart_rate]
  );

  return { id: result.insertId, ...data };
};

// Get last 7 vital signs (for chart)
export const getRecentVitalSigns = async (patient_id: string) => {
  const [rows]: any = await db.execute(
    `SELECT resting_heart_rate, performance_heart_rate, recorded_at 
     FROM vital_signs 
     WHERE patient_id = ? 
     ORDER BY recorded_at DESC 
     LIMIT 7`,
    [patient_id]
  );

  if (!rows.length) return null;

  const ordered = rows.reverse(); // oldest first

  const restingValues = ordered.map((row: any) => row.resting_heart_rate);
  const performanceValues = ordered.map((row: any) => row.performance_heart_rate);

  const timeLabels = ordered.map((row: any) => {
    const date = new Date(row.recorded_at);
    const day = date.toLocaleString('en-US', { weekday: 'short' });
    const time = date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).replace(/\s/, ' ');
    return `${day}(${time})`;
  });

  const avg = (arr: number[]) =>
    arr.length ? parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)) : 0;

  return {
    resting_heart_data: {
      data: restingValues,
      time: timeLabels,
      average: avg(restingValues),
    },
    performance_heart_data: {
      data: performanceValues,
      time: timeLabels,
      average: avg(performanceValues),
    },
  };
};

// Get all vital signs (for POST response)
export const getAllVitalSigns = async (patient_id: string) => {
  const [rows]: any = await db.execute(
    `SELECT resting_heart_rate, performance_heart_rate, recorded_at 
     FROM vital_signs 
     WHERE patient_id = ? 
     ORDER BY recorded_at DESC`,
    [patient_id]
  );

  if (!rows.length) return null;

  const ordered = rows.reverse(); // oldest first

  const restingValues = ordered.map((row: any) => row.resting_heart_rate);
  const performanceValues = ordered.map((row: any) => row.performance_heart_rate);

  const timeLabels = ordered.map((row: any) => {
    const date = new Date(row.recorded_at);
    const formatted = date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).replace(/(\d{2}) (\w{3}) (\d{4})/, '$1 $2, $3'); // Format: 29 Apr, 2025 12:00 PM
    return formatted;
  });

  const avg = (arr: number[]) =>
    arr.length ? parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)) : 0;

  return {
    resting_heart_data: {
      data: restingValues,
      time: timeLabels,
      average: avg(restingValues),
    },
    performance_heart_data: {
      data: performanceValues,
      time: timeLabels,
      average: avg(performanceValues),
    },
  };
};
