var express = require('express');
var router = express.Router();
var db = require("../model/m_db.js");


var currentCompanyId = 0;
var currentUserId = 0;
var numberOfCandidate = 0;
/* GET employer dashboard. */
router.get('/', function(req, res, next) {
  var jobs = [];
  var currentUser = 1;
  numberOfCandidate = 0;
  db.curentUser.findAll().then(function (currentUserinDB) { 
    if (currentUserinDB.length === 0) {  
      currentUser = 0 ;
    } else {
      currentUserId =  currentUserinDB[0].idUser;
      db.Company.findOne({where: {userId: currentUserinDB[0].idUser}}).then(function (company) {
        db.Job.findAll({where: {companyId: company.id}}).then (function(job) {
          jobs = job;
          // for (var i = 0; i < job.length; i++)
          // {
          //   db.Applicant.findAll({where: {jobId: job[i].id}}).then (function (applicant) {
          //     numberOfCandidate += applicant.length;
          //     console.log("0000000000000000000000000000",numberOfCandidate);
          //   })
          //   console.log("11111111111111111111111111111",numberOfCandidate);
          // }
          job.forEach(element => {
            db.Applicant.findAll({where: {jobId: element.id}}).then (function (applicant) {
              numberOfCandidate += applicant.length;
              console.log("0000000000000000000000000000",numberOfCandidate);
            })
          });
          console.log("22222222222222222222222222222",numberOfCandidate);
          res.render('v_employer_dashboard',{link_logo: "/page_index/img/logo.png",job: job, numberOfCandidate: numberOfCandidate});
        });
      });
      console.log("3333333333333333333333333333333333",numberOfCandidate);
    }
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
    db.curentUser.findAll().then(function (currentUserinDB) { 
      if (currentUserinDB.length === 0) {  
        currentUser = 0 ;
      } else
      {
        currentUserId = currentUserinDB[0].idUser;
        db.Company.findOne({where: {userId: currentUserId}}).then(function (currentCompany) { 
          console.log("Tao la bo may:",currentCompany.id , currentUserId);
          if (currentCompany === 0) {  
            currentCompanyId = 0 ;
          } else
          {
            currentCompanyId = currentCompany.id;
            db.Job.create({Chucdanh: req.body.Chucdanh,
              Capbac: req.body.Capbac,
              Nganhnghe: req.body.Nganhnghe,
              Mota: req.body.Mota,
              Yeucaucongviec: req.body.Yeucaucongviec,
              Luongmin: req.body.Luongmin,
              Luongmax: req.body.Luongmax,
              Noilamviec: req.body.Noilamviec,
              companyId: currentCompanyId})
            .then(function (job) {
              res.redirect('/employer_dashboard');
            });
          }
        });
      }
    });
  }
});
  

module.exports = router;
