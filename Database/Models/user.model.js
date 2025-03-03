import { Schema, model } from "mongoose";

const userSchema = Schema({
    // define the schema for the order collection
    name: String,
    email: String,
    password: String,
    phone: [],
    
    role:{
        type:String,
        enum:['admin','user'],
        default: 'user'
    },
    isVerified:Boolean,
    cart:{
        items:[
            {
                // itemID: {
                //     type:mongoose.Schema.Types.ObjectId,
                //     ref:"Product"
                // },
                itemID: Number,
                quantity:Number,
                itemTotalPrice:Number
            }
        ],
        totalBill:{
            type: Number,
            default:0
        }
    }


},{
    timestamps: true,
    versionKey: false
});

export const userModel = model("User", userSchema);