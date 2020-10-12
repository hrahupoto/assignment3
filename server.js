const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

const insertUser = require('./routes/insertUser');
const getUsers = require('./routes/getUsers');
const deleteAllUsers = require('./routes/deleteAllUsers');

app.use('/', insertUser);
app.use('/', getUsers);
app.use('/', deleteAllUsers);

app.listen(3000);
console.log('Server running at Port: 3000');

//DATABASE MONGODB

const uri =
  'mongodb+srv://Hassan:SIT725@sit725.bketa.mongodb.net/Citadels(SIT725)?retryWrites=true&w=majority';

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  function (err) {
    if (err) throw err;

    console.log('DB successfully connected');
  }
);
