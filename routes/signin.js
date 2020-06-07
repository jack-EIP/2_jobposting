var express = require('express');
var router = express.Router();
var db = require("../model/m_db.js");
var app = require("../app.js");

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('v_signin', { msg: "success", link_logo: "/page_index/img/logo.png" });
  });

router.post("/",(req, res) => {
  if (!req.body.email || !req.body.pass)
  {
    res.render('v_signin', { msg: "invalid", link_logo: "/page_index/img/logo.png" });
  }
  else {
  var email = req.body.email,
      password = req.body.pass;
  db.User.findOne({ where: { email: email } }).then(function (user) {   
      if (!user) {
        console.log("1")
        res.render('v_signin', { msg: "failed", link_logo: "/page_index/img/logo.png" });
      } else if (req.body.pass != user.password) {
        res.render('v_signin', { msg: "failed", link_logo: "/page_index/img/logo.png" });
        console.log("2")
      } else {
        db.curentUser.create({idUser: user.id}).then(function (curentUser) {
          if (user.role == 1) {
            res.redirect('/employer_dashboard');
            console.log("3")
          } else if (user.role == 2) {
            console.log
            res.redirect('/');
          }
        });
      }
    });
  }
});

module.exports = router;