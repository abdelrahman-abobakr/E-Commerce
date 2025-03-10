export function catchError(fn){
    return (req,res)=>{
        fn(req,res).catch(error=>{
            res.status(400).json({message:error});
        });
    }
}