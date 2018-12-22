const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const passport = require('passport');

// user model
require('../models/User');
const User = mongoose.model('users');

// user registration
router.get('/register', (req, res) => {
    res.render('users/register');
});

// user login
router.get('/login', (req, res) => {
    res.render('users/login');
});

// form post
router.post('/register', (req, res) => {
    let errors = [];
    if(req.body.password != req.body.passwordConfirmation) {
        errors.push({text: "Match Passwords"})
    }

    if(req.body.password.length < 8){
        errors.push({text: "Password must be at least 8 characters long"})
    }

    if(errors.length > 0){
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation
        });
    } else {
        User.findOne({email: req.body.email})
            .then(user => {
                if(user){
                    req.flash('error_msg', "Email Taken");
                    res.redirect('/users/login');
                } else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    });
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                            .then(user => {
                                req.flash('success', "Registered!")
                                res.redirect('/users/register')
                            })
                            .catch(err => {
                                console.log(err);
                                return;
                            })
                        })
                    })
                }
            });
    }
})

module.exports = router;