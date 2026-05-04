export default function ImagePopup(props) {
    const { name, link } = props.card;

    return (
        <>
      <img className="popup__image" src={link} alt={name} />
      <p className="popup__caption">{name}</p>
    </>
  );
}