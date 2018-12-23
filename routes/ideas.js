const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// authentication helper
const { isAuthenticated } = require('../helpers/authentication')

// idea model
require('../models/Idea');
const Idea = mongoose.model('ideas');

// edit
router.get('/edit/:id', isAuthenticated, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        if(idea.user != req.user.id) {
            req.flash('error_ms', 'Unauthorized');
            res.redirect('/ideas');
        } else {
            res.render('ideas/edit', {
            idea: idea
            });
        }
    });
});

// all notes
router.get('/', isAuthenticated, (req, res) => {
    Idea.find({user: req.user.id})
        .sort({date: 'desc'})
        .then(ideas => {
            res.render("ideas/index", {
                ideas: ideas
            });
        });
});

router.get('/add', isAuthenticated, (req, res) => {
    res.render('ideas/add');
});

// save note
router.post('/', isAuthenticated, (req, res) => {
    let errors = [];
    if(!req.body.title){
        errors.push({text: "Add title"})
    }
    if(!req.body.details){
        errors.push({text: "Add details"})
    }

    if(errors.length > 0){
        res.render("ideas/add", {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details,
            user: req.user.id
        } 
        new Idea(newUser).save()
            .then(idea => {
            req.flash("success", "Note added");
            res.redirect('/ideas');
        });
    }
});

// edit process
router.put('/:id', isAuthenticated, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        idea.title = req.body.title;
        idea.details = req.body.details;
        idea.save()
        .then(idea => {
            req.flash("success", "Note updated");
            res.redirect('/ideas');
        });
    });
});

// delete note
router.delete('/:id', isAuthenticated, (req, res) => {
    Idea.deleteOne({
        _id: req.params.id
    })
    .then(() => {
        req.flash("success", "Note deleted");
        res.redirect('/ideas');
    });
});

module.exports = router;