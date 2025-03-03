import express from "express";
import { createProduct, getProductById, getAllProduct, updateProduct, deleteProduct } from "product.Controller.js";
import verifyToken from "../../Middleware/verifyToken.js"

export const productRoutes = express.Router();
//productRoutes.use(verifyToken);

productRoutes.post("/create", createProduct);


productRoutes.get("/product/search/:name", getProductById);
productRoutes.get("/product/:id", getProductById);
productRoutes.get("/all", getAllProduct);


productRoutes.put("/update/:id", updateProduct);

productRoutes.delete("/delete/:id", deleteProduct);
