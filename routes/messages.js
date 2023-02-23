const express = require("express");
const router = new express.Router()
const ExpressError = require("../expressError");
const db = require("../db");
const {BCRYPT_WORK_FACTOR,SECRET_KEY }= require("../config");
const {authenticateJWT,ensureLoggedIn,ensureCorrectUser} = require("../middleware/auth")
const User=require("../models/user")
const Message=require("../models/message")

router.get("/:id",ensureLoggedIn,async (req,res,next)=>{
  let {id}=req.params
  let msg = await Message.get(id)
  return res.json({msg})
})



/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/


router.post("/",async (req,res,next)=>{
  let {from_username, to_username, body}=req.body;
  let msg = await Message.create({from_username, to_username, body})
  return res.json({msg})
})
/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post("/:id/read",async (req,res,next)=>{
  let {id} = req.params;
  let msg = await Message.markRead(id)
  return res.json({msg})
})

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

module.exports=router