import express from "express";
import passport from "passport";
import { signUp, signIn, verifyEmail, googleAuth, googleCallback, addToCart, viewCart, updateCartItemQuantity, removeFromCart } from "./user.controller.js";

import { checkEmail } from "../../Middleware/checkEmail.js";
import { validateUser} from "../../Middleware/userValidationMiddleware.js"
import { authenticateUser } from "../../Middleware/authMiddleware.js";
import verifyToken from "../../Middleware/verifyToken.js"
const userRoutes = express.Router();

//          registeration and login 
userRoutes.post("/signup", validateUser, checkEmail, signUp)
userRoutes.post("/signin", signIn);
userRoutes.get("/verify/:email", verifyEmail);

// Google OAuth Routes    #by Abdelhameed
userRoutes.get("/auth/google", googleAuth);
userRoutes.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), googleCallback);
userRoutes.get("/protected-route", authenticateUser, (req, res) => {
    res.json({ message: "You have accessed a protected route!", user: req.user });
});

//          cart
userRoutes.delete("/cart/remove/:productID", verifyToken, removeFromCart); 
userRoutes.put("/cart/update/:productID", verifyToken, updateCartItemQuantity);
userRoutes.post("/cart/add", verifyToken, addToCart);
userRoutes.get("/cart", verifyToken, viewCart);


export default userRoutes;




