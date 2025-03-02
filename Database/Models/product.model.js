import { Schema, model } from "mongoose";

const productSchema = Schema({
    // define the schema for the order collection
    name: String

},{
    timestamps: true,
    versionKey: false
});

export const productModel = model("Product", productSchema);