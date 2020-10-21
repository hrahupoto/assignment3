//Make connection
const socket = io.connect('http://localhost:3000');

$(document).ready(function () {

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
});

$(document).ready(function () {
  
  $('.collapsible').click(function () {
    var content = document.getElementById("content")
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});




//Emit events
$(document).ready(function () {

  $('#send').click(function () {
    var message = $('#message').val()
    var playerName = $('#handle').val()
    socket.emit('chat', {
      message: message,
      playerName: playerName
  });
  $('#message').val('');
  });

  $('#message').keypress(function (){
    var playerName = $('#handle').val()
    socket.emit('typing',playerName);
  })

  // Listen for chat events
  socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.playerName + ': </strong>' + data.message + '</p>';
  });

  // listen for typing events
  socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
});


