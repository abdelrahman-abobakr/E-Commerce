// import { string } from "joi";
import { Schema, model } from "mongoose";
import mongoose from 'mongoose';
const orderSchema = Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    items:[
        {
            itemID: {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            quantity:Number,
            itemTotalPrice:Number
        }
    ],
    totalBill:Number
},{
    timestamps: true,
    versionKey: false
});

export const orderModel = model("Order", orderSchema);