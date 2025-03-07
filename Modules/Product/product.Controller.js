import jwt from "jsonwebtoken";
import { productModel } from "../../Database/Models/product.model.js";
import mongoose from "mongoose";

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


    const updateProduct = async (req, res) => {
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
        const productId = req.params.id;
        //remove comment from this lines when you add token
    
        //const userId = req.user.id;
        //const userRole = req.user.role;
       // if ( userRole == 'admin') {
            const product = await productModel.findByIdAndUpdate(productId, req.body, { new: true });
        
        return res.status(200).json({ message: "Product updated successfully", data: product });
       // }
        // else {
        //     res.status(401).json({ message: "not allowed" });
        // }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
     };
    

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
     //remove comment from this lines when you add token
    // const userRole = req.user.role;
    const product = await productModel.findOne({ _id: productId });
    //only admin can delete product
    // if (userRole == 'admin') {
        await productModel.findByIdAndDelete(productId);
        res.status(200).json({ message: "product deleted" });
    // } else {
    //     res.status(401).json({ message: "Unauthorized" });
    // }
};

const getAllProduct = async (req, res) => {
    const allProduct = await productModel.find()
    //.populate("createdBy"); //remove comment whene add token
    res.status(200).json({ message: "done", data: allProduct });
};

const getProductsByNameOrPrice = async (req, res) => {
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
};






const getProductById = async (req, res) => {
    const productId = req.params.id;
    //console.log(id);
    const product = await productModel.findById({_id:productId})
    // .populate("createdBy");
    if (product) {
        res.status(200).json({ message: "done", data: product });
    } else {
        res.status(404).json({ message: "product not found" });
    }
};




export {
    createProduct,


    getProductsByNameOrPrice,
     getProductById,
     getAllProduct,

     updateProduct,

     deleteProduct,
};






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

// let updatedProduct = await productModel.findOne({ _id: productId }); //this line i delete it from update function




// const updateProduct = async (req, res) => {
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
    //         const productId = req.params.id;
    //         const product = await productModel.findByIdAndUpdate(productId, req.body, { new: true });
    //         return res.status(200).json({ message: "Product updated successfully", data: product });
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(400).json(error.message);
    //     }
    // }