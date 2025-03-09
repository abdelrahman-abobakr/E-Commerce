import joi from "joi";

const userSchema = joi.object({

    name: joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty":"Name must not be empty",
            "string.min":"Name at least has 3 characters",
            "string.max":"Name has maximum 30 characters"
        }),

    email: joi.string()
        .email()
        .required()
        .messages({
            "string.empty":"Email must not be empty",
            "string.email":"Invalid email format"
        }),

    password: joi.string()
        .pattern(new RegExp(/^[A-Za-z\d@$]{6,}$/))
        .required()
        .messages({
            "string.pattern.base":"Not matching password format (capital and small letters, numbers, @ $ special characters and at length is at least 6 ",
            "string.empty":"password field is required"
        }),

    phone:joi.array()
        .items(joi.string()),

    role: joi.string()
        .valid("user", "admin")
        .default("user"),

    isConfirmed: joi.boolean()
        .default(false),

    cart: joi.object({
        items: joi.array()
            .items(
                joi.object({
                    itemID: joi.string().required(),
                    quantity: joi.number().min(1).required(),
                    itemTotalPrice: joi.number().min(0).required()
                })
            )
            .default([]),
        totalBill: joi.number().default(0)
    })
    
});

export default userSchema;