import { catchError } from "../../Middleware/catchError.js";
import { userModel } from "../../Database/Models/user.model.js";

const getUsers = catchError(
    async (req, res)=>{
        let allUsers = await userModel.find({role:'user'});
        if(allUsers){
            allUsers.map(user=>user.cart=undefined);
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

const addUser = catchError(
    async (req,res)=>{
        let AddedUser= await userModel.insertMany(req.body);
        res.json({message: "user added successfully!"});
    }
)

export{
    getUsers,
    deleteUser,
    addUser
}