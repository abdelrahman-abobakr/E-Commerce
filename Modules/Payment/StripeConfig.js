import stripePackage from 'stripe';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Stripe
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export default stripe;