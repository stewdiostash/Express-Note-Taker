// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// HTML Routes

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


// API Routes

// app.get("/api/notes", function(req, res) {

// }

// app.post("/api/notes", function(req, res) {

// }

// app.delete("/api/notes/:id", function(req, res) {

// }




// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  