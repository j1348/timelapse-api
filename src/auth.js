const Promise = require('bluebird');
const jwt = require('hapi-auth-jwt2');
const User = require('./database').User;

exports.register = (server, options, next) => {
    function validate(decoded, request, cb) {
        return new Promise(() => {
            User.findAsync({
                    _id: decoded.id
                })
                .then((user) => {
                    if (!user) {
                        return cb(null, false);
                    }
                    return cb(null, true);
                });
        });
    }

    function registerAuth(err) {
        if (err) {
            return next(err);
        }

        server.auth.strategy('jwt', 'jwt', {
            key: process.env.JWT || 'stubJWT',
            validateFunc: validate,
            verifyOptions: {
                algorithms: ['HS256']
            }
        });

        server.auth.default('jwt');
        return next();
    }

    server.register(jwt, registerAuth);
};

exports.register.attributes = {
    name: 'auth-jwt',
    version: '1.0.0'
};
