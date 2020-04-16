var express = require('express');
var router = express.Router();
var db = require("../model/m_db.js");

/* GET employer dashboard. */
router.get('/', function(req, res, next) {
  db.Job.findAll().then(function (job) {  
    console.log(job); 
    res.render('v_employerdb', { Job: job });
   });
});

// router.get('/postingJob', function(req, res, next) {
//     res.render('postingJob', { title: 'abc' });
//   });

router.get('/postingJob', function(req, res, next) {
  db.Job.findAll().then(function (job) {  
    console.log(job); 
    res.json({
      re: job
    });
   });
});

router.post('/postingJob/review', function(req, res, next) {
    res.json({
        Chucdanh: req.body.Chucdanh,
        Capbac: req.body.Capbac,
        Nganhnghe: req.body.Nganhnghe,
        Mota: req.body.Mota,
        Yeucaucongviec: req.body.Yeucaucongviec,
        Luongmin: req.body.Luongmin,
        Luongmax: req.body.Luongmax,
        Noilamviec: req.body.Noilamviec
    });
  });
  

module.exports = router;
