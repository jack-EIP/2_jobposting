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
        db.Job.findAll(
          {
            where: {
              companyId: company.id
          },
          include: 
            {
              model: db.User,
              as: 'userRegistration'
            }
        }).then (function(job) {
          res.render('v_employer_dashboard',{link_logo: "/page_index/img/logo.png",job: job, numberOfCandidate: 0});
        });
      });
      console.log("3333333333333333333333333333333333",numberOfCandidate);
    }
  });
});

router.get('/candidate_list', function(req, res, next) {
  var jobs = [];
  var currentUser = 1;
  numberOfCandidate = 0;
  db.curentUser.findAll().then(function (currentUserinDB) { 
    if (currentUserinDB.length === 0) {  
      currentUser = 0 ;
    } else {
      currentUserId =  currentUserinDB[0].idUser;
      db.Company.findOne({where: {userId: currentUserinDB[0].idUser}}).then(function (company) {
        db.Job.findAll(
          {
            where: {
              companyId: company.id
          },
          include: 
            {
              model: db.User,
              as: 'userRegistration'
            }
        }).then (function(job) {
          console.log(job);
          res.render('v_candidate_list',{link_logo: "/page_index/img/logo.png",job: job, numberOfCandidate: 0});
        });
      });
      console.log("3333333333333333333333333333333333",numberOfCandidate);
    }
  });
});

router.get('/posted_job_list', function(req, res, next) {
  var jobs = [];
  var currentUser = 1;
  numberOfCandidate = 0;
  db.curentUser.findAll().then(function (currentUserinDB) { 
    if (currentUserinDB.length === 0) {  
      currentUser = 0 ;
    } else {
      currentUserId =  currentUserinDB[0].idUser;
      db.Company.findOne({where: {userId: currentUserinDB[0].idUser}}).then(function (company) {
        db.Job.findAll(
          {
            where: {
              companyId: company.id
          },
          include: 
            {
              model: db.User,
              as: 'userRegistration'
            }
        }).then (function(job) {
          console.log("RETURNNNNNNNNNNNNNNNNNNN",job);
          res.render('v_posted_job_list',{link_logo: "/page_index/img/logo.png",job: job, numberOfCandidate: 0});
        });
      });
    }
  });
});

router.post('/candidate_list/remove/:id1/:id2', function(req, res, next) {
  var currentUserRemoveId = req.params.id1;
  var currentJobRemoveId = req.params.id2;
  console.log("???????????????????",currentUserRemoveId,currentJobRemoveId);
  db.Applicant.destroy({where: {jobId: currentJobRemoveId, userId: currentUserRemoveId}}).then(function (param){
    console.log(param);
    res.redirect('/employer_dashboard/candidate_list');
  });
});

router.post('/job_posted_list/remove/:id', function(req, res, next) {
  var currentJobRemoveId = req.params.id;
  console.log("???????????????????",currentJobRemoveId);
  db.Job.destroy({where: {id: currentJobRemoveId}}).then(function (param){
    console.log(param);
    res.redirect('/employer_dashboard/posted_job_list');
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
