
import { orderModel } from "../../Database/Models/order.model.js";
import mongoose from "mongoose";
const getUserOrders =async (req,res)=>{
    // customerId.trim()
    const customerId = req.params.id;
    const userOrders= await orderModel.find({customerId: req.params.id})
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
    const orderId = req.params.id;
    const  deletedOrder = await orderModel.findByIdAndDelete( req.params.id)
    res.json({message:"Done" , deletedOrder})
}
const updatedOrders = async (req,res)=>{
    const orderId = req.params.id;
    const updatedOrder =await orderModel.findByIdAndUpdate(req.params.id,req.body,{new:true}) 
    res.json({message:"Updated",updatedOrder})
}
export{
    addOrders,
    deleteOrders ,
    getOrders,
    getUserOrders,
    updatedOrders
}
