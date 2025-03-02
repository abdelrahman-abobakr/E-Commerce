import { Schema, model } from "mongoose";

const orderSchema = Schema({
    // define the schema for the order collection

},{
    timestamps: true,
    versionKey: false
});

export const orderModel = model("Order", orderSchema);