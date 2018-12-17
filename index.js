const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const database = require("./config.js");

const url = `mongodb://${database.dbUser}:${database.dbPassword}@ds135724.mlab.com:35724/idea-lab`

const app = express();

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main'} ));
app.set('view engine', 'handlebars');

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

// idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// home route
app.get('/', (req, res) => {
    res.render("index");
});

// about route
app.get('/about', (req, res) => {
    res.render("about");
});

// edit
app.get('/ideas/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        res.render('ideas/edit', {
            idea: idea
        });
    });
});

// all notes
app.get('/ideas', (req, res) => {
    Idea.find({})
        .sort({date: 'desc'})
        .then(ideas => {
            res.render("ideas/index", {
                ideas: ideas
            });
        });
});

app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
});

// save note
app.post('/ideas', (req, res) => {
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
            details: req.body.details
        } 
        new Idea(newUser).save()
            .then(idea => {
            res.redirect('/ideas');
        });
    }
});

const PORT = 5000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));