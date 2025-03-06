import { myConnection } from "./Database/dbConnection.js";
import express from "express";
import { userModel } from "./Database/Models/user.model.js";
import { orderRoutes } from "./Modules/Order/order.Route.js";
import userRoutes from "./Modules/User/user.Route.js";
const app = express();
app.use(express.json());
app.use(orderRoutes)
app.use(userRoutes);


myConnection;

app.listen(3000, function(){
    console.log("server is running on port 3000");
})