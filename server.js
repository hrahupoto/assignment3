const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/insertUser', function (req, res) {
  if (req.query.userName == null || req.query.dateOfBirth == null) {
    res.send('Enter user name and date of birth.');
  } else {
    insertUser({
      userName: req.query.userName,
      dateOfBirth: req.query.dateOfBirth,
    });
    res.send('User saved in database');
  }
});

app.get('/getUsers', function (req, res) {
  userCollection.find({}).toArray(function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

app.get('/deleteAllUsers', function (req, res) {
  userCollection.remove({}, (err, item) => {
    if (err) {
      return res.json({success: false, msg: 'Cannot remove users'});
    }
    if (!item) {
      return res.status(404).json({success: false, msg: 'Users not found'});
    }
    res.json({success: true, msg: 'Users removed.'});
  });
});

app.listen(3000);
console.log('Server running at Port: 3000');

//DATABASE MONGODB
let userCollection;

const uri =
  'mongodb+srv://Hassan:SIT725@sit725.bketa.mongodb.net/Citadels(SIT725)?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const insertUser = ({userName, dateOfBirth}) => {
  userCollection.insertOne({
    userName,
    dateOfBirth,
  });
};

client.connect((err) => {
  userCollection = client.db('Citadels(SIT725)').collection('users');
});
