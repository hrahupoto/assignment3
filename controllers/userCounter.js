const userModel = require("../models/db/user");

exports.userCounter = function (req, res) {
  var m = req.query.timeArray[0];
  var s = req.query.timeArray[1];
  var maxPlayer = 4;
  var data = {};
  s = checkSecond(s - 1);
  if (s == 59) {
    m = m - 1;
  }

  if (m < 0) {
    userModel.find({}, function (err, users) {
      if (users.length == maxPlayer) {
        return res.send("hide");
      } else {
        return res.send("redirect");
      }
    });
  } else {
    data = { minutes: m, seconds: s };
    return res.send(data);
  }
};

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec;
  } // add zero in front of numbers < 10
  if (sec < 0) {
    sec = "59";
  }
  return sec;
}
