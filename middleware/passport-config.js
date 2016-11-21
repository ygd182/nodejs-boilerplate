var JwtStrategy = require('passport-jwt').Strategy;
 
// load up the user model
var UserModel = require('../models/UserModel');

var config = {secret: 'secretKey'};
 
module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    /*console.log('config');
    console.log(jwt_payload);*/
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};