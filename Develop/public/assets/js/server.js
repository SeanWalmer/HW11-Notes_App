
// Required node libraries
var fs = require("fs");
var express = require("express");
var path = require("path");
// server info
var app = express();
var PORT = 3000;
// 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET calls to render HTML to page
app.get("/notes", function(req, res) {
res.sendFile(path.join(__dirname, "../../../public/notes.html"));
});
// If no matching route is found default to home
app.get("*", function(req, res) {
res.sendFile(path.join(__dirname, "../../../public/index.html"));
});


// api calls
app.get('/api/notes', function(req, res){
    fs.readFile(__dirname + "../../../db/db.json", function(err, data) {
        if (err) throw err;
        return data
      });
    }    
);

app.post("/api/notes", function(req, res){

});

app.delete("/api/notes/:id", function(req, res){
    const id = req.params.id;

})

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });