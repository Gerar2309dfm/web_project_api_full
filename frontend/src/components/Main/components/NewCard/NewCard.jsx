import { useState } from "react";

export default function NewCard({ onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({
      name,
      link
    });

    setName("");
    setLink("");
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
      className="popup__input popup__input_type_title"
        type="text"
        placeholder="Título"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input 
        className="popup__input popup__input_type_url"
        type="url"
        placeholder="URL de la imagen"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />

      <button 
      className="button popup__button"
      type="submit">
        Crear
      </button>
    </form>
  );
}