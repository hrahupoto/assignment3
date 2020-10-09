const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.listen(3000);
console.log('Server running at Port: 3000');

//DATABASE MONGODB
const uri =
  'mongodb+srv://Hassan:SIT725@sit725.bketa.mongodb.net/Citadels(SIT725)?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect((err) => {
  collection_userdetails = client.db('Citadels(SIT725)').collection('users');
});
