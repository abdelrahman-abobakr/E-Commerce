import jwt from "jsonwebtoken";
import { productModel } from "../../Database/Models/product.model.js";
import mongoose from "mongoose";


// const createProduct = async (req, res) => {
   
//     try {
//         const { name, price, description, image, stock, reviews } = req.body;
//         switch (true) {
//             case !name:
//                 return res.status(400).json({ message: "Name is required" });
//             case !price:
//                 return res.status(400).json({ message: "Price is required" });
//             case !description:
//                 return res.status(400).json({ message: "Description is required" });
//             case !image:
//                 return res.status(400).json({ message: "Image is required" });
//             case !stock:
//                 return res.status(400).json({ message: "Count in stock is required" });
            
//             case !reviews:
//                 return res.status(400).json({ message: "Reviews is required" });

//         }

//         const product = new productModel({ name, price, description, image,stock,reviews });
//         await product.save();
//         return res.status(201).json({ message: "Product created successfully", data: product });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// const updateProduct = async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const { name, price, description, image, countInStock, rating, numReviews,
//             reviews } = req.body;

//         switch (true) {
//             case !name:
//                 return res.status(400).json({ message: "Name is required" });
//             case !price:
//                 return res.status(400).json({ message: "Price is required" });
//             case !description:
//                 return res.status(400).json({ message: "Description is required" });
//             case !image:
//                 return res.status(400).json({ message: "Image is required" });
//             case !countInStock:
//                 return res.status(400).json({ message: "Count in stock is required" });
//             case !rating:

//                 return res.status(400).json({ message: "Rating is required" });
//             case !numReviews:
//                 return res.status(400).json({ message: "Number of reviews is required" });
//             case !reviews:
//                 return res.status(400).json({ message: "Reviews is required" });
//         }
//         const product = await productModel.findByIdAndUpdate(productId, req.body, { new: true });
//         return res.status(200).json({ message: "Product updated successfully", data: product });
//     } catch (error) {
//         return res.status(400).json(error.message);
//     }
// }


// const deleteProduct = async (req, res) => {
//     const productId = req.params.id;
//     const userRole = req.user.role;
//     const product = await productModel.findOne({ _id: productId });
//     //only admin can delete product
//     if (userRole == 'admin') {
//         await productModel.findByIdAndDelete(productId);
//         res.status(200).json({ message: "product deleted" });
//     } else {
//         res.status(401).json({ message: "Unauthorized" });
//     }
// };




// const getProducts = async (req, res) => {
//     try {
       

//         const pageSize = 6;
//         const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};
//         const count = await productModel.countDocuments({ ...keyword });
//         const products = await productModel.find({ ...keyword }).limit(pageSize).sort({
//             _id:
//                 -1
//         });
//         return res.status(200).json({ message: "Products fetched successfully", 
//             data: products, 
//             page: 1,
//              pages: Math.ceil(count / pageSize),
//              hasMore: false 
//              });





//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ message: error.message });
//     }
// }









// const getAllProduct = async (req, res) => {
//     const allProduct = await productModel.find().populate("createdBy");
//     res.status(200).json({ message: "done", data: allProduct });
// };



// const getProductById = async (req, res) => {
//     const id = req.params.id;
//     console.log(id);
//     const product = await productModel.findById(id).populate("createdBy");
//     if (product) {
//         res.status(200).json({ message: "done", data: product });
//     } else {
//         res.status(404).json({ message: "product not found" });
//     }
// };




export {
    createProduct,


    // getProducts,


    // getProductById,
    // getAllProduct,
    // updateProduct,
    // deleteProduct,
};

const createProduct = async (req, res) => {
    try {
                const { name, price, description, image, stock, reviews } = req.body;
                switch (true) {
                    case !name:
                        return res.status(400).json({ message: "Name is required" });
                    case !price:
                        return res.status(400).json({ message: "Price is required" });
                    case !description:
                        return res.status(400).json({ message: "Description is required" });
                    case !image:
                        return res.status(400).json({ message: "Image is required" });
                    case !stock:
                        return res.status(400).json({ message: "Count in stock is required" });
                    
                    case !reviews:
                        return res.status(400).json({ message: "Reviews is required" });
        
                }
   // const userId = req.user.id;
   // req.body.createdBy = userId;
  
    const createProduct = await productModel.insertMany([req.body]);
    res.status(201).json(createProduct);
} catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }


// const updateProduct = async (req, res) => {
//     const productId = req.params.id;
//     const userId = req.user.id;
//     const userRole = req.user.role;
//     let updatedProduct = await productModel.findOne({ _id: productId });
//     console.log(updatedProduct);

//     if (updatedProduct.createdBy == userId || userRole == 'admin') {
//         updatedProduct = await productModel.updateOne({ _id: productId }, req.body);
//         res.status(200).json({ message: "product updated", updatedProduct });
//     } else {
//         res.status(401).json({ message: "not allowed" });
//     }
// };