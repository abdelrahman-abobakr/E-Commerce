
import stripe from './StripeConfig.js'; 
import { userModel } from '../../Database/Models/user.model.js'; 
import { orderModel } from '../../Database/Models/order.model.js'; 
import { productModel } from '../../Database/Models/product.model.js'; 

/**
 * Create a checkout session
 */
export const createCheckoutSession = async (req, res) => {
    try {
        // Find the user and populate product details in the cart
        const user = await userModel.findById(req.user._id)
            .populate('cart.items.productID');

        // Check if cart is empty
        if (!user || user.cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Create a payment session with Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: user.cart.items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.productID.name,
                        description: item.productID.description.substring(0, 100), // Add description
                        images: [item.productID.image], // Add image if URL is accessible
                    },
                    unit_amount: Math.round(item.productID.price * 100), // Convert to cents
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            client_reference_id: user._id.toString(), // Store user ID for later use
            metadata: {
                cart: JSON.stringify(user.cart.items.map(item => ({
                    productId: item.productID._id.toString(),
                    quantity: item.quantity,
                    price: item.itemTotalPrice
                })))
            },
            success_url: `${req.protocol}://${req.get('host')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Error in createCheckoutSession:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

/**
 * Handle successful payment
 */
export const handleSuccess = async (req, res) => {
    try {
        const { session_id } = req.query;
        console.log(session_id);
        // Retrieve the session to verify payment status
        const session = await stripe.checkout.sessions.retrieve(session_id);
        
        if (session.payment_status === 'paid') {
            const userId = session.client_reference_id;
            const user = await userModel.findById(userId).populate('cart.items.productID');
            
            // Create order
            const order = await orderModel.create({
                customerId: userId,
                items: user.cart.items.map(item => ({
                    itemID: item.productID._id,
                    quantity: item.quantity,
                    itemTotalPrice: item.itemTotalPrice
                })),
                totalBill: user.cart.totalBill
            });
            
            // Update product stock
            for (const item of user.cart.items) {
                await productModel.findByIdAndUpdate(item.productID._id, {
                    $inc: { stock: -item.quantity }
                });
            }
            
            // Clear cart
            user.cart.items = [];
            user.cart.totalBill = 0;
            await user.save();
            
            // For testing, you can redirect to a success page or return JSON
            // res.redirect('/payment-success'); // If you have a frontend page
            res.status(200).json({ 
                success: true, 
                message: "Payment successful", 
            });
        } else {
            res.status(400).json({ success: false, message: "Payment not completed" });
        }
    } catch (error) {
        console.error('Error in handleSuccess:', error);
        res.status(500).json({ success: false, message: "Error processing payment", error: error.message });
    }
};

/**
 * Handle cancelled payment
 */
export const handleCancel = async (req, res) => {
    // For testing, you can redirect to a cancel page or return JSON
    // res.redirect('/payment-cancelled'); // If you have a frontend page
    res.status(200).json({ message: "Payment cancelled" });
};

/**
 * Webhook to handle Stripe events (for production use)
 */
export const handleWebhook = async (req, res) => {
    const signature = req.headers['stripe-signature'];
    let event;

    try {
        // Replace with your webhook signing secret in production
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
        
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            endpointSecret
        );
    } catch (error) {
        console.error('Webhook signature verification failed:', error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        
        // Fulfill the order here
        try {
            const userId = session.client_reference_id;
            const user = await userModel.findById(userId).populate('cart.items.productID');
            
            // Create order
            const order = await orderModel.create({
                customerId: userId,
                items: user.cart.items.map(item => ({
                    itemID: item.productID._id,
                    quantity: item.quantity,
                    itemTotalPrice: item.itemTotalPrice
                })),
                totalBill: user.cart.totalBill
            });
            
            // Update product stock
            for (const item of user.cart.items) {
                await productModel.findByIdAndUpdate(item.productID._id, {
                    $inc: { stock: -item.quantity }
                });
            }
            
            // Clear cart
            user.cart.items = [];
            user.cart.totalBill = 0;
            await user.save();
            
            console.log(`Order ${order._id} created successfully for user ${userId}`);
        } catch (error) {
            console.error('Error processing webhook order:', error);
        }
    }

    res.json({ received: true });
};
