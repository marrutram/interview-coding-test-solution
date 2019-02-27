'use strict';
require('dotenv').config();
const express = require('express');
const app = express();

function start() {
  app.listen(process.env.PORT, process.env.HOST, function() {
    console.log(`Server started on ${process.env.HOSTNAME}:${process.env.PORT}`);
  });
};

if (!module.parent) {
  start();
}

module.exports = app;
