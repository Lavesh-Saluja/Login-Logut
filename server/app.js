const express=require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const mongoose=require('mongoose');
const dotenv = require("dotenv");
const cookiePraser=require('cookie-parser');
dotenv.config({path:'./config.env'});
app.use(express.json());
app.use(cookiePraser());
const port=process.env.PORT;

require("./db/conn")
const User=require("./models/userSchema")
app.listen(port,()=>{
    console.log("App running")
});
app.use("/",require("./router/auth"));