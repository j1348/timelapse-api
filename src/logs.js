const Good = require('good');
const GoodConsole = require('good-console');
const GoodFile = require('good-file');

exports.register = (server, options, next) => {
  const opts = {
    opsInterval: 1000,
    reporters: [{
      reporter: GoodConsole,
      events: { error: '*', log: '*', response: '*', request: '*' },
    // }, {
    //   reporter: GoodFile,
    //   events: { ops: '*', error: '*' },
    //   config: {
    //     path: '../logs',
    //     rotate: 'daily',
    //   }
    }],
  };

  server.register({
    register: Good,
    options: opts,
  }, err => next(err));
};

exports.register.attributes = {
  name: 'logs',
  version: '1.0.0',
};
