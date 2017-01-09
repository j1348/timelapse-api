const jwt = require('jsonwebtoken');

function UserController(db) {
  this.database = db;
  this.model = db.User;
}

function getToken(id) {
  const secretKey = process.env.JWT || 'stubJWT';

  return jwt.sign({
    id,
  }, secretKey, { expiresIn: '18h' });
}

// [GET] /user
function list(request, reply) {
  this.model.findAsync({})
  .then((users) => {
    reply(users);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [GET] /user/{id}
function read(request, reply) {
  const id = request.params.id;

  this.model.findOneAsync({ _id: id })
  .then((user) => {
    if (!user) {
      reply.notFound();
      return;
    }

    reply(user);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [POST] /user
function create(request, reply) {
  const payload = request.payload;

  this.model.createAsync(payload)
  .then((user) => {
    const token = getToken(user.id);

    reply({
      token,
    }).code(201);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [POST] /user/login
function login(request, reply) {
  const credentials = request.payload;

  this.model
        .findOneAsync({ email: credentials.email })
        .then((user) => {
          if (!user) {
            return reply.redirect('/');
                // return reply.unauthorized('Email or Password invalid');
          }

          if (!user.validatePassword(credentials.password)) {
            return reply.redirect('/');
                // return reply.unauthorized('Email or Password invalid');
          }

          const token = getToken(user.id);
          return reply.redirect(`/?token=${token}`);  // reply({ token: token });
        })
        .catch((err) => {
          console.log('inside create => err');
          console.log(err);
          reply.badImplementation(err.message);
        });
}

// [PUT] /user
function update(request, reply) {
  const id = request.params.id;
  const payload = request.payload;

  this.model.findOneAndUpdateAsync({ _id: id }, { $set: payload }, { new: true })
    .then((user) => {
      reply(user);
    })
    .catch((err) => {
      reply.badImplementation(err.message);
    });
}

// [DELETE] /user
function destroy(request, reply) {
  const id = request.auth.credentials.id;

  this.model.removeAsync({ _id: id })
    .then(() => {
      reply();
    })
    .catch((err) => {
      reply.badImplementation(err.message);
    });
}

UserController.prototype = {
  list,
  read,
  create,
  login,
  update,
  destroy,
};

module.exports = UserController;
