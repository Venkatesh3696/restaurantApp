import { Router } from 'express';
import {
	addMenuItem,
	createRestaurant,
	getAllRestaurants,
	getAllRestaurantsDetails,
	getRestaurantDetails,
	removeMenuItem,
	updateMenuItem,
	updateRestaurant,
} from '../controllers/restaurant.controller.js';

const router = Router();

router.route('/').get(getAllRestaurants).post(createRestaurant);

router.route('/:restaurantId').get(getRestaurantDetails).put(updateRestaurant);

router.route('/:restaurantId/menu').post(addMenuItem);

router
	.route('/:restaurantId/menu/:itemId')
	.put(updateMenuItem)
	.delete(removeMenuItem);

export default router;
