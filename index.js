import UserCtrl from './api/controllers/UserCtrl';
import GameCtrl from './api/controllers/GameCtrl';

require('@babel/register');
require("@babel/polyfill");

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use((req, res, next) => {
  res.header("Accept", "application/json");
  res.header("Content-type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// user
app.post('/user', UserCtrl.post);
app.get('/user', UserCtrl.get);
app.get('/user/:id', UserCtrl.get);
app.delete('/user/:id', UserCtrl.delete)
app.delete('/user', UserCtrl.delete)

// game
app.get('/game', GameCtrl.get);
app.put('/game', GameCtrl.put);

app.listen('3000')