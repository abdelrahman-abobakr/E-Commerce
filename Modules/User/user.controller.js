import { userModel } from "../../Database/Models/user.model.js";
import { sendEmail } from "../../Email/email.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../../Middleware/catchError.js";

const signUp = catchError(

    async (req, res) => {

        req.body.password = bcrypt.hashSync(req.body.password, 8);
        const addUser = await userModel.insertMany(req.body)
        sendEmail(req.body.email);
        addUser[0].password = undefined
        res.status(201).json({ message: "created", addUser })

    }
);


const signIn = catchError(

    async (req, res) => {
        // Signin logic here
        let findUser = await userModel.findOne({ email: req.body.email });
        if (findUser && bcrypt.compareSync(req.body.password, findUser.password)) {

            if (findUser.isConfirmed == false) return res.status(401).json({ message: "You should verify your email before sign in!" });

            let token = jwt.sign({
                _id: findUser._id,
                name: findUser.name,
                role: findUser.role
            }, "iti");
            console.log(token);

            return res.status(200).json({ message: "Login successful", token });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }

    }
);

const verifyEmail = (req, res) => {
    const token = req.params.email;
    console.log(token);
    jwt.verify(token, "myEmail", async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const email = decoded;
        await userModel.findOneAndUpdate({ email: email }, { isConfirmed: true });
        res.json({ message: "Email is verified" });
    })


}

export {
    signUp,
    signIn,
    verifyEmail
}