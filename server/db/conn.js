const mongoose=require('mongoose');
const url=process.env.url;

mongoose.connect(url,{
    useNewUrlParser:true
}).then(()=>{
    console.log("Connected");
}).catch((err)=> console.log(err));