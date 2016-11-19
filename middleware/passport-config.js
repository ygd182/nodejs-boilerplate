//passport-config.js
var LocalStrategy   = require('passport-local').Strategy,
    bodyParser      = require('body-parser');

module.exports = function(passport){

    // hardcoded users, ideally the users should be stored in a database
    var users = [{"id":111, "username":"a", "password":"a"}];
    // passport needs ability to serialize and unserialize users out of session
    passport.serializeUser(function (user, done) {
        done(null, users[0].id);
    });
    passport.deserializeUser(function (id, done) {
        done(null, users[0]);
    });
     
    // passport local strategy for local-login, local refers to this app
    passport.use('local-login', new LocalStrategy(
        function (username, password, done) {
            if (username === users[0].username && password === users[0].password) {
                return done(null, users[0]);
            } else {
                return done(null, false, {"message": "User not found."});
            }
        })
    );
};