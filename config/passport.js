const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');


passport.use(
    new localStrategy({ username: 'username',password: 'password'},
        (username, password, done) => {
            User.findOne({username: username},
                (err, user) => {
                    if(err)
                        return done(err);
                    else if(!user)
                        return done(null, false, { message: 'User not registered'});
                    else if(!user.verifyPassword(password))
                    return done(null, false, { message:'Wrong password'});
                    else
                        return done(null, user);
                });
        })
);