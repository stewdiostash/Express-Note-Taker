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
app.use(express.static("public"));


// HTML Routes

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


// API Routes

app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        let parsedNotes;
        try {
            parsedNotes = [].concat(JSON.parse(data));
        } catch (error) {
            parsedNotes = [];
        }
        console.log(parsedNotes);
        return parsedNotes;
    })


})

app.post("/api/notes", function(req, res) {
    console.log(req.body);
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        const updatedData = JSON.parse(data);
        req.body.id = updatedData.length;
        updatedData.push(req.body);
        console.log(updatedData);
        fs.writeFile("./db/db.json", JSON.stringify(updatedData), (err) => {
            if (err) throw err;
        });
    });
});

app.delete("/api/notes/:id", function(req, res) {

})




// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  