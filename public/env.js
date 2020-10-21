//Make connection
const socket = io.connect('http://localhost:3000');
var response;

$(document).ready(function () {
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

  $('a[href="#startGame"]').click(function () {
    $.ajax({
      type: 'GET',
      url: '/startGame',
      data: {},
      success: function (players) {
        console.log(players);
      },
      error: function () {},
    });
    $('.startGame').hide(); //hide start game button after game is started
  });
});

$('.game-Room').ready(function () {
  document.getElementById('timer').innerHTML = 01 + ':' + 00;
  var counter = setInterval(() => {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    $.ajax({
      type: 'GET',
      url: '/userCounter',
      data: {timeArray},
      success: function (data) {
        console.log(data);
        if (data == 'hide') {
          clearInterval(counter);
          $('#Counter').hide();
          $('.startGame').hide();
          $.ajax({
            type: 'GET',
            url: '/startGame', //start the game if 4 users are present in the room
            data: {},
            success: function (players) {
              console.log(players);
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
  console.log(timer);
  document.getElementById('timer').innerHTML =
    timer.minutes + ':' + timer.seconds;
});

$('.game-room').ready(function () {
  var appendPlayers=setInterval(() => {
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
        if(players.users.length==4){
          clearInterval(appendPlayers)
        }
      },
      error: function () {},
    });
  }, 1000);
});
