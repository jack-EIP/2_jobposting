var express = require('express');
var router = express.Router();

/* GET role login. */
router.get('/', function(req, res, next) {
  res.render('login_role', { title: 'abc' });
});

module.exports = router;
