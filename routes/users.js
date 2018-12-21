const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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
        res.send('pass');
    }
})

module.exports = router;