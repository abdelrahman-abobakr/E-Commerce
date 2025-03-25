import { getreviews } from "./review.Controller.js";
import verifyToken from "../../Middleware/verifyToken.js";
import express from "express";


const reviewRouter = express.Router();

reviewRouter.get("/reviews/:id",getreviews);


export default reviewRouter;