
import { orderModel } from "../../Database/Models/order.model.js";
const getOrders = async (req,res)=>{
    const orders = await orderModel.find()
    res.status(200).json({message:"done",orders})
}
const addItems = async (req,res)=>{
    const items = await orderModel.insertMany(req.body)
    res.status(201).json({message: "added",items})
}
const deleteItems = async (req,res)=>{
    
    const  deleteditem = await orderModel.filter(item => req.params.id!=item.id)
    res.json({message:"Done" , deleteditem})
}

export{
    addItems ,
    deleteItems ,
    getOrders
}