const path = require('path');
const server = require(path.join(__dirname, './server'));

server.start((err) => {
    if (err) {
        console.log(err);
        throw err;
    }

    console.log('info', `Server Running At: ${server.info.uri}`);
});
