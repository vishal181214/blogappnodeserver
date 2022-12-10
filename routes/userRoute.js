const express = require("express");
const userRoute = express.Router();
const mongoose = require('mongoose');
const userSchema = require('../schema/userSchema')
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb+srv://vishalgai:LbY6QdZ0tcd0j1OA@cluster0.apnmfbt.mongodb.net/?retryWrites=true&w=majority/ReactBlogServerData", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected with mongodb");
    })
    .catch((err) => {
        console.log(err);
    });

const userModel = new mongoose.model("userData", userSchema)
userRoute.post("/signup", async (req, res) => {

    const bodyData = req.body;
    const name = bodyData.name;
    const number = bodyData.number;
    const email = bodyData.email;
    const password = bodyData.password;
    console.log(name, number, email, password);

    const output = await userModel.create({
        name, number, email, password
    });
    const token = output.getJwtToken();
    console.log(token);

    res.status(200).json({
        success: true,
        message: "User Register Successfully",
        "token":token
    })
})

//login routes
userRoute.post('/login', async (req, res) => {
    const bodyData = req.body;
    const email = bodyData.email;
    const password = bodyData.password;
    const userData = await userModel.findOne({email:email});
    console.log(userData);
    let token = userData.getJwtToken();
    if (!userData) {
        return res.json({ status: 200, message: "Not Registered! Please Register yourself. ","key":0,"token":null })
    } else {
        const result2 = await bcrypt.compare(password, userData.password);
        if (result2) {
            console.log("match");
            return res.json({ status: 200, message: "Login Successful","key":1,"token":token })
        } else {
            return res.json({ status: 200, message: "Invalid Credentials","key":0,"token":null })
        }

    }
})

// const sendToken = (user, statusCode, res,msg,key) => {
//     const token = user.getJwtToken();
//     //option for cookie
//     const options = {
//         expires: new Date(
//             Date.now() + 1 * 24 * 60 * 60 * 1000
//         ),
//         httpOnly: true
//     };
//     res.status(statusCode).cookie("token", token, options).json({
//         "success": true,
//         "user":user,
//         "token":token,
//         "key":key,
//         "message":msg
//     })
// }


module.exports = userRoute;