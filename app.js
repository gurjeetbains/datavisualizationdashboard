/////////Modules imports//////////
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
let basic = require('./routes/basic');
let s12 = require('./routes/s12route');
let n12 = require('./routes/n12route');
let n1 = require('./routes/n1');
////////Variables used///////
let app = express();
let router = express.Router();
let dist = path.join(__dirname);
////////App Set up///////////
app.use(express.static("public"));
app.set("view engine","ejs");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Session //
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
////////Routes//////////////
app.use('/',basic);
app.use('/',s12);
app.use('/',n12);
app.use('/',n1);
app.listen(4001, function () {
  console.log('Server is listening on port 4000!');
});
