var mongoose = require('mongoose'),
    User = require('./userAuth'),
    connStr = 'mongodb://localhost:27017/440w';

//We want to check to see if the user already exists in the datebase
this.checkUser = function(userName, userPass, cb){
    //Initialize Our Connection To The MongoDB With Our Provided Connection String
    mongoose.connect(connStr, function(err) {
        if (err) throw err;
        console.log('LOGIN::checkUser::Successfully connected to MongoDB');
    });

    //We Use Our findOne Prototype That Queries The Database To See If It Can Find
    //A User With The Set Of Credentials
    var exists = User.findOne({ email: userName });

    exists.exec(function(err, user){
        if(err){
            cb(err);
        } else if(user) {
            user.comparePassword(userPass, function(err, isMatch) {
                if (err) throw err;
                if(mongoose.connection.close()){
                    console.log('LOGIN::checkUser::closed connection to MongoDB');
                }
                if (isMatch){
                    cb(null,user);
                } else {
                    cb(null);
                }
            });
        } else {
            if(mongoose.connection.close()){
                console.log('LOGIN::checkUser::closed connection to MongoDB');
            }
            cb(null);
        }
    });
};
