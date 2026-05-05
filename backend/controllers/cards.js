const Card = require('../models/card');

// GET /cards
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// POST /cards
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

// DELETE /cards/:cardId
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const err = new Error('Tarjeta no encontrada');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        const err = new Error('No autorizado');
        err.statusCode = 403;
        throw err;
      }

      return Card.findByIdAndDelete(card._id)
        .then(() => res.send({ message: 'Tarjeta eliminada' }));
    })
    .catch(next);
};

// PUT /cards/:cardId/likes
module.exports.likeCard = (req, res, next) => {
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
    .catch(next);
};

// DELETE /cards/:cardId/likes
module.exports.dislikeCard = (req, res, next) => {
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
    .catch(next);
};