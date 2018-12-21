const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");
const flash = require('connect-flash');
const session = require('express-session');
const database = require("./config.js");

const url = `mongodb://${database.dbUser}:${database.dbPassword}@ds135724.mlab.com:35724/idea-lab`

const app = express();

// routes
const ideas = require('./routes/ideas');

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// express-session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// connect-flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main'} ));
app.set('view engine', 'handlebars');

// method-override
app.use(methodOverride('_method'));

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

// home route
app.get('/', (req, res) => {
    res.render("index");
});

// about route
app.get('/about', (req, res) => {
    res.render("about");
});

// user registration
app.get('/users/register', (req, res) => {
    
});

// user login
app.get('/users/login', (req, res) => {
    
});

// ideas routes
app.use('/ideas', ideas);

const PORT = 5000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));