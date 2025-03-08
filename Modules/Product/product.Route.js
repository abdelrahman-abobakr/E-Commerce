import express from "express";
import { createProduct ,updateProduct,deleteProduct, getProductsByNameOrPrice, getAllProduct, getProductById} from "./product.Controller.js"
import verifyToken from "../../Middleware/verifyToken.js"
import {validateProduct} from "../../Middleware/productValidationMiddleware.js"
import checkAdmin from "../../Middleware/checkAdmin.js";
const productRoutes = express.Router();
productRoutes.use(verifyToken);





productRoutes.post("/createproduct", checkAdmin, validateProduct, createProduct);

productRoutes.get("/search",getProductsByNameOrPrice) 

productRoutes.get("/product/:id", getProductById);
productRoutes.get("/all", getAllProduct);

 productRoutes.put("/update/:id", checkAdmin, updateProduct);

 productRoutes.delete("/delete/:id", checkAdmin, deleteProduct);

export default productRoutes;






