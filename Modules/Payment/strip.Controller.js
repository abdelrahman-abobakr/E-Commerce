import Stripe from 'stripe'; 
import { userModel } from '../../Database/Models/user.model.js';
import { orderModel } from '../../Database/Models/order.model.js';
import { productModel } from '../../Database/Models/product.model.js';




const stripe = new Stripe('sk_test_51R0VHjKN8YEsXESQ4WGCZeBfGgUbQJqurjCiFgEvJGeczoDxdPfAU17rcJ6nfF3ood3lMu0KW3XqARs9BnFhf60900lkYoJwX8');
export const handlePayment = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);

        // Check if cart is empty
        if (user.cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Calculate total bill
        const totalBill = user.cart.totalBill;

        // Create Stripe checkout session
        const session = await Stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: user.cart.items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.productID.name, // Fetch product name from DB
                    },
                    unit_amount: item.itemTotalPrice * 100, // Convert to cents
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${req.protocol}://${req.get('host')}/success`, // Dynamic URL based on the current host
            cancel_url: `${req.protocol}://${req.get('host')}/cancel`, // Dynamic URL based on the current host
        });

        // Create an order
        const order = await orderModel.create({
            customerId: user._id,
            items: user.cart.items,
            totalBill,
        });

        // Update product stock before clearing the cart
        for (const item of user.cart.items) {
            await productModel.findByIdAndUpdate(item.productID, {
                $inc: { stock: -item.quantity },
            });
        }

        // Clear the cart after updating the stock
        user.cart.items = [];
        user.cart.totalBill = 0;
        await user.save();

        // Return Stripe checkout session URL
        res.status(200).json({ message: "Payment session created successfully", sessionUrl: session.url });

    } catch (error) {
        console.error('Payment error: ', error);
        res.status(500).json({ message: 'Error creating payment session', error });
    }
};
