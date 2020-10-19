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
          response = data;
          window.location.replace('http://localhost:3000/gameRoom');
        }
      },
      error: function () {},
    });
  });
});

$('.game-room').ready(function () {
  setInterval(() => {
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
      },
      error: function () {},
    });
  }, 1000);
});

$(document).ready(function () {
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
  });
});
