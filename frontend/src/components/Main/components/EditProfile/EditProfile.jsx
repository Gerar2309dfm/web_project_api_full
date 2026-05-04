import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditProfile({ onUpdateUser }) {

  const { currentUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  }

  return (
    <form
      className="popup__form"
      name="profile-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="popup__field">
        <input
          className="popup__input popup__input_type_description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}