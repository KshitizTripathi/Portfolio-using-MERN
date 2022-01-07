const express=require("express");
const  mongoose=require("mongoose");
const dotenv=require("dotenv");
const app=express();
dotenv.config({path:"./config.env"});
// const User=require("./model/userSchema");
app.use(express.json());
app.use(require("./router/auth"));
const PORT=process.env.PORT;
mongoose.connect("mongodb://localhost:27017/mernstack", {useNewUrlParser: true});
app.listen(PORT,function(){
    console.log(`server started on port ${PORT}`);
});