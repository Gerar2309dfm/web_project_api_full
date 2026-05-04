import { useRef } from "react";

export default function EditAvatar({ onUpdateAvatar }) {

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      name="avatar-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__field">
        <input
          type="url"
          className="popup__input"
          placeholder="URL del avatar"
          required
          ref={avatarRef}
        />
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}