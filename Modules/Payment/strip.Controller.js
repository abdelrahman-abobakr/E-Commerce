// controllers/paymentController.js
import { createCustomer, createCharge } from '../../Database/Models/strip.model.js';
import {userModel} from '../../Database/Models/user.model.js';
import {orderModel} from '../../Database/Models/order.model.js';
import {productModel} from '../../Database/Models/product.model.js';

export const getHomePage = (req, res) => {
    const publishableKey = 'pk_test_51R0VHjKN8YEsXESQkgdcpYohfxpPRA5IMpukhAPRazByVr5eIkJ4j0XbVpAdLYpJ49ilikLF4eMF6DEbzc6KmQ7R00eFKF4Z31';
    res.render('Home', {
        key: publishableKey
    });
};

export const handlePayment  = async (req, res) => {
    const user = await userModel.findById(req.user._id);

    // Check if cart is empty
    if (user.cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total bill
    const totalBill = user.cart.totalBill;

    // Redirect to payment gateway (e.g., Stripe, PayPal)
    // For example, using Stripe:
    const session = await stripe.checkout.sessions.create({
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
        success_url: 'https://yourwebsite.com/success',
        cancel_url: 'https://yourwebsite.com/cancel',
    });

    // On successful payment:
    // 1. Create an order
    const order = await orderModel.create({
        customerId: user._id,
        items: user.cart.items,
        totalBill,
    });

    // 2. Clear the cart
    user.cart.items = [];
    user.cart.totalBill = 0;
    await user.save();

    // 3. Update product stock
    for (const item of user.cart.items) {
        await productModel.findByIdAndUpdate(item.productID, {
            $inc: { stock: -item.quantity },
        });
    }

    res.status(200).json({ message: "Payment successful", order });
};