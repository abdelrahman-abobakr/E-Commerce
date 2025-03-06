import express from "express";
import { createProduct ,updateProduct,deleteProduct, getProductsByNameOrPrice, getAllProduct, getProductById} from "./product.Controller.js";
//import verifyToken from "../../Middleware/verifyToken.js"

 const productRoutes = express.Router();
//productRoutes.use(verifyToken);

productRoutes.post("/create", createProduct);


// productRoutes.get("/product/search/:name", getProductById);



productRoutes.get("/search",getProductsByNameOrPrice) //url in post man http://localhost:3000/search?keyword=productName&minPrice=10&maxPrice=100

productRoutes.get("/product/:id", getProductById);
productRoutes.get("/all", getAllProduct);


 productRoutes.put("/update/:id", updateProduct);

 productRoutes.delete("/delete/:id", deleteProduct);


//,,,getProducts


export default productRoutes;