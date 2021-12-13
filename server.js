const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route, this will send a json message whenever a get request is sent to the root of our program
// Express Middleware for serving static files
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send('hello world');
});

require("./app/routes/store_routes.js")(app);
require("./app/routes/user_routes.js")(app);
require("./app/routes/category_routes.js")(app);
require("./app/routes/items_routes.js")(app);
require("./app/routes/list_routes.js")(app);

// set port, listen for requests, this allows for the server to listen for http requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
