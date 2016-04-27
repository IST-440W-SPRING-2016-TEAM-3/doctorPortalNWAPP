var express = require('express');
var router = express.Router();
var dashboard = require('../public/javascripts/userDash');
var http = require('http');

router.get('/', function(req, response, next) {
	if(req.session && req.session.uuid ){
        dashboard.checkUser(req.session.email, req.session.uuid, function(err, user) {
            if (err) {throw err;}
            if(user){
				var options = {
						host: 'localhost',
						path: '/userData/',
						port: '9000',
						method: 'GET',
						headers: {accept: 'application/json'}
					},
					userProfileData = {};

				response.locals.user = {};
				response.locals.user.firstName = user.firstname;
				response.locals.user.lastName = user.lastname;
				options.path = options.path + req.session.uuid;

				http.get(options, function(res){
					res.setEncoding('utf8');
					res.on('data',function(data){
						var parsedData = JSON.parse(data);
						response.locals.userdata = {};
						response.locals.userdata = parsedData;
						response.render('dashboard');
				    });
				});
            } else {
				response.clearCookie('session', { path: '/' });
			    response.redirect('/');
            }
        });
    } else {response.redirect('/');}
});

module.exports = router;
