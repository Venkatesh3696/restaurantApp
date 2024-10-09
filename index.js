import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import connectDb from './config/dbConnect.js';
import { authController } from './controllers/auth.controller.js';
import restaurantRoute from './routes/restaurant.route.js';
import orderRoute from './routes/order.route.js';

dotenv.config();
connectDb();

const app = express();

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT;

app.post('/register', authController.register);
app.post('/login', authController.login);

app.use('/restaurants', restaurantRoute);

app.use('/api/orders', orderRoute);

app.listen(PORT, () => {
	console.log(`app is listening at port ${PORT}`);
});
