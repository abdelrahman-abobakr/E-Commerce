
import { orderModel } from "../../Database/Models/order.model.js";
const getUserOrders =async (req,res)=>{
    const userOrders= await orderModel.find({customerId:req.params.id})
    res.status(200).json({message:"done",userOrders})
}
const getOrders = async (req,res)=>{
    const orders = await orderModel.find()
    res.status(200).json({message:"done",orders})
}
const addOrders = async (req,res)=>{
    const orders = await orderModel.insertMany(req.body)
    res.status(201).json({message: "added",orders})
}
const deleteOrders = async (req,res)=>{
    
    const  deletedOrder = await orderModel.findByIdAndDelete(req.params.id)
    res.json({message:"Done" , deletedOrder})
}

export{
    addOrders,
    deleteOrders ,
    getOrders,
    getUserOrders
}
