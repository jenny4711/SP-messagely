/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
const express = require("express");
const jwt = require("jsonwebtoken")
const router = new express.Router()
const Router = require("express").Router;
const ExpressError = require("../expressError");
const {SECRET_KEY }= require("../config");
const {authenticateJWT,ensureLoggedIn,ensureCorrectUser} = require("../middleware/auth")
const User=require("../models/user")
const bcrypt=require("bcrypt")

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post('/register',async(req,res,next)=>{
  try{
    
    const {username,password,first_name,last_name,phone}= req.body;
    const user = await User.register({username,password,first_name,last_name,phone})
    let token = jwt.sign(user,SECRET_KEY);
    
    return res.json({user,token})


  }catch(e){
    return next(e)
  }
});

router.post('/login',async(req,res,next)=>{
  try{
    const { username,password }=req.body
   
    const user = await User.authenticate({username,password})
   
    let token = jwt.sign({user},SECRET_KEY);
    
    return res.json({user,token})


  }catch(e){
    return next(e)
  }
})

module.exports=router





// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imt5dW5nIiwiZmlyc3RfbmFtZSI6ImppIiwibGFzdF9uYW1lIjoibGVlIiwiaWF0IjoxNjc1NzE5ODA2fQ.iqJ3uet3B_RzCig4sx_PRkGch9yTRvybZhYjhpygFsI"