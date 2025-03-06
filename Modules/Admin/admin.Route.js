import express from "express";
import verifyToken from "../../Middleware/verifyToken.js"
import checkAdmin from "../../Middleware/checkAdmin.js";
import { getUsers } from "./admin.Controller.js";
const adminRoutes = express.Router();
adminRoutes.use(verifyToken);

adminRoutes.get("/users", checkAdmin, getUsers);
export default adminRoutes;