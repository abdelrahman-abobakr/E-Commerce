import { userModel } from "../Database/Models/user.model.js";
import bcrypt from "bcrypt";

export const checkEmail = async (req, res, next) => {
    const findUser = await userModel.findOne({ email: req.body.email });
    if (findUser) return res.status(409).json({ message: "User already exists" });
    next();
}
