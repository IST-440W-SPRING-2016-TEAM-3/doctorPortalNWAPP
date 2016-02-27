var express = require('express');
var router = express.Router();
var login = require('../public/javascripts/userLogin');

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
    var data = req.body,
        userData = {};

    userData.email = data.email;
    userData.password = data.pass;

    if(userData.email && userData.password){
        login.checkUser(userData.email, userData.password, function(err, user) {
            if (err) {
                throw err;
            }
            if(user){
                req.session.email = user.email;
                req.session.uuid = user.uuid;
                res.redirect("/dashboard");
            } else {
                res.send("Username or Password is incorrect. Please try again. Click<a href=\"http://127.0.0.1:8000/login\"> here</a> to try logging in again.");
            }
        });
    }
});
module.exports = router;
