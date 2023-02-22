/** Express app for message.ly. */


const express = require("express");
const cors = require("cors");
const { authenticateJWT } = require("./middleware/auth");

const ExpressError = require("./expressError")
const app = express();

// allow both form-encoded and json body parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// allow connections to all routes from any browser
app.use(cors());

// get auth token for all routes
app.use(authenticateJWT);

/** routes */

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const messageRoutes = require("./routes/messages");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (process.env.NODE_ENV != "test") console.error(err.stack);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;






// {
// 	"user": {
// 		"username": "jjj",
// 		"first_name": "jenny",
// 		"last_name": "lee"
// 	},
// 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpqaiIsImZpcnN0X25hbWUiOiJqZW5ueSIsImxhc3RfbmFtZSI6ImxlZSIsImlhdCI6MTY3NzA5ODIwN30.v1hA4Beriu88pOI8d0EOg94iiEr3N6DDkZCdLyo7pjk"
// }










// {
// 	"username":"jenny",
// 	"password":"jenny4711!!"

// }
// {
// 	"username": "jenny",
// 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Implbm55IiwiaWF0IjoxNjc3MDk5NjkzfQ.0BES5Z0N_7gj2G7HlfzJaPf_GUCJ2PvaxHQf29QPsBM"
// }






// {
// 	"username":"jjj",
// 	"password":"jenny4711!!"

// }
// {
// 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzcwOTk5MzB9.J0TBFQrbg6hrADtE3TYSsjzainxjn76NP-XN7hbVPtw"
// }


// {
// 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzcxMDA3OTh9.Ky60EFC33yabNMSs_vWLJiTzgmlF0j2ivc9u-k-EZjI"
// }