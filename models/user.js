/** User class for message.ly */
const db = require("../db")
const ExpressError=require("../expressError")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
const {BCRYPT_WORK_FACTOR,SECRET_KEY }= require("../config");
const e = require('express');




/** User of the site. */

class User {
  constructor(username,password,first_name,last_name,phone){
    this.username =username;
    this.password=password;
    this.first_name=first_name;
    this.last_name=last_name;
    this.phone=phone
  }

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) { 
    const hashedPassword=await bcrypt.hash(password,BCRYPT_WORK_FACTOR);
    const result = await db.query(
      `INSERT INTO users (username,password,first_name,last_name,phone,join_at)
      VALUES($1,$2,$3,$4,$5,current_timestamp)
      RETURNING username,first_name,last_name`
      ,[username, hashedPassword, first_name, last_name, phone]
      
    )
   return result.rows[0]

  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const result = await db.query(`
    SELECT password
    FROM users
    WHERE username=$1`,
    
    [username]);
    const user =result.rows[0];
    
    
    return user  && bcrypt.compareSync(password,user.password)
   }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) { }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() { 
    const result = await db.query(`
    SELECT *
    FROM users
    
    `);
    return result.rows
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) { 
    const result = await db.query(`
    SELECT *
    FROM users
    WHERE username = $1`,
    [username])
    return result.rows[0]
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) { }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) { }
}


module.exports = User;



