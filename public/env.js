//Make connection
const socket = io.connect("http://localhost:3000");
var counter;
var clickCount = 0;

$(document).ready(function () {
  //login functionality
  $(".joinRoom").click(function () {
    var userName = $("#userName").val();
    var dateOfBirth = $("#dob").val();

    $.ajax({
      type: "GET",
      url: "/insertUser",
      data: { userName, dateOfBirth },
      success: function (data) {
        if (
          data == "User already exists, Please try entering different username."
        ) {
          alert(JSON.stringify(data));
        } else if (data == "Game room is full. Please try again later.") {
          alert(JSON.stringify(data));
        } else {
          window.location.href = "gameRoom";
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
      type: "GET",
      url: "/startGame",
      data: {},
      success: function (players) {
        if (players == "Please wait for more players to show up.") {
          alert(players);
        } else {
          $(".startGame").hide(); //hide start game button after game is started
          clearInterval(counter);
          $("#Counter").hide();
          var bank_coins = players.bank.coins;
          $(".bank_coins").append(`<a>
                    <img class="coins" src="/images/bank/coins.png">
                    <div class="coins">${bank_coins}</div></a>`);
          console.log(players);
          for (i = 0; i < players.players.length; i++) {
            var earned_player_coins = players.players[i].coins;
            $(".players_coins").append(`<a>
          <img class="player${i}_coins" src="/images/bank/coins.png">
          <div class="player${i}_coins">${earned_player_coins}</div></a>`);
            //CrownPlayer Displaying
            if (players.players[i].crowned == true) {
              $(".playerCrown")
                .append(`<div class="player${i}Crown" id="player${i}Crown">
              <img src="/images/bank/crown.png" />
            </div>`);
              //User Game Turn Pointer
              var $pointer = $(`.player${i}Pointer`);
              $pointer.css("visibility", "visible");
            }
          }
          $("#crown_disapear").hide();
          //Game Starts: Selection Panel for character Cards
          // 3 seconds delay before game starts
          setTimeout(function () {
            //Displaying the first selection panel
            $("#selectionPanel").show();
            }, 1500);
          $("#cc1").click(function () {
            $("#cc1").hide();
            $.ajax({
              type: "GET",
              url: "/selectionPanel",
              data: { clickCount },
              success: function (data) {
                console.log(data.cardLoc);
                console.log(data);
                if (clickCount == 0) {
                  $("#ccFaceUp1").append(`<img id="ccFaceUp1" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 1) {
                  $("#cc1").hide();
                  $("#ccFaceUp2").append(`<img id="ccFaceUp2" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 2) {
                  $("#cc1").hide();
                  $("#ccFaceUp3").append(`<img id="ccFaceUp3" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 3) {
                  $("#cc1").hide();
                  $("#ccFacedown").append(`<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`);
                  clickCount = clickCount + 1;
                }
              },
              error: function () {},
            });
          });
          $("#cc2").click(function () {
            $.ajax({
              type: "GET",
              url: "/selectionPanel",
              data: { clickCount },
              success: function (data) {
                console.log(data.cardLoc);
                console.log(data);
                if (clickCount == 0) {
                  $("#cc2").hide();
                  $("#ccFaceUp1").append(`<img id="ccFaceUp1" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 1) {
                  $("#cc2").hide();
                  $("#ccFaceUp2").append(`<img id="ccFaceUp2" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 2) {
                  $("#cc2").hide();
                  $("#ccFaceUp3").append(`<img id="ccFaceUp3" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 3) {
                  $("#cc2").hide();
                  $("#ccFacedown").append(`<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 4){
                  alert("Cards already Selected");
                  }
              },
              error: function () {},
            });
          });
          $("#cc3").click(function () {
            $.ajax({
              type: "GET",
              url: "/selectionPanel",
              data: { clickCount },
              success: function (data) {
                console.log(data.cardLoc);
                console.log(data);
                if (clickCount == 0) {
                  $("#cc3").hide();
                  $("#ccFaceUp1").append(`<img id="ccFaceUp1" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 1) {
                  $("#cc3").hide();
                  $("#ccFaceUp2").append(`<img id="ccFaceUp2" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 2) {
                  $("#cc3").hide();
                  $("#ccFaceUp3").append(`<img id="ccFaceUp3" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 3) {
                  $("#cc3").hide();
                  $("#ccFacedown").append(`<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`);
                  clickCount = clickCount + 1;
                }
              },
              error: function () {},
            });
          });
          $("#cc4").click(function () {
            $.ajax({
              type: "GET",
              url: "/selectionPanel",
              data: { clickCount },
              success: function (data) {
                console.log(data.cardLoc);
                console.log(data);
                if (clickCount == 0) {
                  $("#cc4").hide();
                  $("#ccFaceUp1").append(`<img id="ccFaceUp1" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 1) {
                  $("#cc4").hide();
                  $("#ccFaceUp2").append(`<img id="ccFaceUp2" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 2) {
                  $("#cc4").hide();
                  $("#ccFaceUp3").append(`<img id="ccFaceUp3" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 3) {
                  $("#cc4").hide();
                  $("#ccFacedown").append(`<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`);
                  clickCount = clickCount + 1;
                }
              },
              error: function () {},
            });
          });
          $("#cc5").click(function () {
            $.ajax({
              type: "GET",
              url: "/selectionPanel",
              data: { clickCount },
              success: function (data) {
                console.log(data.cardLoc);
                console.log(data);
                if (clickCount == 0) {
                  $("#cc5").hide();
                  $("#ccFaceUp1").append(`<img id="ccFaceUp1" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 1) {
                  $("#cc5").hide();
                  $("#ccFaceUp2").append(`<img id="ccFaceUp2" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 2) {
                  $("#cc5").hide();
                  $("#ccFaceUp3").append(`<img id="ccFaceUp3" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 3) {
                  $("#cc5").hide();
                  $("#ccFacedown").append(`<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`);
                  clickCount = clickCount + 1;
                }
              },
              error: function () {},
            });
          });
          $("#cc6").click(function () {
            $.ajax({
              type: "GET",
              url: "/selectionPanel",
              data: { clickCount },
              success: function (data) {
                console.log(data.cardLoc);
                console.log(data);
                if (clickCount == 0) {
                  $("#cc6").hide();
                  $("#ccFaceUp1").append(`<img id="ccFaceUp1" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 1) {
                  $("#cc6").hide();
                  $("#ccFaceUp2").append(`<img id="ccFaceUp2" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 2) {
                  $("#cc6").hide();
                  $("#ccFaceUp3").append(`<img id="ccFaceUp3" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 3) {
                  $("#cc6").hide();
                  $("#ccFacedown").append(`<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`);
                  clickCount = clickCount + 1;
                }
              },
              error: function () {},
            });
          });
          $("#cc7").click(function () {
            $.ajax({
              type: "GET",
              url: "/selectionPanel",
              data: { clickCount },
              success: function (data) {
                console.log(data.cardLoc);
                console.log(data);
                if (clickCount == 0) {
                  $("#cc7").hide();
                  $("#ccFaceUp1").append(`<img id="ccFaceUp1" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 1) {
                  $("#cc7").hide();
                  $("#ccFaceUp2").append(`<img id="ccFaceUp2" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 2) {
                  $("#cc7").hide();
                  $("#ccFaceUp3").append(`<img id="ccFaceUp3" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 3) {
                  $("#cc7").hide();
                  $("#ccFacedown").append(`<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`);
                  clickCount = clickCount + 1;
                }
              },
              error: function () {},
            });
          });
          $("#cc8").click(function () {
            $.ajax({
              type: "GET",
              url: "/selectionPanel",
              data: { clickCount },
              success: function (data) {
                console.log(data.cardLoc);
                console.log(data);
                if (clickCount == 0) {
                  $("#cc8").hide();
                  $("#ccFaceUp1").append(`<img id="ccFaceUp1" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 1) {
                  $("#cc8").hide();
                  $("#ccFaceUp2").append(`<img id="ccFaceUp2" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 2) {
                  $("#cc8").hide();
                  $("#ccFaceUp3").append(`<img id="ccFaceUp3" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 3) {
                  $("#cc8").hide();
                  $("#ccFacedown").append(`<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`);
                  clickCount = clickCount + 1;
                }
              },
              error: function () {},
            });
          });
          $("#cc9").click(function () {
            $.ajax({
              type: "GET",
              url: "/selectionPanel",
              data: { clickCount },
              success: function (data) {
                console.log(data.cardLoc);
                console.log(data);
                if (clickCount == 0) {
                  $("#cc9").hide();
                  $("#ccFaceUp1").append(`<img id="ccFaceUp1" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 1) {
                  $("#cc9").hide();
                  $("#ccFaceUp2").append(`<img id="ccFaceUp2" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 2) {
                  $("#cc9").hide();
                  $("#ccFaceUp3").append(`<img id="ccFaceUp3" src='${data.cardLoc}'>`);
                  clickCount = clickCount + 1;
                }
                else if (clickCount == 3) {
                  $("#cc9").hide();
                  $("#ccFacedown").append(`<img id="ccFacedown" src="/images/characterCards/CharacterCard_rear.jpg">`);
                  clickCount = clickCount + 1;
                }
              },
              error: function () {},
            });
          });
          $("#ccPanelBtn").click(function () {
            if(clickCount==4){
              $("#selectionPanel2").show();
              $("#selectionPanel").hide();
            }
            else
            alert("Error: Please select all cards.")
          });
        }
      },
      error: function () {},
    });
  });
  //exit function functionality
  $(".exitGame").click(function () {
    $.ajax({
      type: "GET",
      url: "/deleteAllUsers", //delete all users before redirecting to lobby
      data: {},
      success: function () {},
      error: function () {},
    });
    window.location.href = "/";
  });

  $(".collapsible").click(function () {
    var content = document.getElementById("content");
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });

  //Emit events
  $("#send").click(function () {
    var message = $("#message").val();
    var playerName = $("#handle").val();
    socket.emit("chat", {
      message: message,
      playerName: playerName,
    });
    $("#message").val("");
  });

  $("#message").keypress(function () {
    var playerName = $("#handle").val();
    socket.emit("typing", playerName);
  });

  // Listen for chat events
  socket.on("chat", function (data) {
    feedback.innerHTML = "";
    output.innerHTML +=
      "<p><strong>" + data.playerName + ": </strong>" + data.message + "</p>";
  });

  // listen for typing events
  socket.on("typing", function (data) {
    feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
  });
});

$(".game-Room").ready(function () {
  //hiding Selection panel Initially
  $("#selectionPanel").hide();
  $("#selectionPanel2").hide();
  document.getElementById("timer").innerHTML = 02 + ":" + 00;
  counter = setInterval(() => {
    var presentTime = document.getElementById("timer").innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    $.ajax({
      type: "GET",
      url: "/userCounter",
      data: { timeArray },
      success: function (data) {
        //console.log(data);
        if (data == "hide") {
          clearInterval(counter);
          $("#Counter").hide();
          $(".startGame").hide();
          $.ajax({
            type: "GET",
            url: "/startGame", //start the game if 4 users are present in the room
            data: {},
            success: function (players) {
              var bank_coins = players.bank.coins;
              $(".bank_coins").append(`<a>
                    <img class="coins" src="/images/bank/coins.png">
                    <div class="coins">${bank_coins}</div></a>`);
              for (i = 0; i < players.players.length; i++) {
                var earned_player_coins = players.players[i].coins;
                $(".players_coins").append(`<a>
              <img class="player${i}_coins" src="/images/bank/coins.png">
              <div class="player${i}_coins">${earned_player_coins}</div></a>`);
                //CrownPlayer Displaying
                if (players.players[i].crowned == true) {
                  $(".playerCrown")
                    .append(`<div class="player${i}Crown" id="player${i}Crown">
                <img src="/images/bank/crown.png" />
              </div>`);
                }
                $("#crown_disapear").hide();
              }
            },
            error: function () {},
          });
          //document.getElementsById('Counter').style.visibility = 'hidden';
        } else if (data == "redirect") {
          clearInterval(counter);
          $.ajax({
            type: "GET",
            url: "/deleteAllUsers", //delete all users before redirecting to lobby
            data: {},
            success: function () {},
            error: function () {},
          });
          window.location.href = "/";
        } else {
          //scoket emiting event
          socket.emit("timer", {
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
socket.on("timer", (timer) => {
  //console.log(timer);
  document.getElementById("timer").innerHTML =
    timer.minutes + ":" + timer.seconds;
});

$(".game-room").ready(function () {
  var appendPlayers = setInterval(() => {
    $.ajax({
      type: "GET",
      url: "/getUsers",
      data: {},
      success: function (players) {
        for (var i = 0; i < players.users.length; i++) {
          var num = players.users[i].num;
          var userName = players.users[i].userName;
          $(".players").append(`<div class="player${num}">${userName}</div>`);
        }
        if (players.users.length == 4) {
          clearInterval(appendPlayers);
        }
      },
      error: function () {},
    });
  }, 1000);
});
