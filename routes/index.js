var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var length = 0;
    for(var keys in req.session){
        length++;
    }
    if(length !== 0){
        res.redirect('dashboard');
    } else {
        res.render('index', { title: '440w' });
    }
});

module.exports = router;
