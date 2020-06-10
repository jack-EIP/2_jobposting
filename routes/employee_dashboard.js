var express = require('express');
var router = express.Router();
var db = require("../model/m_db.js");


var currentCompanyId = 0;
var currentUserId = 0;
var numberOfCandidate = 0;
var jobList = [];
/* GET employer dashboard. */
router.get('/', function(req, res, next) {
  db.curentUser.findAll().then (function (curentUser) {
     currentUserId = curentUser[0].idUser;
     console.log(curentUser);
    db.Applicant.findAll().then (function(applicant){
      if (applicant.length == 0)
      {
        res.render('v_employee_dashboard',{link_logo: "/page_index/img/logo.png", applicant: applicant});
      }
      else
      {
        db.User.findAll({
          include: [
            {
              model: db.Job,
              as: 'jobRegistration',
              include : [
                {
                  model: db.Company
                }
              ]
            }
          ],
          where : {
            id: currentUserId
          }
        }).then(function (applicant) {
          res.render('v_employee_dashboard',{link_logo: "/page_index/img/logo.png", applicant: applicant[0].jobRegistration});
        });
      }
    });
  });
});


router.post('/remove/:id', function(req, res, next) {
  var currentJobRemoveId = req.params.id;
  db.Applicant.destroy({where: {jobId: currentJobRemoveId, userId: currentUserId}}).then(function (param){
    res.redirect('/employee_dashboard');
  });
});
  
module.exports = router;
