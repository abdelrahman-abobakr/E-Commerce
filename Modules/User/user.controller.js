import passport from "passport";
import { userModel } from "../../Database/Models/user.model.js";
import {productModel} from "../../Database/Models/product.model.js"
import { sendEmail } from "../../Email/email.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../../Middleware/catchError.js";
// import stripePackage from 'stripe';

// const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

//          Login and Registeration

const signUp = catchError(
    async (req, res) => {
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        req.body.role = 'user';
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

const googleAuth = catchError(passport.authenticate("google", { scope: ["profile", "email"] }));

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


//          Cart
const addToCart = async (req, res) => {
    const { productID, quantity } = req.body;
    const user = await userModel.findById(req.user._id);

    const product = await productModel.findById(productID);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = user.cart.items.find(item => item.productID.equals(productID));

    // Calculate the total quantity (existing quantity + new quantity)
    const totalQuantity = cartItem ? cartItem.quantity + quantity : quantity;

    // Check if the total quantity exceeds the product's stock
    if (product.stock < totalQuantity) {
        return res.status(400).json({ message: "Insufficient stock" });
    }

    // Update or add the product to the cart
    if (cartItem) {
        cartItem.quantity = totalQuantity;
        cartItem.itemTotalPrice = totalQuantity * product.price;
    } else {
        user.cart.items.push({
            productID,
            quantity: totalQuantity,
            itemTotalPrice: totalQuantity * product.price,
        });
    }

    // Recalculate the total bill
    user.cart.totalBill = user.cart.items.reduce((total, item) => total + item.itemTotalPrice, 0);

    // Save the updated user document
    await user.save();

    // Return the updated cart
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
};

const viewCart = catchError(
    async (req,res)=>{

        let currentUser = await userModel.findById(req.user._id).populate({
            path: "cart.items.productID", // Populate the product details
            model: "Product", // Your product model name
            select: "name price stock" // Select only the fields you need
          });

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        let userCart = await currentUser.cart;

        if(userCart.items.length > 0){
            res.status(200).json({message: "All Cart Items", userCart});
        }else{
            res.json({message:"Empty Cart!"});
        }
    }
);

const updateCartItemQuantity = catchError(
    async (req, res) => {
        const  productID  = req.params.productID; 
        const { quantity } = req.body; 

        const user = await userModel.findById(req.user._id);

        const cartItem = user.cart.items.find(item => item.productID.equals(productID));

        if (!cartItem) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        const product = await productModel.findById(productID);

        if (!product || product.stock < quantity) {
            return res.status(400).json({ message: "Product not available or insufficient stock" });
        }

        // Update the quantity and itemTotalPrice
        cartItem.quantity = quantity;
        cartItem.itemTotalPrice = quantity * product.price;
        user.cart.totalBill = user.cart.items.reduce((total, item) => total + item.itemTotalPrice, 0);

        // Save the updated user document
        const updatedCart = await userModel.findByIdAndUpdate(req.user._id, { cart: user.cart }, {new:true});

        // Return the updated cart
        res.status(200).json({
            message: "Cart item quantity updated",
            cart: user.cart
        });
    }
);

const removeFromCart = catchError(
    async (req, res) => {
        const productID = req.params.productID;

        const user = await userModel.findById(req.user._id);

        // Find the index of the product in the user's cart
        const cartItemIndex = user.cart.items.findIndex(item => item.productID.equals(productID));

        // Check if the product exists in the cart
        if (cartItemIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Remove the product from the cart
        user.cart.items.splice(cartItemIndex, 1);

        // Recalculate the total bill
        user.cart.totalBill = user.cart.items.reduce((total, item) => total + item.itemTotalPrice, 0);

        // Save the updated user document
        // await user.save();
        const updatedCart = await userModel.findByIdAndUpdate(req.user._id, { cart: user.cart }, {new:true});

        // Return the updated cart
        res.status(200).json({
            message: "Product removed from cart",
            cart: user.cart
        });
    }
);


export { 
    signUp, 
    signIn, 
    verifyEmail, 
    googleAuth, 
    googleCallback, 
    
    addToCart,
    viewCart,
    updateCartItemQuantity,
    removeFromCart
};
