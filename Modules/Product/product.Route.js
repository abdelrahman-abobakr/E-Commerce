import express from "express";
import { createProduct } from "./product.Controller.js";
//import verifyToken from "../../Middleware/verifyToken.js"

 const productRoutes = express.Router();
//productRoutes.use(verifyToken);

productRoutes.post("/create", createProduct);


// productRoutes.get("/product/search/:name", getProductById);
// productRoutes.get("/product/:id", getProductById);
// productRoutes.get("/all", getAllProduct);


// productRoutes.get("/product/allProducts",getProducts)

// productRoutes.put("/update/:id", updateProduct);

// productRoutes.delete("/delete/:id", deleteProduct);


//, getProductById, getAllProduct, updateProduct, deleteProduct,getProducts


export default productRoutes;