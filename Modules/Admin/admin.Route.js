import express from "express";
import verifyToken from "../../Middleware/verifyToken.js"
import checkAdmin from "../../Middleware/checkAdmin.js";
import { deleteUser, getUsers, addUser, getUser } from "./admin.Controller.js";
import { validateUser } from "../../Middleware/userValidationMiddleware.js";

const adminRoutes = express.Router();
adminRoutes.use(verifyToken);
adminRoutes.use(checkAdmin);

adminRoutes.post("/addUser", validateUser, addUser);
adminRoutes.delete("/deleteUser/:id",deleteUser)
adminRoutes.get("/users/:id", getUser);
adminRoutes.get("/users", getUsers);


export default adminRoutes;