const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require('mongoose');

const app = express();

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main'} ));
app.set('view engine', 'handlebars');

mongoose.Promise = global.Promise;
// mongoose connection
mongoose.connect('mongodb://localhost/IdeaLab', { useNewUrlParser: true })
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

// home route
app.get('/', (req, res) => {
    res.render("index");
});

// about route
app.get('/about', (req, res) => {
    res.render("about");
})

const PORT = 5000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));