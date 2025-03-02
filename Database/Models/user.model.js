import { Schema, model } from "mongoose";

const userSchema = Schema({
    // define the schema for the order collection
    name: String

},{
    timestamps: true,
    versionKey: false
});

export const userModel = model("User", userSchema);