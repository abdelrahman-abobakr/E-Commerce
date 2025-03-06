import joi from "joi";

const userValid = joi.object({
    name: joi.string().min(3).max(30).required().messages({
        "string.empty": "Name can't be empty",
        "string.min": "Name must be at least 3 characters long",
    }),
    
    email: joi.string().email().required().messages({
        "string.email": "Invalid email format",
    }),
    password: joi.string()
                 .min(6)
                 .max(20)
                 .required()
                 .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$"))
                 .messages({
                    "string.pattern.base": "Password must contain at least one letter and one number",
                 }),
    age: joi.number().integer().min(18).max(99).required().messages({
        "number.min": "You must be at least 18 years old",
        "number.max": "Age can't be more than 99",

    }),
    phone: joi.string()
           .pattern(new RegExp("^[0-9]{10,15}$"))
           .required()
           .messages({
            "string.pattern.base": "Phone number must be 10-15 digits",
           }),
    role: joi.string().valid("user", "admin").default("user"),
    isConfirmed: joi.boolean().default(false),
});

export default userValid;