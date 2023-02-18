const express=require("express")
const {UserModel}=require("../models/User.model")
const jwt=require("jsonwebtoken")
const Router=express.Router()
const bcrypt=require("bcrypt")
Router.post("/register",async(req,res) =>
{
    const {email,password,name}=req.body
    try
    {
        bcrypt.hash(password,5,async(err,hash) =>
        {
            if(err)
            {
                res.send({"error":err.message})
            } else
            {
                const userOne=new UserModel({name,email,password:hash})
                await userOne.save()
               res.send({'msg':"User  is successfully registered"})
            }
        })
    } catch(err)
    {
        res.send({"error":err.message})
    }
})


Router.post("/login",async(req,res) =>{
    const {email,password}=(req.body)
    try
    {
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result) =>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"brar")
                    res.send({'msg':"User is successfully Login","token":token})
                } else{
                    res.send({'msg':err.message})
                }
            })
        } else{
            res.send({'msg':"Worng Credentials"})
        }
    } catch(err){
        res.send({"Error":err.message})
    }
})
Router.get("/",async(req,res) =>
{
    const users= await UserModel.find()
    res.send(users)
})
module.exports={Router}