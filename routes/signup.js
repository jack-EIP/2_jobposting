var express = require('express');
var router = express.Router();
var db = require("../model/m_db.js");


var roleEmployer = 0;
var roleEmployee = 0;

/* GET role login. */
router.get('/', function(req, res, next) {
  res.render('v_signup_role', { link_logo: "../page_signup_role/img/logo.png" });
});

router.get("/employersignup",(req, res) => {
  roleEmployer = 1;
  res.render('v_employer_signup', {msg: "valid", link_logo: "../page_signup_role/img/logo.png", role: 1 });
});

router.get("/employeesignup",(req, res) => {
  roleEmployee = 1
  res.render('v_employer_signup', {msg: "valid", link_logo: "../page_signup_role/img/logo.png", role: 2 });
});

router.post("/signup",(req, res) => {
  var email = req.body.email,
      password = req.body.pass;
      username = req.body.name;
      company_name = req.body.company_name;
      company_address = req.body.company_address;
      company_info = req.body.company_info;
  if (!email || !password || !username || !company_name || !company_address || !company_info)
  {
    console.log("?????????????????????????",roleEmployee);
    if (roleEmployer == 1) {
      res.render('v_employer_signup', {msg: "invalid_1", link_logo: "../page_signup_role/img/logo.png", role: 1 });
    } else if (roleEmployee == 1) {
      res.render('v_employer_signup', {msg: "invalid_1", link_logo: "../page_signup_role/img/logo.png", role: 2 });
    }
  } else {
    db.User.findAll({
      where: {email: req.body.email}
    }).then(function(user) {
      console.log(user)
      if (user.length === 0)
      {
        if (roleEmployer == 1) {
        db.User.create({username: username, email: email, password: password, role: 1})
        .then(function (user) {
          db.Company.create({Ten: company_name, Diachi: company_address, Thongtin: company_info, userId: user.id})
          .then(function (company) {
              roleEmployee = 0;
              roleEmployer = 0;
              res.redirect("/signin");
            });
          });
        } else if (roleEmployee == 1) {
          db.User.create({username: username, email: email, password: password, role: 2})
          .then(function (user) {
              roleEmployee = 0;
              roleEmployer = 0;
              res.redirect("/signin");
            });
        }
      } else {
        if (roleEmployer == 1) {
          res.render('v_employer_signup', {msg: "invalid_2", link_logo: "../page_signup_role/img/logo.png", role: 1 });
        } else if (roleEmployee == 1) {
          res.render('v_employer_signup', {msg: "invalid_2", link_logo: "../page_signup_role/img/logo.png", role: 2 });
        }
      }
    });
  }
});


module.exports = router;