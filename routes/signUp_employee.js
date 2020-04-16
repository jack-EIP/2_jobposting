var express = require('express');
var router = express.Router();
var db = require("../model/m_db.js");

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('signUp', { msg: "success" });
  });

router.get("/signUp_employee",(req, res) => {
    res.render('signUp', { msg: "success" });
});
router.post("/signUp_employee",(req, res) => {
        console.log("dasdsadasdasdas");
        var email = req.body.email,
            password = req.body.pass;
            username = req.body.name;
        user.create({username: username, email: email, password: password}).then(function (user) {
              res.json(user);  
        });
    });

module.exports = router;