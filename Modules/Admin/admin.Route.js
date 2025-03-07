import express from "express";
import verifyToken from "../../Middleware/verifyToken.js"
import checkAdmin from "../../Middleware/checkAdmin.js";
import { getUsers, addUser} from "./admin.Controller.js";
import { validateUser } from "../../Middleware/userValidationMiddleware.js";
const adminRoutes = express.Router();
adminRoutes.use(verifyToken);
adminRoutes.use(checkAdmin);

adminRoutes.get("/users", getUsers);
adminRoutes.post("/addUser", validateUser, addUser);

export default adminRoutes;