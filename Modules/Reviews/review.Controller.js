import { productModel } from "../../Database/Models/product.model.js";
import { catchError } from "../../Middleware/catchError.js";

const getreviews = catchError(
    async (req,res)=>{
        let productId = req.params.id;

        let product = await productModel.findById(productId).populate('reviews.createdBy','name email _id');
        if(product){

            let productReviews = product.reviews;
            if(productReviews.length > 0){
                res.json({message:"Product reviews", productReviews});
            }else{
                res.json("This product doesn't have reviews!");
                
            }
        }else{
            res.json({message:"Product not found!"});
        }

    }
);





export{
    getreviews
}