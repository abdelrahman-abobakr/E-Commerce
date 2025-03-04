import {Schema, model} from 'mongoose';

<<<<<<< HEAD
const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    cart: {
      items: [
        {
          productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1'],
          },
          itemTotalPrice: {
            type: Number,
            required: true,
          },
        },
      ],
      totalBill: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);
=======
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
>>>>>>> 5eb6d545e017b827073d9570987982e3339bc844

// Method to calculate itemTotalPrice and totalBill
userSchema.methods.updateCartTotals = async function () {
  let totalBill = 0;

  // Calculate itemTotalPrice for each item and update totalBill
  this.cart.items.forEach((item) => {
    item.itemTotalPrice = item.price * item.quantity; // Calculate itemTotalPrice
    totalBill += item.itemTotalPrice; // Add to totalBill
  });

  this.cart.totalBill = totalBill; // Update totalBill
  await this.save();
};

export const userModel = mongoose.model('User', userSchema);
