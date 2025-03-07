import jwt from "jsonwebtoken"


 const verifyToken = (req, res, next) => {

    let token = req.headers["token"]
    jwt.verify(token, "key", async(err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Invalid from middleware" })
        }else{
            req.user = decoded;
            next();
        }

    })


}
export default verifyToken;