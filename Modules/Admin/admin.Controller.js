import { catchError } from "../../Middleware/catchError.js";
import { userModel } from "../../Database/Models/user.model.js";
import bcrypt from "bcrypt";

const getUsers = catchError(
    async (req, res)=>{
        // Step 1: Extract query parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        let allUsers = await userModel.find()
            .skip(skip)
            .limit(limit);

            
        if(allUsers){
            const totalUsers = await userModel.countDocuments();
    
            allUsers.forEach(user => {
                user.password = undefined;
                user.cart = undefined;
            });
            res.status(200).json({
                message: "Users fetched successfully",
                users: allUsers,
                totalUsers,
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit), // Calculate total pages
            });

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
const getUser = catchError(
    async (req, res) => {
        const userId = req.params.id;
        
        const user = await userModel.findOne({ _id: userId });
        if (user) {
            user.password = undefined;
            user.cart = undefined;
            res.status(200).json({ message: "user found" , user});
        } else {
            res.status(401).json({ message: "not found user" });
        }
    }
);
const addUser = catchError(
    async (req,res)=>{
        let findUser = await userModel.findOne({ email: req.body.email });
        if(!findUser){
            req.body.password = bcrypt.hashSync(req.body.password, 8);
            let AddedUser= await userModel.insertMany(req.body);
            res.json({message: "user added successfully!"});
        }else{
            res.status(400).json({message:"user already exists!"})
        }
    }
)

export{
    getUsers,
    deleteUser,
    addUser,
    getUser
}