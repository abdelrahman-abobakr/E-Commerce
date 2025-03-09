import { myConnection } from "./Database/dbConnection.js";
import express from "express";
import { userModel } from "./Database/Models/user.model.js";
import { orderRoutes } from "./Modules/Order/order.Route.js";
import userRoutes from "./Modules/User/user.Route.js";
import adminRoutes from "./Modules/Admin/admin.Route.js";

import  productRoutes  from "./Modules/Product/product.Route.js";
// import paymentRoutes from "./Modules/Payment/payment.Route.js";

import session from "express-session";
import passport from "passport"; 
import "./Config/passport.js";

import Stripe from 'stripe';

import bodyParser from 'body-parser';
import path from 'path';
import paymentRoutes from './Modules/Payment/strip.Route.js';


const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();

app.use(express.json());
app.use(userRoutes);

app.use(productRoutes);
app.use(orderRoutes)
app.use(adminRoutes);

// app.use(userRoute);

// Session Middleware (required for Passport)
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


app.use(paymentRoutes);

const stripe = Stripe('EOd2IiJ3NnDiELC9zaFw_xz88FXyXwX5f6RC_f2GybbANIROnF0DXrdGnhLvm-fVer3AFT_VZciGJKwr');
// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// View Engine setup

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

myConnection;

app.listen(3000, function(){
    console.log("server is running on port 3000");
})