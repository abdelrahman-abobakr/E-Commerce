import jwt from "jsonwebtoken";
import { productModel } from "../../Database/Models/product.model.js";
import mongoose from "mongoose";


   

    // Assume the image is uploaded to a cloud storage service and you have the URL
    

  //  const createProduct = await productModel.create(req.body);
 


const createProduct = async (req, res) => {
    const userId = req.user.id;
   // req.body.createdBy = userId;
    req.body.image = `../../Resources/${ req.body.imageUrl}`;
    const createProduct = await productModel.insertMany([req.body]); 
    res.status(201).json(createProduct);
};

const getAllProduct = async (req, res) => {
    const allProduct = await productModel.find().populate("createdBy");
    res.status(200).json({ message: "done", data: allProduct });
};



const getProductById = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const product = await productModel.findById(id).populate("createdBy"); 
    //console.log(product);
    res.status(200).json({ message: "done", data: product });
};

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;
    let updatedProduct = await productModel.findOne({ _id: productId });
    console.log(updatedProduct);

    if (updatedProduct.createdBy == userId || userRole == 'admin') {
        updatedProduct = await productModel.updateOne({ _id: productId }, req.body); 
        res.status(200).json({ message: "product updated", updatedProduct });
    } else {
        res.status(401).json({ message: "not allowed" });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;
    const product = await productModel.findOne({ _id: productId });

    if (product.createdBy == userId || userRole == 'admin') {
        await productModel.findByIdAndDelete(productId);
        res.status(200).json({ message: "product deleted" });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export {
    createProduct,
    getProductById,
    getAllProduct,
    updateProduct,
    deleteProduct,
};
