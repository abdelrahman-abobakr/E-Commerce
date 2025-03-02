import { myConnection } from "./Database/dbConnection.js";
import express from "express";
import { userModel } from "./Database/Models/user.model.js";
const app = express();
app.use(express.json());

myConnection;

app.listen(3000, function(){
    console.log("server is running on port 3000");
})