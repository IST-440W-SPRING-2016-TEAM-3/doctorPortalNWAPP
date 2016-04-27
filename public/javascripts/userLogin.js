var mongoose = require('mongoose'),
    User = require('./userAuth');

//We want to check to see if the user already exists in the datebase
this.checkUser = function(userName, userPass, cb){

    //We Use Our findOne Prototype That Queries The Database To See If It Can Find
    //A User With The Set Of Credentials
    var exists = User.findOne({ email: userName });

    exists.exec(function(err, user){
        if(err){
            cb(err);
        } else if(user) {
            user.comparePassword(userPass, function(err, isMatch) {
                if (err) throw err;
                if (isMatch){
                    cb(null,user);
                } else {
                    cb(null);
                }
            });
        } else {
            cb(null);
        }
    });
};
