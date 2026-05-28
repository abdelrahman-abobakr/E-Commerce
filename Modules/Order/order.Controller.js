
import { orderModel } from "../../Database/Models/order.model.js";
import mongoose from "mongoose";
import { catchError } from "../../Middleware/catchError.js";


const getUserOrders = async (req, res) => {
    try {
       
        const customerId = req.params.id;
        const userOrders = await orderModel.find({ customerId: customerId }).populate({
            path: 'items.itemID', // Path to populate in the items array
            select: 'name', // Select only the product title
        });

        if (userOrders.length === 0) {
            return res.status(404).json({ message: "No orders found for this customer" });
        }

        res.status(200).json({
            message: "Orders fetched successfully",
            userOrders
        });
    } catch (error) {
     
        console.log(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

const getOrders = catchError(
    async (req,res)=>{
        const orders = await orderModel.find()
        res.status(200).json({message:"done",orders})
    }
);

// const addOrders = catchError(
//     async (req,res)=>{
   
//         const orders = await orderModel.insertMany(req.body)
        
//         res.status(201).json({message: "added",orders})
//     }
// );

const deleteOrders = catchError(
    async (req,res)=>{
        const orderId = req.params.id;
        const  deletedOrder = await orderModel.findByIdAndDelete( req.params.id)
        res.json({message:"Done" , deletedOrder})
    }
);

const updatedOrders = catchError(
    async (req,res)=>{
        const orderId = req.params.id;
        const updatedOrder =await orderModel.findByIdAndUpdate(req.params.id,req.body,{new:true}) 
        res.json({message:"Updated",updatedOrder})
    }
);

export{
    // addOrders,
    deleteOrders ,
    getOrders,
    getUserOrders,
    updatedOrders
}
