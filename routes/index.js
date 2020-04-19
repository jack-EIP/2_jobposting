var express = require('express');
var router = express.Router();
var db = require("../model/m_db.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  var currentUser = 1;
  db.curentUser.findAll().then(function (currentUserinDB) {
    console.log("currentUserinDB", currentUserinDB.length); 
    if (currentUserinDB.length === 0) {  
      currentUser = 0 ;
    }
  });
  
  db.Job.findAll().then(function (job) {
    console.log("currentUser", currentUser); 
    res.render('v_index', {currentUser: currentUser, test: 0, job: job, link_logo: "../img/logo.png" });
   });
});

router.get('/signout', function(req, res, next) {
  db.curentUser.destroy({
    where: {},
    truncate: true
  }).then(function (user) {  
    console.log(user); 
    res.render('v_signout', { link_logo: "../img/logo.png" });
   });
});

router.get('/job_details/:id', function(req, res, next) {
  console.log(req.params);
  db.Job.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (Job_detail) {  
    console.log(Job_detail); 
    res.render('v_job_details',  { Job_detail: Job_detail, link_logo: "../img/logo.png" });
  });
});
  

module.exports = router;
