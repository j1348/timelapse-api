const Good = require('good');
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const version = require(path.join(__dirname, '../package')).version;
const release = process.env.HEROKU_RELEASE_VERSION || version;
const reporters = {
    myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ error: '*', log: '*', response: '*', request: '*' }]
        },
        {
            module: 'good-console'
        },
        'stdout'
    ]
};

// if (process.env.SENTRY_DSN) {
//     reporters.SEntryReporter = [{
//             module: 'good-squeeze',
//             name: 'Squeeze',
//             args: [{ error: '*', log: '*', response: '*', request: '*' }],
//         }, {
//             module: 'good-sentry',
//             args: [{
//                 dsn: process.env.SENTRY_DSN,
//                 config: {
//                     name: 'timelapse-api',
//                     logger: 'default',
//                     release,
//                     environment,
//                     tags: { git_commit: process.env.HEROKU_SLUG_COMMIT }
//                 },
//                 captureUncaught: true
//             }]
//         }];
// }

exports.register = (server, options, next) => {
    server.register({
        register: Good,
        options: {
            reporters,
            ops: {
                interval: 1000
            }
        }
    }, err => next(err));
};

exports.register.attributes = {
    name: 'logs',
    version: '1.0.0'
};
