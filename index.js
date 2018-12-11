const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

// handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main'} ));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    res.send("Index");
});

app.get('/about', (req, res) => {
    res.send("About");
})

const PORT = 5000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));