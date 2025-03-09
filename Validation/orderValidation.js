import joi from "joi";
export const orderSchema = joi.object({
    
    customerId: joi.string()
        .required(),
    
    items: joi.array()
        .items(
            joi.object({
                itemID: joi.string().required(),
                quantity: joi.number().min(1).required(),
                itemTotalPrice: joi.number().min(0).required()
            }),
            
        ),

    totalBill: joi.number()
        .min(0)
        .required(),
   
});
