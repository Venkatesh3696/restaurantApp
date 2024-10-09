import { Router } from 'express';
import authController from '../controllers/auth.controller.js';

const route = Router();

route.post('/register', authController.register);
route.post('/login', authController.login);
