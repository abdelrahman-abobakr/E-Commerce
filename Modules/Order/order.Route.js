import express from "express";
import { addItems , deleteItems ,getOrders} from "./order.Controller.js";
export const orderRoutes = express.Router();
orderRoutes.get("/order",getOrders)
orderRoutes.post("/orders",addItems)
orderRoutes.delete("/orders/:id",deleteItems)