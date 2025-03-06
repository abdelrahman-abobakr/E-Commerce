import express from "express";
import { signUp, signIn, verifyEmail} from "./user.controller.js";
import { checkEmail } from "../../Middleware/checkEmail.js";
import { validateUser} from "../../Middleware/userValidationMiddleware.js"

const userRoutes = express.Router();

userRoutes.post("/signup", validateUser, checkEmail, signUp)
userRoutes.post("/signin", signIn);
userRoutes.get("/verify/:email", verifyEmail);

export default userRoutes;




