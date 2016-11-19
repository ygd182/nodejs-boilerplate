//UserController.js
'use strict';

// route middleware to ensure user is logged in


module.exports = function(passport){

    

    return {

        isLoggedIn: function isLoggedIn(req, res, next) {
            if (req.isAuthenticated())
                return next();
         
            res.sendStatus(401);
        },
     
        hello: function hello(req, res) {
            res.send("Hello!");
        },
         

        getLogin:function getLogin(req, res) {
            res.send("<p>Please login!</p><form method='post' action='/users/login'><input type='text' name='username'/><input type='password' name='password'/><button type='submit' value='submit'>Submit</buttom></form>");
        },

        login: function login(req, res) {
                res.redirect("/users/content");
        },

        getContent: function getContent(req, res) {
            res.send("Congratulations! you've successfully logged in.");
        },

        logout: function logout(req, res) {
            req.logout();
            res.send("logout success!");
        }
    }
};