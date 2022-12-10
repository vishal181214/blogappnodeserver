const express = require("express");
const cardRoute = express.Router();
const mongoose = require('mongoose');
const cardSchema = require('../schema/cardSchema')

mongoose.connect("mongodb+srv://vishalgai:LbY6QdZ0tcd0j1OA@cluster0.apnmfbt.mongodb.net/?retryWrites=true&w=majority/ReactBlogServerData", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected with mongodb");
    })
    .catch((err) => {
        console.log(err);
    });

const cardModel = new mongoose.model("cardData", cardSchema);
// create card
cardRoute.post("/createcard", async (req, res) => {
    // const bodyData = req.body;
    // const title = bodyData.title;
    // const catogery = bodyData.catogery;
    // const imgurl = bodyData.imgurl;
    // const desc = bodyData.desc;
    // console.log(title, catogery, imgurl, desc);

    const output = await cardModel.create(req.body);
    res.status(200).json({
        success: true,
        message: "Card added successfully"
    })
});

// get all card
cardRoute.get('/getallcard', async (req, res) => {
    const output = await cardModel.find()
    res.status(200).json({
        success: true,
        output
    });
});

// bollywood card
cardRoute.get('/bollywood', async (req, res) => {
    const output = await cardModel.find({
        "catogery": "bollywood"
    })
    res.status(200).json({
        success: true,
        output
    });
});

// get hollywood card
cardRoute.get('/hollywood', async (req, res) => {
    const output = await cardModel.find({
        "catogery": "hollywood"
    })
    res.status(200).json({
        success: true,
        output
    });
});

//get fitness card
cardRoute.get('/fitness', async (req, res) => {
    const output = await cardModel.find({
        "catogery": "fitness"
    })
    res.status(200).json({
        success: true,
        output
    });
});

// get food card
cardRoute.get('/food', async (req, res) => {
    const output = await cardModel.find({
        "catogery": "food"
    })
    res.status(200).json({
        success: true,
        output
    });
});

// get technology card
cardRoute.get('/technology', async (req, res) => {
    const output = await cardModel.find({
        "catogery": "technology"
    })
    res.status(200).json({
        success: true,
        output
    });
});
module.exports = cardRoute;