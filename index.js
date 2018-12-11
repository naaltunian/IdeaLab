const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

// handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main'} ));
app.set('view engine', 'handlebars');


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