const checkAdmin = (req,res,next)=>{
    if(req.user.role=='admin'){
        next();
    }else{
        res.status(403).json({message:"Not Allowed Access !"});
    }
}

export default checkAdmin;