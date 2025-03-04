// import { userModel } from "../../Database/Models/user.model.js";

// export const signUp = async (req,res)=>{

//     let foundUser = await userModel.findOne({email: req.body.email});
//     if(foundUser){
//         res.status(409).json({message:"user already exists!"})
//     }else{
//         req.body.role = 'user',
//         req.body.cart = {}
//         const addedUser = await userModel.insertMany(req.body);
//         res.status(201).json({message:"done", addedUser});
//     }
// }
