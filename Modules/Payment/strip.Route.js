// routes/paymentRoutes.js
import express from 'express';
import {  handlePayment } from './strip.Controller.js';

const paymentRoutes = express.Router();

// paymentRoutes.get('/', getHomePage);
paymentRoutes.post('/payment', handlePayment);

export default paymentRoutes;
