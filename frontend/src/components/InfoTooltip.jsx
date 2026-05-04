import successIcon from "../images/success.svg";
import errorIcon from "../images/error.svg";

function InfoTooltip({ isOpen, isSuccess, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content popup__container">

        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        />

        <img
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? "Éxito" : "Error"}
          className="popup__icon"
        />

        <h2 className="popup__title">
          {isSuccess
            ? "¡Registro exitoso!"
            : "Ups, algo salió mal. Inténtalo de nuevo."}
        </h2>

      </div>
    </div>
  );
}

export default InfoTooltip;