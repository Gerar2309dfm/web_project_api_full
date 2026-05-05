require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const validator = require('validator');

const { celebrate, Joi, errors } = require('celebrate');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const { createUser, login } = require('./controllers/users');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
const { PORT = 3000 } = process.env;

// CONEXIÓN A MONGODB
mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log(err));


// MIDDLEWARES
app.use(requestLogger);

app.use(cors({
   origin: [
    'http://localhost:5173',
    'https://miappgerardo.duckdns.org'
  ],
}));

app.use(express.json());

// VALIDACIÓN URL
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

// CRASH TEST
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

// RUTAS PÚBLICAS

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().allow('').custom(validateURL),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// RUTAS PROTEGIDAS
app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// ruta base
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// 404
app.use((req, res, next) => {
  const err = new Error('Recurso no encontrado');
  err.statusCode = 404;
  next(err);
});

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

// LEVANTAR SERVIDOR

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});