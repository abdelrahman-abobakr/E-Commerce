// models/paymentModel.js
import Stripe from 'stripe';

const stripe = Stripe('sk_test_51R0VHjKN8YEsXESQ4WGCZeBfGgUbQJqurjCiFgEvJGeczoDxdPfAU17rcJ6nfF3ood3lMu0KW3XqARs9BnFhf60900lkYoJwX8');

export const createCustomer = async (email, token, name, address) => {
    try {
        const customer = await stripe.customers.create({
            email,
            source: token,
            name,
            address
        });
        return customer;
    } catch (err) {
        throw new Error('Error creating customer: ' + err.message);
    }
};

export const createCharge = async (customerId, amount, description, currency = 'INR') => {
    try {
        const charge = await stripe.charges.create({
            amount,
            description,
            currency,
            customer: customerId
        });
        return charge;
    } catch (err) {
        throw new Error('Error creating charge: ' + err.message);
    }
};
