import { Schema, model } from "mongoose";
<<<<<<< HEAD
import mongoose from "mongoose";
=======


>>>>>>> fc7936161618c4beabe7e721a7ba59d7b85d1139
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
        min: [0, "Stock must be a positive number"],
        default: 0
    },
    image: {
        type: String,
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
                required: true,
                default: 0

            },
            comment: {
                type: String,
                required: true
            },
            createdBy:{
                type: Schema.Types.ObjectId,
                ref: 'User',
               // required: true 
                required: false //change it to true when add login part
                

            }
        }
    ]

},
    {
        timestamps: true,
        versionKey: false
    }
);

export const productModel = model("Product", productSchema);
