const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'dev-secret' } = process.env;

// GET /users

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Error del servidor' }));
};

// GET /users/:userId
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID inválido' });
      }

      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }

      return res.status(500).send({ message: 'Error del servidor' });
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const err = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID inválido' });
      }

      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }

      return res.status(500).send({ message: 'Error del servidor' });
    });
};

// POST /users
module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      res.status(201).send(userData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos inválidos' });
      }

      if (err.code === 11000) {
        return res.status(409).send({ message: 'El email ya existe' });
      }

      return res.status(500).send({ message: 'Error del servidor' });
    });
};

// PATCH /users/me
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const err = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos inválidos' });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID inválido' });
      }

      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }

      return res.status(500).send({ message: 'Error del servidor' });
    });
};

// PATCH /users/me/avatar
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const err = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos inválidos' });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID inválido' });
      }

      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }

      return res.status(500).send({ message: 'Error del servidor' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject();
          }

          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' }
          );

          return res.send({ token });
        });
    })
    .catch(() => {
      res.status(401).send({ message: 'Credenciales incorrectas' });
    });
};