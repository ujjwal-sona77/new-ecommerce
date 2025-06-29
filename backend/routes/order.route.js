import express from 'express';
import { createOrder } from '../controllers/create.order.js';
import { getAllOrders } from '../controllers/admin.order.js';
const router = express.Router();

router.post('/create/:email', createOrder);
router.get('/admin/all', getAllOrders);

export const orderRouter = router;
