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

const deleteUser = catchError(
    async (req, res) => {
        const userId = req.params.id;
        
        const user = await userModel.findOne({ _id: userId });
        if (user) {
            await userModel.findByIdAndDelete(userId);
            res.status(200).json({ message: "user deleted" });
        } else {
            res.status(401).json({ message: "not found user" });
        }
    }
);
const addUser = catchError(
    async (req,res)=>{
        let findUser = await userModel.findOne({ email: req.body.email });
        if(!findUser){
            let AddedUser= await userModel.insertMany(req.body);
            res.json({message: "user added successfully!"});
        }else{
            res.json({message:"user already exists!"})
        }
    }
)

export{
    getUsers,
    deleteUser,
    addUser
}