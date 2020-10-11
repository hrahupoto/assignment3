const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();



app.use(express.static(__dirname + "/public"));

app.get('/lobby',function(req,res){
    res.redirect('/lobby.html');
})

app.listen(3000);
console.log("Server running at Port: 3000");