const mongoose = require('mongoose');

const resModel = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Enter Title'],
        maxLength: [25, "25 charactor max"],
    },
    catogery: {
        type: String,
        required: [true, 'Enter Catogery'],
    },
    imgurl: {
        type: String,
        required: [true, 'Enter Image url'],
    },
    desc:{
        type:String,
        required: [true, 'Enter Description'],
    }
})

module.exports = resModel;