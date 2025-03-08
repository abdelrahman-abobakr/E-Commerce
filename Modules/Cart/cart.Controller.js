import { productModel } from "../../Database/Models/product.model";
import { userModel } from "../../Database/Models/user.model";

const addToCart = async (req, res) => {
    const { productID, quantity } = req.body;
    const user = await userModel.findById(req.user._id);

    // Check if product exists and has sufficient stock
    const product = await productModel.findById(productID);
    if (!product || product.stock < quantity) {
        return res.status(400).json({ message: "Product not available or insufficient stock" });
    }

    // Check if product is already in cart
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
};