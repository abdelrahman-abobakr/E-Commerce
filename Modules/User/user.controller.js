import passport from "passport";
import { userModel } from "../../Database/Models/user.model.js";
import {productModel} from "../../Database/Models/product.model.js"
import { sendEmail } from "../../Email/email.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../../Middleware/catchError.js";

const signUp = catchError(
    async (req, res) => {
        console.log("insidelogin")
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        console.log( req.body.password );
        const addUser = await userModel.insertMany(req.body);
        sendEmail(req.body.email);
        addUser[0].password = undefined;
        res.status(201).json({ message: "created", addUser });

    }
);

const signIn = catchError(

    async (req, res) => {
        // Signin logic here
        let findUser = await userModel.findOne({ email: req.body.email });
        
        if (findUser && bcrypt.compareSync(req.body.password, findUser.password) && (findUser.isVerified === true)) {
            let token = jwt.sign({
                _id: findUser._id,
                name: findUser.name,
                role: findUser.role
            }, "key");
            console.log(token);
            return res.status(200).json({ message: "Login successful", token });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }

    }
);

const verifyEmail = (req, res) => {
    const token = req.params.email;
    console.log(token);
    jwt.verify(token, "myEmail", async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const email = decoded;
        await userModel.findOneAndUpdate({ email: email }, { isVerified: true });
        res.json({ message: "Email is verified" });
    });
}

// Google Authentication

const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

const googleCallback = catchError(async (req, res) => {
   
        const { id, displayName, emails } = req.user;
        let user = await userModel.findOne({ email: emails[0].value });

        if (!user) {
            user = await userModel.create({
                name: displayName,
                email: emails[0].value,
                googleId: id,
                isVerified: false  // User must verify his/her Email
            });

            sendEmail(user.email); // Send mail to user to verify his/her Email;
            return res.status(401).json({ message: "Please verify your email first" });
        }

        if (!user.isVerified) {
            return res.status(401).json({ message: "Email not verified. Check your inbox." });
        }

        let token = jwt.sign({ _id: user._id, name: user.name, role: user.role }, "AAAA");
        res.json({ message: "Login successful", token });
   
});


const addToCart = async (req,res)=>{
    const { productID, quantity } = req.body;
    const user = await userModel.findById(req.user._id);

    const product = await productModel.findById(productID);
    if (!product || product.stock < quantity) {
        return res.status(400).json({ message: "Product not available or insufficient stock" });
    }

    const cartItem = user.cart.items.find(item => item.productID.equals(productID));
    if (cartItem) {
        cartItem.quantity += quantity;
        cartItem.itemTotalPrice = cartItem.quantity * product.price;
    } else {
        user.cart.items.push({
            productID,
            quantity,
            itemTotalPrice: quantity * product.price,
        });
    }

    // Recalculate total bill
    user.cart.totalBill = user.cart.items.reduce((total, item) => total + item.itemTotalPrice, 0);

    await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
}



export { signUp, signIn, verifyEmail, googleAuth, googleCallback, addToCart };
