import joi from "joi"

export const productSchema = joi.object({
    name: joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty":"Name must not be empty",
            "string.min":"Name at least has 3 characters",
            "string.max":"Name has maximum 30 characters"
        }),

    description: joi.string()
        .min(10)
        .max(150)
        .messages({
            "string.min":"Description hahe at least 10 characters ",
            "string.max":"Description has maximum 150 characters"
        }),
    
    price: joi.number()
        .min(0)
        .required(),
    
    stock: joi.number()
        .min(0)
        .required(),

    image: joi.string()
        .pattern(/\.(jpg|jpeg|png|gif|webp)$/i)
        .required()
        .messages({
            "string.pattern.base": "Not valid image format"
        }),
    
    reviews: joi.array()
        .items(
            joi.object({
                rating: joi.number()
                    .min(0)
                    .max(5)
                    .default(0),

                comment: joi.string()
                    .min(5)
                    .max(100)
                    .required(),
                
                createdBy: joi.string()
                    // .required()
                    // .messages({
                    //     "string.empty":"userID can not be empty",
                    // }) 
            })
        )
    
})