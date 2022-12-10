const express = require('express');
const cors=require('cors')

const bodyParser=require('body-parser');
const userRoute=require('./routes/userRoute');
const cardRoute =require('./routes/cardRoute')
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

app.use(cors())


app.use(userRoute);
app.use(cardRoute)

app.listen(process.env.PORT || 4000, () => {
    console.log("server is running");
})