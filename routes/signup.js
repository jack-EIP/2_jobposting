var express = require('express');
var router = express.Router();
var db = require("../model/m_db.js");

/* GET role login. */
router.get('/', function(req, res, next) {
  res.render('v_signup_role', { link_logo: "../page_signup_role/img/logo.png" });
});

router.get("/employer",(req, res) => {
  res.render('v_employer_signup', { link_logo: "../page_signup_role/img/logo.png" });
});

router.post("/employer/signup",(req, res) => {
  var email = req.body.email,
      password = req.body.pass;
      username = req.body.name;
  // db.User.create({username: username, email: email, password: password, role: 1}).then(function (user) {
  //     res.redirect("/loginPage");
  //     });
  res.redirect("/signin");
});


module.exports = router;