const express=require("express");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const router=express.Router();
const User=require("../model/userSchema");
const cookieParser=require("cookie-parser");
const authenticate=require("../middleware/authenticate");
mongoose.connect("mongodb://localhost:27017/mernstack", {useNewUrlParser: true});
router.use(cookieParser()) 
router.get("/",function(req,res){
    res.send("hello");
});
// router.get("/about",middleware,function(req,res){
//     res.send("hello about sefver");
// });
router.post("/register",function(req,res){
    // res.json({message:req.body});
    const {name,email,phone,work,password,cpassword}=req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"plz fill all details"});
    }
    User.findOne({email:email})
    .then((userExist)=>{
        if(userExist){
            return res.status(422).json({error:"email already exist"});
        }
        else if(password!=cpassword){
            return res.status(422).json({error:"password not matching"});
        }
        else{
        const user=new User({name,email,phone,work,password,cpassword});
        user.save().then(()=>{
            res.status(201).json({message:"user registered successfully"});
            
        }).catch((err)=> res.status(500).json({error:"failed to register"}));
    } }).catch(err=>{console.log(err); })
});
router.post("/signin",async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
           return res.status(400).json({error:"plz fill all details"});
        }
        const userLogin=await User.findOne({email:email});
        
        if(userLogin){
           const isMatch=await bcrypt.compare(password,userLogin.password);
           const token=await userLogin.generateAuthToken();
           console.log(token);
           res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
           }); //store token in cookie
           if(!isMatch){
                res.status(400).json({message:"password incorrect"});
           }
           else{
            res.json({message:"user signed in successfully"});
           }
        }
        else{
            res.status(400).json({message:"email not found"});
        }
    }
    catch(err){
        console.log(err);
    }
});
router.get("/about",authenticate,function(req,res){
    console.log("hello my about");
    res.send(req.rootUser);
});
router.get("/getdata",authenticate,function(req,res){
    console.log("hello my getdata");
    res.send(req.rootUser);
});
router.get("/logout",function(req,res){
    console.log("hello my logout page");
    res.clearCookie('jwtoken',{path:"/"});
    res.status(200).send("user logout");
});
module.exports=router;