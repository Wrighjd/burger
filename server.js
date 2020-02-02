const express        = require("express");
const exphbs         = require("express-handlebars");
const path           = require("path");
const methodOverride = require("method-override");
const bodyParser     = require("body-parser");

const db = require(path.join(__dirname, "models"));

const app  = express();
const PORT = process.env.PORT || 3000;


const directory_public = path.join(__dirname, "public");
app.use(express.static(directory_public));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({"extended": false}));


app.engine("handlebars", exphbs({"defaultLayout": "main"}));
app.set("view engine", "handlebars");




app.use(methodOverride("_method"));


const directory_routes = path.join(__dirname, "routes");


require(path.join(directory_routes, "api_routes.js"))(app);




db.sequelize.sync().then(function() {
    app.listen(PORT, () => console.log(`App listening on ${PORT}.`));
});