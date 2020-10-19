//Make connection
const socket = io.connect('http://localhost:3000');


  $('.joinRoom').click(function () {
      var userName = $('#userName').val()
      var dateOfBirth = $('#dob').val()

      $.ajax({
          type: "GET",
          url: "/insertUser",
          data: { userName, dateOfBirth },
          success: function (data) {
            if(data=='User already exists, Please try entering different username.')
            {
              alert(JSON.stringify(data))
            }
            else if(data=='Game room is full. Please try again later.')
            {
              alert(JSON.stringify(data))
            }
            else
            {
              window.location.href = 'gameRoom'
            }
          },
          error: function () { },
      });
      console.log(userName)
      console.log(dateOfBirth)
  });
})

$(document).ready(function () {
    $('a[href="#startGame"]').click(function () {
      $.ajax({
        type: 'GET',
        url: '/startGame',
        data: {},
        success: function (players) {
          console.log(players)
        },
        error: function () {},
      });
    });

    //counter starts when join room button is called
   
      const userModel = require('../models/db/user');
      var m; //minute variable
      var s; //seconds variable
    //Counter hit when 1st player enters game room
      userModel.find({}, function(err, users) {
          if (users.length < 1) {
            document.getElementById('timer').innerHTML =
            02 + ":" + 00;
            startTimer();
    }
          // user length is more than one counter will be continued
          if (users.length == 1) {
            document.getElementById('timer').innerHTML =
            m + ":" + s;
            console.log(m)
            startTimer();
    }
      });
      
    
    //Function to start Timer
    function startTimer() {
      var presentTime = document.getElementById('timer').innerHTML;
      var timeArray = presentTime.split(/[:]+/);
      m = timeArray[0];
      s = checkSecond((timeArray[1] - 1));
      if(s==59){m=m-1}
    
      document.getElementById('timer').innerHTML =
            m + ":" + s;
          console.log(m)
          setTimeout(startTimer, 1000);
      
      // redirect to 4 player room
      if(m<0){
        var http = require("http");
        http.createServer(function(req, res) {
          res.writeHead(301,{Location: 'http://localhost:3000/PlayerRoom'});
          res.end();
        }).listen(3000);   }
    }
    
    function checkSecond(sec) {
      if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
      if (sec < 0) {sec = "59"};
      return sec;
    }
    
});



