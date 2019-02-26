'use strict';
require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const router = require('./router');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static('client'));

router.set(app);

function start() {
  app.listen(process.env.PORT, process.env.HOST, function() {
    console.log(`Server started on ${process.env.HOSTNAME}:${process.env.PORT}`);
  });
};

if (!module.parent) {
  start();
}

module.exports = app;
