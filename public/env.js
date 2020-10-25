//Make connection
const socket = io.connect('http://localhost:3000');
var counter;
var players;

$(document).ready(function () {
  //login functionality
  $('.joinRoom').click(function () {
    var userName = $('#userName').val();
    var dateOfBirth = $('#dob').val();

    $.ajax({
      type: 'GET',
      url: '/insertUser',
      data: {userName, dateOfBirth},
      success: function (data) {
        if (
          data == 'User already exists, Please try entering different username.'
        ) {
          alert(JSON.stringify(data));
        } else if (data == 'Game room is full. Please try again later.') {
          alert(JSON.stringify(data));
        } else {
          window.location.href = 'gameRoom';
        }
      },
      error: function () {},
    });
    console.log(userName);
    console.log(dateOfBirth);
  });

  // start game functionality
  $('a[href="#startGame"]').click(function () {
    $.ajax({
      type: 'GET',
      url: '/startGame',
      data: {socketId:socket.id},// here we need to pass socket id of this particular player - ruwan
      success: function (players) {
        if (players == 'Please wait for more players to show up.') {
          alert(players);
        } else {
          //using socket for start game if any one of the player
          //presses start game it should start the game for all the players.
          socket.emit('startGame', {
            players: players,  
          });
        }
      },
      error: function () {},
    });
  });
  //exit function functionality
  $('.exitGame').click(function () {
    $.ajax({
      type: 'GET',
      url: '/deleteAllUsers', //delete all users before redirecting to lobby
      data: {},
      success: function () {},
      error: function () {},
    });
    window.location.href = '/';
  });

  $('.collapsible').click(function () {
    var content = document.getElementById('content');
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });

  //Emit events
  $('#send').click(function () {
    var message = $('#message').val();
    var playerName = $('#handle').val();
    socket.emit('chat', {
      message: message,
      playerName: playerName,
    });
    $('#message').val('');
  });

  $('#message').keypress(function () {
    var playerName = $('#handle').val();
    socket.emit('typing', playerName);
  });

  // Listen for chat events
  socket.on('chat', function (data) {
    feedback.innerHTML = '';
    output.innerHTML +=
      '<p><strong>' + data.playerName + ': </strong>' + data.message + '</p>';
  });

  // listen for typing events
  socket.on('typing', function (data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
  });
});

$('.game-Room').ready(function () {
  document.getElementById('timer').innerHTML = 02 + ':' + 00;
  counter = setInterval(() => {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    $.ajax({
      type: 'GET',
      url: '/userCounter',
      data: {timeArray},
      success: function (data) {
        //console.log(data);
        if (data == 'hide') {
          $.ajax({
            type: 'GET',
            url: '/startGame', //start the game if 4 users are present in the room
            data: {socketId:socket.id},// here we need to pass socket id of this particular player - ruwan
            success: function (players) {
              socket.emit('startGame', {    
                players: players,
              });
            },
            error: function () {},
          });
          //document.getElementsById('Counter').style.visibility = 'hidden';
        } else if (data == 'redirect') {
          clearInterval(counter);
          $.ajax({
            type: 'GET',
            url: '/deleteAllUsers', //delete all users before redirecting to lobby
            data: {},
            success: function () {},
            error: function () {},
          });
          window.location.href = '/';
        } else {
          //scoket emiting event
          socket.emit('timer', {
            socketID: socket.id,
            minutes: data.minutes,
            seconds: data.seconds,
          });
        }
      },
      error: function () {},
    });
  }, 1000);
});

//socket listening event
socket.on('timer', (timer) => {
  //console.log(timer);
  document.getElementById('timer').innerHTML =
    timer.minutes + ':' + timer.seconds;
});


socket.on('startGame', (players) => {  
  //ruwan - overwriting sockets using the array from the server
  $.get('/sendPlayerSockets',function(playerSocketIdsArray){     
     for(var i=0; i< playerSocketIdsArray.length; i++){
      players.players[i].socketId = playerSocketIdsArray[i];
    }                   
  })

  //using socket for start game if any one of the player
  //presses start game it should start the game for all the players.
  $('.startGame').hide(); //hide start game button after game is started
  clearInterval(counter);
  $('#Counter').hide();

  //ruwan - maing hand panel vissible and populate with initial dcs
  $('.hand-panel').css("visibility", "visible");
  var sId = socket.id;
  var playersData =   JSON.stringify(players.players);
  
  $.ajax({
    type: 'GET',
    dataType: "json",
    traditional: true,
    url: '/handPanel.initialiseHandPanel', //display hand panel
    data: {playersData,sId},
    contentType: 'application/json', // for request
    success: function(data) {
      $('#hand-panel-dcs').append(data);
    },
    error: function () {},      
  });

  var bank_coins = players.bank.coins;
  $('.bank_coins').append(`<a>
    <img class="coins" src="/images/bank/coins.png">
    <div class="coins">${bank_coins}</div></a>`);

  for (i = 0; i < players.players.length; i++) {
    var earned_player_coins = players.players[i].coins;
    $('.players_coins').append(`<a>
<img class="player${i}_coins" src="/images/bank/coins.png">
<div class="player${i}_coins">${earned_player_coins}</div></a>`);
    //CrownPlayer Displaying
    if (players.players[i].crowned == true) {
      $('.playerCrown')
        .append(`<div class="player${i}Crown" id="player${i}Crown">
  <img src="/images/bank/crown.png" />
</div>`);
    }
  }
  $('#crown_disapear').hide();
});








$('.game-room').ready(function () {
  var appendPlayers = setInterval(() => {
    $.ajax({
      type: 'GET',
      url: '/getUsers',
      data: {},
      success: function (players) {
        for (var i = 0; i < players.users.length; i++) {
          var num = players.users[i].num;
          var userName = players.users[i].userName;
          $('.players').append(`<div class="player${num}">${userName}</div>`);
        }
        if (players.users.length == 4) {
          clearInterval(appendPlayers);
        }
      },
      error: function () {},
    });
  }, 1000);
});
