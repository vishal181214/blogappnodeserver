const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name'],
        maxLength: [20, "20 Character max"],
        minLength: [3, "at least 3 Characters"]
    },
    number: {
        type: Number,
        required: [true, 'Enter phone number'],
        minLength: [10, 'phone number should be 10 digit']
    },
    email: {
        type: String,
        required: [true, 'Enter Email'],
    },
    password: {
        type: String,
        required: [true, 'Enter password'],
        select: true
    }
});

//to hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// to get jwt token 
userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},"ABCD",{
        expiresIn:"5d"
    })
}

module.exports = userSchema;