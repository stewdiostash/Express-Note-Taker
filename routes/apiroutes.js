const router = require("express").Router();
const fs = require("fs");


router.get("/notes", function(req, res) {
    return fs.readFile("./db/db.json", "utf-8", (err, data) => {
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

router.post("/notes", function(req, res) {
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

router.delete("/notes/:id", function(req, res) {

})

module.exports = router;
