import{ orderSchema} from "../Validation/orderValidation.js"

export const validateOrder = (req,res,next)=>{
    const validation = orderSchema.validate(req.body,{abortEarly:false});
    if(validation.error){
        res.status(400).json({
            errors: validation.error.details.map((err) => err.message)
        });
    }else{
        next();
    }
}