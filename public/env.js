//Make connection
const socket = io.connect('http://localhost:3000');

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
