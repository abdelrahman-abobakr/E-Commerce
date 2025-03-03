import { myConnection } from "./Database/dbConnection.js";
import express from "express";
// import userRoute from "./Modules/User/user.Route.js";

const app = express();
app.use(express.json());
// app.use(userRoute);
myConnection;

app.listen(3000, function(){
    console.log("server is running on port 3000");
})