const mongoose = require('mongoose');
const express = require('express');
// create an ejs instance
const ejs = require('ejs');
const app = express();

//DB routes
const insertUser = require('./routes/db/insertUser');
const getUsers = require('./routes/db/getUsers');
const deleteAllUsers = require('./routes/db/deleteAllUsers');

//Game logic routes
const startGame = require('./routes/startGame');

app.use(express.static(__dirname + '/public'));

app.use('/', insertUser);
app.use('/', getUsers);
app.use('/', deleteAllUsers);
app.use('/', startGame);

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('lobby', { title: "Citadels - Lobby" });
})

app.get('/help', function(req, res) {
    res.render('help', { title: "Citadels - Help" });
})

app.get('/gameRoom', function(req, res) {
    res.render('gameRoom', { title: "Citadels - Game Room" });
})

// app.get('/PlayerRoom',function(req,res){
//     res.render('fourPlayerRoom', {title:"Citadels - Game Room"});
// })

//Start the server
app.listen(3000);
console.log('Server running at Port: 3000');

//DATABASE MONGODB
const uri =
    'mongodb+srv://Hassan:SIT725@sit725.bketa.mongodb.net/Citadels(SIT725)?retryWrites=true&w=majority';

mongoose.connect(
    uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    function(err) {
        if (err) throw err;

        console.log('DB successfully connected');
    }
);