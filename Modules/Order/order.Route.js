import express from "express";
import { addOrders , deleteOrders ,getOrders,getUserOrders} from "./order.Controller.js";
import verifyToken from "../../Middleware/verifyToken.js";
import checkAdmin from "../../Middleware/checkAdmin.js";
export const orderRoutes = express.Router();
orderRoutes.use(verifyToken)
orderRoutes.get("/orders/:id",getUserOrders)
orderRoutes.get("/orders",checkAdmin,getOrders)
orderRoutes.post("/orders",addOrders)
orderRoutes.delete("/orders/:id",deleteOrders)