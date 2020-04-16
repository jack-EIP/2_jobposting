var express = require('express');
var router = express.Router();
var db = require("../model/m_db.js");
var app = require("../app.js");

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { msg: "success", link_logo: "img/logo.png" });
  });

// router.post("/login", (req, res, next) => {
//   console.log(req.body.email);
//   var sql = "select * from user where email = ?"
//   var params = req.body.email;
//   var msg = "sucess";
//   var data = 0;
//   db.all(sql, params, (err, rows) => {
//       if (err) {
//         res.status(400).json({"error":err.message});
//         return;
//       }
//       console.log(rows);
//       if (rows.length === 0)
//       {
//         msg = "failed";
//         data = "0";
//         res.send({msg: "failed"});
//       } else {
//         data = rows;
//       }
//       //res.redirect("/loginPage");
//     });
// });

// router.post("/login", (req, res, next) => {
//   console.log(req.body.email);
//   user.findAll()
//       .then(user1 => {
//         console.log("user1");
//         res.json(user1);
//       })
//       .catch(err => {res.json(err); console.log(err)});
// }); 

router.post("/",(req, res) => {
  if (!req.body.email || !req.body.pass)
  {
    res.render('login', { msg: "invalid", link_logo: "img/logo.png" });
  }
  else {
  var email = req.body.email,
      password = req.body.pass;
  db.User.findOne({ where: { email: email } }).then(function (user) {   
      if (!user) {
        console.log("1")
        res.render('login', { msg: "failed", link_logo: "img/logo.png" });
      } else if (req.body.pass != user.password) {
        res.render('login', { msg: "failed", link_logo: "img/logo.png" });
        console.log("2")
      } else {
        db.curentUser.create({idUser: user.id}).then(function (user) {
          res.redirect('/employerdbPage');
          console.log("3")
        });
      }
    });
  }
});

module.exports = router;