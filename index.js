const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main'} ));
app.set('view engine', 'handlebars');

mongoose.Promise = global.Promise;
// mongoose connection
mongoose.connect('mongodb://localhost/IdeaLab', { useNewUrlParser: true })
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
})

app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
});

app.post('/ideas', (req, res) => {
    console.log(req.body);
    res.send("submitted");
    const newUser = {
        title: req.body.title,
        details: req.body.details
    }
    new Idea(newUser).save()
    .then(idea => {
        res.redirect('/ideas');
    })
});

const PORT = 5000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));