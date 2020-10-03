// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
// const apiroutes = require("./routes/apiroutes");
// const htmlroutes = require("./routes/htmlroutes")

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// app.use("/api", apiroutes);
// app.use("/", htmlroutes);




// API Routes

app.get("/api/notes", function(req,res){
    res.sendFile(path.join(__dirname, "db/db.json"));
})

app.post("/api/notes", function(req, res) {
    console.log(req.body);
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        const updatedData = JSON.parse(data);
        req.body.id = updatedData.length;
        updatedData.push(req.body);
        console.log(updatedData);
        fs.writeFile("db/db.json", JSON.stringify(updatedData), "UTF-8", (err) => {
            if (err) throw err;
            // res.json(updatedData);
        });
        res.json(updatedData);
    });
});


// HTML Routes

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  