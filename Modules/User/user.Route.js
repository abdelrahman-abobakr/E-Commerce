import express from "express";
import passport from "passport";

import { signUp, signIn, verifyEmail, googleAuth, googleCallback } from "./user.Controller.js";
import { checkEmail } from "../../Middleware/checkEmail.js";
import { validateUser} from "../../Middleware/validateUserMiddelware.js"

import { authenticateUser } from "../../Middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/signup", validateUser, checkEmail, signUp)
userRoutes.post("/signin", signIn);
userRoutes.get("/verify/:email", verifyEmail);

// Google OAuth Routes    #by Abdelhameed
userRoutes.get("/auth/google", googleAuth);
userRoutes.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), googleCallback);

userRoutes.get("/protected-route", authenticateUser, (req, res) => {
    res.json({ message: "You have accessed a protected route!", user: req.user });
});

export default userRoutes;




