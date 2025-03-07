import { myConnection } from "./Database/dbConnection.js";
import express from "express";
import { userModel } from "./Database/Models/user.model.js";
import { orderRoutes } from "./Modules/Order/order.Route.js";
import userRoutes from "./Modules/User/user.Route.js";
<<<<<<< HEAD
=======
import adminRoutes from "./Modules/Admin/admin.Route.js";
import { userModel } from "./Database/Models/user.model.js";
import  productRoutes  from "./Modules/Product/product.Route.js";

import session from "express-session";
import passport from "passport"; 
import "./Config/passport.js";

>>>>>>> fc7936161618c4beabe7e721a7ba59d7b85d1139
const app = express();
app.use(express.json());
app.use(orderRoutes)
app.use(userRoutes);
<<<<<<< HEAD
=======
app.use(adminRoutes);
// app.use(userRoute);

// Session Middleware (required for Passport)
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
>>>>>>> fc7936161618c4beabe7e721a7ba59d7b85d1139


myConnection;

app.listen(3000, function(){
    console.log("server is running on port 3000");
})