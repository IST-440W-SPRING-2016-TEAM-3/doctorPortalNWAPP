var mongoose = require('mongoose'),
    User = require('./userAuth'),
    connStr = 'mongodb://localhost:27017/440w';

//We want to check to see if the user already exists in the datebase
this.checkUser = function(email, uuid, cb){
    var tempEmail = email;

    //We Use Our findOne Prototype That Queries The Database To See If It Can Find
    //A User With The Set Of Credentials
    var exists = User.findOne({ email: tempEmail });

    exists.exec(function(err, user){
        if(err){
            cb(err);
        } else if(user) {
            user.compareUUID(uuid, function(err, isMatch) {
                if (err) throw err;
                cb(null,user);
            });
        } else {
            cb(null);
        }
    });
};
