//Make connection
const socket = io.connect('http://localhost:3000');
var counter;
var gameData;

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
      success: function (data) {
        if (data == 'Please wait for more players to show up.') {
          alert(data);
        } else {
          //using socket for start game if any one of the player
          //presses start game it should start the game for all the players.
          gameData = data;
          socket.emit('startGame', {            
            players: data,  
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
  if(document.getElementById('timer'))
    document.getElementById('timer').innerHTML = 02 + ':' + 00;
  counter = setInterval(() => {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    $.ajax({
      type: 'GET',
      url: '/userCounter',
      data: {timeArray},
      success: function (timeData) {
        //console.log(data);
        if (timeData == 'hide') {
          $.ajax({
            type: 'GET',
            url: '/startGame', //start the game if 4 users are present in the room
            data: {socketId:socket.id},// here we need to pass socket id of this particular player - ruwan
            success: function (data) {
              socket.emit('startGame', {    
                players: data,
              });             
            },
            error: function () {},
          });
          //document.getElementsById('Counter').style.visibility = 'hidden';
        } else if (timeData == 'redirect') {
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
            minutes: timeData.minutes,
            seconds: timeData.seconds,
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



$('.game-room').ready(function () {
  var appendPlayers = setInterval(() => {
    $.ajax({
      type: 'GET',
      url: '/getUsers',
      data: {},
      success: function (data) {
        for (var i = 0; i < data.users.length; i++) {
          var num = data.users[i].num;
          var userName = data.users[i].userName;
          $('.players').append(`<div class="player${num}">${userName}</div>`);
        }
        if (data.users.length == 4) {
          clearInterval(appendPlayers);
        }
      },
      error: function () {},
    });
  }, 1000);
});

socket.on('startGame', (startingData) => {  
  gameData = startingData;
  socket.emit('startMainGameFlow', {
    gameData: gameData,
  });
});

socket.on('startMainGameFlow', () => {  
  maninGameFlow();
});
 
function maninGameFlow()
{
  initiationPhase();
  turnPhase();
  endPhase();
}


function initiationPhase(){
     //ruwan - overwriting sockets using the array from the server  
     $.ajax({
      type: 'GET',
      dataType: "json",
      traditional: true,
      url: '/sendPlayerSockets', //get player sockets array
      data: {},
      contentType: 'application/json', // for request
      success: function(data) {
       
        for(var i=0; i< data.length; i++){
          gameData.players[i].socketId = data[i];
        } 
      },
      error: function () {},      
    });

    //using socket for start game if any one of the player
      //presses start game it should start the game for all the players.
      $('.startGame').hide(); //hide start game button after game is started
      clearInterval(counter);
      $('#Counter').hide();
    
      //ruwan - maing hand panel vissible and populate with initial dcs
      $('.hand-panel').css("visibility", "visible");

      initialiseHandPanel ();
     /*  $.ajax({
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
      }); */

      var bank_coins = gameData.bank.coins;
      $('.bank_coins').append(`<a>
        <img class="coins" src="/images/bank/coins.png">
        <div class="coins">${bank_coins}</div></a>`);
    
      for (i = 0; i < gameData.players.length; i++) {
        var earned_player_coins = gameData.players[i].coins;
        $('.players_coins').append(`<a>
    <img class="player${i}_coins" src="/images/bank/coins.png">
    <div class="player${i}_coins">${earned_player_coins}</div></a>`);
        //CrownPlayer Displaying
        if (gameData.players[i].crowned == true) {
          $('.playerCrown')
            .append(`<div class="player${i}Crown" id="player${i}Crown">
      <img src="/images/bank/crown.png" />
    </div>`);
        }
      }
      $('#crown_disapear').hide(); 
}

function turnPhase(){

}

function endPhase(){

}



function initialiseHandPanel () {
  var data='';
  
  for(var i=0;i< gameData.players.length;i++){
     if(gameData.players[i].socketId === socket.id){

        for( var j=0;j<gameData.players[i].dcsArray.length;j++){
            data = data+'<a><img id ="dcName" class="hand-panel-dc" src='+gameData.players[i].dcsArray[j].url+'></img></a>';
        } 
      }           
  }     
  $('#hand-panel-dcs').append(data);
};