import express from "express";
import verifyToken from "../../Middleware/verifyToken.js"
import checkAdmin from "../../Middleware/checkAdmin.js";
import { deleteUser, getUsers,addUser } from "./admin.Controller.js";
import { validateUser } from "../../Middleware/userValidationMiddleware.js";

const adminRoutes = express.Router();
adminRoutes.use(verifyToken);
adminRoutes.use(checkAdmin);

adminRoutes.post("/addUser", validateUser, addUser);
adminRoutes.get("/users", checkAdmin, getUsers);
adminRoutes.delete("/users/:id", checkAdmin,deleteUser)


export default adminRoutes;