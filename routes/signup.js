var express = require('express');
var router = express.Router();
var db = require("../model/m_db.js");

/* GET role login. */
router.get('/', function(req, res, next) {
  res.render('v_signup_role', { link_logo: "../page_signup_role/img/logo.png" });
});

router.get("/signup",(req, res) => {
  res.render('v_employer_signup', {msg: "valid", link_logo: "../page_signup_role/img/logo.png" });
});

router.post("/signup",(req, res) => {
  var email = req.body.email,
      password = req.body.pass;
      username = req.body.name;
      company_name = req.body.company_name;
      company_address = req.body.company_address;
      company_info = req.body.company_info;
  db.User.findAll({
    where: {email: req.body.email}
  }).then(function(user) {
    console.log(user)
    if (user.length === 0)
    {
      db.User.create({username: username, email: email, password: password, role: 1})
      .then(function (user) {
        db.Company.create({Ten: company_name, Diachi: company_address, Thongtin: company_info, userId: user.id})
        .then(function (company) {
            res.redirect("/signin");
          });
        });
    } else {
      res.render('v_employer_signup', {msg: "invalid", link_logo: "../page_signup_role/img/logo.png" });
    }
  });
});


module.exports = router;