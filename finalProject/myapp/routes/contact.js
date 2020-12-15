var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact');
});

router.get('/success', function(req, res) {
  res.render('response');
});

module.exports = router;
