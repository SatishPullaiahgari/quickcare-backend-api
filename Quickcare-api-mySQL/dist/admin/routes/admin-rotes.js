"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const billing_counter_1 = require("../controllers/billing-counter");
const router = (0, express_1.Router)();
router.post('/bills', billing_counter_1.createBill);
exports.adminRoutes = router;
