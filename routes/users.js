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

module.exports = router;