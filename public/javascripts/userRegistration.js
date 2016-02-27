var mongoose = require('mongoose'),
    User = require('./userAuth'),
    connStr = 'mongodb://localhost:27017/440w',
    uuid = require('node-uuid'),
    userData = {};

//We want to check to see if the user already exists in the datebase
this.checkUserName = function(email, cb){
    var tempEmail = email;
    //Initialize Our Connection To The MongoDB With Our Provided Connection String
    mongoose.connect(connStr, function(err) {
        if (err) throw err;
        console.log('REGISTER::Successfully connected to MongoDB');
    });

    //We Use Our findOne Prototype That Queries The Database To See If It Can Find
    //A User With The Same Email
    var exists = User.findOne({ email: tempEmail });

    exists.exec(function(err, user){
        if(err){
            cb(err);
        } else {
            cb(null,user);
        }
    });
};

this.createUser = function(data){
    userData = data;
    _createUser(userData);
};

//Create New User And Save To The Database
function _createUser(newData){
    var newUUID = uuid.v1();

    //Create A New User Object Base On Our Mongoose Schema, UserSchema, in userAuth.js
    var newUser = new User({
        uuid: newUUID,
        firstname: newData.firstName,
        lastname: newData.lastName,
        email: newData.email,
        password: newData.password
    });
    // Save The User To The DB
    newUser.save(function(err) {
        if (err) throw err;
        if(mongoose.connection.close()){
            console.log('REGISTER::Successfully closed connection to MongoDB');
        }
    });
}
