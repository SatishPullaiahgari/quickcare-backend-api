"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
const generateId = (prefix, num) => {
    return `${prefix}${String(num).padStart(6, '0')}`;
};
exports.generateId = generateId;
