//UserController.js
'use strict';

var jwt         = require('jwt-simple');
var UserModel = require('../models/UserModel');

// route middleware to ensure user is logged in


module.exports = function(passport){

var config = {secret: 'secretKey'};
    

    return {

        isLoggedIn: function isLoggedIn(req, res, next) {
            console.log(req);
            if (req.isAuthenticated())
                return next();
         
            res.sendStatus(401);
        },
         

        getLogin:function getLogin(req, res) {
            res.send("<p>Please login!</p><form method='post' action='/users/login'><input type='text' name='username'/><input type='password' name='password'/><button type='submit' value='submit'>Submit</buttom></form>");
        },

        login: function login(req, res) {
             UserModel.findOne({name: req.body.username}, function(err, user) {
                if (err) throw err;

                if (!user) {
                  res.send({success: false, msg: 'Authentication failed. User not found.'});
                } else {
                  // check if password matches
                  user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                      // if user is found and password is right create a token
                      var token = jwt.encode(user, config.secret);
                      // return the information including token as JSON
                      res.json({success: true, token: 'JWT ' + token});
                    } else {
                      res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                    }
                  });
                }
            });
        },

        getContent: function getContent(req, res) {
             res.json({success: true, message: 'You are authorized'});
        },

        logout: function logout(req, res) {
            req.logout();
            res.send("logout success!");
            /*
            req.session.destroy(function (err) {
                res.redirect('/'); //Inside a callback… bulletproof!
              });
            */
        },

        signup: function(req, res) {
          if (!req.body.name || !req.body.password) {
            res.json({success: false, msg: 'Please pass name and password.'});
          } else {
            var newUser = new UserModel({
              name: req.body.name,
              password: req.body.password
            });
            // save the user
            newUser.save(function(err) {
              if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
              }
              res.json({success: true, msg: 'Successful created new user.'});
            });
          }
        }
    }
};