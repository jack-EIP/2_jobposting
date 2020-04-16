var express = require('express');
var router = express.Router();
var db = require("../model/m_db.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Job.findAll().then(function (job) {  
    //console.log(job); 
    res.render('index', { test: 0, job: job });
   });
  });

router.get('/signout', function(req, res, next) {
  db.curentUser.destroy({
    where: {},
    truncate: true
  }).then(function (user) {  
    console.log(user); 
    res.render('signout_page',  { link_logo: "../img/logo.png" });
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
      res.render('detailJob',  { Job_detail: Job_detail, link_logo: "../img/logo.png" });
    });
  });
  

module.exports = router;
