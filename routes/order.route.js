import express from 'express';
import {
	createOrder,
	getOrdersForRestaurant,
	getOrdersForCustomer,
} from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', createOrder);

router.get('/:orderId/track', getOrdersForCustomer);

router.get('/restaurants/:restaurantId', getOrdersForRestaurant);

router.get('/customer/:customerId', getOrdersForCustomer);

export default router;
