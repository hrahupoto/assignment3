const userModel = require("../models/db/user");

exports.userCounter = function (req, res) {
  //timeArray to store mins and secs
  var m = req.query.timeArray[0]; 
  var s = req.query.timeArray[1];
  var maxPlayer = 4;
  var data = {};
  //updating sec i.e. "s" value
  s = checkSecond(s - 1);
  if (s == 59) {
    m = m - 1;
  }

  // if timer is zero
  if (m < 0) {
    userModel.find({}, function (err, users) {
      if (users.length == maxPlayer) {
        //ending response to client page
        return res.send("hide");
      } else {
        return res.send("redirect");
      }
    });
  } 
  //if timer is not zero sending the min and sec value to clients page
  else {
    data = { minutes: m, seconds: s };
    return res.send(data);
  }
};

//fuction to check secs 
function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec;
  } // add zero in front of numbers < 10
  if (sec < 0) {
    sec = "59";
  }
  return sec;
}
