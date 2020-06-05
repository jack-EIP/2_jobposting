var express = require('express');
var router = express.Router();
var db = require("../model/m_db.js");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var totalPage = 0;
var jobPerPage = 5;

var link_logo = "../page_index/img/logo.png";


/*Applying job varible */
var currentJobSelectedId = 0;
var currentAppplicantId = 0;


db.Job.findAll().then(function (job) {
  totalPage = job.length / jobPerPage;
 });


/* GET home page. */
router.get('/', function(req, res, next) {
  var currentUser = 1;
  db.curentUser.findAll().then(function (currentUserinDB) {
    console.log("currentUserinDB_get1", currentUserinDB.length); 
    if (currentUserinDB.length === 0) {  
      currentUser = 0 ;
    }
  });

  db.Job.findAll({ offset: 0, limit: 5 }).then(function (job) {
    res.render('v_index', {currentUser: currentUser, test: 0, job: job, link_logo: link_logo, totalPage: totalPage });
   });
});

router.get('/joblist/page/:page', function(req, res, next) {
  var offset = (req.params.page * jobPerPage) - jobPerPage;
  var currentUser = 1;

  db.curentUser.findAll().then(function (currentUserinDB) {
    console.log("currentUserinDB_get2", currentUserinDB.length); 
    if (currentUserinDB.length === 0) {  
      currentUser = 0 ;
    }
  });

  db.Job.findAll({ offset: offset, limit: jobPerPage}).then(function (job) {
    res.render('v_job_list', {currentUser: currentUser, test: 0, job: job, link_logo: "../../page_index/img/logo.png", totalPage: totalPage });
  });
});

router.get('/signout', function(req, res, next) {
  db.curentUser.destroy({
    where: {},
    truncate: true
  }).then(function (user) {  
    console.log(user); 
    res.render('v_signout', { link_logo: link_logo });
   });
});

router.get('/job_details/:id', function(req, res, next) {
  var currentUser = 1;
  currentJobSelectedId = req.params.id;
  db.curentUser.findAll().then(function (currentUserinDB) {
    console.log("currentUserinDB_get2", currentUserinDB.length); 
    if (currentUserinDB.length === 0) {  
      currentUser = 0 ;
    }
  });

  db.Job.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (Job_detail) { 
    res.render('v_job_details',  { Job_detail: Job_detail, link_logo: link_logo, currentUser: currentUser});
  });
});

router.get('/joblist', function(req, res, next) {
  var currentUser = 1;
  db.curentUser.findAll().then(function (currentUserinDB) {
    console.log("currentUserinDB", currentUserinDB.length); 
    if (currentUserinDB.length === 0) {  
      currentUser = 0 ;
    }
  });  
  db.Job.findAll({ offset: 0, limit: 5}).then(function (job) {
    res.render('v_job_list', {currentUser: currentUser, test: 0, job: job, link_logo: link_logo, totalPage: totalPage });
   });
});

router.post('/joblist', function(req, res, next) {
  var currentUser = 1;
  db.curentUser.findAll().then(function (currentUserinDB) {
    console.log("currentUserinDB", currentUserinDB[0].idUser); 
    if (currentUserinDB.length === 0) {  
      currentUser = 0 ;
    } else
    {
      db.Applicant.create({jobId: currentJobSelectedId, userId: currentUserinDB[0].idUser})
      .then(function (Applicant) {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAA",Applicant);
      });
    }
  });  
  db.Job.findAll({ offset: 0, limit: 5}).then(function (job) {
    res.render('v_job_list', {currentUser: currentUser, test: 0, job: job, link_logo: link_logo, totalPage: totalPage });
   });
});

router.post('/joblist/search', function(req, res, next) {
  var currentUser = 1;
  db.curentUser.findAll().then(function (currentUserinDB) {
    console.log("currentUserinDB_post", currentUserinDB.length); 
    if (currentUserinDB.length === 0) {  
      currentUser = 0 ;
    }
  });
  var Noilamviec = req.body.Noilamviec;
  var Chucdanh = req.body.Chucdanh;
  var Nganhnghe = req.body.Nganhnghe;
  var condition = 0;
  
  /*
  
  condition:
  > 1 : Chuc danh
  > 2 : Nganh nghe
  > 3 : Noi lam viec
  > 4 : Chuc danh + Nganh nghe
  > 5 : Chuc danh + Noi lam viec
  > 6 : Nganh nghe + Noi lam viec
  > 7 : Chuc danh + Nganh nghe + Noi lam viec

  */

  if (Chucdanh && Nganhnghe == 0 && Noilamviec == 0) {
    condition = 1;
  } 
  else if (!Chucdanh && Nganhnghe != 0 && Noilamviec == 0) {
    condition = 2;
  }
  else if (!Chucdanh && Nganhnghe == 0 && Noilamviec != 0) {
    condition = 3;
  }
  else if (Chucdanh && Nganhnghe != 0 && Noilamviec == 0) {
    condition = 4;
  }
  else if (Chucdanh && Nganhnghe == 0 && Noilamviec != 0) {
    condition = 5;
  }
  else if (!Chucdanh && Nganhnghe != 0 && Noilamviec != 0) {
    condition = 6;
  }
  else if (Chucdanh && Nganhnghe != 0 && Noilamviec != 0) {
    condition = 7;
  }
  else {
    condition = 0;
  }

  switch (condition) {
    case 1: {
      db.Job.findAll({
        where: {
              Chucdanh: {
                [Op.like]: '%' + Chucdanh + '%'
              }
           }
      }).then(function (job) {
        totalPage = job.length / jobPerPage;
        console.log("CASE", condition);
        console.log("Chuc danh", Chucdanh);
        console.log("Nganh nghe", Nganhnghe);
        console.log("Noi lam viec", Noilamviec);
        res.render('v_job_list', {currentUser: currentUser, test: 0, job: job, link_logo: link_logo, totalPage: totalPage });
      })
      break;
    }
    
    case 2: {
      db.Job.findAll({
        where: {
              Nganhnghe: Nganhnghe
           }
      }).then(function (job) {
        totalPage = job.length / jobPerPage;
        console.log("CASE", condition);
        console.log("Chuc danh", Chucdanh);
        console.log("Nganh nghe", Nganhnghe);
        console.log("Noi lam viec", Noilamviec);
        res.render('v_job_list', {currentUser: currentUser, test: 0, job: job, link_logo: link_logo, totalPage: totalPage });
      })
      break;
    }

    case 3: {
      db.Job.findAll({
        where: {
              Noilamviec: Noilamviec
           }
      }).then(function (job) {
        totalPage = job.length / jobPerPage;
        console.log("CASE", condition);
        console.log("Chuc danh", Chucdanh);
        console.log("Nganh nghe", Nganhnghe);
        console.log("Noi lam viec", Noilamviec);
        res.render('v_job_list', {currentUser: currentUser, test: 0, job: job, link_logo: link_logo, totalPage: totalPage });
      })
      break;
    }

    case 4: {
      db.Job.findAll({
        where: {
            Chucdanh: {
              [Op.like]: '%' + Chucdanh + '%'
            },
            Nganhnghe: Nganhnghe
          }
      }).then(function (job) {
        totalPage = job.length / jobPerPage;
        console.log("CASE", condition);
        console.log("Chuc danh", Chucdanh);
        console.log("Nganh nghe", Nganhnghe);
        console.log("Noi lam viec", Noilamviec);
        res.render('v_job_list', {currentUser: currentUser, test: 0, job: job, link_logo: link_logo, totalPage: totalPage });
      })
      break;
    }

    case 5: {
      db.Job.findAll({
        where: {
            Chucdanh: {
              [Op.like]: '%' + Chucdanh + '%'
            },
            Noilamviec: Noilamviec
          }
      }).then(function (job) {
        totalPage = job.length / jobPerPage;
        console.log("CASE", condition);
        console.log("Chuc danh", Chucdanh);
        console.log("Nganh nghe", Nganhnghe);
        console.log("Noi lam viec", Noilamviec);
        res.render('v_job_list', {currentUser: currentUser, test: 0, job: job, link_logo: link_logo, totalPage: totalPage });
      })
      break;
    }

    case 6: {
      db.Job.findAll({
        where: {
            Nganhnghe: Nganhnghe,
            Noilamviec: Noilamviec
          }
      }).then(function (job) {
        totalPage = job.length / jobPerPage;
        console.log("CASE", condition);
        console.log("Chuc danh", Chucdanh);
        console.log("Nganh nghe", Nganhnghe);
        console.log("Noi lam viec", Noilamviec);
        res.render('v_job_list', {currentUser: currentUser, test: 0, job: job, link_logo: link_logo, totalPage: totalPage });
      })
      break;
    }
    
    case 7: {
      db.Job.findAll({
        where: {
            Chucdanh: {
              [Op.like]: '%' + Chucdanh + '%'
            },
            Nganhnghe: Nganhnghe,
            Noilamviec: Noilamviec
          }
      }).then(function (job) {
        totalPage = job.length / jobPerPage;
        console.log("CASE", condition);
        console.log("Chuc danh", Chucdanh);
        console.log("Nganh nghe", Nganhnghe);
        console.log("Noi lam viec", Noilamviec);
        res.render('v_job_list', {currentUser: currentUser, test: 0, job: job, link_logo: link_logo, totalPage: totalPage });
      })
      break;
    }
    
    default: 1
      console.log("CASE default", condition);
      console.log("Chuc danh", Chucdanh);
      console.log("Nganh nghe", Nganhnghe);
      console.log("Noi lam viec", Noilamviec);
      job = [];
      res.render('v_job_list', {currentUser: currentUser, test: 1, job: job, link_logo: link_logo, totalPage: totalPage });
      break;
  }
  

  // console.log("Chucdanh", req.body.Chucdanh);
  // console.log("Nganhnghe", req.body.Nganhnghe);
  // console.log("Noilamviec", req.body.Noilamviec);

  // db.Job.findAll({
  //   where: {
  //     Chucdanh: {
  //       [Op.like]: '%' + req.body.Chucdanh + '%'
  //     }
  //  }
  // }).then(function (job) {
  //   res.json({
  //     res: job
  //   });
  // });

  
});
module.exports = router;
