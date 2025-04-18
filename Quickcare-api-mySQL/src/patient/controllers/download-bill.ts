import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export const downloadBill = (req: Request, res: Response) => {
    const { filename } = req.params;

    const filePath = path.resolve(__dirname, '../../../src/admin/uploads/bills', filename + '.pdf');

    console.log('Trying to access bill at:', filePath);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Bill not found at path:', filePath);
            return res.status(404).json({ message: 'Bill not found' });
        }

        return res.download(filePath, filename + '.pdf', (err) => {
            if (err) {
                console.error('Error in downloading file:', err);
                res.status(500).send('Error in downloading file');
            }
        });
    });
};
