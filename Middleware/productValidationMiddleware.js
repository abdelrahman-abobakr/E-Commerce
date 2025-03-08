import { productSchema } from "../Validation/productValidation.js";

export const validateProduct = (req,res,next)=>{
    const validation = productSchema.validate(req.body,{abortEarly:false});
    if(validation.error){
        res.status(400).json({
            errors: validation.error.details.map((err) => err.message)
        });
    }else{
        next();
    }
}