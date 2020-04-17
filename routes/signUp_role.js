var express = require('express');
var router = express.Router();
var db = require("../model/m_db.js");

/* GET role login. */
router.get('/', function(req, res, next) {
  res.render('signUp_role', { link_logo: "img/logo.png" });
});

router.get("/signUpEmployeePage",(req, res) => {
  res.render('signUp_employee', { link_logo: "../img/logo.png" });
});

router.post("/signUpEmployeePage/signUp_employee",(req, res) => {
  console.log("dasdsadasdasdas");
  var email = req.body.email,
      password = req.body.pass;
      username = req.body.name;
    db.User.create({username: username, email: email, password: password, role: 1}).then(function (user) {
            
      
      res.redirect("/loginPage");
      });
  });


module.exports = router;
