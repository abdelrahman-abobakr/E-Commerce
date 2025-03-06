import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import {emailTemplate} from "./emailTemplate.js"

export async function sendEmail(email){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "abdelrahmanabobakr321@gmail.com",
            pass: "tend kvny kfrr hjef",
        }
    });
    const myEmail = jwt.sign(email, "myEmail");
    
    // send mail with defined transport object
    const info = await transporter.sendMail({
    from: '"E-Commerce " <abdelrahmanabobakr321@gmail.com>',
    to: email, 
    subject: "Hello ✔",
    text: "Welcome to our E-Commerce site",
    html: emailTemplate(myEmail),
    });
    
}
