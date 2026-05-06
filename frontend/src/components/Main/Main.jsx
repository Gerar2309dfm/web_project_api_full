import { useContext } from "react";
import Card from "./components/Card/Card";
import NewCard from "./components/NewCard/NewCard";
import EditProfile from "./components/EditProfile/EditProfile";
import EditAvatar from "./components/EditAvatar/EditAvatar";
import Popup from "./components/Popup/Popup";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({
  cards,
  popup,
  onOpenPopup,
  onClosePopup,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
  onCardClick,
  onUpdateUser,
  onUpdateAvatar
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: (
      <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />
    )
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: (
      <EditProfile onUpdateUser={onUpdateUser} />
    )
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: (
      <EditAvatar onUpdateAvatar={onUpdateAvatar} />
    )
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <img
          className="profile__image"
          src={currentUser.avatar}
          alt="Avatar"
          onClick={() => onOpenPopup(editAvatarPopup)}
        />

        <div className="profile__info">
          <h1 className="profile__title">
            {currentUser.name}
          </h1>

          <button
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          />

          <p className="profile__description">
            {currentUser.about}
          </p>
        </div>

        <button
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onImageClick={onCardClick}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;