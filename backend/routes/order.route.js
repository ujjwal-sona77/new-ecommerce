import express from 'express';
import { createOrder } from '../controllers/create.order.js';
const router = express.Router();

router.post('/create/:email', createOrder);

export const orderRouter = router;
