const express = require('express');
const router = express.Router();
const passport = require('passport');
/* const jwt = require('jsonwebtoken');
const config = require('../config/database'); */
const User = require('../models/user');
const jwtHelper = require('../config/jwtHelper');
const _ = require('lodash');

module.exports = router ;

    router.post('/register', (req, res, next) => {

        if (!req.body.email){
            res.json({success: false, message: 'You must provide an e-mail'});
        } else {
            if (!req.body.username){
                res.json({success: false, message: 'You must provide  a username'});
            } else {
                if (!req.body.password){
                    res.json({success: false, message: 'You must provide a password'});
                }
                else {
                    let newUser = new User();
                        newUser.email = req.body.email.toLowerCase();
                        newUser.username= req.body.username.toLowerCase();
                        newUser.password= req.body.password.toLowerCase();
                    
                    newUser.save((err, doc) => {
                        if(err) {
                            res.json({success: false, message:'Could not register user. Error: ', err});
                        } else {
                            res.json({success: true, message:'User registered'});
                            res.send(doc);
                        }
                    });
                    
                }
            } 
        }
    });

    router.post('/authenticate', (req, res, next) => {
        passport.authenticate('local', (err,user, info) => {
            if(err) 
                return res.status(400).json(err);
            else if (user)
                return res.json({"token": user.generateJwt(), success: true, message:'You are logged in'});
            else
                return res.status(404).json(info);
        })(req, res, next);
    });

    router.get('/profile', jwtHelper.verifyJwtToken, (req, res, next) => {
        User.findOne({_id: req._id},
            (err, user) => {
                if(err)
                    return done(err);
                else if(!user)
                    return res.status(404).json({ status: false, message: 'User record not found.', err: err});
                else
                    return res.status(200).json({ status: true, user: _.pick(user, ['username', 'email']) });
            });
    });
        

   
        
   