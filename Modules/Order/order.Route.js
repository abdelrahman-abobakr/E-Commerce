import express from "express";
import {  deleteOrders ,getOrders, getUserOrders, updatedOrders} from "./order.Controller.js";
import verifyToken from "../../Middleware/verifyToken.js";
import checkAdmin from "../../Middleware/checkAdmin.js";
import { validateOrder } from "../../Middleware/orderValidationMiddleware.js";
export const orderRoutes = express.Router();
orderRoutes.use(verifyToken)
orderRoutes.get("/orders/:id",getUserOrders)
orderRoutes.get("/orders",checkAdmin,getOrders)
// orderRoutes.post("/addOrders",validateOrder,addOrders)
orderRoutes.delete("/deleteOrder/:id",deleteOrders)
orderRoutes.put("/updateOrder/:id",validateOrder ,updatedOrders)