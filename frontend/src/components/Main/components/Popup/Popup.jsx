export default function Popup(props) {
  
  const { onClose, title, children } = props;

  return (
    <div className="popup popup_opened">
      <div className={`popup__content ${
          !title ? "popup__content_content_image" : ""
        }`}
        >
        <button
          aria-label="Cerrar ventana"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}