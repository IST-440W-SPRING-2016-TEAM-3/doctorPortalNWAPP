var express = require('express');
var request = require('request');
var router = express.Router();
var endpoint = '127.0.0.1:9000';

function reqChecker(req){
    var length = 0;
    for(var keys in req.session){
        length++;
    }
    return length;
}

router.get('/users', function(req, res, next) {
    if(reqChecker !== 0){
        var args = {
            headers: { 'Content-Type': 'application/json' }
        };
        request("http://127.0.0.1:9000/users", args, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
        });
    }
    else {
        res.redirect('/');
    }
});

router.get('/appointments', function(req, res, next) {
    var uuid = req.session.uuid;
    if(reqChecker !== 0){
        var args = {
            headers: { 'Content-Type': 'application/json' }
        };
        request("http://127.0.0.1:9000/userappointments/" + uuid, args, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
        });
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;
