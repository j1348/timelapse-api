require('dotenv').config();
const fs = require('fs');
const Hapi = require('hapi');
const boomDecorators = require('hapi-boom-decorators');
const HapiSwagger = require('hapi-swagger');
const path = require('path');
const database = require('./database');
const auth = require('./auth');
const logs = require('./logs');
const inert = require('inert');
const vision = require('vision');
const version = require(path.join(__dirname, '../package')).version;
const server = new Hapi.Server();

server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || 7000,
    routes: {
        cors: {
              origin: ['*']
            }
        }
    });

// Expose database
if (process.env.NODE_ENV === 'test') {
    server.database = database;
}

// load routes
const plugins = fs.readdirSync(path.join(__dirname, './entities'))
        .filter(dir => dir.match(/^[^.]/))
        .map(entity => ({
            register: require(`./entities/${entity}/${entity}-routes`),
            options: {
                database
            }
        }));

plugins.push({ register: auth });
plugins.push({ register: logs });
plugins.push({ register: boomDecorators });

// Hapi Swagger
plugins.push({ register: inert });
plugins.push({ register: vision });
plugins.push({ register: HapiSwagger,
    options: {
        info: {
            title: 'Timelapse API Documentation',
            version
        }
    }
});

server.register(plugins, (err) => {
    if (err) {
        throw err;
    }

    if (!module.parent) {
        server.start((err) => {
            if (err) {
                throw err;
            }
            server.log('info', `Server running at: ${server.info.uri}`);
        });
    }
});

module.exports = server;
