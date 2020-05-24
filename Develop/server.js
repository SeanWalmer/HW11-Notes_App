
// Required node libraries
var fs = require("fs");
var express = require("express");
var path = require("path");
const { v4: uuidv4 } = require('uuid');

// server info
var app = express();
var PORT = process.env.PORT || 3000;

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
    fs.readFile(__dirname + "/db/db.json", "utf8", function(err, data) {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    newNote.id = uuidv4();
    console.log(newNote);
    fs.readFile(__dirname + "/db/db.json", "utf8", function(err, data) {
        if (err) throw err;
        console.log('Read File!');
        let notes = JSON.parse(data);
        notes.push(newNote);
        notes = JSON.stringify(notes);
        console.log(notes);
        fs.writeFile(__dirname + "/db/db.json", notes, function (err) {
            if (err) throw err;
            console.log('Saved!');
            res.json(JSON.parse(notes));
        });
    });
  });

app.delete("/api/notes/:id", function(req, res){
    const id = req.params.id;
    console.log('deleting!');
    fs.readFile(__dirname + "/db/db.json", "utf8", function(err, data) {
        if (err) throw err;
        console.log('reading');
        let notes = JSON.parse(data);
        for(var i = 0; i < notes.length; i++){
            if(notes[i].id === id){
                notes.splice(i,1);
            };
        };
        notes = JSON.stringify(notes);
        fs.writeFile(__dirname + "/db/db.json", notes, function (err) {
            if (err) throw err;
            res.json(JSON.parse(notes));
        });
    });
})

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });