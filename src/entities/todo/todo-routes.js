const Controller = require('./todo-controller');
const Validator = require('./todo-schema');

exports.register = (server, options, next) => {
    // instantiate controller
    const controller = new Controller(options.database);

    server.bind(controller);
    server.route([{
        method: 'GET',
        path: '/todo',
        config: {
            tags: ['api'], // ADD THIS TAG
            description: 'get all todos',
            notes: 'blablabla',
            handler: controller.list,
            validate: Validator.list(),
        },
    }, {
        method: 'GET',
        path: '/todo/{id}',
        config: {
            tags: ['api'], // ADD THIS TAG
            description: 'get one todo from id',
            notes: 'blablabla',
            handler: controller.read,
            validate: Validator.read(),
        },
    }, {
        method: 'POST',
        path: '/todo',
        config: {
            tags: ['api'], // ADD THIS TAG
            description: 'create a new todo',
            notes: 'blablabla',
            handler: controller.create,
            validate: Validator.create(),
        },
    }, {
        method: 'PUT',
        path: '/todo/{id?}',
        config: {
            tags: ['api'], // ADD THIS TAG
            description: 'update an existing todo',
            notes: 'blablabla',
            handler: controller.update,
            validate: Validator.update(),
        },
    }, {
        method: 'DELETE',
        path: '/todo/{id?}',
        config: {
            tags: ['api'], // ADD THIS TAG
            description: 'delete an existing todo',
            notes: 'blablabla',
            handler: controller.destroy,
            validate: Validator.destroy(),
        },
    }, ]);

    next();
};

exports.register.attributes = {
    name: 'todo-route',
    version: '1.0.0',
};
