const Controller = require('./user-controller');
const Validator = require('./user-schema');

exports.register = (server, options, next) => {
  // instantiate controller
  const controller = new Controller(options.database);

  server.bind(controller);
  server.route([
    // {
    //   method: 'GET',
    //   path: '/user',
    //   config: {
    //     tags: ['api'], // ADD THIS TAG
    //     description: 'get user list',
    //     notes: 'get user list',
    //     auth: false,
    //     handler: controller.list,
    //     validate: Validator.list(),
    //   },
    // },
    {
      method: 'GET',
      path: '/user/{id}',
      config: {
        handler: controller.read,
        validate: Validator.read(),
      },
    },
    {
      method: 'POST',
      path: '/user',
      config: {
        auth: false,
        handler: controller.create,
        validate: Validator.create(),
      },
    },
    {
      method: 'POST',
      path: '/user/login',
      config: {
        tags: ['api'], // ADD THIS TAG
        description: 'login access',
        notes: 'Allow an user to connect',
        auth: false,
        handler: controller.login, /* ,
        validate: Validator.login()*/
      },
    },
    {
      method: 'PUT',
      path: '/user/{id?}',
      config: {
        handler: controller.update,
        validate: Validator.update(),
      },
    },
    {
      method: 'DELETE',
      path: '/user/{id?}',
      config: {
        handler: controller.destroy,
        validate: Validator.destroy(),
      },
    },
  ]);

  next();
};

exports.register.attributes = {
  name: 'user-route',
  version: '1.0.0',
};
