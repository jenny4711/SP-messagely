const express = require("express");
const router = new express.Router()
const ExpressError = require("../expressError");
const db = require("../db");
const {BCRYPT_WORK_FACTOR,SECRET_KEY }= require("../config");
const {authenticateJWT,ensureLoggedIn,ensureCorrectUser} = require("../middleware/auth")
const User=require("../models/user")



/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/


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