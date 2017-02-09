'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://admin:admin@ds147069.mlab.com:47069/notification_panel_wingify'
  },

  // Seed database on startup
  seedDB: false

};
