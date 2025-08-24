const debug = require('debug');

module.exports = {
  server: debug('app:server'),
  db: debug('app:db'),
  routes: debug('app:routes'),
};

// A logger is a tool that records information about how your application is running (events, errors, performance). Instead of using console.log, a logger gives structured, configurable, and controlled logging.