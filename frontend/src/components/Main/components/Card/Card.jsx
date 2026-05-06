import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function Card({ card, onCardLike, onCardDelete, onImageClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = card.likes.some((id) =>
    typeof id === "string"
      ? id === currentUser._id
      : id._id === currentUser._id
  );

 const isOwn =
  (card.owner?._id || card.owner) === currentUser._id;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  function handleImageClick() {
    onImageClick(card);
  }

  return (
    <li className="card">

      {isOwn && (
        <button
          className="card__delete-button"
          onClick={handleDeleteClick}
        />
      )}

      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleImageClick}
      />

      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>

        <button
          className={`card__like-button ${
            isLiked ? "card__like-button_is-active" : ""
          }`}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}

export default Card;