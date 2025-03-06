import { catchError } from "../../Middleware/catchError.js";
import { userModel } from "../../Database/Models/user.model.js";

const getUsers = catchError(
    async (req, res)=>{
        let allUsers = await userModel.find({role:'user'});
        if(allUsers){
            res.status(200).json({message:"All Users", allUsers});
        }else{
            res.json({message:"No Users Found!"});
        }
    }
)
const deleteUser = async (req,res) =>{
    let deletedUser = await userModel.filter(user=>req.params.id != user.id)
    req.status(201).json({message:"deleted",deletedUser})
}

export{
    getUsers,
    deleteUser
}