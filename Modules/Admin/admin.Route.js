import express from "express";
import verifyToken from "../../Middleware/verifyToken.js"
import checkAdmin from "../../Middleware/checkAdmin.js";
<<<<<<< HEAD
import { deleteUser, getUsers } from "./admin.Controller.js";
=======
import { getUsers, addUser} from "./admin.Controller.js";
import { validateUser } from "../../Middleware/userValidationMiddleware.js";
>>>>>>> fc7936161618c4beabe7e721a7ba59d7b85d1139
const adminRoutes = express.Router();
adminRoutes.use(verifyToken);
adminRoutes.use(checkAdmin);

adminRoutes.get("/users", getUsers);
adminRoutes.post("/addUser", validateUser, addUser);

<<<<<<< HEAD
adminRoutes.get("/users", checkAdmin, getUsers);
adminRoutes.delete("/users/:id", checkAdmin,deleteUser)
=======
>>>>>>> fc7936161618c4beabe7e721a7ba59d7b85d1139
export default adminRoutes;