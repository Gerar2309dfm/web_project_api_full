const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { celebrate, Joi, errors } = require('celebrate');
const validator = require('validator');

const app = express();
const PORT = 3000;

// conexión
mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log(err));

// middleware
app.use(express.json());

// controllers
const { createUser, login } = require('./controllers/users');

// función validar URL
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

app.use(requestLogger);

//rutas públicas
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// routers
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// rutas protegidas
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.use(errorLogger);

// 404
app.use((req, res, next) => {
  const err = new Error('Recurso no encontrado');
  err.statusCode = 404;
  next(err);
});

// errores de celebrate
app.use(errors());

// error handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});