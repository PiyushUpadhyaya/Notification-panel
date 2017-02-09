/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

// Populate databases with sample data
if(config.seedDB) {
  require('./config/seed');
}

// Setup server
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);


var roller = require('./api/thing/thing.controller');
function test(){
  var user_name = ['Lady', 'Aria', 'Tiff', 'Thea', 'Col', 'Hel', 'Jon', 'Leo', 'Lee', 'Alie', 'Asha', 'Ala', 'Dara', 'Ike', 'Lida', 'Sylv', 'Trin', 'Ram', 'Dan'];
  var events_occured = ['acted', 'liked', 'posted', 'shared'];
  var where_event_occured = ['photo', 'video'];
  console.log(Math.random()*20);
  var select_name = Math.floor(Math.random()*20);
  console.log(Math.random()*20);
  var select_event = Math.floor((Math.random()*20)%4);
  var select_where = Math.floor((Math.random()*20)%2);
  var datetime = new Date();
  if (select_event == 0) {
    select_event = select_event+1;
  } else if (select_name == 0) {
    select_name = select_name+1;
  } else if (select_where == 0) {
    select_where = select_where+1;
  }
  roller.newNotify({name: user_name[select_name], events: events_occured[select_event], where: where_event_occured[select_where], date: datetime, status: 'false'});

  setTimeout(test, 6000);
}

test();

// Expose app
exports = module.exports = app;
