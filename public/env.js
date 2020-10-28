//Make connection
const socket = io.connect('http://localhost:3000');
var counter;
var clickCount = 0;
var cCards;
var className;
var $pointer;
var $hidePointer;
var updatedCCards = []; //updated charcter cards left
var userName; //url login user name
var c = 0; // pointer turn checker
$(document).ready(function () {
  //login functionality
  $('.joinRoom').click(function () {
    var userName = $('#userName').val();
    var dateOfBirth = $('#dob').val();
    sessionStorage.setItem('userName', userName);

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
          window.location.href = `gameRoom?userName=${userName}`; //sending login username in the url
        }
      },
      error: function () {},
    });
  });

  // start game functionality
  $('a[href="#startGame"]').click(function () {
    $.ajax({
      type: 'GET',
      url: '/startGame',
      data: {},
      success: function (players) {
        if (players == 'Please wait for more players to show up.') {
          alert(players);
        } else {
          //using socket for start game if any one of the player
          //presses start game it should start the game for all the players.

          socket.emit('startGame', {
            players: players,
          });
          socket.emit('updatepointer', {
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

    //emiting exit event for all users
    socket.emit('exit', {});
  });

  //listening event for exit users
  socket.on('exit', () => {
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
    var playerName = sessionStorage.getItem('userName');
    socket.emit('chat', {
      message: message,
      playerName: playerName,
    });
    $('#message').val('');
  });

  $('#message').keypress(function () {
    var playerName = sessionStorage.getItem('userName');
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
//Game room page ready
$('.game-Room').ready(function () {
  //hiding Selection panel Initially
  //hiding panels before game starts
  $("#selectionPanel").hide();
  $("#selectionPanel2").hide();
  $("#selectionPanel3").hide();
  //setting initial timer
  document.getElementById('timer').innerHTML = 02 + ':' + 00;
  counter = setInterval(() => {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    $.ajax({
      type: 'GET',
      url: '/userCounter',
      data: {timeArray},
      success: function (data) {

        if (data == 'hide') {
          $.ajax({
            type: 'GET',
            url: '/startGame', //start the game if 4 users are present in the room
            data: {},
            success: function (players) {
              socket.emit('startGame', {
                players: players,
              });
            },
            error: function () {},
          });
        } else if (data == 'redirect') {
          clearInterval(counter);
          $.ajax({
            type: 'GET',
            url: '/deleteAllUsers', //delete all users before redirecting to lobby
            data: {},
            success: function () {},
            error: function () {},
          });
          //socket exit event for all users
          socket.emit('exit', {});
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
  document.getElementById('timer').innerHTML =
    timer.minutes + ':' + timer.seconds;
});

socket.on('startGame', (players) => {
  socket.emit('pointer', {players: players.players});
  //using socket for start game if any one of the player
  //presses start game it should start the game for all the players.
  $('.startGame').hide(); //hide start game button after game is started
  clearInterval(counter);
  $('#Counter').hide(); //hiding counter after game starts
  var bank_coins = players.bank.coins;
  $('.bank_coins').append(`<a>
    <img class="coins" src="/images/bank/coins.png">
    <div class="coins">${bank_coins}</div></a>`);
  // for (var i = 0; i < players.players.length; i++) {
  //   if (players.players[i].turn == true) {
  //     //User Game Turn Pointer
  //     $pointer = $(`.player${i}Pointer`);
  //     $pointer.css("visibility", "visible");
  //   }
  // }
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
  //hiding bank crown
  $('#crown_disapear').hide();

  //getting login username from the url
  userName = window.location.href.split('=');
  userName = userName[1].split('#');
  userName = userName[0];
  // checking whhich player turn
  for (var i = 0; i < players.players.length; i++) {
    if (players.players[i].turn == true) {
      if (players.players[i].name == userName) {
        //Game Starts: Selection Panel for character Cards
        // 3 seconds delay before game starts
        setTimeout(function () {
          //Displaying the first selection panel
          $('#selectionPanel').show();
          $('#ccPanelBtn3').hide();
        }, 1500);
        //1st charcter card on click
        $('#cc1').click(function () {
          $('#cc1').hide();
          $.ajax({
            type: 'GET',
            url: '/selectionPanel',
            data: {clickCount},
            success: function (data) {
              // based on clickCount appending face up and face down cards
              if (clickCount == 0) {
                $('#ccFaceUp1').append(
                  `<img id="ccFaceUp1" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 1) {
                $('#cc1').hide();
                $('#ccFaceUp2').append(
                  `<img id="ccFaceUp2" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 2) {
                $('#cc1').hide();
                $('#ccFaceUp3').append(
                  `<img id="ccFaceUp3" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 3) {
                $('#cc1').hide();
                $('#ccFacedown').append(
                  `<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 4) {
                alert('Cards already Selected');
              }
            },
            error: function () {},
          });
        });
        //second character card click
        $('#cc2').click(function () {
          $.ajax({
            type: 'GET',
            url: '/selectionPanel',
            data: {clickCount},
            success: function (data) {
              // based on clickCount appending face up and face down cards
              if (clickCount == 0) {
                $('#cc2').hide();
                $('#ccFaceUp1').append(
                  `<img id="ccFaceUp1" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 1) {
                $('#cc2').hide();
                $('#ccFaceUp2').append(
                  `<img id="ccFaceUp2" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 2) {
                $('#cc2').hide();
                $('#ccFaceUp3').append(
                  `<img id="ccFaceUp3" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 3) {
                $('#cc2').hide();
                $('#ccFacedown').append(
                  `<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 4) {
                alert('Cards already Selected');
              }
            },
            error: function () {},
          });
        });
        //third characer card click
        $('#cc3').click(function () {
          $.ajax({
            type: 'GET',
            url: '/selectionPanel',
            data: {clickCount},
            success: function (data) {
              // based on clickCount appending face up and face down cards
              if (clickCount == 0) {
                $('#cc3').hide();
                $('#ccFaceUp1').append(
                  `<img id="ccFaceUp1" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 1) {
                $('#cc3').hide();
                $('#ccFaceUp2').append(
                  `<img id="ccFaceUp2" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 2) {
                $('#cc3').hide();
                $('#ccFaceUp3').append(
                  `<img id="ccFaceUp3" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 3) {
                $('#cc3').hide();
                $('#ccFacedown').append(
                  `<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 4) {
                alert('Cards already Selected');
              }
            },
            error: function () {},
          });
        });
        // fourth character card click
        $('#cc4').click(function () {
          $.ajax({
            type: 'GET',
            url: '/selectionPanel',
            data: {clickCount},
            success: function (data) {
              // based on clickCount appending face up and face down cards
              if (clickCount == 0) {
                $('#cc4').hide();
                $('#ccFaceUp1').append(
                  `<img id="ccFaceUp1" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 1) {
                $('#cc4').hide();
                $('#ccFaceUp2').append(
                  `<img id="ccFaceUp2" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 2) {
                $('#cc4').hide();
                $('#ccFaceUp3').append(
                  `<img id="ccFaceUp3" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 3) {
                $('#cc4').hide();
                $('#ccFacedown').append(
                  `<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 4) {
                alert('Cards already Selected');
              }
            },
            error: function () {},
          });
        });
        //fifth character card click
        $('#cc5').click(function () {
          $.ajax({
            type: 'GET',
            url: '/selectionPanel',
            data: {clickCount},
            success: function (data) {
              // based on clickCount appending face up and face down cards
              if (clickCount == 0) {
                $('#cc5').hide();
                $('#ccFaceUp1').append(
                  `<img id="ccFaceUp1" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 1) {
                $('#cc5').hide();
                $('#ccFaceUp2').append(
                  `<img id="ccFaceUp2" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 2) {
                $('#cc5').hide();
                $('#ccFaceUp3').append(
                  `<img id="ccFaceUp3" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 3) {
                $('#cc5').hide();
                $('#ccFacedown').append(
                  `<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 4) {
                alert('Cards already Selected');
              }
            },
            error: function () {},
          });
        });
        //sixth character card click
        $('#cc6').click(function () {
          $.ajax({
            type: 'GET',
            url: '/selectionPanel',
            data: {clickCount},
            success: function (data) {
              // based on clickCount appending face up and face down cards
              if (clickCount == 0) {
                $('#cc6').hide();
                $('#ccFaceUp1').append(
                  `<img id="ccFaceUp1" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 1) {
                $('#cc6').hide();
                $('#ccFaceUp2').append(
                  `<img id="ccFaceUp2" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 2) {
                $('#cc6').hide();
                $('#ccFaceUp3').append(
                  `<img id="ccFaceUp3" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 3) {
                $('#cc6').hide();
                $('#ccFacedown').append(
                  `<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 4) {
                alert('Cards already Selected');
              }
            },
            error: function () {},
          });
        });
        //seventh character card click
        $('#cc7').click(function () {
          $.ajax({
            type: 'GET',
            url: '/selectionPanel',
            data: {clickCount},
            success: function (data) {
              // based on clickCount appending face up and face down cards
              if (clickCount == 0) {
                $('#cc7').hide();
                $('#ccFaceUp1').append(
                  `<img id="ccFaceUp1" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 1) {
                $('#cc7').hide();
                $('#ccFaceUp2').append(
                  `<img id="ccFaceUp2" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 2) {
                $('#cc7').hide();
                $('#ccFaceUp3').append(
                  `<img id="ccFaceUp3" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 3) {
                $('#cc7').hide();
                $('#ccFacedown').append(
                  `<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 4) {
                alert('Cards already Selected');
              }
            },
            error: function () {},
          });
        });
        //eighth character card click
        $('#cc8').click(function () {
          $.ajax({
            type: 'GET',
            url: '/selectionPanel',
            data: {clickCount},
            success: function (data) {
              // based on clickCount appending face up and face down cards
              if (clickCount == 0) {
                $('#cc8').hide();
                $('#ccFaceUp1').append(
                  `<img id="ccFaceUp1" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 1) {
                $('#cc8').hide();
                $('#ccFaceUp2').append(
                  `<img id="ccFaceUp2" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 2) {
                $('#cc8').hide();
                $('#ccFaceUp3').append(
                  `<img id="ccFaceUp3" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 3) {
                $('#cc8').hide();
                $('#ccFacedown').append(
                  `<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 4) {
                alert('Cards already Selected');
              }
            },
            error: function () {},
          });
        });
        //ninth character card click
        $('#cc9').click(function () {
          $.ajax({
            type: 'GET',
            url: '/selectionPanel',
            data: {clickCount},
            success: function (data) {
              // based on clickCount appending face up and face down cards
              cCards = data.cCards;
              if (clickCount == 0) {
                $('#cc9').hide();
                $('#ccFaceUp1').append(
                  `<img id="ccFaceUp1" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 1) {
                $('#cc9').hide();
                $('#ccFaceUp2').append(
                  `<img id="ccFaceUp2" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 2) {
                $('#cc9').hide();
                $('#ccFaceUp3').append(
                  `<img id="ccFaceUp3" src='${data.cardLoc}'>`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 3) {
                $('#cc9').hide();
                $('#ccFacedown').append(
                  `<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`
                );
                clickCount = clickCount + 1;
              } else if (clickCount == 4) {
                alert('Cards already Selected');
              }
            },
            error: function () {},
          });
        });
        //ok button click after crown players choses face up and face down cards
        $('#ccPanelBtn').click(function () {
          if (clickCount == 4) {
            //showing the second panel
            $('#selectionPanel2').show();
            //hiding first panel
            $('#selectionPanel').hide();
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount},
              success: function (data) {
                for (var i = 0; i < data.length; i++) {
                  $(`#cc${i}Selection1`).append(
                    `<img id="cc${i}Selection1" class="${data[i].name}" src='${data[i].location}'>`
                  );
                }
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Error: Please select all cards.');
        });
        //character card selection for 1st turn player
        $('#cc0Selection1').click(function () {
          if (clickCount == 5) {
            $('#cc0Selection1').hide();

            className = $('#cc0Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#cc1Selection1').click(function () {
          if (clickCount == 5) {
            $('#cc1Selection1').hide();
            className = $('#cc1Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;

                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#cc2Selection1').click(function () {
          if (clickCount == 5) {
            $('#cc2Selection1').hide();

            className = $('#cc2Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#cc3Selection1').click(function () {
          if (clickCount == 5) {
            $('#cc3Selection1').hide();

            className = $('#cc3Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#cc4Selection1').click(function () {
          if (clickCount == 5) {
            $('#cc4Selection1').hide();

            className = $('#cc4Selection1 > img').attr('class');

            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });

        $('#ccPanelBtn2').click(function () {
          $('#selectionPanel2').hide();
          if (clickCount == 6) {
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, updatedCCards},
              success: function (data) {
                for (var i = 0; i < 5; i++) {
                  $(`#cc${i}Selection1`).empty();
                }
                socket.emit('pointer2', {players: data.updatePlayers});
                socket.emit('turn', {
                  data: data,
                });
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Error: Please select your character card.');
        });
        break;
      }
    }
  }
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

//socket to move broadcast player turn pointer
socket.on('pointer', (players) => {
  // pointer for initial turn
  for (var i = 0; i < players.length; i++) {
    if (players[i].turn == true && players[i].crowned == true) {
      //User Game Turn Pointer
      $pointer = $(`.player${i}Pointer`);
      $pointer.css('visibility', 'visible');
    }
  }
});
socket.on('pointer2', (players) => {
  //pointer turning code after 1st turn is finished
  for (var i = 0; i < players.length; i++) {
    if (players[i].crowned == false) {
      if (players[i].turn == true) {
        if ($pointer.is(':nth-last-child(2)')) {
          $hidePointer = $pointer;
          $hidePointer.css('visibility', 'hidden');
          $pointer = $(`.player0Pointer`);
          $pointer.css('visibility', 'visible');
        } else {
          $pointer = $pointer.next();
          $pointer.css('visibility', 'visible');
          $hidePointer = $pointer.prev();
          $hidePointer.css('visibility', 'hidden');
        }
      }
    }
  }
});
//socket to show panel for 2nd player turn
socket.on('turn', (data) => {
  for (var i = 0; i < data.data.updatePlayers.length; i++) {
    if (data.data.updatePlayers[i].turn == true) {
      if (data.data.updatePlayers[i].name == userName) {
        $('#selectionPanel2').show();
        $('#ccPanelBtn3').hide();
        $(`#cc0Selection1`).append(
          `<img id="cc0Selection1" class="${data.data.newCharacters[0].name}" src='${data.data.newCharacters[0].location}'>`
        );
        $(`#cc1Selection1`).append(
          `<img id="cc1Selection1" class="${data.data.newCharacters[1].name}" src='${data.data.newCharacters[1].location}'>`
        );
        $(`#cc2Selection1`).append(
          `<img id="cc0Selection1" class="${data.data.newCharacters[2].name}" src='${data.data.newCharacters[2].location}'>`
        );
        $(`#cc3Selection1`).append(
          `<img id="cc0Selection1" class="${data.data.newCharacters[3].name}" src='${data.data.newCharacters[3].location}'>`
        );
        clickCount = 7;
        //character card selection for 2nd turn player
        $('#cc0Selection1').click(function () {
          if (clickCount == 7) {
            $('#cc0Selection1').hide();

            className = $('#cc0Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#cc1Selection1').click(function () {
          if (clickCount == 7) {
            $('#cc1Selection1').hide();
            className = $('#cc1Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;

                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#cc2Selection1').click(function () {
          if (clickCount == 7) {
            $('#cc2Selection1').hide();

            className = $('#cc2Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#cc3Selection1').click(function () {
          if (clickCount == 7) {
            $('#cc3Selection1').hide();

            className = $('#cc3Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#ccPanelBtn2').click(function () {
          $('#selectionPanel2').hide();
          if (clickCount == 8) {
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, updatedCCards},
              success: function (data) {
                for (var i = 0; i < 5; i++) {
                  $(`#cc${i}Selection1`).empty();
                }
                socket.emit('pointer2', {players: data.updatePlayers1});
                socket.emit('turn2', {
                  data: data,
                });
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Error: Please select your character card.');
        });
      }
    }
  }
});

//socket to show panel for 3rd player turn
socket.on('turn2', (data) => {
  for (var i = 0; i < data.data.updatePlayers1.length; i++) {
    if (data.data.updatePlayers1[i].turn == true) {
      if (data.data.updatePlayers1[i].name == userName) {
        $('#selectionPanel2').show();
        $('#ccPanelBtn3').hide();
        $(`#cc0Selection1`).append(
          `<img id="cc0Selection1" class="${data.data.newCharacters[0].name}" src='${data.data.newCharacters[0].location}'>`
        );
        $(`#cc1Selection1`).append(
          `<img id="cc1Selection1" class="${data.data.newCharacters[1].name}" src='${data.data.newCharacters[1].location}'>`
        );
        $(`#cc2Selection1`).append(
          `<img id="cc0Selection1" class="${data.data.newCharacters[2].name}" src='${data.data.newCharacters[2].location}'>`
        );
        clickCount = 9;
        //character card selection for 3rd turn player
        $('#cc0Selection1').click(function () {
          if (clickCount == 9) {
            $('#cc0Selection1').hide();

            className = $('#cc0Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#cc1Selection1').click(function () {
          if (clickCount == 9) {
            $('#cc1Selection1').hide();
            className = $('#cc1Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;

                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#cc2Selection1').click(function () {
          if (clickCount == 9) {
            $('#cc2Selection1').hide();

            className = $('#cc2Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#cc3Selection1').click(function () {
          if (clickCount == 9) {
            $('#cc3Selection1').hide();

            className = $('#cc3Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#ccPanelBtn2').click(function () {
          $('#selectionPanel2').hide();
          if (clickCount == 10) {
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, updatedCCards},
              success: function (data) {
                for (var i = 0; i < 5; i++) {
                  $(`#cc${i}Selection1`).empty();
                }
                socket.emit('pointer2', {players: data.updatePlayers2});
                socket.emit('turn3', {
                  data: data,
                });
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Error: Please select your character card.');
        });
      }
    }
  }
});
//socket to show panel for 3rd player turn
socket.on('turn3', (data) => {
  for (var i = 0; i < data.data.updatePlayers2.length; i++) {
    if (data.data.updatePlayers2[i].turn == true) {
      if (data.data.updatePlayers2[i].name == userName) {
        $('#selectionPanel2').show();
        $('#ccPanelBtn3').show();
        $('#ccPanelBtn2').hide();

        $(`#cc0Selection1`).append(
          `<img id="cc0Selection1" class="${data.data.newCharacters[0].name}" src='${data.data.newCharacters[0].location}'>`
        );
        $(`#cc1Selection1`).append(
          `<img id="cc1Selection1" class="${data.data.newCharacters[1].name}" src='${data.data.newCharacters[1].location}'>`
        );

        clickCount = 11;
        //character card selection for 4th turn player
        $('#cc0Selection1').click(function () {
          if (clickCount == 11) {
            $('#cc0Selection1').hide();

            className = $('#cc0Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#cc1Selection1').click(function () {
          if (clickCount == 11) {
            $('#cc1Selection1').hide();
            className = $('#cc1Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;

                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#cc2Selection1').click(function () {
          if (clickCount == 11) {
            $('#cc2Selection1').hide();

            className = $('#cc2Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#cc3Selection1').click(function () {
          if (clickCount == 11) {
            $('#cc3Selection1').hide();

            className = $('#cc3Selection1 > img').attr('class');
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, className, userName},
              success: function (data) {
                updatedCCards = data;
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Cards already Selected');
        });
        $('#ccPanelBtn3').click(function () {
          $('#selectionPanel2').hide();
          if (clickCount == 12) {
            $.ajax({
              type: 'GET',
              url: '/selectionPanel',
              data: {clickCount, updatedCCards},
              success: function (data) {
                for (var i = 0; i < 5; i++) {
                  $(`#cc${i}Selection1`).empty();
                }
                socket.emit("pointerOff", { players: data.updatePlayers3 });
                socket.emit("pointer", { players: data.updatePlayers3 });
                    socket.emit("turn4", {
                    data: data,
                    });
                clickCount = clickCount + 1;
              },
              error: function () {},
            });
          } else alert('Error: Please select your character card.');
        });
      }
    }
  }
});
//socket turnpointer off
socket.on("pointerOff", (players) => {
  $(".player0Pointer").css("visibility", "hidden");
  $(".player1Pointer").css("visibility", "hidden");
  $(".player2Pointer").css("visibility", "hidden");
  $(".player3Pointer").css("visibility", "hidden");
});

socket.on("turn4", (data) => {
  for (var i = 0; i < data.data.updatePlayers3.length; i++) {
    if (data.data.updatePlayers3[i].turn == true) {
      if (data.data.updatePlayers3[i].name == userName) {
        $("#selectionPanel3").show();}}}});