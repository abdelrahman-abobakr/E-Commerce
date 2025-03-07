import passport from "passport";
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
        addUser[0].password = undefined;
        res.status(201).json({ message: "created", addUser });

    }
);

const signIn = catchError(

    async (req, res) => {
        // Signin logic here
        let findUser = await userModel.findOne({ email: req.body.email });
        if (findUser && bcrypt.compareSync(req.body.password, findUser.password) && (findUser.isVerified === true)) {
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
        await userModel.findOneAndUpdate({ email: email }, { isVerified: true });
        res.json({ message: "Email is verified" });
    });
}

// Google Authentication

const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

const googleCallback = catchError(async (req, res) => {
   
        const { id, displayName, emails } = req.user;
        let user = await userModel.findOne({ email: emails[0].value });

        if (!user) {
            user = await userModel.create({
                name: displayName,
                email: emails[0].value,
                googleId: id,
                isVerified: false  // User must verify his/her Email
            });

            sendEmail(user.email); // Send mail to user to verify his/her Email;
            return res.status(401).json({ message: "Please verify your email first" });
        }

        if (!user.isVerified) {
            return res.status(401).json({ message: "Email not verified. Check your inbox." });
        }

        let token = jwt.sign({ _id: user._id, name: user.name, role: user.role }, "AAAA");
        res.json({ message: "Login successful", token });
   
});

export { signUp, signIn, verifyEmail, googleAuth, googleCallback };
