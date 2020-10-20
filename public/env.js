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


$('.game-room').ready(function () {
  document.getElementById('timer').innerHTML = 01 + ':' + 00
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  $.ajax({
    type: 'GET',
    url: '/userCounter',
    data: {timeArray},
    success: function (data) {

    },
    error: function () { },
  });
  /*
    $.ajax({
      type: 'GET',
      url: '/getUsers',
      data: {},
      success: function (players) {
     // console.log(players.users.length)
      if (players.users.length == 1) {
        document.getElementById('timer').innerHTML = 01 + ':' + 00;
        startTimer();
      }
      // user length is more than one counter will be continued
      if (players.users.length < 1) {
        document.getElementById('timer').innerHTML = m + ':' + s;
        console.log(m);
        startTimer();
      }
      },
    error: function () {},
    });
    function startTimer() {
      var presentTime = document.getElementById('timer').innerHTML;
      var timeArray = presentTime.split(/[:]+/);
      m = timeArray[0];
      s = checkSecond((timeArray[1] - 1));
      if(s==59){m=m-1}
    
      document.getElementById('timer').innerHTML =
            m + ":" + s;
          setTimeout(startTimer, 1000);
      
      // redirect to 4 player room
      if(m<0){
        $.ajax({
          type: 'GET',
          url: '/getUsers',
          data: {},
          success: function (players) {
            if (players.users.length == 4) {
              document.getElementById('timer').innerHTML = 02 + ':' + 00
              document.getElementById("Counter").style.visibility = 'hidden'; 
                 
          }
          else{
            window.location.href = "http://localhost:3000";
          }
        }
      });
    }
    }
    function checkSecond(sec) {
      if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
      if (sec < 0) {sec = "59"};
      return sec;
    }  
  */
});