const mongoose = require('mongoose');
const express = require('express');
// create an ejs instance
const ejs = require('ejs');
const app = express();
const socket = require('socket.io');
var {players} = require('./controllers/startGame');

//DB routes
const insertUser = require('./routes/db/insertUser');
const getUsers = require('./routes/db/getUsers');
const deleteAllUsers = require('./routes/db/deleteAllUsers');

//Game logic routes
const startGame = require('./routes/startGame');
const userCounter = require('./routes/userCounter');
const selectionPanel = require('./routes/selectionPanel');
const handPanel = require('./routes/handPanel');
const districtCardHandling = require('./routes/districtCardHandling');
const characterCardHandling = require('./routes/characterCardHandling');

app.use(express.static(__dirname + '/public'));

app.use('/', insertUser);
app.use('/', getUsers);
app.use('/', deleteAllUsers);
app.use('/', startGame);
app.use('/', userCounter);
app.use('/', selectionPanel);
app.use('/', handPanel);
app.use('/', districtCardHandling);
app.use('/', characterCardHandling);

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('lobby', {title: 'Citadels - Lobby'});
});

app.get('/help', function (req, res) {
  res.render('help', {title: 'Citadels - Help'});
});

app.get('/gameRoom', function (req, res) {
  res.render('gameRoom', {title: 'Citadels - Game Room'});
});

//Start the server
const server = app.listen(3000);
console.log('Server running at Port: 3000');

//DATABASE MONGODB
const uri =
  'mongodb+srv://Hassan:SIT725@sit725.bketa.mongodb.net/Citadels(SIT725)?retryWrites=true&w=majority';
// 'mongodb+srv://sit725:sit725@sit725.gwuvj.mongodb.net/Citadels(SIT725)?retryWrites=true&w=majority';

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

//Socket setup
const io = socket(server);

io.on('connection', function (socket) {
  // console.log("Made socket connection", socket.id);
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
    io.clients((error, clients) => {
      //console.log(clients);
      if (timer.socketID == clients[0]) {
        io.sockets.emit('timer', timer);
      }
    });
  });
  socket.on('startGame', (players) => {
    //using scoket for start game if any one of the player
    //presses start game it should start the game for all the players.
    io.sockets.emit('startGame', players.players);
  });
  socket.on('exit', () => {
    //exit all players at once.
    io.sockets.emit('exit');
  });
  socket.on('pointer', (players) => {
    io.sockets.emit('pointer', players.players);
  });
  socket.on('pointer2', (players) => {
    io.sockets.emit('pointer2', players.players);
  });
  //socket for selection panel changing
  socket.on('turn', (data) => {
    io.sockets.emit('turn', data);
  });
  socket.on('turn2', (data) => {
    io.sockets.emit('turn2', data);
  });
  socket.on('turn3', (data) => {
    io.sockets.emit('turn3', data);
  });
  socket.on('turn4', (data) => {
    io.sockets.emit('turn4', data);
  });
  socket.on('pointerOff', (players) => {
    io.sockets.emit('pointerOff', players.players);
  });
  socket.on('handPanel', (players) => {
    io.sockets.emit('handPanel', players.players);
  });
});
