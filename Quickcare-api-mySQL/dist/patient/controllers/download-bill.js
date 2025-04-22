"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadBill = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const downloadBill = (req, res) => {
    const { filename } = req.params;
    const filePath = path_1.default.resolve(__dirname, '../../../src/admin/uploads/bills', filename + '.pdf');
    console.log('Trying to access bill at:', filePath);
    fs_1.default.access(filePath, fs_1.default.constants.F_OK, (err) => {
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
exports.downloadBill = downloadBill;
