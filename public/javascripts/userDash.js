var mongoose = require('mongoose'),
    User = require('./userAuth'),
    connStr = 'mongodb://localhost:27017/440w';

//We want to check to see if the user already exists in the datebase
this.checkUser = function(email, uuid, cb){
    var tempEmail = email;
    //Initialize Our Connection To The MongoDB With Our Provided Connection String
    mongoose.connect(connStr, function(err) {
        if (err) throw err;
        console.log('DASHBOARD::checkUser::Successfully connected to MongoDB');
    });

    //We Use Our findOne Prototype That Queries The Database To See If It Can Find
    //A User With The Set Of Credentials
    var exists = User.findOne({ email: tempEmail });

    exists.exec(function(err, user){
        if(err){
            cb(err);
        } else if(user) {
            user.compareUUID(uuid, function(err, isMatch) {
                if (err) throw err;
                if(mongoose.connection.close()){
                    console.log('DASHBOARD::checkUser::closed connection to MongoDB');
                }
                cb(null,user);
            });
        } else {
            if(mongoose.connection.close()){
                console.log('DASHBOARD::checkUser::closed connection to MongoDB');
            }
            cb(null);
        }
    });
};
