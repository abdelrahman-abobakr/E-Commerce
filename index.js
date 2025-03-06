import { myConnection } from "./Database/dbConnection.js";
import express from "express";
import { userModel } from "./Database/Models/user.model.js";
import  productRoutes  from "./Modules/Product/product.Route.js";


app.use(express.json());
app.use(productRoutes);


import userRoutes from "./Modules/User/user.Route.js";
// import adminRoutes from "./Modules/Admin/admin.Route.js"
const app = express();
app.use(express.json());
app.use(userRoutes);
// app.use(adminRoutes);
myConnection;

app.listen(3000, function(){
    console.log("server is running on port 3000");
})