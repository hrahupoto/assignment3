//Make connection
const socket = io.connect('http://localhost:3000');
var m; //minute variable
var s; //seconds variable
var playersLength; // players lentgth
$(document).ready(function () {

  $('.joinRoom').click(function () {
    var userName = $('#userName').val()
    var dateOfBirth = $('#dob').val()

    $.ajax({
      type: "GET",
      url: "/insertUser",
      data: { userName, dateOfBirth },
      success: function (data) {
        if (data == 'User already exists, Please try entering different username.') {
          alert(JSON.stringify(data))
        }
        else if (data == 'Game room is full. Please try again later.') {
          alert(JSON.stringify(data))
        }
        else {
          window.location.href = 'gameRoom'
        }
      },
      error: function () { },
    });
    console.log(userName)
    console.log(dateOfBirth)
  });

  $('a[href="#startGame"]').click(function () {
    $.ajax({
      type: 'GET',
      url: '/startGame',
      data: {},
      success: function (players) {
        console.log(players)
      },
      error: function () { },
    });
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
          document.getElementsById('Counter').style.visibility = 'hidden';
        } else if (data == 'redirect') {
          clearInterval(counter);
          window.location.href = 'lobby';
        } else {
          document.getElementById('timer').innerHTML = data;
        }
      },
      error: function () {},
    });
  }, 1000);
});