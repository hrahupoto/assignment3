const userModel = require('../models/DB/user');
const {app} = require("../server")

// app.locals.min;
// app.locals.sec;
exports.userCounter = function (req, res) {
    var m = req.query.timeArray[0];
    var s = req.query.timeArray[1];

    userModel.find({}, function (err, players) {
        if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
        if (sec < 0) { sec = "59" };

        // // console.log(players.users.length)
        // if (players.length == 1) {
        //     startTimer(min,sec);
        // }
        // // user length is more than one counter will be continued
        // if (players.length < 1) {
        //     //  document.getElementById('timer').innerHTML = m + ':' + s;
        //     console.log(m);
        //     startTimer(min,sec);
        // }
    })

}

function startTimer() 
{
    checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }

    //     document.getElementById('timer').innerHTML =         m + ":" + s;
    setTimeout(startTimer, 1000);

    // redirect to 4 player room
    if (m < 0) {
        if (players.users.length == 4) {
            //document.getElementById('timer').innerHTML = 02 + ':' + 00
            //  document.getElementById("Counter").style.visibility = 'hidden';

        }
        else {
            window.location.href = "http://localhost:3000";
        }
    }
}
function checkSecond(sec) {
   
    return sec;
}

/*
var interval;

function countdown() {
  clearInterval(interval);
  interval = setInterval( function() {
      var timer = $('.js-timeout').html();
      timer = timer.split(':');
      var minutes = timer[0];
      var seconds = timer[1];
      seconds -= 1;
      if (minutes < 0) return;
      else if (seconds < 0 && minutes != 0) {
          minutes -= 1;
          seconds = 59;
      }
      else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;

      $('.js-timeout').html(minutes + ':' + seconds);

      if (minutes == 0 && seconds == 0) clearInterval(interval);
  }, 1000);
}

$('#js-startTimer').click(function () {
  $('.js-timeout').text("2:00");
  countdown();
});

$('#js-resetTimer').click(function () {
  $('.js-timeout').text("2:00");
  clearInterval(interval);
});
*/