import express from 'express';
import { createCheckoutSession, handleSuccess, handleCancel, handleWebhook } from './strip.Controller.js';
import verifyToken from '../../Middleware/verifyToken.js';

const paymentRoutes = express.Router();

// Create checkout session
paymentRoutes.post('/checkout', verifyToken, createCheckoutSession);

// Handle success and cancel without verification (these are redirect URLs from Stripe)
paymentRoutes.get('/success', handleSuccess);
paymentRoutes.get('/cancel', handleCancel);

// Webhook route (needs raw body)
paymentRoutes.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default paymentRoutes;