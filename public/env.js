$(document).ready(function () {

    $('#joinRoom').click(function () {
        var userName = $('#userName').val()
        var dateOfBirth = $('#dob').val()

        $.ajax({
            type: "GET",
            url: "/insertUser",
            data: { userName, dateOfBirth },
            success: function (data) {
<<<<<<< HEAD
                window.location.href = '../views/gameRoom.ejs'
=======
                window.location.href = '/GameRoom.html'
>>>>>>> input fields linked with database using ajax call.
            },
            error: function () { },
        });
        console.log(userName)
        console.log(dateOfBirth)
    });


})
