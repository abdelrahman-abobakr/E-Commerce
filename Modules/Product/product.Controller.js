import jwt from "jsonwebtoken";
import  {productModel } from "../../Database/Models/product.model.js";
import mongoose from "mongoose";
import { catchError } from "../../Middleware/catchError.js";


const createProduct = catchError(
    async (req, res) => {
    
        if(req.body.reviews){
            req.body.reviews.forEach(review => {
                review.createdBy = req.user._id;  
            });
        }
        const newProduct = await productModel.insertMany(req.body);
        res.status(201).json({newProduct});
    }
);

const updateProduct = catchError(
    async (req, res) => {
        const productId = req.params.id;
        
        const product = await productModel.findByIdAndUpdate(productId, req.body, { new: true });
        return res.status(200).json({ message: "Product updated successfully", data: product });
    }
);
    

const deleteProduct = catchError(
    async (req, res) => {
        const productId = req.params.id;
        
        const product = await productModel.findOne({ _id: productId });
        if (product) {
            await productModel.findByIdAndDelete(productId);
            res.status(200).json({ message: "product deleted" });
        } else {
            res.status(401).json({ message: "not found product" });
        }
    }
);

const getAllProduct = catchError(
    async (req, res) => {
        const allProduct = await productModel.find()
        //console.log(allProduct) 
        res.status(200).json({ message: "done", data: allProduct });
    }
);

// search by name and range of price
const getProductsByNameOrPrice = catchError(
    async (req, res) => {
        try {
           
            const keyword = req.query.keyword ? { name: { $regex: req.query.keyword.trim(), $options: 'i' } } : {};
    
            console.log('Keyword:', keyword);
    
            
            const priceRange = {};
            if (req.query.minPrice) {
                priceRange.price = { ...priceRange.price, $gte: req.query.minPrice };
            }
            if (req.query.maxPrice) {
                priceRange.price = { ...priceRange.price, $lte: req.query.maxPrice };
            }
    
         
            const query = { ...keyword, ...priceRange };
            console.log('Query:', query);
    
           
            const products = await productModel.find(query);
    
            console.log('Fetched products:', products);
    
            if (products.length === 0) {
                return res.status(404).json({ message: "No products found" });
            }
    
            return res.status(200).json({
                message: "Products fetched successfully",
                data: products
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    }
);



const getProductById = catchError(
    async (req, res) => {
        const productId = req.params.id;
        const product = await productModel.findById({_id:productId})
        if (product) {
            res.status(200).json({ message: "done", data: product });
        } else {
            res.status(404).json({ message: "product not found" });
        }
    }
);


export {
     createProduct,

     getProductsByNameOrPrice,
     getProductById,
     getAllProduct,
 
     updateProduct,
     deleteProduct
};






