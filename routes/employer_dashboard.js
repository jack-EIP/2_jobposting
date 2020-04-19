var express = require('express');
var router = express.Router();
var db = require("../model/m_db.js");

/* GET employer dashboard. */
router.get('/', function(req, res, next) {
  db.Job.findAll().then(function (job) {
    res.render('v_employer_dashboard', { Job: job, link_logo: "/page_index/img/logo.png" });
   });
});

router.get('/jobposting', function(req, res, next) {
  res.render('v_jobposting', {msg:"sucess", link_logo: "/page_index/img/logo.png" });
});

router.post('/jobposting', function(req, res, next) {
  console.log (req.body.Chucdanh  
    ,req.body.Capbac  
    ,req.body.Nganhnghe 
    ,req.body.Mota
    ,req.body.Yeucaucongviec
    ,req.body.Luongmin
    ,req.body.Luongmax
    ,req.body.Noilamviec);
  if ( !req.body.Chucdanh 
      || !req.body.Capbac  
      || !req.body.Nganhnghe 
      || !req.body.Mota
      || !req.body.Yeucaucongviec
      || !req.body.Luongmin
      || !req.body.Luongmax
      || !req.body.Noilamviec) {
    res.render('v_jobposting', {msg:"failed", link_logo: "/page_index/img/logo.png" });
  } else {
    // db.Job.create({Chucdanh: req.body.Chucdanh,
    //   Capbac: req.body.Capbac,
    //   Nganhnghe: req.body.Nganhnghe,
    //   Mota: req.body.Mota,
    //   Yeucaucongviec: req.body.Yeucaucongviec,
    //   Luongmin: req.body.Luongmin,
    //   Luongmax: req.body.Luongmax,
    //   Noilamviec: req.body.Noilamviec})
    // .then(function (Job) {
    // res.render('v_employer_dashboard', { Job: job, link_logo: "/page_index/img/logo.png" });
    // });
    res.redirect('/v_employer_dashboard');
  }
});
  

module.exports = router;
