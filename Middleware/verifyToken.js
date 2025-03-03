import jwt from "jsonwebtoken"


 const verifyToken = (req, res, next) => {

    let token = req.headers["token"]
    jwt.verify(token, "key", async(err, decoaded) => {
        if (err) {
            res.status(401).json({ message: "Invalid token" })
        }else{
            req.user = decoaded
            next()
        }

    })


}
export default verifyToken;