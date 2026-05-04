const Card = require('../models/card');

// GET /cards
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Error del servidor' }));
};

// POST /cards
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos inválidos' });
      }

      return res.status(500).send({ message: 'Error del servidor' });
    });
};

// DELETE /cards/:cardId
module.exports.deleteCard = (req, res) => {
  Card.findById(card._id)
    .orFail(() => {
      const err = new Error('Tarjeta no encontrada');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: 'No autorizado' });
      }

      return Card.findByIdAndDelete(card._id)
        .then(() => res.send({ message: 'Tarjeta eliminada' }));
    })
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

// PUT /cards/:cardId/likes
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const err = new Error('Tarjeta no encontrada');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.send(card))
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

// DELETE /cards/:cardId/likes
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const err = new Error('Tarjeta no encontrada');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.send(card))
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