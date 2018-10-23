'use strict';

const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
// serialize take id of user id save it in session 
passport.serializeUser((user, done) => {
    done(null, user.id);
});
// de serialize take id of user id and compare it with the id already save in session if it matched reture user data
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    // compare email from database and the email user pass
    User.findOne({'email': email}, (err, user) => {
        if(err){
            return done(err);
        }
         
         if(user){
             return done(null, false, req.flash('error', 'User with email already exist'));
         }
         const newUser = new User();
        newUser.username = req.body.username;
        newUser.fullname = req.body.username;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        
        newUser.save((err) => {
            done(null, newUser);
        });
    })
}));