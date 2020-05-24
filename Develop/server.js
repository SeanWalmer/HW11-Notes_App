
// Required node libraries
var fs = require("fs");
var express = require("express");
var path = require("path");
const { v4: uuidv4 } = require('uuid');

// server info
var app = express();
var PORT = 3000;

// server middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// GET calls to render HTML to page
app.get("/notes", function(req, res) {
res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// If no matching route is found default to home
app.get("/", function(req, res) {
res.sendFile(path.join(__dirname, "/public/index.html"));
});


// api calls
app.get('/api/notes', function(req, res){
    console.log('hello');
    fs.readFile(__dirname + "/db/db.json", "utf8", function(err, data) {
        if (err) throw err;
        console.log(JSON.parse(data));
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    const newId =
    console.log(newNote);
    fs.readFile(__dirname + "/db/db.json", "utf8", function(err, data) {
        if (err) throw err;
        console.log(JSON.parse(data));
        // const notes = JSON.parse(data);
    });
  });

app.delete("/api/notes/:id", function(req, res){
    const id = req.params.id;

})

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });