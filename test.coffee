// example for product schema
{
    "pname":"lkjlj",
    "price":12,
    "reviews":[
        {
            "rid":1,
            "userID":{
                
            },
            "comment":"lkjdlkjlk",
            "rating":2
        },
        {
            "rid":1,
            "userID":{
                
            },
            "comment":"lkjdlkjlk",
            "rating":2
        }
    ]
}

// E-Commmerce --> database name

// product

{
    stock:number,
    price: number,
    image: string,
    description: string,
    name: string,
    reviews:[
        {
            rating: number,
            comment: string,
            createdBy: {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        }
    ]
}

// User

{
    name: string,
    email: string,
    password: string,
    phone:string [],
    ,
    role:{
        type:String,
        enum:['admin','user'],
        default: 'user'
    },
    isVerified:Boolean,
    cart:{
        items:[
            {
                itemID: {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product"
                },
                quantity:number,
                itemTotalPrice:number
            }
        ],
        totalBill:number
    }
}
userModel.cart.items.push({
    
})


// order
{
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
            quantity:number,
            itemTotalPrice:number
        }
    ],
    totalBill:number
}

//  schema  --> almostly finished
// routes , controller