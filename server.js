const mongoose = require('mongoose');
const express = require('express');
// create an ejs instance
const ejs = require('ejs');
const app = express();
const socket = require('socket.io');

//Start the server
const server = app.listen(3000);

//Ruwan - initialising sID for socket id
var sID = '';
//Ruwan - store player socket ids to identify players
var playerSocketIdsArray = [];

//DB routes
const insertUser = require('./routes/db/insertUser');
const getUsers = require('./routes/db/getUsers');
const deleteAllUsers = require('./routes/db/deleteAllUsers');

//Game logic routes
const startGame = require('./routes/startGame');
const userCounter = require('./routes/userCounter');
const handPanel = require('./routes/handPanel');
const {players} = require('./controllers/db/user');

app.use(express.static(__dirname + '/public'));

app.use('/', insertUser);
app.use('/', getUsers);
app.use('/', deleteAllUsers);
app.use('/', startGame);
app.use('/', userCounter);
app.use('/', handPanel);


//Socket setup
const io = socket(server);

io.on('connection', function (socket) {
  console.log('Made socket connection', socket.id);
  //Ruwan - assigning page sID for socket id
  sID = socket.id;
  //chat event handling
  socket.on('chat', function (data) {
    // console.log(data);
    io.sockets.emit('chat', data);
  });
  // Handle typing event
  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });
  socket.on('timer', (timer) => {
    /*io.clients((error, clients) => {
      //console.log(clients);
      if (timer.socketID == clients[0]) {
        io.sockets.emit('timer', timer);
      }
    });*/
    if (timer.socketID == playerSocketIdsArray[0]) {
      io.sockets.emit('timer', timer);
    }
  });
  socket.on('startGame', (players) => {
    //using scoket for start game if any one of the player 
    //presses start game it should start the game for all the players.
    io.sockets.emit('startGame', players.players);
  });
});


// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('lobby', {title: 'Citadels - Lobby'});
});

app.get('/help', function (req, res) {
  res.render('help', {title: 'Citadels - Help'});
});

app.get('/gameRoom', function (req, res) { 
  //Ruwan - everytime user enters the gameroom, players socket id will be saved in the playerSocketIdsArray,
  //        also we can identify which player it is by player number according to array index
  playerSocketIdsArray.push(sID);
  
  res.render('gameRoom', {title: 'Citadels - Game Room'});
});

app.get('/sendPlayerSockets', function(req, res){
  res.send(playerSocketIdsArray);  
});

console.log('Server running at Port: 3000');

//DATABASE MONGODB
const uri =
  //'mongodb+srv://Hassan:SIT725@sit725.bketa.mongodb.net/Citadels(SIT725)?retryWrites=true&w=majority';
  'mongodb+srv://sit725:sit725@sit725.gwuvj.mongodb.net/Citadels(SIT725)?retryWrites=true&w=majority';
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  function (err) {
    if (err) throw err;

    console.log('DB successfully connected');
  }
);