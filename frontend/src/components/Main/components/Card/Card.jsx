function Card({ card, onCardLike, onImageClick }) {

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleImageClick() {
    onImageClick(card);
  }

  return (
    <li className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleImageClick}
      />

      <div className="card__description">
        <h2 className="card__title">
          {card.name}
        </h2>

        <button
           className={`card__like-button ${
    card.isLiked ? "card__like-button_is-active" : ""
  }`}
  onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}

export default Card;