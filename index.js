import { myConnection } from "./Database/dbConnection.js";
import express from "express";
import { userModel } from "./Database/Models/user.model.js";
import  productRoutes  from "./Modules/Product/product.Route.js";

import session from "express-session";
import passport from "passport"; 
import "./Config/passport.js";

const app = express();
app.use(express.json());
// app.use(userRoute);

// Session Middleware (required for Passport)
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


myConnection;

app.listen(3000, function(){
    console.log("server is running on port 3000");
})