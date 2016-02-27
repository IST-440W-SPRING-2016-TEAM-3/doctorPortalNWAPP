var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.clearCookie('session', { path: '/' });
	res.clearCookie('authorized', { path: '/' });
    res.redirect('/');
});

module.exports = router;
