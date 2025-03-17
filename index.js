import { myConnection } from "./Database/dbConnection.js";
import express from "express";
import { userModel } from "./Database/Models/user.model.js";
import { orderRoutes } from "./Modules/Order/order.Route.js";
import userRoutes from "./Modules/User/user.Route.js";
import adminRoutes from "./Modules/Admin/admin.Route.js";
import  productRoutes  from "./Modules/Product/product.Route.js";
import paymentRoutes from './Modules/Payment/strip.Route.js';


import session from "express-session";
import passport from "passport"; 
import "./Config/passport.js";
import reviewRouter from "./Modules/Reviews/review.Route.js";
import cors from 'cors';

const app = express();

// ADD THIS LINE: Important - handle Stripe webhooks before JSON parsing
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));
app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from Node.js backend!' });
});
app.use(reviewRouter);
app.use(paymentRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(adminRoutes);

// Session Middleware (required for Passport)
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


myConnection;

app.listen(3000, function(){
    console.log("server is running on port 3000");
})