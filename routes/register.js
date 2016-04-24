var express = require('express');
var registration = require('../public/javascripts/userRegistration');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    var data = req.body,
        userData = {};

    userData.firstName = data.fname;
    userData.lastName = data.lname;
    userData.email = data.email;
    userData.useraccess = data.useraccess;
    userData.password = data.pass;
    userData.passconf = data.passconf;

    if(userData.password !== userData.passconf){
        res.send("Passwords do not match");
    } else {
        if(userData.firstName !== undefined){
            registration.checkUserName(userData.email, function(err, exists) {
                if (err) {
                    throw err;
                } else if(exists) {
                    res.send("Username already exists");
                } else {
                    registration.createUser(userData);
                    res.redirect("/");
                }
            });
        }
    }
});
module.exports = router;
