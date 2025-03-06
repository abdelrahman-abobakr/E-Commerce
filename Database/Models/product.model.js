import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const productSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Product name is required"],
        minlength: [3, "Product name must be at least 3 characters"],
        maxlength: [30, "Product name must be at most 30 characters"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Product price must be a positive number"]
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required"],
        min: [0, "Stock must be a positive number"]
    },
    image: {
        type: Buffer,
        required: [true, "Product image is required"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        minlength: [6, "Description must be at least 6 characters"],
    },
    reviews: [
        {
            rating: {
                type: Number,
                min: [1, "Rating must be at least 1"],
                max: [5, "Rating must be at most 5"]
            },
            comment: {
                type: String,
            },
            createdBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: [true, "Review creator is required"]
            }
        }
    ]
}, {
    timestamps: true,
    versionKey: false
});

export const productModel = model("Product", productSchema);
