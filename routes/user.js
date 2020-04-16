var express = require('express');
var router = express.Router();
var db = require("../controller/db.js")

/* GET posting page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'abc' });
  res.status(200).json({
    success: "OK",
    screen: "Post a JOB"
  });
});