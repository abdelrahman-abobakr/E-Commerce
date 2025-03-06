import { userSchema } from "../Validation/userValidation.js";

export const validateUser = (req,res,next)=>{
    const validation = userSchema.validate(req.body,{abortEarly:false});
    if(validation.error){
        res.status(400).json({
            errors: validation.error.details.map((err) => err.message)
        });
    }else{
        next();
    }
}