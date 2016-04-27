var express = require('express');
var request = require('request');
var router = express.Router();
var endpoint = '127.0.0.1:9000';

function reqChecker(req) {
	var length = 0;
	for (var keys in req.session) {
		length++;
	}
	return length;
}

router.get('/users', function(req, res, next) {
	if (reqChecker !== 0) {
		var args = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		request("http://127.0.0.1:9000/userlogin/", args, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				res.send(body);
			}
		});
	} else {
		res.redirect('/');
	}
});

router.get('/userdata/:id', function(req, res, next) {
	if (reqChecker !== 0) {
		var uuid = req.params.id;
		request({
				url: "http://127.0.0.1:9000/userdata/" + uuid,
				method: 'GET'
			},
			function(error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body);
				}
			});
	} else {
		res.redirect('/');
	}
});

router.get('/usermedicines/:id', function(req, res, next) {
	if (reqChecker !== 0) {
		var uuid = req.params.id;
		request({
				url: "http://127.0.0.1:9000/usermedicines/" + uuid,
				method: 'GET'
			},
			function(error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body);
				}
			});
	} else {
		res.redirect('/');
	}
});

router.get('/userallergies/:id', function(req, res, next) {
	if (reqChecker !== 0) {
		var uuid = req.params.id;
		request({
				url: "http://127.0.0.1:9000/userallergies/" + uuid,
				method: 'GET'
			},
			function(error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body);
				}
			});
	} else {
		res.redirect('/');
	}
});

router.get('/userimmunization/:id', function(req, res, next) {
	if (reqChecker !== 0) {
		var uuid = req.params.id;
		request({
				url: "http://127.0.0.1:9000/userimmunization/" + uuid,
				method: 'GET'
			},
			function(error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body);
				}
			});
	} else {
		res.redirect('/');
	}
});

router.get('/usertestresult/:id', function(req, res, next) {
	if (reqChecker !== 0) {
		var uuid = req.params.id;
		request({
				url: "http://127.0.0.1:9000/usertestresult/" + uuid,
				method: 'GET'
			},
			function(error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body);
				}
			});
	} else {
		res.redirect('/');
	}
});

router.post('/userlogin', function(req, res, next) {

	if (reqChecker !== 0) {
		request({
				url: "http://127.0.0.1:9000/userlogin",
				method: 'POST',
				json: req.body
			},
			function(error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body);
				}
			});
	} else {
		res.redirect('/');
	}
});

router.put('/userdata/:id', function(req, res, next) {

	if (reqChecker !== 0) {
		var uuid = req.params.id;
		request({
				url: "http://127.0.0.1:9000/userdata/" + uuid,
				method: 'PUT',
				json: req.body
			},
			function(error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body);
				}
			});
	} else {
		res.redirect('/');
	}
});

router.put('/userimmunization/:id', function(req, res, next) {

	if (reqChecker !== 0) {
		var uuid = req.params.id;
		request({
				url: "http://127.0.0.1:9000/userimmunization/" + uuid,
				method: 'PUT',
				json: req.body
			},
			function(error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body);
				}
			});
	} else {
		res.redirect('/');
	}
});

router.put('/usermedicines/:id', function(req, res, next) {

	if (reqChecker !== 0) {
		var uuid = req.params.id;
		request({
				url: "http://127.0.0.1:9000/usermedicines/" + uuid,
				method: 'PUT',
				json: req.body
			},
			function(error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body);
				}
			});
	} else {
		res.redirect('/');
	}
});

router.put('/userallergies/:id', function(req, res, next) {

	if (reqChecker !== 0) {
		var uuid = req.params.id;
		request({
				url: "http://127.0.0.1:9000/userallergies/" + uuid,
				method: 'PUT',
				json: req.body
			},
			function(error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body);
				}
			});
	} else {
		res.redirect('/');
	}
});

router.put('/usertestresult/:id', function(req, res, next) {

	if (reqChecker !== 0) {
		var uuid = req.params.id;
		request({
				url: "http://127.0.0.1:9000/usertestresult/" + uuid,
				method: 'PUT',
				json: req.body
			},
			function(error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body);
				}
			});
	} else {
		res.redirect('/');
	}
});
module.exports = router;
