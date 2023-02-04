const express = require("express");

const router = new express.Router()
const ExpressError = require("../expressError");
const db = require("../db");
const {BCRYPT_WORK_FACTOR,SECRET_KEY }= require("../config");
const {authenticateJWT,ensureLoggedIn,ensureCorrectUser} = require("../middleware/auth")
const User=require("../models/user")

router.get("/",async function(req,res,next){
  let user = await User.all()
  return res.json({user})
})


/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/



router.get("/:username",async function(req,res,next){
  let {username} = req.params
  let user = await User.get(username)
  return res.json({user})
})
/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/


/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/


/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/



module.exports=router